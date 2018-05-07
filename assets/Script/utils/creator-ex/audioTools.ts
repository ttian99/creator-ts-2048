class AudioTools {
  em: boolean = true;
  ee: boolean = true;
  mv: number = 0.5;
  ev: number = 0.5;
  audioKey: string = 'defAudioKey';
  musicId: number = -1;

  constructor(audioKey: string = 'defAudioKey') {
    console.log('init audioMgr');
    this.em = true; // 允许播放音乐 enableMuisc
    this.ee = true; // 允许播放音效 enableEffect
    this.mv = 0.5; // 初始音乐音量
    this.ev = 0.5; // 初始音效音量
    this.audioKey = audioKey; // audioKey, 存储到localStorage中的Key值
    this.musicId = -1; // 当前播放音乐的id
    this.save();
    this.addHideListen();
  }
  // 添加后台监听
  protected addHideListen() {
    cc.game.on(cc.game.EVENT_HIDE, () => {
      this.pauseMusic();
      this.stopAllEffects();
    });
    cc.game.on(cc.game.EVENT_SHOW, () => {
      this.resumeMusic();
    });
  }
  // 保存音频设置到localstorage
  save() {
    // if (!this.audioKey) return;
    const rst = {
      disableMusic: !this.em,
      disableEffect: !this.ee,
      musicVolume: this.mv,
      effectVolume: this.ev,
      musicId: this.musicId,
    };
    cc.sys.localStorage.setItem(this.audioKey, JSON.stringify(rst));
  }
  // 加载音频设置从localstorage
  load() {
    if (this.audioKey) {
      const rst = cc.sys.localStorage.getItem(this.audioKey);
      if (!rst) {
        console.error('load audio setting in localstorage error: audio setting is NULL!(audioKey = ' + this.audioKey + ')');
        return;
      }

      try {
        const json = JSON.parse(rst);
        this.em = !json.disableMusic;
        this.ee = !json.disableEffect;
        this.mv = json.musicVolume;
        this.ev = json.effectVolume;
        this.musicId = json.musicId;
      } catch (err) {
        console.error('load audio setting in localstorage error: parse audio setting error!(audioKey = ' + this.audioKey + ')');
      }
    }
  }
  // 获取是否允许播放音频
  get isEnableEffect() {
    return this.ee;
  }
  // 设置是否允许播放音频
  set isEnableEffect(bvar: boolean) {
    this.ee = bvar;
  }
  // 获取是否允许播放音乐
  get isEnableMusic() {
    return this.em;
  }
  // 设置是否允许播放音乐
  set isEnableMusic(bvar: boolean) {
    this.em = bvar;
  }
  // 获取音乐音量
  get musicVolume() {
    return this.mv;
  }
  // 设置音乐音量
  set musicVolume(volume: number) {
    this.mv = volume;
    cc.audioEngine.setVolume(this.musicId, volume);
  }
  // 获取音效音量
  get effectVolume() {
    return this.ev;
  }
  // 设置音效音量
  set effectVolume(volume: number) {
    this.ev = volume;
    const id2audio: Array<number> = cc.audioEngine._id2audio;
    for (const id in id2audio) {
      const newId = parseInt(id, 10);
      if (newId === this.musicId) continue;
      cc.audioEngine.setVolume(newId, volume);
    }
  }
  // 播放音乐
  playMusic(url: string, cb: Function, loop: boolean = true, volume: number) {
    cc.audioEngine.stop(this.musicId);
    volume = (volume && volume <= this.mv) ? volume : this.mv;
    if (this.em) {
      this.musicId = cc.audioEngine.play(url, loop, volume);
      cb && cc.audioEngine.setFinishCallback(this.musicId, cb);
    }
    return this.musicId;
  }
  // 停止音乐
  stopMusic() { // (releaseData = true) {
    cc.audioEngine.stop(this.musicId);
    return this.musicId;
  }
  // 暂停音乐
  pauseMusic() {
    cc.audioEngine.pause(this.musicId);
    return this.musicId;
  }
  // 继续音乐
  resumeMusic() {
    if (this.em) {
      cc.audioEngine.resume(this.musicId);
    }
    return this.musicId;
  }
  // 是否在播放背景音乐
  isMusicPlaying() {
    return cc.audioEngine.getState(this.musicId) === cc.audioEngine.AudioState.PLAYING;
  }
  // 播放音效
  playEffect(url: string, cb: Function, loop: boolean = false, volume: number) {
    volume = (volume && volume <= this.ev) ? volume : this.ev;
    let effectId = -1;
    if (this.ee) {
      effectId = cc.audioEngine.play(url, loop, volume);
      cb && cc.audioEngine.setFinishCallback(effectId, cb);
    }
    return effectId;
  }
  // 暂停播放单个音效
  pauseEffectById = id => cc.audioEngine.pause(id);
  // 继续播放单个音效
  resumeEffectById = id => cc.audioEngine.resume(id);
  // 停止播放单个音效
  stopEffectById = id => cc.audioEngine.stop(id);
  // 停止所有音效
  stopAllEffects() {
    const id2audio = cc.audioEngine._id2audio;
    for (const id in id2audio) {
      if (id === this.musicId) continue;
      const audio = id2audio[id];
      const state = audio.getState();
      if (state === cc.audioEngine.AudioState.PLAYING) {
        audio.stop();
      }
    }
  }
  // 停止播放所有(音乐+音效)
  pauseAll = () => cc.audioEngine.pauseAll();
  // 继续播放所有(音乐+音效)
  resumeAll = () => cc.audioEngine.resumeAll();
}

const audioTools = new AudioTools();
export default audioTools;