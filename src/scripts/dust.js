/*
 * @Author: Yuk
 * @Date:   2016-05-07 00:09:15
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 10:25:54
 */

'use strict';
var DustObj = function(options) {
  extend(this, options);
  this.baseX = [];
  this.x = [];
  this.y = [];
  this.amplitude = [];
  this.type = [];
  this.alpha = 0;
  this.num = 30;
  this.init();
}
extend(DustObj.prototype, {
  init: function() {
    for (var i = 0; i < 7; i++) {
      dustPicArr[i] = new Image();
      dustPicArr[i].src = './images/dust/dust' + i + '.png';
    }
    for (var i = 0; i < this.num; i++) {
      this.baseX[i] = Math.random() * canWidth;
      this.y[i] = Math.random() * canHeight;
      this.amplitude[i] = 30 + Math.random() * 15;
      this.type[i] = dustPicArr[Math.floor(Math.random() * 7)];
    }
  },
  draw: function() {
    this.alpha += deltaTime * 0.001;
    this.sine = Math.sin(this.alpha); //[-1,1];
    ctxBg.save();
    for (var i = 0; i < this.num; i++) {
      this.x[i] = this.baseX[i] + this.sine * this.amplitude[i]
      ctxBg.drawImage(this.type[i], this.x[i], this.y[i])
    }
    ctxBg.restore();
  }
});
