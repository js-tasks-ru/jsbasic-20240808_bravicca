import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
  }
  createProductCard() {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${this.product.image}" alt="${this.product.name}" />
      <h2>${this.product.name}</h2>
      <p>Price: $${this.product.price}</p>
    `;
    return card;
  }
}

class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.createGrid();
    this.renderProducts(products);
  }

  createGrid() {
    const grid = document.createElement('div');
    grid.className = 'products-grid';
    
    const innerGrid = document.createElement('div');
    innerGrid.className = 'products-grid__inner';
    grid.appendChild(innerGrid);

    return grid;
  }

  renderProducts(productsToRender) {
    const innerGrid = this.elem.querySelector('.products-grid__inner');
    innerGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
      const productCard = new ProductCard(product);
      innerGrid.appendChild(productCard.elem);
    });
  }

  updateFilter(filters) {

    this.filters = { ...this.filters, ...filters };

    let filteredProducts = this.products;

    if (this.filters.noNuts) {
      filteredProducts = filteredProducts.filter(product => !product.nuts);
    }
    if (this.filters.vegeterianOnly) {
      filteredProducts = filteredProducts.filter(product => product.vegeterian);
    }
    if (typeof this.filters.maxSpiciness === 'number') {
      filteredProducts = filteredProducts.filter(product => (product.spiciness ?? 0) <= this.filters.maxSpiciness);
    }
    if (this.filters.category && this.filters.category !== '') {
      filteredProducts = filteredProducts.filter(product => product.category === this.filters.category);
    }
    this.renderProducts(filteredProducts);
  }
}