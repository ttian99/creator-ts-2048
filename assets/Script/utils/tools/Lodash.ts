/**
 *  Lodash类的替代方案
 *
 */

// 遍历
export function map(arr: Array<any>, fun: Function) {
  if (arr != null) {
    for (let i = 0; i < arr.length; i++) {
      fun && fun(arr[i], i);
    }
  }
}

// 移除数组内满足条件的项目
export function remove(arr: Array<any>, fun: Function) {
  if (arr === null) return;
  for (let i = 0; i < arr.length; i++) {
    if (fun && fun(arr[i])) {
      arr.splice(i, 1);
      return;
    }
  }
}

// 合并对象
export function merge(obj: Object, src: Object) {
  if (!obj || !src) return;
  for (const key in src) {
    if ({}.hasOwnProperty.call(src, key)) {
      obj[key] = src[key];
    }
  }
}

/**
* @method debounce 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
* @param idle   {number}    空闲时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}  返回客户调用函数
*/
function debounce(action: Function, idle: number = 400) {
  let last;
  return function () {
    const ctx = this;
    const args = arguments;
    clearTimeout(last);
    last = setTimeout(() => {
      action.apply(ctx, args);
    }, idle);
  };
};

/**
* 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
* @param delay  {number}    延迟时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
function throttle(action: Function, delay: number = 400) {
  let last = 0;
  return function () {
    const curr: number = new Date().getTime();
    if (curr - last > delay) {
      action.apply(this, arguments);
      last = curr;
    }
  };
};

// 默认导出
const lodash = { map, remove, merge };
export default lodash;
