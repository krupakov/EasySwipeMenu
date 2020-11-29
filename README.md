# EasySwipeMenu
Swipe menu for your website

[Live demo](https://krupakov.github.io/EasySwipeMenu/)

So, I wrote this small script for my mini-project and decided to upload it to github. You can use it however you like.

You just need to connect it to the page, create an instance of the class and pass the html menu element and button element as parameters:

```js
const menu = new EasySwipeMenu({
    menu: document.querySelector('#menu'),
    menuButton: document.querySelector('#button')
})
```

NOTE: both elements must have an id field.

You can override 5 class methods (optional):

```js
menu.enableIfTrue = (event) => {
  /* Your condition */
  const condition = true && true
  
  if (condition) {
    return true
  }
  
  return false
}

menu.onSwipeStart = () => {
  console.log('Started.')
}

menu.onSwipeEnd = () => {
  console.log('Finished.')
}

menu.onOpened = () => {
  console.log('Menu opened.')
}

menu.onClosed = () => {
  console.log('Menu closed.')
}
```

And there is some more, but they are also optional:

```js
const menu = new EasySwipeMenu({
  menu: document.querySelector('#menu'),
  menuButton: document.querySelector('#button'),
  menuWidth: '80%', // %
  maxMenuWidth: '300px', // any
  timingFunction: 'ease',
  transitionProperty: 'transform',
  transitionDuration: 300 // ms
})
```
