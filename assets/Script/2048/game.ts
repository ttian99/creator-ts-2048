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

  // onLoad 回调会在组件首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下
  onLoad() {
    this.panel = cc.find('panel', this.node);
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
      for (let j = 0; j < 4; j++) {
        const core = cc.instantiate(this.coreBake);
        core.x = gameCtrl.getPosX(i, j);
        core.y = gameCtrl.getPosY(i, j);
        // cc.info('core.x = ' + core.x + ' , core.y = ' + core.y);
        core.getComponent('core').setNumber(arr[i][j]);
        this.panel.addChild(core);
        this.coreArr[i][j] = core;
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
    if (!gameCtrl.canMoveLeft) return false;

    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        const node = this.coreArr[i][j];
        const board = gameCtrl.getBoard();
        const conflictedArr = gameCtrl.conflictedArr;
        if (board[i][j] !== 0) {



          let allArr = [];
          for (var k = 0; k < j; k++) {
            cc.error(`k=${k}, j-1=${j - 1}`);

            if (k == j - 1) {
              cc.error('== do over ');
              var p = Promise.all(allArr);
              p.then(function (result) {
                cc.log('result');
                cc.log(result);
                this.updatePanel();
                return true;
              });
            }

            const noblock = gameCtrl.noBlockHorizontal(i, k, j, board);
            if (board[i][k] == 0 && noblock) {
              board[i][k] = board[i][j];
              board[i][j] = 0;
              // move (i,j)->(i,k)
              // var act = animationCtrl.showMoveAnimation(node, i, j, i, k);
              // allArr.push(act);
              break;
            } else if (board[i][k] == board[i][j] && noblock && !conflictedArr[i][k]) {
              // add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              // reset
              conflictedArr[i][k] = true;
              // move
              // animationCtrl.showMoveAnimation(node, i, j, i, k, (tox, toy) => {
              //   // this.updateCore(tox, toy);
              // });
              // add Score
              // score += board[i][k];
              // updateScore(score);
              // const act = animationCtrl.showMoveAnimation(node, i, j, i, k);
              // allArr.push(act);
              break;
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