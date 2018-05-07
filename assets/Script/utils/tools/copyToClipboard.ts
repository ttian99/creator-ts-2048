/**
 * 拷贝dom元素内容到剪切板
 * @param {String} elementId
 * 注意：该方法必须有点击事件触发
 *
 * 移动平台不支持的浏览器：[Android 5+], [UC Browser for Android], [Opera Mini], [Safari+].
 * 兼容性查询地址:https://caniuse.com/#search=execcommand
 */

function copyElementCntToClipboard(elementId) {
  // 动态创建 input 元素
  const aux = document.createElement('input');
  // 获得需要复制的内容
  aux.setAttribute('value', document.getElementById(elementId).innerHTML);
  // 添加到 DOM 元素中
  document.body.appendChild(aux);
  // 执行选中
  // 注意: 只有 input 和 textarea 可以执行 select() 方法.
  aux.select();
  // 获得选中的内容
  // const content = window.getSelection().toString();
  window.getSelection().toString();
  // 执行复制命令
  document.execCommand('copy');
  // 将 input 元素移除
  document.body.removeChild(aux);
}

/**
 * 拷贝字符串到剪切板
 * @param {String} str
 * 注意：该方法必须有点击事件触发
 *
 * 移动平台不支持的浏览器：[Android 5+], [UC Browser for Android], [Opera Mini] [Safari+].
 * 兼容性查询地址:https://caniuse.com/#search=execcommand
 */

function copyStringToClipboard(str) {
  // 动态创建 input 元素
  const aux = document.createElement('input');
  // 获得需要复制的内容
  aux.setAttribute('value', str);
  aux.style.readOnly = 'true';
  aux.style.display = 'none';
  // 添加到 DOM 元素中
  document.body.appendChild(aux);
  // 执行选中
  // 注意: 只有 input 和 textarea 可以执行 select() 方法.
  aux.select();
  // 获得选中的内容
  // const content = window.getSelection().toString();
  window.getSelection().toString();
  // 执行复制命令
  document.execCommand('copy');
  // 将 input 元素移除
  document.body.removeChild(aux);
  console.log('==> 字符串复制完成: ' + str);
}

// 测试浏览器是否支持命令
function isEnableExecCommand(str) {
  return document.queryCommandSupported(str);
}


export { copyElementCntToClipboard, copyStringToClipboard, isEnableExecCommand };
