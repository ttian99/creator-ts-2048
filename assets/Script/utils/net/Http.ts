/**
 * http网络请求类
 */
class Http {
  proxyUrl: string = '';  // 代理地址
  defaultTimeout: number = 10000; // 默认超时的毫秒

  constructor() {
    this.proxyUrl = '';
    this.defaultTimeout = 10000;
  }
  // GET方法
  get(url: string, cb: Function, t: number): void {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && ((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304)) {
        cb && cb(null, xhr.responseText);
      } else {
        cb && cb('xhr DONE error', xhr.status);
      }
    };
    xhr.onerror = (err) => {
      cb && cb('xhr error', err);
    };

    xhr.open('GET', url, true);

    // XMLHttpRequest 超时。在此做某事。
    xhr.timeout = t || this.defaultTimeout; // 毫秒
    xhr.ontimeout = (e) => {
      xhr.abort();
      cb && cb('xhr timeout', { ret: -100 });
    };

    xhr.send();
  }
  // POST方法
  post(url: string, params: any, cb: any, t: any): void {
    if (params instanceof Function) {
      t = cb;
      cb = params;
      params = null;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.timeout = t || this.defaultTimeout; // 毫秒
    xhr.ontimeout = (e) => {
      xhr.abort();
      cb && cb('xhr timeout', { ret: -100 });
    };
    xhr.onerror = (err) => {
      cb && cb('xhr error', err);
    };
    xhr.onreadystatechange = () => { // Call a function when the state changes.
      if (xhr.readyState === XMLHttpRequest.DONE && ((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304)) {
        cb && cb(null, xhr.responseText);
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
        xhr.abort();
        cb && cb('xhr DONE error', { ret: -2, status: xhr.status });
      }
    };

    params = JSON.stringify(params);
    xhr.send(params);
  }
  // 代理GET方法
  proxyGet(url: string, cb: any, t: any, proxyUrl: any): void {
    const newUrl = proxyUrl ? `${proxyUrl}?imgUrl=${url}` : `${this.proxyUrl}?imgUrl=${url}`;
    this.get(newUrl, cb, t);
  }
  // 代理POST方法
  proxyPost(url: string, params: any, cb: any, t: any, proxyUrl: any): void {
    const newUrl = proxyUrl ? `${proxyUrl}?imgUrl=${url}` : `${this.proxyUrl}?imgUrl=${url}`;
    this.post(newUrl, params, cb, t);
  }
}

export default Http;
