# Smooth scroll
Smooth scroll vanilla js

[Demo](https://alainbarrios.github.io/smooth-scroll-vanilla-js/.)

Un simple plugin smooth scroll totalmente hecho con Vanilla JS. 

Para usarlo debes colocar las siguientes lineas de código en tu archivo HTML

Deberas colocar data-smooth-scroll para obtener el ancla
```html
<a data-smooth-scroll href="#section-1">Section 1</a>
```

Colocaras la id en la sección o parte de tu pagina web donde quieras dirigir el ancla
```html
<section id="section-1">Section 1</section>
```

Por último colocas este script para que funcione el smooth scroll

```javascript
<script src="./src/smooth-scroll.js"></script>
<script>
   new Smoothscroll({
      duration: 2000, // 1000 is default
      offsettop: '.navbar', // 0 is default
      easing: 'easeInOutQuad' // linear is default
   })
</script>
```
