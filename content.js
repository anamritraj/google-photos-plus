console.log("I am on the photos page!");

const processPhotoElements = photos => {
  photos.forEach(photo => {
    console.log(photo.attributes["data-latest-bg"].nodeValue);
  });
};

const getAllThePhotoElements = () => {
  let photos = document.querySelectorAll(
    "div div div c-wiz div div div div div div a > div"
  );

  if (photos.length <= 0) {
    setTimeout(getAllThePhotoElements, 1000);
  } else {
    processPhotoElements(photos);
  }
};

getAllThePhotoElements();
