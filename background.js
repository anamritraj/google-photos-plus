chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);

  if (request.photoURL) {
    const newURL = request.photoURL.split("=")[0] + "=w12000-h12000-no";

    chrome.downloads.download({
      url: newURL
    });
  }
});
