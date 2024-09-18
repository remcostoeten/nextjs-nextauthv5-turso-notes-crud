"use client";

import { Center } from "../atoms/Center";
import LogoIcon from "../base/logo";
import ImageLoader from "./LogoFlicker";

export default function LogoLoader() {
  return (
    <>
      <Center
        fullScreen={true}
        className="absolute inset-0 z-50 flex items-center justify-center "
      >
        <ImageLoader>
          <LogoIcon />
        </ImageLoader>
      </Center>
    </>
  );
}
