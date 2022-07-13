import { nanoid } from "nanoid/non-secure";

window.share = (url) => {
  const shareData = { url };
  if (navigator.canShare && navigator.canShare(shareData)) {
    navigator.share(shareData);
  } else if (navigator.clipboard && navigator.clipboard.writeText) {
    // navigator.clipboard.writeText(url);
    // Toast.addToast("Article URL copied to clipboard.");
    Alpine.store("toast").addToast("Article URL copied to clipboard.");
  }
  // TODO: consider ClipboardJS
};

document.addEventListener("alpine:init", () => {
  // toast schema: { message: string, id: nanoid }
  // NB: seems it has to be initialized inline for lexical scoping reasons
  Alpine.store("toast", {
    toasts: [],
    // toasts: [{ message: 'test test' }],

    addToast(message) {
      const id = nanoid();
      // Alpine.store("toasts").push({ message, id });
      // setTimeout(() => closeToast(id), 3000);
      this.toasts.push({ message, id });
      setTimeout(() => this.closeToast(id), 3000);
    },

    closeToast(id) {
      // const toasts = Alpine.store("toasts").filter(toast => toast.id === id);
      // Alpine.store("toasts", toasts);
      this.toasts = this.toasts.filter(toast => {
        return toast.id !== id
      });
    },
  });
});
