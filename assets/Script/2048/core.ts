const { ccclass, property } = cc._decorator;
@ccclass
export default class Core extends cc.Component {
    _number: number = 0;
    _numberColor: String = '#ffffff';
    _bgColor: String = '#ffffff';
    @property
    onLoad() {

    }

    setNumber(number) {
        this._number = number;
    }

    set
}