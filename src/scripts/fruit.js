/*
 * @Author: Yuk
 * @Date:   2016-05-06 22:11:49
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 10:29:25
 */

'use strict';

// 食物
function FruitObj() {
  this.alive = [];
  this.mature =[];
  this.orange = new Image();
  this.blue = new Image();
  this.x = [];
  this.y = [];
  this.speed = [];
  this.radius = [];
  this.pic = [];
  this.fruitType = [];
  this.index = [];
  this.init();
};
FruitObj.prototype = {
  constructor: FruitObj,
  num: 30,
  init: function() {
    for (var i = 0; i < this.num; i++) {
      this.alive[i] = false;
      this.mature[i] = false;
      this.x[i] = 0;
      this.y[i] = 0;
      this.radius[i] = 0;
      this.speed[i] = Math.random() * 0.01 + 0.005;
      this.check();
    }
    this.orange.src = './images/fruit.png';
    this.blue.src = './images/blue.png';
  },
  draw: function() {
    for (var i = 0; i < this.num; i++) {
      if (this.alive[i]) {
        if (this.radius[i] < 14) {
          // 增长
          this.radius[i] += this.speed[i] * deltaTime;
          this.x[i] = anemone.endPointX[this.index[i]];
          this.y[i] = anemone.endPointY[this.index[i]];
        } else {
          // 上浮
          this.y[i] -= this.speed[i] * 7 * deltaTime;
          this.mature[i] = true;
        }
        ctxBg.drawImage(this.pic[i], this.x[i] - this.radius[i] * 0.5, this.y[i] - this.radius[i] * 0.5, this.radius[i], this.radius[i]);
        if (this.y[i] < 10) {
          this.alive[i] = false;
        }
      }
    }
    this.check();
  },
  born: function(i) {
    this.index[i] = Math.floor(Math.random() * anemone.num);
    this.x[i] = anemone.startPointX[this.index[i]];
    this.y[i] = canHeight - anemone.endPointY[this.index[i]];
    this.radius[i] = 0;
    this.alive[i] = true;
    this.mature[i] = false;
    var type = Math.random();
    if (type < 0.7) {
      // 存储图片
      this.pic[i] = this.orange;
      // 存储类型
      this.fruitType[i] = 'orange';
    } else {
      this.pic[i] = this.blue;
      this.fruitType[i] = 'blue';
    }
  },
  check: function() {
    var num = 0;
    for (var i = 0; i < this.num; i++) {
      if (this.alive[i]) {
        num++;
      }
    }
    if (num < 15) {
      this.sendFruit()
      return;
    }
  },
  sendFruit: function() {
    for (var i = 0; i < this.num; i++) {
      if (!this.alive[i]) {
        this.born(i);
        break;
      }
    }
  },
  dead: function(i) {
    this.alive[i] = false;
  }
};
