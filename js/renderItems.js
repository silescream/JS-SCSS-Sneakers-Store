export function renderProductItems(products) {
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