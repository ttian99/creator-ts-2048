import lodash from '../utils/tools/Lodash';
import support from './support'
import animationCtrl from './animationCtrl';
import cfg from './cfg';

class GameCtrl {
    board: Array<Array<number>> = null; // 方块数据
    conflictedArr: Array<Array<boolean>> = null; // 是否合并过
    layer = null;
    constructor() {
        this.board = new Array();
    }

    initData(gameLayer) {
        // for (var i = 0; i < 4; i++) {
        //     this.board[i] = new Array();
        //     for (var j = 0; j < 4; j++) {
        //         this.board[i][j] = 0;
        //         if (i == 3 && j == 3) {
        //             return true;
        //         }
        //     }
        // }
        this.layer = gameLayer;
        this.board = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 0, 0, 2],
            [2, 0, 0, 2]
        ];
        this.conflictedArr = [
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false]
        ];
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
        if (director === cfg.DIRECTOR.LEFT) { 
            const isMoveLeft = await this.layer.moveLeft();
            if (isMoveLeft) {
                cc.warn(`isMoveLeft = ${isMoveLeft}`);
                this.nextRound();
            };
        } else if (director === cfg.DIRECTOR.RIGHT) {
            const isMoveRight = await this.layer.moveRight();
            if (isMoveRight) {
                this.nextRound();
            };
        } else if (director === cfg.DIRECTOR.UP) {
            const isMoveUp = await this.layer.moveUp();
            if (isMoveUp) {
                this.nextRound();
            };
        } else if (director === cfg.DIRECTOR.DOWN) {
            const isMoveDown = await this.layer.moveDown();
            if (isMoveDown) {
                this.nextRound();
            };
        }
    }

    // 进入下一轮
    nextRound() {
        cc.info('==> nextRound');
        setTimeout(async () => {
            await this.layer.generateOneNumber();
            this.isGameOver && this.layer.gameOver();
        }, 400)
    }

    getPosX(i, j) {
        return support.getPosX(i, j);
    }
    getPosY(i, j) {
        return support.getPosY(i, j);
    }
}

const gameCtrl = new GameCtrl();

window.gameCtrl = gameCtrl;
export default gameCtrl;