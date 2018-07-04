
import gameCtrl from "./gameCtrl";
import { wxTools } from "../utils";
import cfg from "./cfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameOverLayer extends cc.Component {
  @property(cc.Prefab) CoreBg = null;
  @property(cc.Label) scoreLabel = null;
  start() {
    this.scoreLabel = `得分: ${gameCtrl.score}`;
  }
  clickReplayBtn() {
    this.node.destroy();
    gameCtrl.newGame();
  }
  clickShareBtn() {
    wxTools.shareAppMessage('我在Get2048中获得了', cfg.SHARE_IMG);
  }
}