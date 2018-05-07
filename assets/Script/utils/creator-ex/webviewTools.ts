/**
 * webview的拓展类
 */


/**
 * @method getDomIframe 获取iframe
 * @return iframe|div
 * 调试模式下iframe上会增加一层div标签
 */
function getDomIframe(): HTMLIFrameElement | HTMLDivElement {
  let divArr: NodeListOf<HTMLIFrameElement> | NodeListOf<HTMLDivElement> = cc.game.canvas.parentElement.getElementsByTagName('div');
  if (divArr.length < 1) {
    divArr = cc.game.canvas.parentElement.getElementsByTagName('iframe');
  }
  return divArr[0];
}

// 显示webView
function showWebView(el: any, cb: any) {
  if (el instanceof Function) {
    cb = el;
    el = null;
  }
  const div = el || getDomIframe();
  div.style.zIndex = 10;
  cb && cb();
}

// 隐藏webView
function hideWebView(el: any, cb: any) {
  if (el instanceof Function) {
    cb = el;
    el = null;
  }
  const div = el || getDomIframe();
  div.style.zIndex = -1;
  cb && cb();
}

// 去掉overFlow
function hideOverFlow(el: any) {
  const div = el || getDomIframe();
  if (div.id !== 'Cocos2dGameContainer') {
    div.style.overflow = 'hidden';
  }
}

const webviewTools = { getDomIframe, showWebView, hideWebView, hideOverFlow };
export default webviewTools;
