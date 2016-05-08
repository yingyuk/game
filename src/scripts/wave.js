/*
 * @Author: Yuk
 * @Date:   2016-05-06 20:27:33
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 09:44:10
 */

'use strict';

function WaveObj(options) {
  extend(this, options);
  this.x = [];
  this.y = [];
  this.alive = [];
  this.radius = [];
  this.maxRadius = this.maxRadius || 50;
  this.color = this.color || '255,255,255'; // 默认圆圈是白色;
}
extend(WaveObj.prototype, {

  constructor: WaveObj,
  num: 10,
  init: function() {
    for (var i = 0; i < this.num; i++) {
      this.alive[i] = fasle;
      this.radius[i] = 0;
    }
  },
  draw: function() {
    ctxFish.save();
    ctxFish.lineWidth = 2;
    ctxFish.shadowBlur = 10;
    ctxFish.shadowColor = "white";
    for (var i = 0; i < this.num; i++) {
      if (this.alive[i]) {
        this.radius[i] += deltaTime * 0.1;
        if (this.radius[i] > this.maxRadius) {
          this.alive[i] = false;
          break;
        }
        var alpah = 1 - this.radius[i] / this.maxRadius;
        ctxFish.beginPath();
        ctxFish.arc(this.x[i], this.y[i], this.radius[i], 0, Math.PI * 2);
        ctxFish.closePath();
        ctxFish.strokeStyle = "rgba(" + this.color + ',' + alpah + ")";
        console.log();
        ctxFish.stroke();
      }
    }
    ctxFish.restore();
  },
  born: function(x, y) {
    for (var i = 0; i < this.num; i++) {
      if (!this.alive[i]) {
        this.x[i] = x;
        this.y[i] = y;
        // 初始半径为20;
        this.radius[i] = 10;
        this.alive[i] = true;
        return;
      } 
    }
  }

});
