# Sheepbar
Light weight scrollbar in pure javascript.



## Initialize
Just add class "sheepbar" for the div element.

## Constructor
```JavaScript
var Sheepbar = new Sheepbar(options);
```
- **options** - The configuration of scrollbar. [object]

## Options
- **position** - CSS position (Have to be absolute, relative or fixed). [string] [Default: relative]
- **jump** - Jumping when scrolling content (in pixels). [int/float] [Default: 32]
- **scrollingBlurDelay** - Time delay when removing class "sheepbar-scrolling" of scrollbar (in milliseconds). [int] [Default: 600]
- **callback_wheel** - callback of event "wheel" [function] [Default: empty function]
- **callback_mousedown** - callback of event "mousedown" [function] [Default: empty function]
- **callback_mouseup** - callback of event "mouseup" [function] [Default: empty function]
- **callback_mousemove** - callback of event "mousemove" [function] [Default: empty function]
- **callback_resize** - callback of event "resize" [function] [Default: empty function]

## TODO
- support for mobile devices

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
