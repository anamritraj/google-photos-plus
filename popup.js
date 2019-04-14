document.addEventListener("DOMContentLoaded", function() {
  // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //   if (request.isPhotosPage) {
  //     document.getElementById("help-text").hidden = true;
  //   }
  // });

  chrome.storage.sync.get(["isPhotosPage"], function(result) {
    if (result.isPhotosPage) {
      document.getElementById("help-text").hidden = true;
    }
  });
});
