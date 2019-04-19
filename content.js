const getAllThePhotoElements = () => {
  let photos = document.querySelectorAll(
    "div div div c-wiz div div div div div div a > div"
  );

  // Its possible that the photos are not rendered when this script is injected in the browser.
  // If thats the case we are going to try after 1 second.
  if (photos.length <= 0) {
    setTimeout(getAllThePhotoElements, 1000);
  } else {
    // Once we see that there are some elements on the page, we are ready to process the photos.
    processPhotoElements(photos);
  }
};

const debounce = (fn, delay) => {
  let timer;

  return function() {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

const processPhotoElements = photos => {
  photos.forEach(photo => {
    addDownloadButton(photo);
  });
};

const handleDownloadIconClick = (event, photoURL) => {
  event.preventDefault();
  chrome.runtime.sendMessage({ photoURL: photoURL });
};

const addDownloadButton = photo => {
  const photoURL = photo.attributes["data-latest-bg"].nodeValue;

  var div = document.createElement("a");
  div.className = "download-button";
  div.addEventListener("click", event =>
    handleDownloadIconClick(event, photoURL)
  );
  div.innerHTML = `<svg width="20" height="20" viewBox="0 0 490 490">
    <path d="M467.083,318.627c-5.324-5.328-11.8-7.994-19.41-7.994H315.195l-38.828,38.827c-11.04,10.657-23.982,15.988-38.828,15.988
      c-14.843,0-27.789-5.324-38.828-15.988l-38.543-38.827H27.408c-7.612,0-14.083,2.669-19.414,7.994
      C2.664,323.955,0,330.427,0,338.044v91.358c0,7.614,2.664,14.085,7.994,19.414c5.33,5.328,11.801,7.99,19.414,7.99h420.266
      c7.61,0,14.086-2.662,19.41-7.99c5.332-5.329,7.994-11.8,7.994-19.414v-91.358C475.078,330.427,472.416,323.955,467.083,318.627z
      M360.025,414.841c-3.621,3.617-7.905,5.424-12.854,5.424s-9.227-1.807-12.847-5.424c-3.614-3.617-5.421-7.898-5.421-12.844
      c0-4.948,1.807-9.236,5.421-12.847c3.62-3.62,7.898-5.431,12.847-5.431s9.232,1.811,12.854,5.431
      c3.613,3.61,5.421,7.898,5.421,12.847C365.446,406.942,363.638,411.224,360.025,414.841z M433.109,414.841
      c-3.614,3.617-7.898,5.424-12.848,5.424c-4.948,0-9.229-1.807-12.847-5.424c-3.613-3.617-5.42-7.898-5.42-12.844
      c0-4.948,1.807-9.236,5.42-12.847c3.617-3.62,7.898-5.431,12.847-5.431c4.949,0,9.233,1.811,12.848,5.431
      c3.617,3.61,5.427,7.898,5.427,12.847C438.536,406.942,436.729,411.224,433.109,414.841z"/>
    <path d="M224.692,323.479c3.428,3.613,7.71,5.421,12.847,5.421c5.141,0,9.418-1.808,12.847-5.421l127.907-127.908
      c5.899-5.519,7.234-12.182,3.997-19.986c-3.23-7.421-8.847-11.132-16.844-11.136h-73.091V36.543c0-4.948-1.811-9.231-5.421-12.847
      c-3.62-3.617-7.901-5.426-12.847-5.426h-73.096c-4.946,0-9.229,1.809-12.847,5.426c-3.615,3.616-5.424,7.898-5.424,12.847V164.45
      h-73.089c-7.998,0-13.61,3.715-16.846,11.136c-3.234,7.801-1.903,14.467,3.999,19.986L224.692,323.479z"/>
</svg>`;

  photo.parentElement.parentElement.appendChild(div);
};

// This is for the first time the page loads. It waits for 3 seconds to allow the page to completely render photos.
// Even then if the photos are not there, it will try after every 1 second.
setTimeout(getAllThePhotoElements, 3000);

// This function listens to the user-scroll event and calls the getAllThePhotoElements method
// when the user stops scrolling for 500ms.
window.onmousewheel = debounce(getAllThePhotoElements, 500);
