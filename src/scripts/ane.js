/*
 * @Author: Yuk
 * @Date:   2016-05-06 22:11:15
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 10:53:25
 */

'use strict';
// 海葵构造函数
function AneObj () {
  this.startPointX = [];


  // 起始点;
  this.startPointX = [];
  this.startPointY = canHeight;
  // 控制点 不需要 重复了
  // this.ctrlPointX = [];
  // this.ctrlPointY = [];
  // 结束点
  this.endPointX = [];
  this.endPointY = [];

  // 海葵摆动角度;
  this.alpha = 0;
  this.amplitude = []; // 每个海葵的振幅;
  this.sinc = 0; // 区间 [-1,1];

  this.init();
};
AneObj.prototype = {
  constructor: AneObj,
  num: 50,
  init: function() {
    for (var i = 0; i < this.num; i++) {
      this.startPointX[i] = i * 20 + Math.random() * 20 -100;
      this.endPointX[i] = this.startPointX[i];
      this.endPointY[i] = canHeight - 250 + Math.random() * 50;
      this.amplitude[i] = Math.random() * 50 + 70; // 左右摆动的区间;

    }
  },
  draw: function() {
    this.alpha += deltaTime * 0.001;
    this.sine = Math.sin(this.alpha); //[-1,1];
    ctxBg.save();
    ctxBg.globalAlpha = 0.6;
    ctxBg.lineWidth = 20;
    ctxBg.lineCap = 'round';
    ctxBg.strokeStyle = "#3b154e";
    for (var i = 0; i < this.num; i++) {
      this.endPointX[i] = this.startPointX[i] + this.sine * this.amplitude[i];
      ctxBg.beginPath();
      ctxBg.moveTo(this.startPointX[i], this.startPointY);
      ctxBg.quadraticCurveTo(this.startPointX[i], canHeight - 50, this.endPointX[i], this.endPointY[i]);
      ctxBg.stroke();
    }
    ctxBg.restore();
  }
};
