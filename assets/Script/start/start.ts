import cfg from '../2048/cfg';
import { wxTools, spriteTools } from '../utils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Xixi extends cc.Component {
  @property(cc.Label) versionLabel = null;
  start() {
    this.versionLabel.string = cfg.version;
    this.init();
  }

  init() {
    wxTools.createGameClubButton();
    wxTools.showShareMenu();
  }

  gotoGame() {
    cc.director.loadScene('2048');
  }
}