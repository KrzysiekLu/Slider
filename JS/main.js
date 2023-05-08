const slideContainer = document.querySelector(".slider__container");
const sliderDotsContainet = document.querySelector(".slider__dots");
const btnPrev = document.querySelector(".prev-btn");
const btnNext = document.querySelector(".next-btn");
const sliderNav = document.querySelectorAll(".slider__nav-btn");

const generateSrc = function (numOfSlides) {
  let SrcArr = [];
  for (let i = 1; i <= numOfSlides; i++) {
    SrcArr.push(`../images/box-${i}.jpg`);
  }
  return SrcArr;
};

const createSlides = (numOfSlides) => {
  generateSrc(numOfSlides).forEach((slide) => {
    const slideBox = document.createElement("img");
    slideBox.src = slide;
    slideContainer.appendChild(slideBox);
  });
};
const createDots = (numOfSlides) => {
  let dots = [];
  for (let i = 0; i <= numOfSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider__dot");
    sliderDotsContainet.appendChild(dot);
    dots.push(dot);
  }
  dots[0].classList.add("active");
};
const removeActiveDotState = () => {
  const dots = document.querySelectorAll(".slider__dot");
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
};
const addActiveDotState = (activeDot) => {
  const dots = document.querySelectorAll(".slider__dot");
  dots[activeDot].classList.add("active");
};

const changeSlides = (numOfSlides) => {
  let pos = 0;
  let isAnimateing = false;

  sliderNav.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeActiveDotState();
      addActiveDotState(pos + 1);

      if (e.target.dataset.dir === "next" && !isAnimateing) {
        pos++;
        if (pos === numOfSlides) {
          pos = 0;
        }
        const slides = document.querySelectorAll(".slider__container img");
        slides.forEach((slide, index) => {
          slide.style.transform = `translateX(${-pos * 100}%)`;
        });

        isAnimateing = true;
        setTimeout(() => {
          isAnimateing = false;
        }, 300);
      } else if (e.target.dataset.dir === "prev" && !isAnimateing) {
        pos--;
        if (pos === -1) {
          pos = numOfSlides - 1;
        }
        const slides = document.querySelectorAll(".slider__container img");
        slides.forEach((slide, index) => {
          slide.style.transform = `translateX(${-pos * 100}%)`;
        });
        isAnimateing = true;
        setTimeout(() => {
          isAnimateing = false;
        }, 300);
      }
    });
  });
};
const init = (numOfSlides) => {
  createSlides(numOfSlides);
  changeSlides(numOfSlides);
  createDots(numOfSlides);
};
init(5);
