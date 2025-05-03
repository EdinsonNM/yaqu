export const fitImageCover = (
  img: any,
  containerWidth: any,
  containerHeight: any
) => {
  if (!img)
    return { width: containerWidth, height: containerHeight, x: 0, y: 0 };

  const imgAspect = img.width / img.height;
  const containerAspect = containerWidth / containerHeight;

  let width, height, x, y;

  if (imgAspect > containerAspect) {
    width = (img.width * containerHeight) / img.height;
    height = containerHeight;
    x = -(width - containerWidth) / 2;
    y = 0;
  } else {
    width = containerWidth;
    height = (img.height * containerWidth) / img.width;
    x = 0;
    y = -(height - containerHeight) / 2;
  }

  return { width, height, x, y };
};
