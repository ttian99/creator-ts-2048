# creator组件示例(component)

``` js
const { ccclass } = cc._decorator;

@ccclass
export default class sampleTest extends cc.Component {
  // onLoad 回调会在组件首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下
  onLoad() {

  }
  // start 回调函数会在组件第一次激活前，也就是第一次执行 update 之前触发
  start() {

  }
  // update 每一帧渲染前更新物体的行为，状态和方位
  update() {

  }
  // lateUpdate在动画更新之后
  lateUpdate() {

  }
  //当组件的 enabled 属性从 false 变为 true 时，或者所在节点的 active 属性从 false 变为 true 时，会激活 onEnable 回调。
  onEnable() {

  }
  // 当组件的 enabled 属性从 true 变为 false 时，或者所在节点的 active 属性从 true 变为 false 时，会激活 onDisable 回调。
  onDisable() {

  }
  // 当组件或者所在节点调用了 destroy()，则会调用 onDestroy 回调，并在当帧结束时统一回收组件。
  onDestroy() {

  }
}
```