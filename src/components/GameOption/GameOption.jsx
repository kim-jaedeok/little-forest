import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Button from "../shared/Button/Button";

const GameOptionContainer = styled.div`
  width: 100%;
  padding: 1vh 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameOption = ({ bgm }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleBgm = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const [isInteractionOccurred, setIsInteractionOccurred] = useState(false);
  useEffect(() => {
    const trackInteraction = () => {
      setIsInteractionOccurred(true);
    };

    document.addEventListener("click", trackInteraction);

    return () => {
      document.removeEventListener("click", trackInteraction);
    };
  }, []);

  const audioRef = useRef(null);
  useEffect(() => {
    if (isInteractionOccurred && audioRef.current) {
      audioRef.current.play();
    }
  }, [isInteractionOccurred]);

  return (
    <GameOptionContainer>
      <div>
        {bgm && (
          <>
            <audio ref={audioRef} loop muted={isMuted}>
              <source src={bgm} type="audio/mpeg" />
            </audio>
            <Button
              onClick={toggleBgm}
              margin={["0", "1vw", "0", "0"]}
              fontWeight={"600"}
              fontSize={"0.9rem"}
              bgColor={isMuted ? "#74b9ff" : "#fab1a0"}
            >
              {isMuted ? "BGM ON" : "BGM OFF"}
            </Button>
          </>
        )}
      </div>
    </GameOptionContainer>
  );
};

export default GameOption;
