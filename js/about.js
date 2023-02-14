import { cartToggle } from "./cartToggle.js";
import { renderTotalItems } from "./cartSetup.js";
import { resizeCheck } from "./resizeCheck.js";

renderTotalItems();
cartToggle();
resizeCheck();
window.addEventListener("resize", resizeCheck);
