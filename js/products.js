import { fetchProducts } from "./fetchproducts.js";
import { addToCart } from "./cartSetup.js";
import { cartToggle } from "./cartToggle.js";
import { renderTotalItems } from "./cartSetup.js";
import { resizeCheck } from "./resizeCheck.js";

const productsContent = document.querySelector(".content-section__content");
const productsFilter = document.querySelectorAll(
  ".content-section__filter-name"
);
const sliderValue = document.querySelector(".content-section__value");
const slider = document.querySelector(".content-section__range");
const searchInput = document.querySelector(".content-section__input");

let content = [];

const init = async () => {
  const products = await fetchProducts();
  getArray(products);
  renderProductItems(products);
};

init();
renderTotalItems();
window.addEventListener("resize", resizeCheck);
resizeCheck();
cartToggle();

productsFilter.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.textContent == "All") {
      renderProductItems(content);
    } else {
      let filteredArray = content.filter(
        (item) => e.target.textContent == item.fields.company
      );
      renderProductItems(filteredArray);
    }
  });
});

slider.addEventListener("input", (e) => {
  sliderValue.innerHTML = "$" + e.target.value;
  let filteredArray = content.filter(
    (item) => e.target.value >= item.fields.price
  );
  renderProductItems(filteredArray);
});

searchInput.addEventListener("input", (e) => {
  let filteredArray = content.filter((item) =>
    item.fields.company.toLowerCase().startsWith(e.target.value.toLowerCase())
  );
  renderProductItems(filteredArray);
});

function renderProductItems(products) {
  productsContent.innerHTML = "";
  products.forEach((e) => {
    let item = document.createElement("div");
    item.classList.add("card");
    item.innerHTML = `<img src="${e.fields.image}" alt="${e.fields.name}" class="card__img">
                              <div class="card__shopping-cart white">
                                    <img src="img/cart-fill-white.svg" alt="carting-shop-icon" class="card__cart-icon">
                              </div>
                              <div class="card__description">${e.fields.name}</div>
                              <div class="card__price">${e.fields.price}$</div>`;
    productsContent.append(item);
    const addToCartButton = item.querySelector(".card__shopping-cart");
    addToCartButton.addEventListener("click", () => {
      addToCart(e.id, products);
    });
  });
}

function getArray(data) {
  content = data.map((e) => {
    return e;
  });
}
