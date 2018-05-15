// function showNumberWithAnimation(i, j, randNumber) {
//     var numberCell = $('#number-cell-' + i + '-' + j);

//     numberCell.css('background-color', getNumberBackgroundColor(randNumber));
//     numberCell.css('color', getNumberColor(randNumber));
//     numberCell.text(randNumber);

//     numberCell.animate({
//         width: cellSideLength + 'px',
//         height: cellSideLength + 'px',
//         top: getPosTop(i, j),
//         left: getPosLeft(i, j)
//     }, 50);
// }

// function showMoveAnimation(fromx, fromy, tox, toy) {
//     var numberCell = $('#number-cell-' + fromx + '-' + fromy);
//     numberCell.animate({
//         top: getPosTop(tox, toy),
//         left: getPosLeft(tox, toy)
//     }, 100);
// }

// function updateScore(score) {
//     $('#score').text(score);
// }

import support from './support';

// 生成数字动画
function showNumberWithAnimation(node, i, j, randNumber) {
    node.getComponent('core').setNumber(randNumber);
    node.stopAllActions();
    node.runAction(cc.sequence(
        cc.callFunc(() => node.opacity = 0),
        cc.fadeIn(0.5),
    ));
}

// 移动动画
function showMoveAnimation(node, fromx, fromy, tox, toy) {
    
    node.stopAllActions();
    node.runAction(cc.sequence(
        cc.callFunc(() => )
    ))
}

// 更新分数
function updateScore(score) {
    // 
}
export default { showNumberWithAnimation, showMoveAnimation }