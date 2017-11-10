class Slider{
  constructor(id, cycle = 3000){
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
    this.cycle = cycle;
    this.slideHandlers = [];
    
    let controller = this.container.querySelector('.slide-list__control');
    if(controller){
      let buttons = document.querySelectorAll('.slide-list__control-buttons, .slide-list__control-buttons--selected');
      controller.addEventListener('mouseover', evt=>{
        var idx = Array.from(buttons).indexOf(evt.target);
        if(idx >= 0){
          this.slideTo(idx);
          this.stop();
        }
      });
      
      controller.addEventListener('mouseout', evt=>{
        this.start();
      });

      this.addSlideListener(function(idx){
        let selected = controller.querySelector('.slide-list__control-buttons--selected');
        if(selected) selected.className = 'slide-list__control-buttons';
        buttons[idx].className = 'slide-list__control-buttons--selected';
      });
    }
  }
  getSelectedItem(){
    let selected = this.container.querySelector('.slider-list__item--selected');
    return selected
  }
  getSelectedItemIndex(){
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }
  slideTo(idx){
    let selected = this.getSelectedItem();
    if(selected){ 
      selected.className = 'slider-list__item';
    }
    let item = this.items[idx];
    if(item){
      item.className = 'slider-list__item--selected';
    }
    
    this.slideHandlers.forEach(handler => {
      handler(idx);
    });
  }
  slideNext(){
    let currentIdx = this.getSelectedItemIndex();
    let nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }
  slidePrevious(){
    let currentIdx = this.getSelectedItemIndex();
    let previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);  
  }
  addSlideListener(handler){
    this.slideHandlers.push(handler);
  }
  start(){
    this.stop();
    this._timer = setInterval(()=>this.slideNext(), this.cycle);
  }
  stop(){
    clearInterval(this._timer);
  }
}

const slider = new Slider('my-slider');
slider.start();

// throttle
function throttle(fn, wait){
    var timer;
    return function(...args){
        if(!timer){
            timer = setTimeout(()=>timer=null, wait);
            return fn.apply(this, args);
        }
    }
}

btn.onclick = throttle(function(){
    console.log("button clicked");
}, 500);


// removal
Array.prototype.forEach = Array.prototype.forEach || function(callback, thisArg) {
    if (!callback || typeof callback !== 'function') return;

    for (var i = 0, j = this.length; i < j; i++) {
        callback.call(thisArg, this[i], i, this);
    }
}

function removal(ar) {
    var tmp = {},
        ret = [];

    for (var i = 0, j = ar.length; i < j; i++) {
        if (!tmp[ar[i]]) {
            tmp[ar[i]] = 1;
            ret.push(ar[i]);
        }
    }

    return ret;
}

function removal(ar) {
    var ret = []

    ar.forEach(function(e, i, ar) {
        if (ar.indexOf(e) === i) {
            ret.push(e);
        }
    })

    return ret
}
