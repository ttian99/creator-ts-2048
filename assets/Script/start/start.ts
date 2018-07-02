import lodash from '../utils/tools/Lodash';
import cfg from '../2048/cfg';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Xixi extends cc.Component {
  @property(cc.Label) versionLabel = null;
  start() {
    this.versionLabel.string = cfg.version
  }

  gotoGame() {
    cc.director.loadScene('2048');
  }
}