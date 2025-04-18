import { useState } from "react";
import { Container, Stage } from "@pixi/react";
import BunnySprite from "./components/BunnySprite";
import useResize from "./hooks/useResize";
import Background from "./components/UI/Background";

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
        }}
      >
        <Container>
          <Background width={dimensions.width} height={dimensions.height} />

          <BunnySprite />
        </Container>
      </Stage>
    </main>
  );
};

export default App;
