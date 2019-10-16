/**
 * 监听滑动和事件监听
 */

 import cfg from './cfg';
 import gameCtrl from './gameCtrl';

const {ccclass, property} = cc._decorator;
@ccclass
export default class TouchCtrl extends cc.Component {
    @property(cc.Vec2) startPos = null; // 点击初始位置
    @property(Number) defaultLen = 50; // 长度

    start () {

    }
    onEnable() {
        this.onListen();
    }
    onDisable() {
        this.offListen();
    }
    // 开启事件监听
    onListen() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    // 关闭事件监听
    offListen() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    touchStart(event) {
        this.startPos = event.getLocation();
    }
    touchMove(event) {
    }
    touchEnd(event) {
        const endPos = event.getLocation();
        const startPos = this.startPos || {x: 0, y: 0};
        const deltaX = endPos.x - this.startPos.x;
        const deltaY = endPos.y - this.startPos.y;
        this.checkDirector(event, deltaX, deltaY);
        this.startPos = null;
    }
    touchCancel(event) {
    }
    // 键盘按键
    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
            case cc.macro.KEY.up: this.goto(cfg.DIRECTOR.UP);
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down: this.goto(cfg.DIRECTOR.DOWN);
                break;
            case cc.macro.KEY.a:
            case cc.macro.KEY.left: this.goto(cfg.DIRECTOR.LEFT);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right: this.goto(cfg.DIRECTOR.RIGHT);
                break;
            default:
                break;
        }
    }
    // 检测滑动方向
    checkDirector(event, deltaX, deltaY) {
        // 判断是否为滑动
        if (Math.abs(deltaX) < this.defaultLen && Math.abs(deltaY) < this.defaultLen) return;
        // 判断滑动方向
        if (Math.abs(deltaX) > Math.abs(deltaY)) { // 左右方向
            if (deltaX > 0) { // 右
                this.goto(cfg.DIRECTOR.RIGHT);
            } else { // 左
                this.goto(cfg.DIRECTOR.LEFT);
            }
        } else { // 上下方向
            if (deltaY > 0) { // 上
                this.goto(cfg.DIRECTOR.UP);
            } else { // 下
                this.goto(cfg.DIRECTOR.DOWN);
            }
        }
    }
    // 执行对应方向动作
    goto(director) {
        gameCtrl.goto(director);
    }
}
