import styles from './default.module.css';
import defaultConfig from './config/config';
import leftButton from './assets/chevron left.svg';
import rightButton from './assets/chevron right.svg';

type Data = {
  image: string;
};

type Config = {
  class?: string;
  buttons: boolean;
  draggable: boolean;
  indicators: boolean;
};

interface Carousel {
  getCarousel: () => HTMLDivElement;
}

export default class LufferCarouselVanilla implements Carousel {
  private data: Array<Data>;
  private config: Config;
  private $carousel: HTMLDivElement = document.createElement('div');
  private $slider: HTMLDivElement = document.createElement('div');
  private current: number = 0;

  constructor(data: Array<Data>, config: Config) {
    this.data = data;
    this.config = { ...defaultConfig, ...config };
  }

  // Creates an empty carousel and returns it
  private createCarousel = (): void => {
    this.$carousel.setAttribute('class', this.config.class || styles.carousel);
    this.$slider.setAttribute('class', styles.slider);
    this.$carousel.appendChild(this.$slider);
  };

  // Creates an image and returns it
  private createImage = (image: string): HTMLImageElement => {
    const $IMAGE = new Image();
    $IMAGE.setAttribute('src', image);
    $IMAGE.setAttribute('class', styles.image);
    $IMAGE.setAttribute('draggable', 'false');
    return $IMAGE;
  };

  // Creates a carousel button and returns it
  private createButton = (pos: string): HTMLImageElement => {
    const $BUTTON = document.createElement('img');
    $BUTTON.setAttribute('src', pos === 'L' ? leftButton : rightButton);
    $BUTTON.setAttribute('alt', pos === 'L' ? 'previous' : 'next');
    $BUTTON.setAttribute(
      'class',
      pos === 'L' ? styles['left-button'] : styles['right-button'],
    );
    return $BUTTON;
  };

  // Creates a wrapper for indicators and returns it
  private createIndicators = (): HTMLDivElement => {
    const $INDICATORS = document.createElement('div');
    $INDICATORS.setAttribute('class', styles.indicators);
    return $INDICATORS;
  };

  // Creates an indicator and returns it
  private createIndicator = (i: number): HTMLDivElement => {
    const $INDICATOR = document.createElement('div');
    $INDICATOR.setAttribute('class', styles.indicator);
    $INDICATOR.setAttribute('data-pos', `${i}`);
    $INDICATOR.addEventListener('click', this.moveTo);
    return $INDICATOR;
  };

  // Add Buttons to the carousel
  private addButtons = (): void => {
    const $BUTTONLEFT = this.createButton('L');
    const $BUTTONRIGHT = this.createButton('R');
    this.$carousel.appendChild($BUTTONLEFT);
    this.$carousel.appendChild($BUTTONRIGHT);
    $BUTTONLEFT.addEventListener('click', this.previous);
    $BUTTONRIGHT.addEventListener('click', this.next);
  };

  // Add indicators for the carousel
  private addIndicators = (): void => {
    const $INDICATORS = this.createIndicators();
    this.$carousel.appendChild($INDICATORS);
    for (let i = 0; i < this.data.length; ++i) {
      const $INDICATOR = this.createIndicator(i);
      $INDICATORS.appendChild($INDICATOR);
    }
  };

  // Add images to the carousel
  private addImages = (): void => {
    this.data.map((data) => {
      this.$slider.appendChild(this.createImage(data.image));
    });
  };

  // Enable dragging in carousel
  private addDraggable = (): void => {
    let dragstart = 0;
    let dragend = 0;
    this.$slider.addEventListener('mousedown', (e) => (dragstart = e.clientX));
    this.$slider.addEventListener('mouseup', (e) => {
      dragend = e.clientX;
      const dragdiff = dragend - dragstart;
      if (dragdiff > 0 && dragdiff > 25) {
        this.previous();
      } else if (dragdiff < 0 && dragdiff < -25) {
        this.next();
      }
    });
  };

  // Moves to next image
  private next = (): void => {
    if (this.current === this.data.length - 1) return;
    ++this.current;
    this.move();
  };

  // Moves to previous image
  private previous = (): void => {
    if (this.current === 0) return;
    --this.current;
    this.move();
  };

  // Update the current position to the position of the image which matches the clicked indicator's position and moves to it
  private moveTo = (e: MouseEvent): void => {
    this.current = parseInt((e.target as HTMLDivElement).dataset.pos!);
    this.move();
  };

  // Moves to the image in the position that matches the clicked indicator's position
  private move = (): void => {
    this.$slider.style.transform = `translateX(-${this.$carousel.clientWidth * this.current
    }px)`;
  };

  // Returns a new carousel
  public getCarousel = (): HTMLDivElement => {
    this.createCarousel();
    this.addImages();
    if (this.config.buttons) this.addButtons();
    if (this.config.indicators) this.addIndicators();
    if (this.config.draggable) this.addDraggable();
    return this.$carousel;
  };
}
