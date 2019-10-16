import support from './support';

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
            cc.fadeIn(0.05),
            cc.callFunc(resolve)
        ));
    });
}

// 移动动画
function showMoveAnimation(node, fromx, fromy, tox, toy, cb) {
    // cc.info(`==> act start: (${fromx}, ${fromy}) => (${tox}, ${toy})`);
    const startPos = support.getPos(fromx, fromy);
    const endPos = support.getPos(tox, toy)
    // cc.info(`==> act mid: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
    // node.active = true;
    node.stopAllActions();
    var act = cc.sequence(
        cc.moveTo(0.05, cc.v2(endPos.x, endPos.y)),
        cc.callFunc(function () {
            // cc.info(`==> act end: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
            node.setPosition(startPos);
            node.active = false;
            cb && cb(tox, toy);
        })
    );
    node.runAction(act);
}

// 移动动画
function showMoveAnimation2(node, fromx, fromy, tox, toy, cb) {
    return new Promise((resolve, reject) => {
        // cc.info(`==> act start: (${fromx}, ${fromy}) => (${tox}, ${toy})`);
        const startPos = support.getPos(fromx, fromy);
        const endPos = support.getPos(tox, toy)
        // cc.info(`==> act mid: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
        node.active = true;
        node.stopAllActions();
        var act = cc.sequence(
            cc.moveTo(0.1, cc.v2(endPos.x, endPos.y)),
            cc.callFunc(function () {
                // cc.info(`==> act end: (${fromx}, ${fromy}) => (${tox}, ${toy}) || (${startPos.x}, ${startPos.y}) => (${endPos.x}, ${endPos.y})`);
                node.setPosition(startPos);
                node.active = false;
                cb && cb(tox, toy);
                resolve();
            })
        );
        node.runAction(act);
    });
}

// 更新分数
function updateScore(score) {
    //
}

// 加分动画
function addScore(node, startY) {
    node.active = true;
    node.stopAllActions();
    const startPos = node.getPosition();
    const act = cc.sequence(
        cc.callFunc(() => {
            node.y = startY;
            node.opacity = 255;
        }),
        cc.spawn(
            // cc.moveBy(0.5, cc.v2(0, 80)),
            cc.moveTo(1, cc.v2(startPos.x, startPos.y + 50)),
            cc.fadeOut(1)
        ),

        cc.callFunc(() => node.setPosition(startPos))
    );
    node.runAction(act);
}
export default { showNumberWithAnimation, showMoveAnimation, showMoveAnimation2, addScore }