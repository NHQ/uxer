# uxer

a user interaction library

This "module" contains many elements which might be used in the construction of user interface modules. I am using this is a catchall library while I build user interaction modules for touch and click, like [uxer-flat-dial](https://github.com/NHQ/uxer-flat-dial).

At the core, these modules use (touchdown)[https://github.com/NHQ/touchdown], which handles cross device eventing. You may just want to use that your own way.

There is a spin module, which will emit a spin event when cast on a module.

There is a 'bpm' module, for getting beats per minute events on an element (tap tap tap tap);

There is an intervals module for getting interval events, with start and end times for each tap.

There is a Switch module for getting on and off events.

There are some helpers in there as well: 
```
getCSS : get primitive css values
center : center an element inside its parent
uuid : the uuid module
findPosition : get the absolute position of an element
```

All of the above are served up in an object if you require this whole module. Or do as is done in the example below.

```
npm install uxer
```

```js
var spin = require('uxer/spin');
var el = document.getElementById('dial');

spin(el)

el.addEventListener('spin', funcTheSpin);

function funkTheSpin(evt){
  var data = evt.detail
}
```

See [uxer-flat-dial](https://github.com/NHQ/uxer-flat-dial).