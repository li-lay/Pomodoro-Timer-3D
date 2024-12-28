import { Text3D } from "@react-three/drei";
import MonoFont from "../assets/fonts/Monomaniac One_Regular.json";
import { forwardRef } from "react";

const TextModel = forwardRef(({ minute, second, textScale }, ref) => {
  return (
    <Text3D ref={ref} font={MonoFont} castShadow scale={textScale}>
      {minute}:{second == 0 ? "00" : second}
      <meshStandardMaterial color="#98971a" />
    </Text3D>
  );
});

TextModel.displayName = "TextModel";

export default TextModel;
