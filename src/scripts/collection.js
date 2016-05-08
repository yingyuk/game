/*
 * @Author: Yuk
 * @Date:   2016-05-02 11:24:39
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-07 10:28:18
 */

'use strict';

// 大鱼吃果实
function CollectionFruit() {
  if (data.gameOver) {
    return;
  }
  for (var i = 0; i < fruit.num; i++) {
    // 果实是活的 并且是成熟的
    if (fruit.alive[i] && fruit.mature[i]) {
      var distance = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y)
        // 距离范围内
      if (distance < 900) {
        fruit.dead(i);
        // 圆圈特效;
        wave.born(fruit.x[i],fruit.y[i]);
        // 果实数量增加
        data.fruitNum++;
        if (mom.momBodyIndex < 7) {
          mom.momBodyIndex++;
        }
        // 蓝果实 分数翻倍;
        if (fruit.fruitType[i] == 'blue') {
          data.double = 2;
        }
      }
    }
  }
}

// 大鱼喂小鱼
function momBabyCollision() {
  if (data.gameOver) {
    return
  }
  if (data.fruitNum > 0) {
    var distance = calLength2(baby.x, baby.y, mom.x, mom.y)
    if (distance < 900) {
      // 回归状态0 ;
      mom.momBodyIndex = 0;
      baby.babyBodyIndex = 0;
      data.addScore();
      halo.born(baby.x,baby.y);
    }
  }
}

// 两个物体距离的平方;
function calLength2(x1, y1, x2, y2) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}
