# Tippet

A 2KB zero dependency plugin for multimedia tooltips which move with the cursor.

##Usage:

Add the content you'd like in the tippet with the "data-tippet" attribute. This content will be parsed as HTML.

```html
<span data-tippet="Im a tippet!">Hover me</div>
```


Adding a tippet with an image would look like this:

```html
<span data-tippet="<img src='image.png'>Im a tippet with an image!">Hover me</div>
```


When dynamically adding data-tippet attributes or elements with a tippet, make sure to use the init function:

```js
document.getElementById('newElement').setAttribute('data-tippet', 'Dynamically added!');
tippet.init();
```

The init function can accept either 'light' or 'dark'. This will inject the css for that theme. 

```js
tippet.init('light); //white tippets with dark text
tippet.init('dark'); //black tippets with light text
```
