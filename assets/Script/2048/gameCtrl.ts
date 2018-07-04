import support from './support'
import cfg from './cfg';
import { loc } from '../utils';

class GameCtrl {
    board: Array<Array<number>> = null; // 方块数据
    conflictedArr: Array<Array<boolean>> = null; // 是否合并过
    layer = null;
    score: number = 0; // 得分
    bestScore: number = 0; //最高分
    isMoving: boolean = false; // 正在移动，不能下一步操作
    delScore: number = 0; // 单次操作增加的分数
    constructor() {
        this.board = new Array();
    }

    initData(gameLayer) {
        this.score = 0; // 得分
        this.layer = gameLayer;
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 4, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ];
        // this.randOneNumber();
        // this.randOneNumber();
        this.conflictedArr = [
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false]
        ];
        this.isMoving = false;
        return this.board;
    }
    // 获取面板数据
    getBoard = () => this.board;
    // 获取对应数值
    getNumber = (x, y) => this.board[x][y];
    // 是否合并过
    getConflited = (x, y) => this.conflictedArr[x][y];
    // 设定是否合并过
    setConflited = (x, y, boolean) => this.conflictedArr[x][y] = boolean;
    // 随机生成一个
    get randOneNumber() {
        const board = this.board;
        // 随机一个位置
        let randx = Math.floor(Math.random() * 4);
        let randy = Math.floor(Math.random() * 4);
        let times = 0;
        while (times < 50) {
            if (board[randx][randy] == 0) {
                break;
            }
            randx = Math.floor(Math.random() * 4);
            randy = Math.floor(Math.random() * 4);
            times++;
        }

        if (times == 50) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] == 0) {
                        randx = i;
                        randy = j;
                    }
                }
            }
        }
        // 随机一个数字
        var randNumber = Math.random() < 0.5 ? 2 : 4;
        // 在随机位置显示随机数字
        board[randx][randy] = randNumber;
        return { randx, randy, randNumber };
    }
    // 是否还有空位
    get nospace() {
        return support.nospace(this.board);
    }
    // 是否不可移动了
    get nomove() {
        return support.nomove(this.board);
    }
    // 是否游戏结束
    get isGameOver() {
        return this.nospace && this.nomove;
    }
    get canMoveLeft() {
        return support.canMoveLeft(this.board);
    }
    get canMoveRight() {
        return support.canMoveRight(this.board);
    }
    get canMoveUp() {
        return support.canMoveUp(this.board);
    }
    get canMoveDown() {
        return support.canMoveDown(this.board);
    }

    noBlockHorizontal(row, col1, col2, board) {
        return support.noBlockHorizontal(row, col1, col2, board);
    }

    noBlockVertical(col, row1, row2, board) {
        return support.noBlockVertical(col, row1, row2, board);
    }

    // 滑动后的动作
    async goto(director) {
        this.delScore = 0;
        if (this.isMoving) return cc.warn('正在移动，不能进行下一步操作');
        if (director === cfg.DIRECTOR.LEFT) {
            if (this.canMoveLeft) {
                this.isMoving = true;
                await this.layer.moveLeft();
                this.nextRound();
            }
        } else if (director === cfg.DIRECTOR.RIGHT) {
            if (this.canMoveRight) {
                this.isMoving = true;
                await this.layer.moveRight();
                this.nextRound();
            }
        } else if (director === cfg.DIRECTOR.UP) {
            if (this.canMoveUp) {
                this.isMoving = true;
                await this.layer.moveUp();
                this.nextRound();
            }
        } else if (director === cfg.DIRECTOR.DOWN) {
            if (this.canMoveDown) {
                this.isMoving = true;
                await this.layer.moveDown();
                this.nextRound();
            }
        } else {
            this.isMoving = false;
        }
    }

    // 重置合并属性
    resetConflict() {
        this.conflictedArr = [
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false]
        ];
    }

    // 进入下一轮
    async nextRound() {
        this.resetConflict();
        setTimeout(async () => {
            this.isMoving = false;
            await this.layer.generateOneNumber();
            this.isGameOver && this.layer.gameOver();
        }, 150)
    }

    getPosX(i, j) {
        return support.getPosX(i, j);
    }
    getPosY(i, j) {
        return support.getPosY(i, j);
    }

    addScore(score) {
        this.score += score;
        this.layer.addScore(score);
        this.layer.updateScore(this.score);
    }
    addScoreNew() {
        // this.score += score;
        this.score += this.delScore;
        this.layer.addScore(this.delScore);
        this.layer.updateScore(this.score);
        this.delScore = 0;
    }

    getBestScore(): number {
        const bestScore = loc.get('bestScore');
        return bestScore ? bestScore : 0;
    }

    setBestScore(score) {
        loc.set('bestScore', score);
    }

    newGame() {
      this.layer.newGame();
    }
}

const gameCtrl = new GameCtrl();

window.gameCtrl = gameCtrl;
export default gameCtrl;