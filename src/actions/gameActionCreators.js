import getActionTypes from "./actionTypes.js";

export const loadImages = (imageName, imageSrc) => async (dispatch) => {
  const loadImage = async (imageSrc) => {
    const loadedImage = Array.isArray(imageSrc) ? [] : {};

    for (const key in imageSrc) {
      if (typeof imageSrc[key] === "object") {
        loadedImage[key] = await loadImage(imageSrc[key]);
        continue;
      }

      if (typeof imageSrc[key] === "number") {
        loadedImage[key] = imageSrc[key];
        continue;
      }

      if (typeof imageSrc[key] === "string") {
        loadedImage[key] = await (async (url) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = url;
          });
        })(imageSrc[key]);
      }
    }

    return loadedImage;
  };

  const loadedImage = await loadImage(imageSrc);
  dispatch({
    type: getActionTypes().STORE_IMAGE,
    payload: {
      name: imageName,
      image: loadedImage,
    },
  });
};
