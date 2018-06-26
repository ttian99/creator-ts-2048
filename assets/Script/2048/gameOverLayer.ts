
import gameCtrl from "./gameCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOverLayer extends cc.Component {
  @property(cc.Prefab) CoreBg = null;
  start() {

  }
  clickReplayBtn() {
    this.node.destroy();
    gameCtrl.newGame();
  }
}