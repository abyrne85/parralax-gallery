NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const IMAGE_COUNT = 16;
let MIN_IMAGE_WIDTH_IN_PERCENTAGE;
let MAX_IMAGE_WIDTH_IN_PERCENTAGE;
let MIN_IMAGE_MARGIN_IN_PIXELS = 10;
let MAX_IMAGE_MARGIN_IN_PIXELS;
let MIN_ANIMATION_SPEED = 20;
let MAX_ANIMATION_SPEED = 5;

let images;

const getContainerSize = () => {
  const parralaxContainerSize = document
    .getElementById("parralax")
    .getBoundingClientRect();

  if (parralaxContainerSize.width > 800) {
    MIN_IMAGE_WIDTH_IN_PERCENTAGE = 25;
    MAX_IMAGE_WIDTH_IN_PERCENTAGE = 32;
    MAX_IMAGE_MARGIN_IN_PIXELS = 200;
  } else if (parralaxContainerSize.width > 500) {
    MIN_IMAGE_WIDTH_IN_PERCENTAGE = 40;
    MAX_IMAGE_WIDTH_IN_PERCENTAGE = 49;
    MAX_IMAGE_MARGIN_IN_PIXELS = 150;
  } else if (parralaxContainerSize.width < 500) {
    MIN_IMAGE_WIDTH_IN_PERCENTAGE = 90;
    MAX_IMAGE_WIDTH_IN_PERCENTAGE = 90;
    MAX_IMAGE_MARGIN_IN_PIXELS = 50;
  }
};

const createImageArray = () => {
  const imagesUrls = [];
  for (let i = 0; i < IMAGE_COUNT; i++) {
    imagesUrls.push(`./images/${i + 1}.png`);
  }
  return imagesUrls;
};

const createImagesInDOM = () => {
  const container = document.getElementById("parralax");
  images.map(image => {
    const img = document.createElement("img");
    img.src = image;
    img.className = "parralax-img";
    container.appendChild(img);
  });
};

const positionImages = () => {
  const images = document.getElementsByClassName("parralax-img");
  for (let image of images) {
    image.style.width = `${getRandomInt(
      MIN_IMAGE_WIDTH_IN_PERCENTAGE,
      MAX_IMAGE_WIDTH_IN_PERCENTAGE
    )}%`;
    image.style.marginTop = `${getRandomInt(
      MIN_IMAGE_MARGIN_IN_PIXELS,
      MAX_IMAGE_MARGIN_IN_PIXELS
    )}px`;
  }
};

getImagesInView = () => {
  const parralaxRect = document
    .getElementById("parralax")
    .getBoundingClientRect();
  const imagesInView = document.getElementsByClassName("parralax-img");
  for (let image of imagesInView) {
    const imageRect = image.getBoundingClientRect();
    if (
      imageRect.top > parralaxRect.top &&
      imageRect.bottom < parralaxRect.bottom
    ) {
      const randomAnimationSpeed =
        getRandomInt(MIN_ANIMATION_SPEED, MAX_ANIMATION_SPEED) / 10;
      image.style.marginTop = `${MIN_IMAGE_MARGIN_IN_PIXELS}px`;
      image.style.transition = `all ${randomAnimationSpeed}s ease`;
    }
  }
};
function init() {
  getContainerSize();
  images = createImageArray();
  createImagesInDOM();
  positionImages();
}
init();

(function() {
  document.getElementById("parralax").addEventListener("scroll", () => {
    getImagesInView();
  });
  window.addEventListener("resize", () => {
    document.querySelectorAll(".parralax-img").forEach(e => e.remove());
    init();
  });
})();
