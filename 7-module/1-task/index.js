import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.ribbonInner = this.elem.querySelector(".ribbon__inner");
    this.updateArrowsVisibility();
    this.elem.querySelector(".ribbon__arrow_right").addEventListener("click", () => {
      this.scrollRight();
  });
  this.elem.querySelector(".ribbon__arrow_left").addEventListener("click", () => {
    this.scrollLeft();
  });
  this.ribbonInner.addEventListener("scroll", () => {
    this.updateArrowsVisibility ();
  });
  this.ribbonInner.addEventListener("click", (event) => {
    this.onCategoryClick (event) 
  });
  }
  render () {
    const ribbon = document.createElement("div");
    ribbon.className = "ribbon";
    const arrowLeft = document.createElement("button");
    arrowLeft.className = "ribbon__arrow ribbon__arrow_left";
    arrowLeft.innerHTML = "&laquo;";
    arrowLeft.classList.remove("ribbon__arrow_visible");
    ribbon.appendChild(arrowLeft);
    const ribbonInner = document.createElement("div");
    ribbonInner.className = "ribbon__inner";
    for (const category of this.categories) {
      const item = document.createElement ("a");
      item.href = "#";
      item.className = "ribbon__item";
      item.dataset.id = category.id;
      item.textContent = category.name;
      ribbonInner.appendChild(item);
    }
    ribbon.appendChild(ribbonInner);
    const arrowRigt = document.createElement("button");
    arrowRight.className = "ribbon__arrow ribbon__arrow_right";
    arrowRigt.innerHTML = "&raquo;";
    ribbon.appendChild(arrowRight);
    return ribbon;
    }
    scrollRight() {
      this.ribbonInner.scrollBy(350, 0);
    }
    scrollLeft() {
      this.ribbonInner.scrollBy(-350, 0);
    }
    updateArrowsVisibility() {
      const scrollLeft = this.ribbonInner.scrollLeft;
      const scrollWidth = this.ribbonInner.scrollWidth;
      const clientWidth = this.ribbonInner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      const arrowLeft = this.elem.querySelector(".ribbon__arrow_left");
      const arrowRight = this.elem.querySelector(".ribbon__arrow_right");
      if (scrollLeft > 0) {
        arrowLeft.classList.add("ribbon__arrow_visible");
      } else {
        arrowLeft.classList.remove("ribbon__arrow_visible")
      }
      if (scrollRight > 0) {
        arrowRight.classList.add("ribbon__arrow_visible");
      } else {
        arrowRight.classList.remove("ribbon__arrow_visible");
      }
    }
    onCategoryClick(event) {
      const target = event.target;
      if (target.classList.contains ("ribbon__item") ) {
        event.preventDefault();
        const activeItem = this.elem.querySelector(".ribbon__item_active");
        if (activeItem) {
          activeItem.classList.remove("ribbon__item_active");
        }
        target.classList.add("ribbon__item_active");
        const categoryId = target.dataset.id;
        const eventSelect = new CustomEvent("ribbon-select", {
          detail:{
            id: categoryId,
          },
          bubbles:true,
        });
        this.elem.dispatchEvent(eventSelect);
      }
    }
}
