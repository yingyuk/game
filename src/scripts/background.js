/*
 * @Author: Yuk
 * @Date:   2016-04-30 17:14:47
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 09:27:35
 */

'use strict';
// 画背景;
function drawBackground() {
  ctxBg.drawImage(bgPic, 0, 0, canWidth, canHeight, 0, 0, 800, 600);
}

function Background(options) {
  extend(this, options);
  this.pic = new Image();
}
extend(Background.prototype, {
  init: function() {
    this.pic.src = './images/background.jpg';
  },
  draw: function() {
    ctxBg.drawImage(bgPic, 0, 0, canWidth, canHeight, 0, 0, 800, 600);
  }
})

function CanvasInit() {
	canFish = document.getElementById('canvasFish');
  ctxFish = canFish.getContext('2d');

  canBg = document.getElementById('canvasBg');
  ctxBg = canBg.getContext('2d');

  canWidth = canBg.width;
  canHeight = canBg.height;

  mouseX = canWidth / 2;
  mouseY = canHeight / 2;

  canFish.addEventListener('mousemove', onMouseMove, false);
  ctxFish.font = '20px arial';
  ctxFish.textAlign = 'center';
  ctxFish.fillStyle = 'white';
}
