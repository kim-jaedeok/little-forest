/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadImages } from "../actions/gameActionCreators";

import littleForestImages from "../games/images/littleForest/littleForestImages";
import gameManualImages from "../games/images/common/gameManual";

/**
 *
 * @param {string} name current game name
 */
const useImageLoad = (name) => {
  let imageSrc;

  const dispatch = useDispatch();

  useEffect(() => {
    switch (name) {
      case "littleForest":
        imageSrc = littleForestImages;
        break;

      case "gameManuals":
        imageSrc = gameManualImages;
        break;

      default:
        return;
    }

    dispatch(loadImages(name, imageSrc));
  }, [dispatch, name, imageSrc]);
};

export default useImageLoad;
