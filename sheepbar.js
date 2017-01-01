`use strict`;

function Sheepbar(config){
  
  var SB = {
  	
    config: {
    	position: 'relative',
      callback_scroll: function(){},
      callback_mousedown: function(){},
      callback_mouseup: function(){},
      callback_mousemove: function(){},
      callback_resize: function(){}
    },
    elements: {},
    counter: 0,
    
  	init: function(e, axises, editor){
    	
      SB.counter++;
      SB.elements[SB.counter] = {
      	e: e,
        axises: axises,
        scrollbarmousedown: {
        	x: false,
          y: false
        },
        scrollbar: {
        	x: false,
          y: false
        },
        x: {
        	axis: 'x',
          size: 'width',
          clientSize: 'clientWidth',
          cssAxis: 'left',
          clientAxis: 'clientX',
          scroll: 'scrollLeft'
        },
        y: {
        	axis: 'y',
          size: 'height',
          clientSize: 'clientHeight',
          cssAxis: 'top',
          clientAxis: 'clientY',
          scroll: 'scrollTop'
        },
        loadScrollbar: function(axis){
          if(['x','y'].indexOf(axis) == -1) return;
          e.scrollbar[axis] = document.createElement('div');
          e.scrollbar[axis].className = 'sheepbar-scrollbar sheepbar-'+axis;
          e.scrollbar[axis].appendChild(document.createElement('div'));
          e.e.appendChild(e.scrollbar[axis]);

          e.scrollbar[axis].style[e[axis].size] = ((e.e[e[axis].clientSize]*((e.e[e[axis].clientSize]/e.content[e[axis].clientSize])*100))/100)+'px';

          e.scrollbar[axis].style.position = 'absolute';
          e.scrollbar[axis].style[e[axis].cssAxis] = 0;
          
          e.scrollbar[axis].addEventListener('mousedown', function(event){
            e.scrollbarmousedown[axis] = event[e[axis].clientAxis];
          });
        }
      };
      e = SB.elements[SB.counter];
    	
      e.e.style.position = SB.config.position;
      e.e.style.overflow = 'hidden';
      e.scrollbox = document.createElement('div');
      e.scrollbox.className = 'sheepbar-scrollbox';
      e.scrollbox.style.width = e.e.clientWidth+'px';
      e.scrollbox.style.height =	e.e.clientHeight+'px';
      e.scrollbox.style.display = 'block';
      e.scrollbox.style.position = 'absolute';
      e.scrollbox.style.top = '0';
      if(e.axises.indexOf('x') > -1)
      	e.scrollbox.style.overflowX = 'scroll';
      else e.scrollbox.style.overflowX = 'hidden';
      if(e.axises.indexOf('y') > -1)
      	e.scrollbox.style.overflowY = 'scroll';
      else e.scrollbox.style.overflowY = 'hidden';
     	e.content = document.createElement('div');
      e.content.className = 'sheepbar-content';
      e.content.style.display = 'inline-block';
      e.content.innerHTML = e.e.innerHTML;
      e.scrollbox.appendChild(e.content);
      e.e.innerHTML = '';
      e.e.appendChild(e.scrollbox);
      e.scrollbox.style.width =	parseFloat(e.e.clientWidth)+(e.e.clientWidth-e.scrollbox.clientWidth)+'px';
      e.scrollbox.style.height =	parseFloat(e.e.clientHeight)+(e.e.clientHeight-e.scrollbox.clientHeight)+'px';
      e.scrollbox.stylesheep = window.getComputedStyle(e.scrollbox);
      if(editor){
      	e.content.setAttribute('contenteditable','true');
        e.content.addEventListener('keyup', SB.resize);
      }
      
      window.addEventListener('mousemove', function(event){
      	var axis = 'x';
      	if(e.scrollbarmousedown.y) axis = 'y';
        else if(!e.scrollbarmousedown.x) return;
        
        if(event[e[axis].clientAxis] > e.scrollbarmousedown[axis]){
        
        	e.scrollbar[axis].style[e[axis].cssAxis] = parseFloat(e.scrollbar[axis].style[e[axis].cssAxis])+(event[e[axis].clientAxis]-e.scrollbarmousedown[axis])+'px';
          if(parseFloat(e.scrollbar[axis].style[e[axis].cssAxis]) > (e.e[e[axis].clientSize]-parseFloat(e.scrollbar[axis].style[e[axis].size])))
          	e.scrollbar[axis].style[e[axis].cssAxis] = (e.e[e[axis].clientSize]-parseFloat(e.scrollbar[axis].style[e[axis].size]))+'px';
            
        }else if(event[e[axis].clientAxis] < e.scrollbarmousedown[axis]){
        
        	e.scrollbar[axis].style[e[axis].cssAxis] = parseFloat(e.scrollbar[axis].style[e[axis].cssAxis])-(e.scrollbarmousedown[axis]-event[e[axis].clientAxis])+'px';
          if(parseFloat(e.scrollbar[axis].style[e[axis].cssAxis]) < 0)
          	e.scrollbar[axis].style[e[axis].cssAxis] = 0;
            
        }
        e.scrollbox[e[axis].scroll] = (((parseFloat(e.scrollbar[axis].style[e[axis].cssAxis])*100)/e.e[e[axis].clientSize])*e.content[e[axis].clientSize])/100;
        e.scrollbarmousedown[axis] = event[e[axis].clientAxis];
        if(document.selection){
        	document.selection.empty();
        }else if(window.getSelection){
        	window.getSelection().removeAllRanges();
        }
        SB.config.callback_mousemove();
      });
      
      e.axises.forEach(function(axis){
      	if(e.content[e[axis].clientSize] > e.e[e[axis].clientSize])
        e.loadScrollbar(axis);
      });
      
      window.addEventListener('mouseup', function(event){
      	e.scrollbarmousedown.x = false;
      	e.scrollbarmousedown.y = false;
        SB.config.callback_mouseup();
      });
      
      e.e.addEventListener('change', SB.resize);
      e.scrollbox.addEventListener('scroll', function(event){
        
        e.axises.forEach(function(axis){
        	e.scrollbar[axis].style[e[axis].cssAxis] = (((parseFloat(e.scrollbox[e[axis].scroll])*100)/e.content[e[axis].clientSize])*e.e[e[axis].clientSize])/100+'px';
        });
        
        SB.config.callback_scroll();
        
      });
      
    },
    
    resize: function(){
    	for(var e in SB.elements){
      	e = SB.elements[e];
        e.scrollbox.style.width = e.e.clientWidth+'px';
      	e.scrollbox.style.height =	e.e.clientHeight+'px';
        e.scrollbox.style.width =	parseFloat(e.e.clientWidth)+(e.e.clientWidth-e.scrollbox.clientWidth)+'px';
      	e.scrollbox.style.height =	parseFloat(e.e.clientHeight)+(e.e.clientHeight-e.scrollbox.clientHeight)+'px';
      	
        e.axises.forEach(function(axis){
        	e.scrollbar[axis].style[e[axis].size] = ((e.e[e[axis].clientSize]*((e.e[e[axis].clientSize]/e.content[e[axis].clientSize])*100))/100)+'px';
          e.scrollbar[axis].style[e[axis].cssAxis] = (((parseFloat(e.scrollbox[e[axis].scroll])*100)/e.content.clientWidth)*e.e.clientWidth)/100+'px';
        });
        
      }
      
      SB.config.callback_resize();
    }
  	
  };
  
  for(var c in config)
  	if(typeof SB.config[c] != 'undefined')
    	SB.config[c] = config[c];
  
  var sheeps = document.getElementsByClassName('sheepbar');
  for(var e in sheeps){
  	if(e%1 == 0){
    	var axises = [];
      if((sheeps[e].dataset.x === 'true')) axises[0] = 'x';
      if((sheeps[e].dataset.y === 'true')) axises[1] = 'y';
      SB.init(sheeps[e], axises, (typeof sheeps[e].dataset.editor != 'undefined')?true:false);
    }
  }
  
  window.addEventListener('resize', SB.resize);
  
}
