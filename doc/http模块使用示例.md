# http模块使用示例

```js
import Http from '../utils/net/Http';

const { ccclass, property } = cc._decorator;
@ccclass
export default class AsyncAwait extends cc.Component {
  start() {
    // this.testHttp();
  }
  testHttp() {
    const http = new Http();
    cc.info('http.get start');
    http.post('http://192.168.0.150:2111/LobbyServer/getMsg', {
      uid: 10215,
      sessionId: 'Ejxtguvyx6hfuNb11JrtWLTHoh3dF8eq'
    }, (err, data) => {
      cc.info('http.get over');
      cc.error(err);
      cc.info(data);
    }, 20000);
  }
}
```