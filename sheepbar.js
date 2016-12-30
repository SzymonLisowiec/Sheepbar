function Sheepbar(config) {

  var SB = {

    config: {
      position: 'relative',
      jump: 32,
      scrollingBlurDelay: 600,
      callback_wheel: function() {},
      callback_mousedown: function() {},
      callback_mouseup: function() {},
      callback_mousemove: function() {},
      callback_resize: function() {}
    },
    elements: {},
    counter: 0,

    init: function(e) {

      SB.counter++;
      SB.elements[SB.counter] = {
        e: e
      };
      e = SB.elements[SB.counter];

      e.e.style.position = SB.config['position'];
      e.e.style.overflow = 'hidden';
      e.content = document.createElement('div');
      e.content.className = 'sheepbar-content';
      e.content.style.top = 0;
      e.content.style.left = 0;
      e.content.innerHTML = e.e.innerHTML;
      e.e.innerHTML = '';
      e.e.appendChild(e.content);

      e.scrollbar = {
        x: (e.e.dataset.sheepbar_x === 'true') ? true : false,
        y: (e.e.dataset.sheepbar_y === 'true') ? true : false,
      };

      if (e.content.clientWidth > e.e.clientWidth && e.scrollbar.x) {

        e.scrollbar.x = document.createElement('div');
        e.scrollbar.x.className = 'sheepbar-scrollbar sheepbar-x';
        e.scrollbar.x.appendChild(document.createElement('div'));
        e.e.appendChild(e.scrollbar.x);

        e.scrollbar.x.style.width = ((e.e.clientWidth * ((e.e.clientWidth / e.content.clientWidth) * 100)) / 100) + 'px';

        e.scrollbar.x.style.left = 0;
        e.content.style.left = 0;
        e.scrollbarXmousedown = false;

        e.scrollbar.x.addEventListener('mousedown', function(event) {
          e.scrollbarXmousedown = event.clientX;
        });

        window.addEventListener('mousemove', function(event) {
          if (e.scrollbarXmousedown) {
            if (event.clientX > e.scrollbarXmousedown) {
              e.scrollbar.x.style.left = parseFloat(e.scrollbar.x.style.left) + (event.clientX - e.scrollbarXmousedown) + 'px';
              if (parseFloat(e.scrollbar.x.style.left) > (e.e.clientWidth - parseFloat(e.scrollbar.x.style.width)))
                e.scrollbar.x.style.left = (e.e.clientWidth - parseFloat(e.scrollbar.x.style.width)) + 'px';
            } else if (event.clientX < e.scrollbarXmousedown) {
              e.scrollbar.x.style.left = parseFloat(e.scrollbar.x.style.left) - (e.scrollbarXmousedown - event.clientX) + 'px';
              if (parseFloat(e.scrollbar.x.style.left) < 0)
                e.scrollbar.x.style.left = 0;
            }
            e.content.style.left = 0 - (((parseFloat(e.scrollbar.x.style.left) * 100) / e.e.clientWidth) * e.content.clientWidth) / 100 + 'px';
            e.scrollbarXmousedown = event.clientX;
            if (document.selection) {
              document.selection.empty();
            } else if (window.getSelection) {
              window.getSelection().removeAllRanges();
            }
          }
        });

      }

      if (e.content.clientHeight > e.e.clientHeight && e.scrollbar.y) {

        e.scrollbar.y = document.createElement('div');
        e.scrollbar.y.className = 'sheepbar-scrollbar sheepbar-y';
        e.scrollbar.y.appendChild(document.createElement('div'));
        e.e.appendChild(e.scrollbar.y);

        e.scrollbar.y.style.height = ((e.e.clientHeight * ((e.e.clientHeight / e.content.clientHeight) * 100)) / 100) + 'px';

        e.scrollbar.y.style.top = 0;
        e.content.style.top = 0;
        e.scrollbarYmousedown = false;

        e.scrollbar.y.addEventListener('mousedown', function(event) {
          e.scrollbarYmousedown = event.clientY;
          SB.config.callback_mousedown();
        });

        window.addEventListener('mousemove', function(event) {
          if (e.scrollbarYmousedown) {
            if (event.clientY > e.scrollbarYmousedown) {
              e.scrollbar.y.style.top = parseFloat(e.scrollbar.y.style.top) + (event.clientY - e.scrollbarYmousedown) + 'px';
              if (parseFloat(e.scrollbar.y.style.top) > (e.e.clientHeight - parseFloat(e.scrollbar.y.style.height)))
                e.scrollbar.y.style.top = (e.e.clientHeight - parseFloat(e.scrollbar.y.style.height)) + 'px';
            } else if (event.clientY < e.scrollbarYmousedown) {
              e.scrollbar.y.style.top = parseFloat(e.scrollbar.y.style.top) - (e.scrollbarYmousedown - event.clientY) + 'px';
              if (parseFloat(e.scrollbar.y.style.top) < 0)
                e.scrollbar.y.style.top = 0;
            }
            e.content.style.top = 0 - (((parseFloat(e.scrollbar.y.style.top) * 100) / e.e.clientHeight) * e.content.clientHeight) / 100 + 'px';
            e.scrollbarYmousedown = event.clientY;
            if (document.selection) {
              document.selection.empty();
            } else if (window.getSelection) {
              window.getSelection().removeAllRanges();
            }
          }
          SB.config.callback_mousemove();
        });

      }

      window.addEventListener('mouseup', function(event) {
        e.scrollbarYmousedown = false;
        e.scrollbarXmousedown = false;
        SB.config.callback_mouseup();
      });

      e.e.addEventListener('wheel', function(event) {
        var axis = false;
        if (e.scrollbar.x && event.clientY >= e.e.clientHeight - e.scrollbar.x.clientHeight * 2) {
          axis = 'x';
          e.scrollbar.x.firstChild.className += ' sheepbar-scrolling';
          e.scrollbar.x.sheepbarSto = setTimeout(function() {
            e.scrollbar.x.firstChild.className = e.scrollbar.x.firstChild.className.replace(' sheepbar-scrolling', '');
          }, SB.config['scrollingBlurDelay']);
        } else {
          axis = 'y';
          e.scrollbar.y.firstChild.className += ' sheepbar-scrolling';
          e.scrollbar.y.sheepbarSto = setTimeout(function() {
            e.scrollbar.y.firstChild.className = e.scrollbar.y.firstChild.className.replace(' sheepbar-scrolling', '');
          }, SB.config['scrollingBlurDelay']);
        }

        if (axis) {
          if (event.wheelDelta > 0) {
            if (axis == 'x') {
              if (parseFloat(e.content.style.left) < 0) {
                e.content.style.left = ((parseFloat(e.content.style.left) + SB.config.jump > 0) ? 0 : parseFloat(e.content.style.left) + SB.config.jump) + 'px';
                e.scrollbar.x.style.left = parseFloat(e.scrollbar.x.style.left) - ((SB.config.jump * ((e.e.clientWidth / e.content.clientWidth) * 100)) / 100) + 'px';
                if (parseFloat(e.scrollbar.x.style.left) < 0)
                  e.scrollbar.x.style.left = 0;
              }
            } else if (parseFloat(e.content.style.top) < 0) {
              e.content.style.top = ((parseFloat(e.content.style.top) + SB.config.jump > 0) ? 0 : parseFloat(e.content.style.top) + SB.config.jump) + 'px';
              e.scrollbar.y.style.top = parseFloat(e.scrollbar.y.style.top) - ((SB.config.jump * ((e.e.clientHeight / e.content.clientHeight) * 100)) / 100) + 'px';
              if (parseFloat(e.scrollbar.y.style.top) < 0)
                e.scrollbar.y.style.top = 0;
            }
          } else {
            if (axis == 'x') {
              var max = (0 - (e.content.clientWidth - e.e.clientWidth));
              if (parseFloat(e.content.style.left) > max) {
                e.content.style.left = ((parseFloat(e.content.style.left) - SB.config.jump < max) ? max : parseFloat(e.content.style.left) - SB.config.jump) + 'px';
                e.scrollbar.x.style.left = parseFloat(e.scrollbar.x.style.left) + ((SB.config.jump * ((e.e.clientWidth / e.content.clientWidth) * 100)) / 100) + 'px';
                if (parseFloat(e.scrollbar.x.style.left) > (e.e.clientWidth - parseFloat(e.scrollbar.x.style.width)))
                  e.scrollbar.x.style.left = (e.e.clientWidth - parseFloat(e.scrollbar.x.style.width)) + 'px';
              }
            } else {
              var max = (0 - (e.content.clientHeight - e.e.clientHeight));
              if (parseFloat(e.content.style.top) > max) {
                e.content.style.top = ((parseFloat(e.content.style.top) - SB.config.jump < max) ? max : parseFloat(e.content.style.top) - SB.config.jump) + 'px';
                e.scrollbar.y.style.top = parseFloat(e.scrollbar.y.style.top) + ((SB.config.jump * ((e.e.clientHeight / e.content.clientHeight) * 100)) / 100) + 'px';
                if (parseFloat(e.scrollbar.y.style.top) > (e.e.clientHeight - parseFloat(e.scrollbar.y.style.height)))
                  e.scrollbar.y.style.top = (e.e.clientHeight - parseFloat(e.scrollbar.y.style.height)) + 'px';
              }
            }
          }
        }

        SB.config.callback_wheel();

      });

    },

    resize: function() {
      for (var e in SB.elements) {
        e = SB.elements[e];
        if (e.scrollbar.x)
          e.scrollbar.x.style.width = ((e.e.clientWidth * ((e.e.clientWidth / e.content.clientWidth) * 100)) / 100) + 'px';
        if (e.scrollbar.y)
          e.scrollbar.y.style.height = ((e.e.clientHeight * ((e.e.clientHeight / e.content.clientHeight) * 100)) / 100) + 'px';
      }

      SB.config.callback_resize();
    }

  };

  for (var c in config)
    if (typeof SB.config[c] != 'undefined')
      SB.config[c] = config[c];

  var sheeps = document.getElementsByClassName('sheepbar');
  for (var e in sheeps)
    if (e % 1 == 0) SB.init(sheeps[e]);

  window.addEventListener('resize', SB.resize);

}
