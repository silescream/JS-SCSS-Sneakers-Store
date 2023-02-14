import { addToCart } from "./cartSetup.js";
export function renderFeaturedItems(products) {
    const featuredContent = document.querySelector(".featured-section__content");
    products = products.filter((e) => e.fields.featured);
    products.forEach((e) => {
      let item = document.createElement("div");
      item.classList.add("card");
      item.innerHTML = `<img src="${e.fields.image}" alt="${e.fields.name}" class="card__img">
                                <div class="card__shopping-cart">
                                      <img src="img/cart-fill-white.svg" alt="carting-shop-icon" class="card__cart-icon">
                                </div>
                                <div class="card__description">${e.fields.name}</div>
                                <div class="card__price">${e.fields.price}$</div>`;
      featuredContent.append(item);
      const addToCartButton = item.querySelector(".card__shopping-cart");
      addToCartButton.addEventListener("click", () => {
        addToCart(e.id, products);
      });
    });
  }