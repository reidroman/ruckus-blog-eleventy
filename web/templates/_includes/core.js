// simple button click event handler
const btnHandler = (selector, callback) => {
  var btn = document.querySelector(selector);
  if (!btn) {
    return;
  }
  btn.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      callback();
    },
    false
  );
}
