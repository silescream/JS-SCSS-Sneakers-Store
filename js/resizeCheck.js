import { burgerToggle } from "./burgerToggle.js";

export const resizeCheck = bufferResizeCheck();

function bufferResizeCheck() {
  let isShown = false;
  return function check() {
    if (document.documentElement.clientWidth < 530 && !isShown ) {
        burgerToggle();
        isShown = true;
    } else if (document.documentElement.clientWidth > 530 && isShown){
        document.querySelector(".hamburger").remove();
        isShown = false;
    }
  };
}
