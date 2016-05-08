/*
 * @Author: Yuk
 * @Date:   2016-04-30 16:51:37
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 11:07:27
 */

'use strict';

(function() {})();
// canvas
var canFish, canBg;
var canWidth, canHeight;
// context
var ctxFish, ctxBg;
// 用于帧计算;
var lastTime, deltaTime, nowTime;
var anemone;
var fruit;
var mom;
var baby;
var mouseX;
var mouseY;
var babyTailArr = [];
var babyEyeArr = [];
var babyBodyArr = [];
var data;

var momTailArr = [];
var momEyeArr = [];
var momBodyArr = [];

var momBodyOrange = [];
var momBodyBlue = [];

// 特性;
var wave; // 吃食物
var halo; // 喂小鱼;

var dust; // 漂浮物;
var dustPicArr = [];

var bgPic = new Image();
bgPic.src = './images/background.jpg';
// 开始游戏;
bgPic.onload = game;

// 开始游戏
function game() {
  init();
  lastTime = Date.now();
  gameloop();
}



function gameloop() {
  // 不断重绘屏幕
  window.requestAnimFrame(gameloop);
  updateTime();
  drawBackground(); // 先画绘制背景;放在下面
  anemone.draw(); // 海葵绘制
  fruit.draw(); // 绘制食物;食物放在海葵前面;
  dust.draw();
  ctxFish.clearRect(0, 0, canWidth, canHeight); // 清除画布
  mom.draw();
  baby.draw();
  CollectionFruit(); // 果实碰撞检测;
  momBabyCollision(); // 喂养小鱼检测;
  data.draw(); // 分数文本绘制
  wave.draw(); // 吃食物特效
  halo.draw(); // 喂食物特效;
}

function init() {
  CanvasInit();
  anemone = new AneObj();
  fruit = new FruitObj();
  mom = new MomObj();
  baby = new BabyObj();
  data = new DataObj(); // 分数绘制
  wave = new WaveObj(); // 吃食物特效
  halo = new WaveObj({ color: '203,91,0', maxRadius: 100 }); // 喂食物特效
  dust = new DustObj(); // 漂浮物
}

function onMouseMove(e) {
  // 鼠标移动坐标
  if (!data.gameOver) {
    if (e.offsetX || e.layerX) {
      mouseX = e.offsetX == undefined ? e.layerX : e.offsetX;
      mouseY = e.offsetY == undefined ? e.layerY : e.offsetY;
    }
  }
}

function extend(o1, o2) {
  // 拓展构造函数
  for (var i in o2)
    if (o1[i] == undefined) {
      o1[i] = o2[i]
    }
}

function updateTime() {
  // 用于计算帧;
  nowTime = Date.now();
  deltaTime = nowTime - lastTime;
  deltaTime = deltaTime > 50 ? 50 : deltaTime;
  lastTime = nowTime;
}

function lerpDistance(aim, cur, ratio) {
  // 按比例增加距离
  var delta = cur - aim;
  return aim + delta * ratio;
}

function lerpAngle(a, b, t) {
  // 角度旋转
  var d = b - a;
  if (d > Math.PI) d = d - 2 * Math.PI;
  if (d < -Math.PI) d = d + 2 * Math.PI;
  return a + d * t;
}
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();
