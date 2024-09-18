export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.updateSlider();
    this.elem.addEventListener('click', this.onClick.bind(this));
  }
  render () {
    const slider = document.createElement('div');
    slider.className = 'slider';
    const thumb = document.createElement('div');
    thumb.className = 'slider__thumb';
    const valueSpan = document.createElement('span');
    valueSpan.className = 'slider__value';
    thumb.appendChild(valueSpan);
    slider.appendChild(thumb);
    const progress = document.createElement('div');
    progress.className = 'slider__progress';
    slider.appendChild(progress);
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'slider__steps';
    for (let i = 0; i < this.steps; i++) {
    const step = document.createElement('span');
    stepsContainer.appendChild(step);
    }
    slider.appendChild(stepsContainer);
    return slider;
  }
  
  updateSlider() {
  const thumb = this.elem.querySelector('.slider__thumb');
  const progress = this.elem.querySelector('.slider__progress');
  const valueSpan = this.elem.querySelector('.slider__value');
  const stepsContainer = this.elem.querySelector('.slider__steps');
  valueSpan.textContent = this.value;
  const leftPercents = (this.value / (this.steps - 1)) * 100;
  thumb.style.left = `${leftPercents}%`;
  progress.style.width = `${leftPercents}%`;
  const activeStep = stepsContainer.querySelector('.slider__step-active');
  if (activeStep) {
  activeStep.classList.remove('slider__step-active');
  }
  stepsContainer.children[this.value].classList.add('slider__step-active');
  this.elem.dispatchEvent(new CustomEvent('slider-change', {
  detail: this.value,
  bubbles: true
}));
  }
  onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const newStep = Math.round(leftRelative * (this.steps - 1));
    if (this.value !== newStep) {
      this.value = newStep;
      this.updateSlider();
  }
  }
}
