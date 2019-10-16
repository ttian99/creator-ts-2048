import  support from './support';

const { ccclass, property } = cc._decorator;
@ccclass
export default class Core extends cc.Component {
    @property(cc.Node) label = null;
    _number: number = 0;
    onLoad() {
        this.label = cc.find('label', this.node);
    }

    setNumber(number) {
        this._number = number;
        this.updateUI();
    }

    updateUI() {
        this.updateVisible();
        this.updateBgColor();
        this.updateNumberColor();
        this.updateNumber();
    }

    updateVisible() {
        this.node.active = this._number === 0 ? false : true;
    }

    updateBgColor() {
        const color = support.getNumberBackgroundColor(this._number);
        // cc.log(this._number + ' , updateBgColor = ' + color);
        this.node.color = new cc.Color().fromHEX(color)
    }

    updateNumberColor() {
        const color = support.getNumberColor(this._number);
        // cc.log(this._number + ' , updateNumberColor = ' + color);
        this.label.color = new cc.Color().fromHEX(color);
    }

    updateNumber() {
        this.label.getComponent(cc.Label).string = this._number + '';
    }
}