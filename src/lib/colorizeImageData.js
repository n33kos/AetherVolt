export default (image, color) => {
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

  // Get image data form offscreen canvas
  const imageData = context.getImageData(0, 0, image.width, image.height);

  for(let i = 0; i < imageData.data.length; i += 4){
    // skip transparent / semiTransparent pixels
    if(imageData.data[i+3] < 230) continue;

    // We can add blending modes later
    imageData.data[i+0] += parseInt(color.x, 10);
    imageData.data[i+1] += parseInt(color.y, 10);
    imageData.data[i+2] += parseInt(color.z, 10);
  }

  // Write image data back to canvas then source it in a new image
  context.putImageData(imageData, 0, 0);
  const newImage = new Image();
  newImage.src = canvas.toDataURL();

  return newImage;
}
