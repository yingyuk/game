/*
 * @Author: Yuk
 * @Date:   2016-05-06 18:38:25
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 11:07:45
 */

'use strict';
var DataObj = function() {
  this.fruitNum = 0;
  this.double = 1;
  this.score = 0;
  this.gameOver = false;
  this.alpah = 0;
};

DataObj.prototype = {
  constructor: DataObj,
  reset: function() {
    this.fruitNum = 0;
    this.double = 1;
  },
  draw: function() {
    ctxFish.save();
    ctxFish.shadowBlur = 10;
    ctxFish.shadowColor = 'white';
    ctxFish.fillText('当前收集果实 ' + this.fruitNum, canWidth / 2, canHeight - 50);
    if (this.double == 2) {
      ctxFish.fillText('当前喂养分数翻倍 ', canWidth / 2, canHeight - 80);
    }
    ctxFish.fillText('SCORE ' + this.score, canWidth / 2, 80);
    if (data.gameOver) {
      this.alpah += deltaTime * 0.001;
      if (this.alpah > 1) {
        this.alpah = 1;
      }
      ctxFish.fillStyle = "rgba(255,255,255," + this.alpah + ")";
      ctxFish.fillText('GAMEOVER', canWidth / 2, canHeight / 2);
    }
    ctxFish.restore();
  },
  // 增加分值
  addScore: function() {
    this.score += this.fruitNum * 100 * this.double;
    this.reset();
  }
};
