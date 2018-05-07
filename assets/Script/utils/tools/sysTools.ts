class SysTools {
  // 可用于在下一帧刷新时调用
  nextTick(cb: Function) {
    setTimeout(cb, 0);
  }
  // 开启或关闭fps
  showFPS(enabled: boolean = true) {
    cc.director.setDisplayStats(enabled);
    const { config, CONFIG_KEY } = cc.game;
    config[CONFIG_KEY.showFPS] = enabled;
  }
  // 取消Canvas模式下矩形优化,防止sprite黑框出现
  disableDirtyRegion() {
    if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
      cc._RendererInSG.enableDirtyRegion(false);
    }
  }
  // 关闭自动全屏功能(PC端的QQ浏览器点击输入框会触发自动全屏)
  disableAutoFullScreen() {
    cc.view.enableAutoFullScreen(false);
  }
  /**
   * 测试浏览器是否支持命令
   * 例如：document.queryCommandSupported('copy');
   */
  caniuse(cmd: string) {
    document.queryCommandSupported(cmd);
  }
  // 获取渲染模式 0-canvas 1-webgl
  getRenderMode() {
    return cc._renderType;
  }
}

const sysTools = new SysTools();
export default sysTools;