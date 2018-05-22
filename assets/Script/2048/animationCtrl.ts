import support from './support';
import gameCtrl from './gameCtrl';

// 生成数字动画
function showNumberWithAnimation(node, i, j, randNumber) {
    return new Promise((resolve, reject) => {
        node.getComponent('core').setNumber(randNumber);
        node.stopAllActions();
        node.runAction(cc.sequence(
            cc.callFunc(() => {
                node.setPosition(support.getPos(i, j))
                node.opacity = 0;
            }),
            cc.fadeIn(0.5),
            cc.callFunc(resolve)
        ));
    });
}

// 移动动画
function showMoveAnimation(node, fromx, fromy, tox, toy) {
    return new Promise((resolve, reject) => {
        cc.info(`==> act start: (${fromx}, ${fromy}) => (${tox}, ${toy})`);
        const startPos = support.getPos(fromx, fromy);
        const endPos = support.getPos(tox, toy)
        cc.info(`==> act mid: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
        node.active = true;
        node.stopAllActions();
        var act = cc.sequence(
            cc.moveTo(0.5, cc.p(endPos.x, endPos.y)),
            cc.callFunc(function () {
                cc.info(`==> act end: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
                node.setPosition(startPos);
                // node.getComponent('core').setNumber(0);
                // cb && cb(tox, toy);
                // node.destroy();
                node.active = false;
                resolve();
            })
        );
        node.runAction(act);
    });

}

// 移动动画
function showMoveAnimation2(node, fromx, fromy, tox, toy, cb) {
    cc.info(`==> act start: (${fromx}, ${fromy}) => (${tox}, ${toy})`);
    const startPos = support.getPos(fromx, fromy);
    const endPos = support.getPos(tox, toy)
    cc.info(`==> act mid: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
    node.active = true;
    node.stopAllActions();
    var act = cc.sequence(
        cc.moveTo(0.5, cc.p(endPos.x, endPos.y)),
        cc.callFunc(function () {
            cc.info(`==> act end: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
            node.setPosition(startPos);
            node.active = false;
            cb && cb();
        })
    );
    node.runAction(act);
}


// 更新分数
function updateScore(score) {
    // 
}
export default { showNumberWithAnimation, showMoveAnimation, showMoveAnimation2 }