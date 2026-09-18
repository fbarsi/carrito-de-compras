import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// numButton
const BUTTON_PADDING = 8;
const BUTTON_WIDTH = (Math.round(width / 10) * 10 - BUTTON_PADDING * 5) / 4;
const BUTTON_HEIGHT = BUTTON_WIDTH - 25;

// itemModal
const MODAL_INPUT_FULL_WIDTH = Math.round(width / 10) * 10 - 115;
const MODAL_INPUT_PADDING = 24;
const MODAL_INPUT_HALF_WIDTH =
  (MODAL_INPUT_FULL_WIDTH - MODAL_INPUT_PADDING) / 2;

export {
  BUTTON_HEIGHT,
  BUTTON_PADDING,
  BUTTON_WIDTH,
  MODAL_INPUT_FULL_WIDTH,
  MODAL_INPUT_HALF_WIDTH,
  MODAL_INPUT_PADDING
};

