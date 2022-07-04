btnHandler(".subscribe", () => {
  fetch('/api/subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
