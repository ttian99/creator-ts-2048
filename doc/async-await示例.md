# async-await示例

``` js
/**
 * 测试async和await
 */
function takeLongTime0() {
  return new Promise(resolve => {
    setTimeout(() => resolve('long time value'), 10000);
  });
}

async function countTime() {
  const v = await this.takeLongTime0();
  console.error(v);
}

/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 200), n);
  });
}

function step1(n) {
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}

function step2(n) {
  console.log(`step2 with ${n}`);
  return takeLongTime(n);
}

function step3(n) {
  console.log(`step3 with ${n}`);
  return takeLongTime(n);
}

async function doIt() {
  console.time("doIt");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time2);
  const result = await step3(time3);
  console.log(`result is ${result}`);
  console.timeEnd("doIt");
}

const { ccclass, property } = cc._decorator;
@ccclass
export default class AsyncAwait extends cc.Component {
  start() {
    countTime();
    doIt();
  }
}
```