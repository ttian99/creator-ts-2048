import gameCtrl from './gameCtrl';
import animationCtrl from './animationCtrl';
import cfg from './cfg';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {
  @property(cc.Node) panel = null;
  @property(cc.Prefab) CorePrefab = null;
  @property(cc.Prefab) GameOverLayer = null;
  @property(cc.Label) scoreLabel = null;
  @property(cc.Label) bestScoreLabel = null;
  @property(cc.Label) addScoreLabel = null;
  @property(cc.Label) versionLabel = null;
  coreBake: cc.Node = null;
  coreArr: Array<Array<cc.Node>> = [];
  actArr: Array<Array<cc.Node>> = [];
  startY: number = 0;
  // onLoad 回调会在组件首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下
  onLoad() {
    this.panel = cc.find('panel', this.node);
    this.versionLabel.string = cfg.version;
    window.game = this;
  }
  // start 回调函数会在组件第一次激活前，也就是第一次执行 update 之前触发
  start() {
    this.startY = this.addScoreLabel.node.y;
    this.coreBake = cc.instantiate(this.CorePrefab);
    this.newGame();
  }

  async newGame() {
    this.updateBestScore(gameCtrl.getBestScore());
    this.updateScore(0);
    await this.init();
    await this.updatePanel();
    // 随机2个数字
    // this.generateOneNumber();
    // this.generateOneNumber();
  }

  init() {
    this.panel.destroyAllChildren();
    const arr = gameCtrl.initData(this);
    for (let i = 0; i < 4; i++) {
      this.coreArr[i] = [];
      this.actArr[i] = [];
      for (let j = 0; j < 4; j++) {
        // 静态core显示
        const posX = gameCtrl.getPosX(i, j);
        const posY = gameCtrl.getPosY(i, j);
        const core = cc.instantiate(this.coreBake);
        core.x = posX;
        core.y = posY;
        core.getComponent('core').setNumber(arr[i][j]);
        this.panel.addChild(core);
        this.coreArr[i][j] = core;
        // 动画需要的节点
        const actNode = cc.instantiate(this.coreBake);
        actNode.x = posX;
        actNode.y = posY;
        actNode.getComponent('core').setNumber(0);
        this.panel.addChild(actNode, 30);
        this.actArr[i][j] = actNode;
        // 设置是否合并过
        gameCtrl.setConflited(i, j, false);
        // for循环结束
        if (i === 3 && j === 3) return true;
      }
    }
  }

  // 更新面板
  async updatePanel() {
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
    // cc.log(`generateOneNumber randNumber = ${randNumber}, (${randx}, ${randy})`);
    return true;
  }

  gameOver() {
    const bestScore = gameCtrl.getBestScore();
    if (gameCtrl.score >= bestScore) {
      gameCtrl.setBestScore(gameCtrl.score);
      this.updateBestScore(gameCtrl.score);
    }
    // alert('游戏结束');
    // this.gameOver.active = true;
    const gameOver = cc.instantiate(this.GameOverLayer);
    this.node.addChild(gameOver, 10);
  }

  async moveLeft() {
    const board = gameCtrl.getBoard();
    const conflictedArr = gameCtrl.conflictedArr;
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        const actNode = this.actArr[i][j];
        let allArr = [];

        if (board[i][j] !== 0) {
          for (var k = 0; k < j; k++) {
            const noblock = gameCtrl.noBlockHorizontal(i, k, j, board);
            if (board[i][k] == 0 && noblock) {
              this.updateActCore(i, j);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              // move (i,j)->(i,k)
              this.updateCore(i, j);
              animationCtrl.showMoveAnimation2(actNode, i, j, i, k, (tox, toy) => this.updateCore(tox, toy));
              break;
            } else if (board[i][k] !== 0 && board[i][k] == board[i][j] && noblock && !conflictedArr[i][k]) {
              this.updateActCore(i, j);
              // add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              // reset
              conflictedArr[i][k] = true;
              // move
              this.updateCore(i, j);
              animationCtrl.showMoveAnimation2(actNode, i, j, i, k, (tox, toy) => this.updateCore(tox, toy));
              // add Score
              gameCtrl.addScore(board[i][k] / 2);
              break;
            }
          }
        }
        // 动画结束判断
        if (i == 3 && j == 3) {
          if (allArr.length === 0) return false;
          await Promise.all(allArr)
            .then((results) => {
              return true;
            })
        }
      }
    }
  }

  async moveRight() {
    for (var i = 0; i < 4; i++) {
      for (var j = 2; j >= 0; j--) {
        const actNode = this.actArr[i][j];
        const board = gameCtrl.getBoard();
        const conflictedArr = gameCtrl.conflictedArr;
        const allArr = [];
        if (board[i][j] !== 0) {
          for (var k = 3; k > j; k--) {
            const noblock = gameCtrl.noBlockHorizontal(i, j, k, board);
            if (board[i][k] == 0 && noblock) {
              this.updateActCore(i, j);
              board[i][k] = board[i][j];
              board[i][j] = 0;
              // move (i,j)->(i,k)
              this.updateCore(i, j);
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, i, k, (tox, toy) => this.updateCore(tox, toy));
              allArr.push(act);
              break;
            } else if (board[i][k] !== 0 && board[i][k] == board[i][j] && noblock && !conflictedArr[i][k]) {
              this.updateActCore(i, j);
              // add
              board[i][k] += board[i][j];
              board[i][j] = 0;
              // reset
              conflictedArr[i][k] = true;
              // move
              this.updateCore(i, j);
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, i, k, (tox, toy) => this.updateCore(tox, toy));
              allArr.push(act);
              // add Score
              gameCtrl.addScore(board[i][k] / 2);
              break;
            }
          }
        }

        // 动画结束判断
        if (i == 3 && j == 3) {
          if (allArr.length === 0) return false;
          await Promise.all(allArr)
            .then((results) => {
              this.updatePanel();
              return true;
            }
          )
        }
      }
    }
  }

  async moveUp() {
    for (var j = 0; j < 4; j++) {
      for (var i = 1; i < 4; i++) {
        const actNode = this.actArr[i][j];
        const board = gameCtrl.getBoard();
        const conflictedArr = gameCtrl.conflictedArr;
        const allArr = [];
        if (board[i][j] != 0) {
          for (var k = 0; k < i; k++) {
            const noblock = gameCtrl.noBlockVertical(j, k, i, board);
            if (board[k][j] == 0 && noblock) {
              this.updateActCore(i, j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              this.updateCore(i, j);
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, k, j, (tox, toy) => this.updateCore(tox, toy));
              allArr.push(act);
              break;
            } else if (board[k][j] == board[i][j] && noblock && !conflictedArr[k][j]) {
              this.updateActCore(i, j);
              board[k][j] += board[i][j];
              board[i][j] = 0;
              // reset
              conflictedArr[k][j] = true;
              this.updateCore(i, j);
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, k, j, (tox, toy) => this.updateCore(tox, toy));
              allArr.push(act);
              // add Score
              gameCtrl.addScore(board[k][j] / 2);
              break;
            }
          }
        }
        // 动画结束判断
        if (i == 3 && j == 3) {
          if (allArr.length === 0) return false;
          await Promise.all(allArr)
            .then((results) => {
              return true;
            })
        }
      }
    }
  }
  async moveDown() {
    for (var j = 0; j < 4; j++) {
      for (var i = 2; i >= 0; i--) {
        const actNode = this.actArr[i][j];
        const board = gameCtrl.getBoard();
        const conflictedArr = gameCtrl.conflictedArr;
        const allArr = [];
        if (board[i][j] != 0) {
          for (var k = 3; k > i; k--) {
            const noblock = gameCtrl.noBlockVertical(j, i, k, board);
            if (board[k][j] == 0 && noblock) {
              this.updateActCore(i, j);
              board[k][j] = board[i][j];
              board[i][j] = 0;
              this.updateCore(i, j);
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, k, j, (tox, toy) => this.updateCore(tox, toy));
              allArr.push(act);
              break;
            } else if (board[k][j] == board[i][j] && noblock && !conflictedArr[k][j]) {
              this.updateActCore(i, j);
              board[k][j] += board[i][j];
              board[i][j] = 0;
              // reset
              conflictedArr[k][j] = true;
              this.updateCore(i, j);
              let act = animationCtrl.showMoveAnimation2(actNode, i, j, k, j, (tox, toy) => this.updateCore(tox, toy));
              allArr.push(act);
              // add Score
              gameCtrl.addScore(board[k][j] / 2);
              break;
            }
          }
        }
        // 动画结束判断
        if (i == 3 && j == 3) {
          if (allArr.length === 0) return false;
          await Promise.all(allArr)
            .then((results) => {
              return true;
            })
        }
      }
    }
  }

  // 更新分数
  updateScore(score) {
    this.scoreLabel.string = `${score}`;
  }
  updateBestScore(score) {
    this.bestScoreLabel.string = `${score}`;
  }
  addScore(score) {
    this.addScoreLabel.string = `+${score}`;
    animationCtrl.addScore(this.addScoreLabel.node, this.startY);
  }
}