import { useState } from "react";
import { Container, Stage } from "@pixi/react";
import BunnySprite from "./components/BunnySprite";
import useResize from "./hooks/useResize";
import Background from "./components/UI/Background";
import Dinosaur from "./components/Dinosaur";

const App = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useResize({ setDimensions });

  return (
    <main>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{
          autoDensity: true,
          resizeTo: window,
          backgroundColor: 0x1099bb,
        }}
      >
        <Container>
          <Background width={dimensions.width} height={dimensions.height} />

          {/* <BunnySprite /> */}
          <Dinosaur />
        </Container>
      </Stage>
    </main>
  );
};

export default App;
