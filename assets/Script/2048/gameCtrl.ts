import lodash from '../utils/tools/Lodash';

class GameCtrl {
    board: Array<Array<number>> = null; // 方块数据

    constructor() {
        this.board = new Array();
    }

    init() {
        for (var i = 0; i < 4; i++) {
            this.board[i] = new Array();
            for (var j = 0; j < 4; j++) {
                this.board[i][j] = 0;
                if (i == 3 && j == 3) {
                    return true;
                }
            }
        }
    }

    getBoard() {
        return this.board;
    }

    getNumber(x, y) {
        return this.board[x][y];
    }
}

const gameCtrl = new GameCtrl();

window.gameCtrl = gameCtrl;
export default gameCtrl;