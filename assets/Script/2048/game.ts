import lodash from '../utils/tools/Lodash';
import gameCtrl from './gameCtrl';
import animationCtrl from './animationCtrl';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
  @property(cc.Node) panel = null;
  @property(cc.Prefab) CorePrefab = null;
  coreBake: cc.Node = null;
  coreArr: Array<Array<cc.Node>> = [];
  actArr: Array<Array<cc.Node>> = [];

  // onLoad 回调会在组件首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下
  onLoad() {
    this.panel = cc.find('panel', this.node);
    window.game = this;
  }
  // start 回调函数会在组件第一次激活前，也就是第一次执行 update 之前触发
  start() {
    this.coreBake = cc.instantiate(this.CorePrefab);
    this.newGame();
  }

  async newGame() {
    await this.init();
    await this.updatePanel();
    // 随机2个数字
    // this.generateOneNumber();
    // this.generateOneNumber();
  }

  init() {
    const arr = gameCtrl.initData(this);
    for (let i = 0; i < 4; i++) {
      this.coreArr[i] = [];
      this.actArr[i] = [];
      for (let j = 0; j < 4; j++) {
        const posX = gameCtrl.getPosX(i, j);
        const posY = gameCtrl.getPosY(i, j);
        const core = cc.instantiate(this.coreBake);
        core.x = posX;
        core.y = posY;
        // cc.info('core.x = ' + core.x + ' , core.y = ' + core.y);
        core.getComponent('core').setNumber(arr[i][j]);
        this.panel.addChild(core);
        this.coreArr[i][j] = core;
        // 动画需要的节点
        const actNode = cc.instantiate(this.coreBake);
        actNode.x = posX;
        actNode.y = posY;
        actNode.getComponent('core').setNumber(arr[i][j]);
        // actNode.active = true;
        this.panel.addChild(actNode, 30);
        this.actArr[i][j] = actNode;

        gameCtrl.setConflited(i, j, false);
        // for循环结束
        if (i === 3 && j === 3) return true;
      }
    }
  }

  // 更新面板
  async updatePanel() {
    cc.error('== updatePanel ');
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const core = this.coreArr[i][j];
        const number = gameCtrl.getNumber(i, j);
        core.getComponent('core').setNumber(number);
        gameCtrl.setConflited(i, j, false);
        // for循环结束
        if (i === 3 && j === 3) return true;
      }
    }
  }
  //
  updateCore(i, j) {
    const core = this.coreArr[i][j];
    const number = gameCtrl.getNumber(i, j);
    core.getComponent('core').setNumber(number);
  }
  updateActCore(i, j) {
    const actCore = this.actArr[i][j];
    const number = gameCtrl.getNumber(i, j);
    actCore.getComponent('core').setNumber(number);
  }
  // 随机生成一个数字
  async generateOneNumber() {
    // 没有空位就返回
    if (gameCtrl.nospace) return false;
    // 随机一个位置
    const { randx, randy, randNumber } = gameCtrl.randOneNumber;
    const node = this.coreArr[randx][randy];
    await animationCtrl.showNumberWithAnimation(node, randx, randy, randNumber);
    cc.log(`generateOneNumber randNumber = ${randNumber}, (${randx}, ${randy})`);
    return true;
  }

  gameOver() {
    alert('游戏结束');
  }

  async moveLeft() {
    cc.warn('==> prepare moveleft');
    const self = this;
    if (!gameCtrl.canMoveLeft) return false;

    function moveOver() {
      cc.error('==> moveOver');
      this.updatePanel();
      return true;
    }

    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        const actNode = this.actArr[i][j];
        const board = gameCtrl.getBoard();
        const conflictedArr = gameCtrl.conflictedArr;
        if (board[i][j] !== 0) {



          let allArr = [];
          for (var k = 0; k < j; k++) {
            cc.error(`k=${k}, j-1=${j - 1}`);

            if (k == j - 1 && i == 3 && j == 3) {
              cc.error('== do over ');
              cc.log(allArr.length);
              var p = Promise.all(allArr);
              p.then((result) => {
                cc.log('result');
                cc.log(result);
                // this.updatePanel();
                // return true;
                moveOver();
              });
            }

            const noblock = gameCtrl.noBlockHorizontal(i, k, j, board);
            if (board[i][k] == 0 && noblock) {
              cc.log(`move to: i=${i},j=${j},k=${k}`);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              // move (i,j)->(i,k)
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, i, k, (tox, toy) => {
                this.updateCore(tox, toy);
              });
              allArr.push(act);
              break;
            } else if (board[i][k] == board[i][j] && noblock && !conflictedArr[i][k]) {
              cc.log(`move combine: i=${i},j=${j},k=${k}`);
              actNode.active = true;
              this.updateActCore(i, j);
              // add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              // reset
              conflictedArr[i][k] = true;
              // move
              this.updateCore(i, j);
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, i, k, (tox, toy) => {
                self.updateCore(tox, toy);
              });
              allArr.push(act);
              // add Score
              // score += board[i][k];
              // updateScore(score);
              break;
            } else {
              cc.info('no move')
            }
          }


        }
      }
    }
    // setTimeout(this.updatePanel.bind(this), 1000);
    // return true;
  }

  moveRight() {
    cc.warn('==> prepare moveRight');
    if (!gameCtrl.canMoveRight) return false;

    for (var i = 0; i < 4; i++) {
      for (var j = 2; j >= 0; j--) {
        const node = this.coreArr[i][j];
        const board = gameCtrl.getBoard();
        const conflictedArr = gameCtrl.conflictedArr;
        if (board[i][j] !== 0) {
          for (var k = 3; k > j; k--) {
            const noblock = gameCtrl.noBlockHorizontal(i, j, k, board);
            if (board[i][k] == 0 && noblock) {
              board[i][k] = board[i][j];
              board[i][j] = 0;
              // move (i,j)->(i,k)
              animationCtrl.showMoveAnimation(node, i, j, i, k, (tox, toy) => {
                // this.updateCore(tox, toy);
                // this.updatePanel();
              });
              break;
            } else if (board[i][k] == board[i][j] && noblock && !conflictedArr[i][k]) {
              // add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              // reset
              conflictedArr[i][k] = true;
              // move
              animationCtrl.showMoveAnimation(node, i, j, i, k, (tox, toy) => {
                // this.updateCore(tox, toy);
                // this.updatePanel();
              });
              // add Score
              // score += board[i][k];
              // updateScore(score);
              break;
            }
          }
        }
      }
    }
    setTimeout(this.updatePanel.bind(this), 500);
    return true;
  }

  moveUp() {
    if (!gameCtrl.canMoveLeft) return false;

    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        const node = this.coreArr[i][j];
        gameCtrl.moveOneRight(i, j, node);
      }
    }

    setTimeout(() => this.updatePanel, 101);
    return true;
  }
  moveDown() {
    if (!gameCtrl.canMoveLeft) return false;

    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        const node = this.coreArr[i][j];
        gameCtrl.moveOneRight(i, j, node);
      }
    }

    setTimeout(() => this.updatePanel, 101);
    return true;
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