import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    const cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      this.cartItems.push({ product: product, count: 1 });
    }
    this.onProductUpdate(cartItem || this.cartItems[this.cartItems.length - 1]);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);

    if (cartItem) {
      cartItem.count += amount;

      if (cartItem.count <= 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      }
      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();
    modal.setTitle("Your order");

    const modalBodyContent = document.createElement('div');
    
    this.cartItems.forEach(item => {
        modalBodyContent.appendChild(this.renderProduct(item));
    });
    modalBodyContent.appendChild(this.renderOrderForm());

    modal.setBody(modalBodyContent);
    const plusButtons = modalBodyContent.querySelectorAll('.cart-product__increase');
    const minusButtons = modalBodyContent.querySelectorAll('.cart-product__decrease');

    plusButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = button.dataset.productId;
            this.updateProductCount(productId, 1);
        });
    });

    minusButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = button.dataset.productId;
            this.updateProductCount(productId, -1);
        });
    });

    const form = modalBodyContent.querySelector('.cart-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.onSubmit(event);
    });
}

  onProductUpdate(cartItem) {
    this.update();

    if (document.body.classList.contains('is-modal-open')) {
        const modalBody = document.querySelector('.modal__body-inner');

        let productId = cartItem.id;

        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

        if (cartItem.count === 0) {
            modal.close();
            return;
        }

        productCount.innerHTML = cartItem.count;

        productPrice.innerHTML = `€${(cartItem.price * cartItem.count).toFixed(2)}`;

        const totalCost = this.calculateTotalCost();
        infoPrice.innerHTML = `€${totalCost.toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    const formData = new FormData(event.target);

    fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();
    }).then(data => {
        this.handleSuccess();
    }).catch(error => {
        console.error("Error:", error);
    }).finally(() => {
        submitButton.classList.remove('is-loading');
    });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

