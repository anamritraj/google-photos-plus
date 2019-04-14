// alert("Grrr!!");

let isPhotosPage = window.location.host === "photos.google.com";
// chrome.runtime.sendMessage({ isPhotosPage: isPhotosPage });
chrome.storage.sync.set({ isPhotosPage: isPhotosPage });
