import * as blendingModes from 'constants/blendingModes';

const filterPixelData = (blendingMode, color, pixelData) => {
  switch (blendingMode) {
    case blendingModes.ADD:
      return [
        pixelData[0] += parseInt(color.x, 10),
        pixelData[1] += parseInt(color.y, 10),
        pixelData[2] += parseInt(color.z, 10),
        pixelData[3],
      ];

    case blendingModes.SUBTRACT:
      return [
        pixelData[0] -= parseInt(color.x, 10),
        pixelData[1] -= parseInt(color.y, 10),
        pixelData[2] -= parseInt(color.z, 10),
        pixelData[3],
      ];

    case blendingModes.MULTIPLY:
      return [
        pixelData[0] *= parseInt(color.x, 10),
        pixelData[1] *= parseInt(color.y, 10),
        pixelData[2] *= parseInt(color.z, 10),
        pixelData[3],
      ];

    case blendingModes.DIVIDE:
      return [
        pixelData[0] /= parseInt(color.x, 10),
        pixelData[1] /= parseInt(color.y, 10),
        pixelData[2] /= parseInt(color.z, 10),
        pixelData[3],
      ];

    default:
      return [
        pixelData[0],
        pixelData[1],
        pixelData[2],
        pixelData[3],
      ];
  }
}

export default (image, color, blendingMode) => {
  if (image.width < 1) return image;

  // Create offscreen canvas
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Render image to canvas
  canvas.width = image.width;
  canvas.height = image.height;
  context.canvas.width = image.width;
  context.canvas.height = image.height;
  context.drawImage(image, 0, 0);

  // Get image data from offscreen canvas
  const imageData = context.getImageData(0, 0, image.width, image.height);

  for(let i = 0; i < imageData.data.length; i += 4){
    // skip transparent / semiTransparent pixels
    if(imageData.data[i + 3] < 230) continue;

    const pixelData = filterPixelData(
      blendingMode,
      color,
      [
        imageData.data[i + 0],
        imageData.data[i + 1],
        imageData.data[i + 2],
        imageData.data[i + 3],
      ],
    );

    imageData.data[i + 0] = pixelData[0];
    imageData.data[i + 1] = pixelData[1];
    imageData.data[i + 2] = pixelData[2];
  }

  // Write image data back to canvas then source it in a new image
  context.putImageData(imageData, 0, 0);
  const newImage = new Image();
  newImage.src = canvas.toDataURL();

  return newImage;
}
