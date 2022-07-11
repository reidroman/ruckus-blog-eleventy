// https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag
// https://github.com/codeniko/simple-tracker/blob/master/examples/server-examples/aws-lambda/google-analytics.js
// NB: no great Google reference code because this circumvents a lot of tracker blockers
const request = require("phin");

const measurement_id = process.env.GOOGLE_ANALYTICS_ID;
const api_secret = process.env.GOOGLE_ANALYTICS_MP_API_KEY;
const DEV = process.env.NODE_ENV !== "production";
const GA_URL = (DEV)
  ? `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`
  : `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`;

const cid = (ip, otherStuff) => {
  if (ip) {
    return require("crypto")
      .createHmac("sha256", ip + otherStuff + new Date().toLocaleDateString())
      .update("this is open source")
      .digest("hex");
  }
  return Math.random() * 1000; // They use a decimal looking format. It really doesn't matter.
}

const proxyToGoogleAnalytics = async (event) => {
  // get GA params whether GET or POST request
  const params = Object.fromEntries(
    new URLSearchParams(
      event.httpMethod.toUpperCase() === "GET" ? event.queryStringParameters : event.body
    )
  );
  const headers = event.headers || {};

  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
  // attach other GA params, required for IP address since client doesn't have access to it. UA and CID can be sent from client
  params.v = 1;
  params.uip = headers["x-forwarded-for"] || headers["x-bb-ip"] || ""; // ip override. Look into headers for clients IP address, as opposed to IP address of host running lambda function
  params.ua = params.ua || headers["user-agent"] || ""; // user agent override
  params.ua = encodeURIComponent(params.ua);
  params.client_id = params.cid || cid(params.uip, params.ua);
  // params.events = [{ name: 'test_event', params: { quoi: 'que' } }];
  // delete params.ua;
  params.t = params.t || params['ep.event_action'];

  const { v, cid, tid, t, client_id } = params;
  const data = new URLSearchParams({ v, cid, tid, t, client_id });
  console.info("proxying params:", params);
  console.info("params length:", Buffer.byteLength(data.toString(), "utf-8"));

  const res = await request({
    url: GA_URL,
    method: "POST",
    // latest conclusion here is that GA Measurement protocol parses for different versions
    // based on whether you send it query-encoded or json
    // but either way it's fucked
    data: { client_id, events: [{ name: params['ep.event_action'], params: { value: params['ep.event_value'] } }] },
    parse: "json",
  });

  console.info("ga response", res.statusCode, res.statusMessage, JSON.stringify(res.body));
};


exports.handler = async (event, context) => {
  try {
    await proxyToGoogleAnalytics(event);
  } catch (e) {
    console.error("googleanalytics error!", e);
  }
  return {
    statusCode: 204,
  }
};

/*
 Docs on GA endpoint and example params

 https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide

v: 1
_v: j67
a: 751874410
t: pageview
_s: 1
dl: https://nfeld.com/contact.html
dr: https://google.com
ul: en-us
de: UTF-8
dt: Nikolay Feldman - Software Engineer
sd: 24-bit
sr: 1440x900
vp: 945x777
je: 0
_u: blabla~
jid:
gjid:
cid: 1837873423.1522911810
tid: UA-116530991-1
_gid: 1828045325.1524815793
gtm: u4d
z: 1379041260
*/
