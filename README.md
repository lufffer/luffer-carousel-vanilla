# Luffer Carousel Vanilla

## Try

```
git clone https://github.com/lufffer/luffer-carousel-vanilla.git
npm run dev
```

## Install

```
npm i luffer-carousel-vanilla
```

## Usage

```
import 'luffer-carousel-vanilla/dist/main.css'
import Carousel from 'luffer-carousel-vanilla'
import image from './image.jpg'

const data = ["path 1", "path 2", image, "path 4"]
const config = {
    class: "carousel",
    buttons: true,
    indicators: true,
    dragging: true,
    draggingMobile: true
}

document.body.appendChild(new Carousel(data, config).getCarousel())
```

The constructor receives two parameters, an array of strings, where you
cat put the value for the src attribute of an img tag, and a configuration
object where you can pass a class for the most extern div which wrap the whole carousel,
a buttons property which is a boolean that allows you to add buttons
to move to the next and previous image in the carousel,
an indicators property to allows you to move to any image in the carousel
and dragging properties to enable dragging when using touchscreen or a mouse.
The getCarousel method returns the carousel.
By default when you import the main.css file, it adds a class with the next properties

```
.carousel {
    position: relative;
    width: 50%;
    height: 75%;
    overflow: hidden;
}
```

### config

```
// Default values
const config = {
    class: "carousel",
    buttons: true,
    indicators: true,
    dragging: true,
    draggingMobile: true
}
```

## Note

I will keep this carousel updated and I will add more features if necessary, take a look at the src/index.ts folder to see an example
