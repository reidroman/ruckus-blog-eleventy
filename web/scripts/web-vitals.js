import { getCLS, getFID, getLCP } from "web-vitals";

function sendToAnalytics(metric) {
  // Replace with whatever serialization method you prefer.
  // Note: JSON.stringify will likely include more data than you need.
  const body = JSON.stringify(metric);

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon("/analytics", body)) ||
    fetch("/analytics", { body, method: "POST", keepalive: true });
}

// NB: seems we're losing some data here, maybe prefer saving on my server
const sendToGoogleAnalytics = ({ name, delta, id }) => {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/gtagjs
  gtag("event", "Web Vitals", {
    event_action: name,
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    event_label: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    value: Math.round(name === "CLS" ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    non_interaction: true,
    // Use `sendBeacon()` if the browser supports it.
    // transport: "beacon",

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // dimension1: '...',
    // dimension2: '...',
    // ...
  });
}

// getCLS(sendToAnalytics);
// getFID(sendToAnalytics);
// getLCP(sendToAnalytics);
getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
