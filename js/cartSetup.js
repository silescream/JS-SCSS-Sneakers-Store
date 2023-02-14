const cartCounter = document.querySelector('.header__cart-counter');
const counterCircle = document.querySelector('.header__cart-circle');
const body = document.querySelector('body');

let cart = JSON.parse(localStorage.getItem("CART")) || [];

export function addToCart (id, products) {
    if(cart.some(item => item.id === id)){
        changeCounter('plus', id);
    } else {
        const item = products.find((product) => product.id === id);
        cart.push({
            ...item,
            counter: 1
        });
    }

    updateCart();

}

export function removeItemFromCart (id) {
    cart = cart.filter(e => e.id !== id);
}

 export function updateCart() {
    cartRender ()
    renderTotalItems();
    localStorage.setItem("CART", JSON.stringify(cart));
}

export function cartRender () {
    if(body.querySelector('.shopping-cart')) {
        body.querySelector('.shopping-cart').remove();
    }
    let cartingShop = document.createElement('div');
    cartingShop.classList.add('shopping-cart');
    cartingShop.innerHTML = `  <div class="shopping-cart__close-button">
                        <a href="#" class="shopping-cart__cross"></a>
                        </div>
                        <div class="shopping-cart__title">Your Bag</div>
                        <div class="shopping-cart__content"></div>
                        <div class="shopping-cart__total">Total: 0$</div>
                        <button type="button" class="shopping-cart__checkout">CHECKOUT</button>`;
    body.append(cartingShop);
    const cartClose = document.querySelector(".shopping-cart__close-button");
    cartClose.addEventListener("click", () => {
        cartingShop.remove();
    }); 
    const shoppingCartTotalSum = document.querySelector('.shopping-cart__total');
    renderCartItems (cart);
    renderTotal(shoppingCartTotalSum);
}
export function renderCartItems (cart) {
    let shoppingCartContent = document.querySelector('.shopping-cart__content');
    shoppingCartContent.innerHTML = "";
    cart.forEach(e => {
        let item = document.createElement('div');
        item.classList.add('shopping-cart__card');
        item.innerHTML = `  <div class="shopping-cart__card-content">
                            <img src="${e.fields.image}" alt="" class="shopping-cart__card-image">
                            <div class="shopping-cart__text-content">
                                <div class="shopping-cart__card-title">${e.fields.name}</div>
                                <div class="shopping-cart__card-price">${e.fields.price}$</div>
                                <div class="shopping-cart__card-remove">remove</div>
                            </div>
                            </div>    
                            <div class="shopping-cart__counter">
                                <span class ="shopping-cart__arrow-up">	&and;</span>
                                <span class ="shopping-cart__counter-num">${e.counter}</span>
                                <span class ="shopping-cart__arrow-down">&or;</span>
                            </div> `;
        shoppingCartContent.append(item);
        const increaseNumButton = item.querySelector('.shopping-cart__arrow-up');
        const decreaseNumButton = item.querySelector('.shopping-cart__arrow-down');
        const removeItem = item.querySelector('.shopping-cart__card-remove');
        increaseNumButton.addEventListener('click', () => {
            changeCounter('plus', e.id);
            updateCart();
        });
        decreaseNumButton.addEventListener('click', () => {
            changeCounter('minus', e.id);
            updateCart();
        });
        removeItem.addEventListener('click', () =>{ 
            removeItemFromCart (e.id);
            updateCart();
            renderTotalItems();
        });
    });
}

export function renderTotal (shoppingCartTotalSum) {
    let totalPrice = 0;
    cart.forEach(item =>{
        totalPrice += item.fields.price * item.counter;
    });

    shoppingCartTotalSum.innerHTML = `Total: ${totalPrice}$`;
}

export function renderTotalItems () {
    let totalItems = 0;
    cart.forEach(item =>{
        totalItems += item.counter;
    });
    if (totalItems !== 0){
        counterCircle.classList.add('show');
    } else {
        counterCircle.classList.remove('show');
    }
    cartCounter.textContent = `${totalItems}`;
}

export function changeCounter(action, id) {
    cart = cart.map((item) =>{
        let counter = item.counter;
        if(item.id === id) {
            if (action === "minus" && counter >= 2){
                counter--;
            } else if (action === "plus"){
                counter++;
            }
        }
       return {...item,
                counter
            };
    });
}