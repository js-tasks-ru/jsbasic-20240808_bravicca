import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.hasItemsInCart() && this.isVisible()) {
      const scrollY = window.scrollY || window.pageYOffset;
      const iconHeight = this.iconElement.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      if (scrollY + iconHeight > windowHeight) {
        const containerRect = this.containerElement.getBoundingClientRect();
        const containerRightOffset = containerRect.right + window.scrollX;
        const newTop = Math.max(50, scrollY + 50) + 'px';
        const newRight = Math.min(containerRightOffset + 20, window.innerWidth - 10) + 'px';

        this.iconElement.style.position = 'fixed';
        this.iconElement.style.top = newTop;
        this.iconElement.style.right = newRight;
        this.visible = true;
    } else if (this.visible) {
        this.resetPosition();
    }
} else if (this.visible) {
    this.resetPosition();
}
}

resetPosition() {
this.iconElement.style.position = '';
this.iconElement.style.top = '';
this.iconElement.style.right = '';
this.visible = false;
}

hasItemsInCart() {
return true;
}

isVisible() {
return document.documentElement.offsetHeight > 0 && document.documentElement.offsetWidth > 0;
}

addEventListeners() {
window.addEventListener('scroll', this.updatePosition.bind(this));
window.addEventListener('resize', this.updatePosition.bind(this));
}
  }
