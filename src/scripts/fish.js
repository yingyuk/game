/*
 * @Author: Yuk
 * @Date:   2016-05-02 09:59:55
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 11:06:39
 */

'use strict';
// 大鱼
var MomObj = function() {
  this.x;
  this.y;
  // 尾巴
  this.momTailTimer = 0;
  this.momTailIndex = 0;
  // 眼睛
  this.momEyeTimer = 0;
  this.momEyeIndex = 0;
  this.momEyeInterval = 1000;
  // 身体颜色深度
  this.momBodyIndex = 0;
  // 鱼和鼠标的距离
  this.deltaX;
  this.deltaY;
  // 存储 前往鼠标的角度;
  this.beta;
  // 角度为0;
  this.angle = 0;

  this.init();
};
MomObj.prototype = {
  constructor: MomObj,
  init: function() {
    this.x = canWidth / 2;
    this.y = canHeight / 2;
    for (var i = 0; i < 8; i++) {
      momTailArr[i] = new Image();
      momTailArr[i].src = './images/bigFish/bigTail' + i + '.png';
    }

    for (var i = 0; i < 2; i++) {
      momEyeArr[i] = new Image();
      momEyeArr[i].src = './images/bigFish/bigEye' + i + '.png';
    }

    for (var i = 0; i < 8; i++) {
      momBodyOrange[i] = new Image();
      momBodyBlue[i] = new Image();
      momBodyOrange[i].src = './images/bigFish/bigSwim' + i + '.png';
      momBodyBlue[i].src = './images/bigFish/bigSwimBlue' + i + '.png';
    }

  },
  draw: function() {
    this.x = lerpDistance(this.x, mouseX, 0.03);
    this.y = lerpDistance(this.y, mouseY, 0.03);
    this.deltaX = mouseX - this.x;
    this.deltaY = mouseY - this.y;
    this.beta = Math.atan2(this.deltaY, this.deltaX) + Math.PI;
    this.angle = lerpAngle(this.beta, this.angle, 0.6)

    // 尾巴摆动
    this.momTailTimer += deltaTime;
    if (this.momTailTimer > 180) {
      this.momTailIndex = (this.momTailIndex + 1) % 8;
      this.momTailTimer %= 50;
    }
    // 眼睛眨动
    this.momEyeTimer += deltaTime;
    if (this.momEyeTimer > this.momEyeInterval) {
      this.momEyeIndex = (this.momEyeIndex + 1) % 2;
      this.momEyeTimer %= this.momEyeInterval;
      if (this.momEyeIndex == 0) {
        this.momEyeInterval = Math.random() * 2000 + 500;
      } else {
        this.momEyeInterval = 500;
      }
    }
    ctxFish.save();
    // 移动画布; 图片绘制在0,0点;变换到中心点;方便计算坐标;
    ctxFish.translate(this.x, this.y);
    // 跟随鼠标旋转
    ctxFish.rotate(this.angle);
    // 绘制身体
    if (data.double == 2) { //如果是蓝色
      ctxFish.drawImage(momBodyOrange[this.momBodyIndex], momBodyOrange[this.momBodyIndex].width / -2, momBodyOrange[this.momBodyIndex].height / -2);
    } else {
      ctxFish.drawImage(momBodyBlue[this.momBodyIndex], momBodyOrange[this.momBodyIndex].width / -2, momBodyOrange[this.momBodyIndex].height / -2);
    }
    // 尾巴
    ctxFish.drawImage(momTailArr[this.momTailIndex], momTailArr[this.momTailIndex].width / -2 + 35, momTailArr[this.momTailIndex].height / -2);
    // 眼睛
    ctxFish.drawImage(momEyeArr[this.momEyeIndex], momEyeArr[this.momEyeIndex].width / -2, momEyeArr[this.momEyeIndex].height / -2);


    ctxFish.restore();
  }
}


// 小鱼 
// 虽然结构大部分相同;
// 但大鱼身体有两种状态;
// 所以没有用一个构造函数;
var BabyObj = function() {
  this.x;
  this.y;

  this.babyTailTimer = 0;
  this.babyTailIndex = 0;

  this.babyEyeTimer = 0;
  this.babyEyeIndex = 0;
  this.babyEyeInterval = 1000;

  this.babyBodyTimer = 0;
  this.babyBodyIndex = 0;
  this.babyBodyInterval = 1000;


  this.deltaX;
  this.deltaY;
  this.beta;
  this.angle = 0;
  this.init();
};
BabyObj.prototype = {
  constructor: BabyObj,
  init: function() {
    this.x = canWidth / 2;
    this.y = canHeight / 2;
    for (var i = 0; i < 8; i++) {
      babyTailArr[i] = new Image();
      babyTailArr[i].src = './images/babyFish/babyTail' + i + '.png';
    }

    for (var i = 0; i < 2; i++) {
      babyEyeArr[i] = new Image();
      babyEyeArr[i].src = './images/babyFish/babyEye' + i + '.png';
    }

    for (var i = 0; i < 20; i++) {
      babyBodyArr[i] = new Image();
      babyBodyArr[i].src = './images/babyFish/babyFade' + i + '.png';
    }
  },
  draw: function() {
    this.x = lerpDistance(this.x, mom.x, 0.03);
    this.y = lerpDistance(this.y, mom.y, 0.03);
    this.deltaX = mom.x - this.x;
    this.deltaY = mom.y - this.y;
    this.beta = Math.atan2(this.deltaY, this.deltaX) + Math.PI;
    this.angle = lerpAngle(this.beta, this.angle, 0.6)

    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 180) {
      this.babyTailIndex = (this.babyTailIndex + 1) % 8;
      this.babyTailTimer %= 50;
    }
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
      this.babyEyeIndex = (this.babyEyeIndex + 1) % 2;
      this.babyEyeTimer %= this.babyEyeInterval;
      if (this.babyEyeIndex == 0) {
        this.babyEyeInterval = Math.random() * 2000 + 500;
      } else {
        this.babyEyeInterval = 500;
      }
    }
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300) {
      if (this.babyBodyIndex < 19) {
        this.babyBodyIndex = this.babyBodyIndex + 1;
      } else {
        // game over
        data.gameOver = true;
      }
      this.babyBodyTimer %= 300;
    }

    ctxFish.save();
    ctxFish.translate(this.x, this.y);
    ctxFish.rotate(this.angle);
    ctxFish.drawImage(babyBodyArr[this.babyBodyIndex], babyBodyArr[this.babyBodyIndex].width / -2, babyBodyArr[this.babyBodyIndex].height / -2);
    ctxFish.drawImage(babyTailArr[this.babyTailIndex], babyTailArr[this.babyTailIndex].width / -2 + 30, babyTailArr[this.babyTailIndex].height / -2);
    ctxFish.drawImage(babyEyeArr[this.babyEyeIndex], babyEyeArr[this.babyEyeIndex].width / -2 + 2, babyEyeArr[this.babyEyeIndex].height / -2);
    ctxFish.restore();
  }
}
