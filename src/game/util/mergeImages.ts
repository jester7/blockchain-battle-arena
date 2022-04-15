export default function mergeImages(urls: string[]) {
  let promises = new Array<Promise<any>>();
  for (let url of urls) {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    promises.push(
      new Promise((resolve, reject) => {
        img.onload = () => {
          resolve(img);
        };
        img.onerror = () => {
          reject(`failed to load ${url}`);
        };
      })
    );
  }
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then((images) => {
        const canvas = document.createElement("canvas");
        const width = images[1].width; // use dimensions of mech suit for final composite image
        const height = images[1].height;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          images.forEach((img, i) => {
            if (i === 0) {
              ctx.drawImage(img, 38, 40); // shift the base NFT image slightly to fit in transparent area
            } else {
              ctx.drawImage(img, 0, 0);
            }
          });
          resolve(ctx.getImageData(0, 0, width, height));
        } else {
          reject();
        }
      })
      .catch((error) => reject(error));
  });
}
