# lodash使用示例

```js
import * as _ from 'lodash';
import { merge } from 'lodash';

function test1() {
  let obj = _.merge({}, {
    game: '1',
    code: 200,
  });
  obj = merge(obj, {
    test: true
  });
  cc.info(`test-lodash : obj = ${JSON.stringify(obj)}`);
}


const { ccclass, property } = cc._decorator;
@ccclass
export default class AsyncAwait extends cc.Component {
  start() {
    test1();
  }
}
```