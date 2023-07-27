import './global.css';
import LufferCarouselVanilla from './luffer-carousel-vanilla';
import data from './data/data';
import config from './config/config';

document.body.appendChild(
  new LufferCarouselVanilla(data, config).getCarousel(),
);
