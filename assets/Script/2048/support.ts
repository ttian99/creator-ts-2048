// documentWidth = window.screen.availWidth;
// gridContainerWidth = 0.92 * documentWidth;
// cellSideLength = 0.18 * documentWidth;
// cellSpace = 0.04 * documentWidth;

// function getPosTop(i, j) {
//     return cellSpace + i * (cellSpace + cellSideLength);
// }

// function getPosLeft(i, j) {
//     return cellSpace + j * (cellSpace + cellSideLength);
// }

const cellSpace = 125;

function getPos(i, j) {
    return {
        x: getPosX(i, j),
        y: getPosY(i, j),
    }
}

function getPosX(i, j) {
    return (j - 2) * (cellSpace + 20) + (cellSpace / 2 + 10);;
}

function getPosY(i, j) {
    return -(i - 1) * (cellSpace + 20) + (cellSpace / 2 + 10);
}

// 获取方块背景颜色
function getNumberBackgroundColor(number: number) {
    switch (number) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#99cc00";
        case 1024: return "#33b5e5";
        case 2048: return "#0099cc";
        case 4096: return "#aa66cc";
        case 8192: return "#9933cc";
        default: return "#000000";
    }
}
// 获取方块字体颜色
function getNumberColor(number: number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'ffffff';
}

// 检测是否有空位
function nospace(board: Array<Array<Object>>) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}


// 可以左移动
// 1.左边是否没有数字
// 2.左边数字是否和自己相等
function canMoveLeft(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 可以右移动
// 1.右边是否没有数字
// 2.右边数字是否和自己相等
function canMoveRight(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 可以上移动
// 1.上边是否没有数字
// 2.上边数字是否和自己相等
function canMoveUp(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 可以下移动
// 1.下边是否没有数字
// 2.下边数字是否和自己相等
function canMoveDown(board) {
    for (let j = 0; j < 4; j++) {
        for (let i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 判断是否有障碍物
 * 第row行，col1列到col2列之间
 */
function noBlockHorizontal(row, col1, col2, board) {
    if (col1 == col2 - 1) return true;
    for (let i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }

        if (i == col2 - 1) return true;
    }
}

/**
 * 判断是否有障碍物
 * 第col列，row1行到row2行之间
 */
function noBlockVertical(col, row1, row2, board) {
    if (row1 == row2 - 1) return true;
    for (let i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }

        if (i == row2 - 1) return true;
    }
}

// 判断是否可以移动
function nomove(board) {
    if (canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board)) {
        return false;
    }
    return true;
}

export default { getNumberBackgroundColor, getNumberColor, nospace, canMoveLeft, canMoveRight, canMoveUp, canMoveDown, noBlockHorizontal, noBlockVertical, nomove, getPosX, getPosY, getPos }