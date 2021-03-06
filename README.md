# Tippet

A 2KB zero dependency plugin for multimedia tooltips which move with the cursor.

## Usage:

Add the content you'd like in the tippet with the "data-tippet" attribute. This content will be parsed as HTML.

```html
<span data-tippet="Im a tippet!">Hover me</span>
```


Adding a tippet with an image would look like this:

```html
<span data-tippet="<img src='image.png'>Im a tippet with an image!">Hover me</span>
```


When dynamically adding data-tippet attributes or elements with a tippet, make sure to use the update function:

```js
newlyCreatedElement.setAttribute('data-tippet', 'Dynamically added!');
tippet.update();
```

You might want to change the content/style of a tippet while it's visible. The inject method accepts new content and an object for CSS styles:

```js
tippet.inject('Injected content', {
  'background-color': 'red'
});
```

The init function can accept values 'background' for `background-color` and 'text' for `color`. 

```js
//white background with black text
tippet.init({
  background: '#fff',
  text: '#000'
});
```
