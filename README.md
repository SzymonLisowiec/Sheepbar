# Sheepbar
Light weight scrollbar in pure javascript.

## Initialize
Just add class "sheepbar" for the div element.

## Constructor
```JavaScript
var Sheepbar = new Sheepbar(options);
```
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
