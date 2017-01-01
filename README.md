# Sheepbar
Light weight scrollbar in pure javascript.



## Initialize
Just add CSS and class "sheepbar" for the div element. Manage axis, adding attribute "data-x" and "data-y" with boolean value "true" or "false". Do you need textarea? You can add "data-editor" attribute.

## Constructor
```JavaScript
var Sheepbar = new Sheepbar(options);
```
- **options** - The configuration of scrollbar. [object]

## Options
- **position** - CSS position (Have to be absolute, relative or fixed). [string] [Default: relative]
- **callback_scroll** - callback of event "scroll" [function] [Default: empty function]
- **callback_mousedown** - callback of event "mousedown" [function] [Default: empty function]
- **callback_mouseup** - callback of event "mouseup" [function] [Default: empty function]
- **callback_mousemove** - callback of event "mousemove" [function] [Default: empty function]
- **callback_resize** - callback of event "resize" [function] [Default: empty function]

## Simple CSS
```CSS
.sheepbar>.sheepbar-scrollbar>div {
  width: 100%;
  height: 96%;
  top: 2%;
  bottom: 2%;
  position: absolute;
  border-radius: 6px;
  background: #34495e;
  opacity: 0.52;
  transition: opacity 0.2s;
  cursor: pointer;
}

.sheepbar>.sheepbar-scrollbar.sheepbar-x>div {
  width: 96%;
  height: 100%;
  top: 0;
  right: 2%;
  bottom: 0;
  left: 2%;
}

.sheepbar>.sheepbar-scrollbar>div:hover, .sheepbar>.sheepbar-scrollbar>div:active { opacity: 0.88; }
.sheepbar>.sheepbar-scrollbar.sheepbar-x { height: 6px; bottom: 2px; }
.sheepbar>.sheepbar-scrollbar.sheepbar-y { width: 6px; right: 2px; }
```
- **.sheepbar>.sheepbar-scrollbox** - Container of content
- **.sheepbar>.sheepbar-scrollbox>.sheepbar-content** - Content
- **.sheepbar>.sheepbar-scrollbar** - Container of scrollbar pointer
- **.sheepbar>.sheepbar-scrollbar>div** - Scrollbar pointer

## Demo
https://jsfiddle.net/yh52v9hd/

## TODO
- [x] Support for mobile devices
- [x] Slimming and optymalization
- [ ] Maybe more optymalization...

## License
MIT License

Copyright (c) 2016 Kysune

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
