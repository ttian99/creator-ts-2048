import cfg from '../2048/cfg';
import { wxTools, spriteTools } from '../utils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Xixi extends cc.Component {
  @property(cc.SpriteFrame) SHARE_IMG = null;
  @property(cc.Label) versionLabel = null;
  start() {
    this.versionLabel.string = cfg.version;
    this.init();
  }

  init() {
    wxTools.createGameClubButton();
    wxTools.showShareMenu();
    const url = spriteTools.getTextureUrlAtWechat(this.SHARE_IMG);
    cfg.SHARE_IMG = url;
    wxTools.onShareAppMessage('快来玩和我一起玩Get2048!', url);
  }

  gotoGame() {
    cc.director.loadScene('2048');
  }
}