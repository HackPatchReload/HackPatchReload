// Credit for Pre-existing code goes to
// https://github.com/chaseottofy
// 
// ADAPTED from codepen -> https://codepen.io/chaseottofy/pen/PodxKpp
// All credit goes to the original creator
// Special thanks for making this website possible!

const animate = (e) => {
  if (e.target.getAttribute("data-filling") === "true") return;
  
  e.target.setAttribute("data-filling", "true");

  const fillmode = "both";

  const text = e.target.getAttribute("data-text");
  const len = text.length;
  const randomArr = Array.from({ length: len }, (_, i) => text[i] === " " ? "_" : ['X', '$', 'Y', '#', '?', '*', '0', '1', '+'][Math.floor(Math.random() * 9)]
  );
  const isEven = len % 2 === 0;
  for (let i = 0; i < len; i++) {
    setTimeout(() => {
      if (i === len - 1) e.target.setAttribute("data-filling", "false");
      if (fillmode === "forwards" || (fillmode === "both" && i % 2 === 0)) {
        randomArr.splice(i, 1, text[i]); 
      } else {
        // runs only if fillmode is "both" and i is odd;
        randomArr.splice(
          isEven ? len - i : len - i - 1,
          1,
          isEven ? text[len - i] : text[len - i - 1]
        );
      }
      e.target.textContent = randomArr.join("");
    }, (i + 1) * 40);
  }
};


const setGlitch = (elements, onInit = true) => {
  elements.forEach((el, idx) => {
    el.setAttribute("data-text", el.textContent);
    el.setAttribute("data-filling", "false");
    el.getAttribute("data-event-type") === "click"
      ? el.onclick = animate
      : el.onmouseover = animate;

    // animate on window load
    if (onInit) {
      setTimeout(() => {
        animate({ target: el });
      }, idx * 80);
    }
  });
};


const init = () => { 
  setGlitch(document.querySelectorAll(".ribbon-button")); 
  setGlitch(document.querySelectorAll(".animated-text"));
  setGlitch(document.querySelectorAll(".animated-button"));
};

init();