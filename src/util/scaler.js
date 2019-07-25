import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 1280;
const guidelineBaseHeight = 800;

console.log("width: " + width, "height: " + height);

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
