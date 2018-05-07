/**
 * 用于处理加载远程图片的单例
 */

/**
 * 图片对象接口
 */
interface pictureObject{
  url: string;
}

// 判断是否为pictureObject类型
function isPictureObject(data: pictureObject | string): data is pictureObject {
  return {}.hasOwnProperty.call((<pictureObject>data), 'url');
}

export default abstract class RemoteImageTools {
  enableProxy: boolean = true; // 是否开启中转
  proxyUrl: string = '';       // 中转服务器的地址
  // 初始化
  constructor(enableProxy: boolean = true, proxyUrl: string = '') {
    this.enableProxy = enableProxy;
    this.proxyUrl = proxyUrl;
  };
  // 设置中转url
  setProxyUrl(url: string) {
    this.enableProxy = true;
    this.proxyUrl = url;
  }
  // 设置是否进行中转请求
  setEnableProxy(enableProxy: boolean) {
    this.enableProxy = enableProxy;
  }
  /**
   * 加载远程图片
   * @method loadRemoteImg
   * @param {String|pictureObject} data 图片链接'http://xxxxxx'或者图片对象{url: 'http://xxxxx', type: 'png'}
   * @param {Function} cb 回调函数
  **/
  load(data: pictureObject | string, cb: Function) {
    const headUrl = this.enableProxy ? `${this.proxyUrl}?url=` : '';
    if (typeof data !== 'string') {
      data.url = headUrl + data.url;
    } else {
      data = headUrl + data;
    }
    cc.loader.load(data, (err, texture) => {
      if (err) {
        cb && cb('load error: ' + err);
      } else {
        const spriteFrame = new cc.SpriteFrame(texture);
        cb && cb(null, spriteFrame);
      }
    });
  }
}
