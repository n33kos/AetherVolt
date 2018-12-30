export default (point, rectPos, rectDim) => {
  return (rectPos.x <= point.x && point.x <= rectPos.x + rectDim.x
    && rectPos.y <= point.y && point.y <= rectPos.y + rectDim.y);
}
