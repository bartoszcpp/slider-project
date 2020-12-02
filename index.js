//define variable
const imgList = document.getElementById("slider");
const childrenImg = [].slice.call(imgList.children);
const btnNext = document.getElementById("next");
const btnPrev = document.getElementById("prev");
const thumbnails = document.getElementById("thumbnails");
const sliderContainer = document.getElementById("slider-container");
const timeContainer = document.getElementById("time");
let counter = 1;
let time = 0;
let setPause = false;

//copy image to display thumbnails
for (let i = 0; i < imgList.children.length; i++) {
  const itm = imgList.children[i];
  const cln = itm.cloneNode(true);
  cln.classList.remove("first-element");
  cln.classList.remove("second-element");
  cln.classList.remove("slider-element");
  thumbnails.appendChild(cln);
}

const childrenThumbnails = [].slice.call(thumbnails.children);
thumbnails.children[0].classList.add("frame");

thumbnails.onclick = function (e) {
  let tgt = e.target,
    i = 0,
    items;
  if (tgt === this) return;
  items = childrenFunc(this);
  while (tgt.parentNode !== this) tgt = tgt.parentNode;
  while (items[i] !== tgt) i++;
  if (i < imgList.children.length - 1) {
    changeSlide(i, i + 1);
    counter = i + 1;
  } else {
    changeSlide(i, 0);
    counter = 0;
  }
  addFrame(i);
};
function childrenFunc(el) {
  let i = 0,
    children = [],
    child;
  while ((child = el.childNodes[i++])) {
    if (child.nodeType === 1) children.push(child);
  }
  return children;
}

btnNext.onclick = function () {
  nextElement();
};

btnPrev.onclick = function () {
  prevElement();
};

const nextElement = () => {
  if (counter < imgList.children.length - 1) {
    changeSlide(counter, counter + 1);
    counter = counter + 1;
  } else {
    changeSlide(counter, 0);
    counter = 0;
  }
};

const prevElement = () => {
  if (counter > 1) {
    changeSlide(counter - 2, counter - 1);
    counter = counter - 1;
  } else if (counter === 1) {
    lastIndex = imgList.children.length - 1;
    changeSlide(lastIndex, counter - 1);
    counter = 0;
  } else {
    changeSlide(lastIndex - 1, lastIndex);
    counter = imgList.children.length - 1;
  }
};

const changeSlide = (index1, index2) => {
  time = 0;
  childrenImg.forEach((slide) => {
    slide.classList.remove("first-element");
    slide.classList.remove("second-element");
  });
  addFrame(index1);
  imgList.children[index1].classList.add("first-element");
  imgList.children[index2].classList.add("second-element");
};

//add border to clicked thumbnails
const addFrame = (index) => {
  childrenThumbnails.forEach((slide) => {
    slide.classList.remove("frame");
  });
  thumbnails.children[index].classList.add("frame");
};

//interval function
window.setInterval(function () {
  console.log(setPause);
  if (!setPause) {
    time++;
    timeContainer.innerHTML = 5 - time;
    if (time === 5) {
      nextElement();
      time = 0;
    }
  }
}, 1000);

//stop timer when mouse is hover on element
sliderContainer.addEventListener(
  "mouseover",
  () => {
    setPause = true;
    time = 0;
  },
  false
);

sliderContainer.addEventListener(
  "mouseleave",
  () => {
    setPause = false;
  },
  false
);
