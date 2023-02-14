import { renderTotalItems } from "./cartSetup.js";
import { fetchProducts } from "./fetchproducts.js";
import { renderFeaturedItems } from "./renderFeaturedItems.js";
import { cartToggle } from "./cartToggle.js";
import { resizeCheck } from "./resizeCheck.js";

const init = async () => {
  const products = await fetchProducts();
  renderFeaturedItems(products);
};

cartToggle();
renderTotalItems();
window.addEventListener("resize", resizeCheck);
resizeCheck(); 
init();
