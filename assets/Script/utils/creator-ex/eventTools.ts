const { ccclass } = cc._decorator;

@ccclass
class EventTools {

  /**
   *
   * @param {cc.Node} node // 这个node节点是你要监听点击的节点
   * @param {cc.Node} target //这个 target 节点是你的事件处理代码组件所属的节点
   * @param {String} component 组件脚本的文件名
   * @param {String} handler 回调函数的名字
   * @param {*} customEventData 用户传递的事件数据
   */
  public addClickEvent(node: cc.Node, target: cc.Node, component: string, handler: string, customEventData: any) {
    const clickEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();
    clickEventHandler.target = target;
    clickEventHandler.component = component;
    clickEventHandler.handler = handler;
    clickEventHandler.customEventData = customEventData;

    const button: cc.Button = node.getComponent(cc.Button);
    button.clickEvents.push(clickEventHandler);
  }

  /**
   * @method addSlideEvent
   * @param {cc.Node} node // 这个node节点是你要监听滑动事件的节点
   * @param {cc.Node} target //这个 target 节点是你的事件处理代码组件所属的节点
   * @param {String} component 组件脚本的文件名
   * @param {String} handler 回调函数的名字
   * @param {*} customEventData 用户传递的事件数据
   */
  public addSlideEvent(node: cc.Node, target: cc.Node, component: string, handler: string, customEventData: any) {
    const eventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();
    eventHandler.target = target;
    eventHandler.component = component;
    eventHandler.handler = handler;
    eventHandler.customEventData = customEventData;

    const slider: cc.Slider = node.getComponent(cc.Slider);
    slider.slideEvents.push(eventHandler);
  }

  /**
  * @method addScrollView 添加滑动事件
  * @param {cc.Node} node // 这个node节点是你要监听滑动事件的节点
  * @param {cc.Node} target //这个 target 节点是你的事件处理代码组件所属的节点
  * @param {String} component 组件脚本的文件名
  * @param {String} handler 回调函数的名字
  * @param {*} customEventData 用户传递的事件数据
  */
  public addScrollView(node: cc.Node, target: cc.Node, component: string, handler: string, customEventData: any) {
    const scrollViewEventHandler: cc.Component.EventHandler = new cc.Component.EventHandler();
    scrollViewEventHandler.target = target; // 这个 node 节点是你的事件处理代码组件所属的节点
    scrollViewEventHandler.component = component;// 这个是代码文件名
    scrollViewEventHandler.handler = handler;
    scrollViewEventHandler.customEventData = customEventData;

    const scrollview: cc.ScrollView = node.getComponent(cc.ScrollView);
    scrollview.scrollEvents.push(scrollViewEventHandler);
  }

  /**
   * @method dispatchEvent 派发事件
   *
   * @param {cc.Node} node // 要派发事件的节点
   * @param {String} eventName // 事件名称
   * @param {*} 用户传递的事件数据
   */
  public dispatchEvent(node: cc.Node, eventName: string, customEventData: any) {
    const event: cc.Event.EventCustom = new cc.Event.EventCustom(eventName, true);
    event.setUserData(customEventData);
    cc.isValid(node) && node.dispatchEvent(event);
  }
}

const eventTools: EventTools = new EventTools();
export default eventTools;
