"use client";

import { useState } from "react";
import { GradientPicker } from "./Color-picker-demo";

export function ColorPicker() {
  const [background, setBackground] = useState("#B4D455");

  return (
    <GradientPicker background={background} setBackground={setBackground} />
  );
}
