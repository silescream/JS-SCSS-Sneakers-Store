import { updateCart } from "./cartSetup.js";
export function cartToggle () {
    const cartButton = document.querySelector(".header__cart-box");
    cartButton.addEventListener("click", () => {
        updateCart();
      });
}