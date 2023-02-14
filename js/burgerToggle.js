export function burgerToggle () {
    let burger = document.createElement('div');
    burger.classList.add('hamburger');
    burger.innerHTML = `<span></span>
                        <span></span>
                        <span></span>`;
    document.querySelector('.header').prepend(burger);
    const hamburgerButton = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    hamburgerButton.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburgerButton.classList.toggle("active");
      });
};