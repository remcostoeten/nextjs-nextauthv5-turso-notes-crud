export enum BackgroundGradient {
  PURPLE = "PURPLE",
  BLUE = "BLUE",
  GREEN = "GREEN",
  ORANGE = "ORANGE",
  PINK = "PINK",
  PURPLE_DARK = "PURPLE_DARK",
  BLUE_DARK = "BLUE_DARK",
  GREEN_DARK = "GREEN_DARK",
  ORANGE_DARK = "ORANGE_DARK",
  PINK_DARK = "PINK_DARK",
  RED = "RED",
  RED_DARK = "RED_DARK",
  YELLOW = "YELLOW",
  YELLOW_DARK = "YELLOW_DARK",
}

export const UI_CONFIG = {
  COLORS: {
    PRIMARY: "white",
    SECONDARY: "rgba(255, 255, 255, 0.7)",
    ACCENT: "#E879F9",
    BACKGROUND: {
      [BackgroundGradient.PURPLE]:
        "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      [BackgroundGradient.PURPLE_DARK]:
        "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.18) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
      [BackgroundGradient.BLUE]:
        "linear-gradient(143.6deg, rgba(96, 165, 250, 0) 20.79%, rgba(59, 130, 246, 0.26) 40.92%, rgba(37, 99, 235, 0) 70.35%)",
      [BackgroundGradient.BLUE_DARK]:
        "linear-gradient(143.6deg, rgba(96, 165, 250, 0) 20.79%, rgba(59, 130, 246, 0.18) 40.92%, rgba(37, 99, 235, 0) 70.35%)",
      [BackgroundGradient.GREEN]:
        "linear-gradient(143.6deg, rgba(110, 231, 183, 0) 20.79%, rgba(16, 185, 129, 0.26) 40.92%, rgba(6, 95, 70, 0) 70.35%)",
      [BackgroundGradient.GREEN_DARK]:
        "linear-gradient(143.6deg, rgba(110, 231, 183, 0) 20.79%, rgba(16, 185, 129, 0.18) 40.92%, rgba(6, 95, 70, 0) 70.35%)",
      [BackgroundGradient.ORANGE]:
        "linear-gradient(143.6deg, rgba(253, 186, 116, 0) 20.79%, rgba(234, 88, 12, 0.26) 40.92%, rgba(154, 52, 18, 0) 70.35%)",
      [BackgroundGradient.ORANGE_DARK]:
        "linear-gradient(143.6deg, rgba(253, 186, 116, 0) 20.79%, rgba(234, 88, 12, 0.18) 40.92%, rgba(154, 52, 18, 0) 70.35%)",
      [BackgroundGradient.PINK]:
        "linear-gradient(143.6deg, rgba(249, 168, 212, 0) 20.79%, rgba(236, 72, 153, 0.26) 40.92%, rgba(190, 24, 93, 0) 70.35%)",
      [BackgroundGradient.PINK_DARK]:
        "linear-gradient(143.6deg, rgba(249, 168, 212, 0) 33.79%, rgba(236, 72, 153, 0.18) 40.92%, rgba(0, 24, 93, 0) 75.35%)",
      [BackgroundGradient.RED]:
        "linear-gradient(143.6deg, rgba(252, 165, 165, 0) 20.79%, rgba(239, 68, 68, 0.26) 40.92%, rgba(185, 28, 28, 0) 70.35%)",
      [BackgroundGradient.RED_DARK]:
        "linear-gradient(143.6deg, rgba(252, 165, 165, 0) 20.79%, rgba(239, 68, 68, 0.18) 40.92%, rgba(185, 28, 28, 0) 70.35%)",
      [BackgroundGradient.YELLOW]:
        "linear-gradient(143.6deg, rgba(253, 224, 71, 0) 20.79%, rgba(234, 179, 8, 0.26) 40.92%, rgba(161, 98, 7, 0) 70.35%)",
      [BackgroundGradient.YELLOW_DARK]:
        "linear-gradient(143.6deg, rgba(253, 224, 71, 0) 20.79%, rgba(234, 179, 8, 0.18) 40.92%, rgba(161, 98, 7, 0) 70.35%)",
    },
  },
  FONTS: {
    PRIMARY: "geist, sans-serif",
    SIZES: {
      SMALL: "text-sm",
      MEDIUM: "text-base",
      LARGE: "text-3xl md:text-4xl lg:text-6xl",
    },
  },
  SPACING: {
    SECTION: "max-w-screen-xl mx-auto px-4 md:px-8",
    BUTTON: "py-3 px-4",
  },
  BORDERS: {
    ROUNDED: "rounded-full",
  },
  SHADOWS: {
    DEFAULT: "shadow-lg shadow-zinc-800/5",
  },
  ANIMATIONS: {
    HOVER: "hover:bg-transparent/10",
  },
};
