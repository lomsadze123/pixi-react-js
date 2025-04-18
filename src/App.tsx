import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import BunnySprite from "./components/BunnySprite";
import Background from "./components/Background";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

const App = () => {
  return (
    <main>
      <Application
        width={window.innerWidth}
        height={window.innerHeight}
        resolution={devicePixelRatio}
        resizeTo={window}
        autoDensity={true}
        backgroundAlpha={0.5}
      >
        <pixiContainer>
          <Background />

          {/* Original content */}
          <BunnySprite />
        </pixiContainer>
      </Application>
    </main>
  );
};

export default App;
