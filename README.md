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

You also can override 3 class methods:

```js
menu.enableIfTrue = () => {
  const condition = true && true
  
  if (condition) {
    return true
  }
  
  return false
}
menu.onSwipeStart = () => {
  console.log('Started.')
}

menu.onSwipeEnd = (status) => {
  console.log('Finished. Status:', status) // 'closed', 'opened'
}
```

And there is some more, but the are optional:

```js
const menu = new EasySwipeMenu({
  menu: document.querySelector('#menu'),
  menuButton: document.querySelector('#button'),
  menuWidth: '80%', //%
  maxMenuWidth: '300px', //any
  timingFunction: 'ease',
  transitionDuration: 300 //ms
})
```
