
import gameCtrl from "./gameCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PanelBg extends cc.Component {
  @property(cc.Prefab) CoreBg = null;
  start() {
    this.initBg();
  }
  initBg() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // 静态core显示
        const posX = gameCtrl.getPosX(i, j);
        const posY = gameCtrl.getPosY(i, j);
        const core = cc.instantiate(this.CoreBg);
        core.x = posX;
        core.y = posY;
        this.node.addChild(core);
      }
    }
  }
}