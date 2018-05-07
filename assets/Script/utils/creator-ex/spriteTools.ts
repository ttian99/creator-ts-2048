/**
 * 精灵工具类
 */


interface BaseSprite extends cc.Sprite {
  _sgNode: SgNode;
}
interface SgNode {
  setState: Function;
}


const { ccclass, property } = cc._decorator;
@ccclass
class SpriteTools {
  // 设置图片变灰
  setGray(sprite: BaseSprite, isGray: boolean, needDelay: boolean) {
    const state = isGray ? 1 : 0;
    if (needDelay) {
      setTimeout(() => {
        sprite._sgNode.setState(state);
      }, 0);
    } else {
      sprite._sgNode.setState(state);
    }
  }

  // 创建精灵节点
  createSpriteNode(spriteFrame: cc.SpriteFrame, nodeName: string = '') {
    const node = new cc.Node(nodeName);
    const sprite: cc.Sprite = node.addComponent(cc.Sprite);
    sprite.spriteFrame = spriteFrame;
    return node;
  }
}

const spriteTools = new SpriteTools();
export default spriteTools;
