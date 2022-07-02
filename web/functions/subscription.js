const FormData = require("form-data");
const Mailgun = require("mailgun.js");

const domain = process.env.MAILGUN_DOMAIN;
const myName = process.env.NAME;
const from = process.env.TX_EMAIL_ADDRESS;
const listId = process.env.SUBSCRIBERS_LIST_ID;

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

class UserError extends Error {
  constructor(message, options) {
    super(message, options);
  }
}

const subscribe = async (body) => {
  const { address, name } = body;
  if (!address) {
    throw new UserError("Email address required for subscription ");
  }
  const res1 = await mg.lists.members.createMember(listId, {
    address,
    name,
    subscribed: "yes",
    upsert: "no",
  });
  console.log(res1);
  const message = "Look out for great new content soon";
  const res2 = await mg.messages.create(domain, {
    from: `${myName} <${from}>`,
    to: address,
    replyTo: from,
    subject: "Welcome to Ruckus",
    text: `${message}`,
  });
  console.log(res2);
  return true;
};

exports.handler = async (event, context) => {
  try {
    const formBody = new URLSearchParams(event.body);
    const body = Object.fromEntries(formBody.entries());
    await subscribe(body);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (e) {
    console.error('found error: ', e);
    if (e instanceof UserError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: e.message }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: e.message }),
      };
    }
  }
}
