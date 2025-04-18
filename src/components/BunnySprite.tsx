import { Assets, Texture } from "pixi.js";
import { useEffect, useState } from "react";

const BunnySprite = () => {
  const [texture, setTexture] = useState(Texture.EMPTY);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    (async () => {
      if (texture === Texture.EMPTY) {
        const bunnyTexture = await Assets.load(
          "https://pixijs.com/assets/bunny.png"
        );
        setTexture(bunnyTexture);
      }
    })();
  }, [texture]);

  return (
    <pixiSprite
      anchor={0.5}
      eventMode="static"
      cursor="pointer"
      onClick={() => setIsActive(!isActive)}
      scale={isActive ? 1 : 1.5}
      texture={texture}
      x={100}
      y={100}
    />
  );
};

export default BunnySprite;
