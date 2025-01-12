import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Center,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import TextModel from "./components/TextModel";
import { useRef, useState, useEffect, useMemo } from "react";
import StartSound from "./assets/audio/complete.mp3";

function App() {
  const textRef = useRef();

  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && !isPaused) {
      timer = setInterval(() => {
        if (second === 0) {
          if (minute === 0) {
            clearInterval(timer);
            setIsActive(false);
          } else {
            setMinute(minute - 1);
            setSecond(59);
          }
        } else {
          setSecond(second - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, isPaused, minute, second]);

  const startTimer = () => {
    let startSound = new Audio(StartSound);
    setIsActive(true);
    setIsPaused(false);
    startSound.play();
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const resetTimer = () => {
    setMinute(25);
    setSecond(0);
    setIsActive(false);
    setIsPaused(false);
  };

  const textScale = useMemo(() => {
    return window.innerWidth <= 500 ? [0.3, 0.3, 0.3] : [0.6, 0.6, 0.6];
  }, []);

  return (
    <>
      <div id="canvas">
        <Canvas
          shadows
          camera={{ position: [0, 0, 4], fov: 25 }}
          style={{ background: "#282828", touchAction: "none" }}
        >
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            shadow-mapSize={2048}
            castShadow
          />
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Center>
              <group>
                <TextModel
                  ref={textRef}
                  minute={minute}
                  second={second}
                  textScale={textScale}
                />
              </group>
            </Center>
          </PresentationControls>
          <ContactShadows
            position={[0, -0.4, 0]}
            opacity={1}
            scale={10}
            blur={3}
            far={4}
          />
          <Environment preset="sunset" />
        </Canvas>
        <div className="btn-container">
          <button className="btn start" role="button" onClick={startTimer}>
            Start
          </button>
          <button
            className="btn pause"
            role="button"
            onClick={pauseTimer}
            disabled={!isActive}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button className="btn reset" role="button" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
