var SHARE = {
  TITLE: '快来玩没有广告的2048哦~',
  IMG: 'share/share.jpg'
};

// 被动转发监听
wx.onShareAppMessage(function () {
  return {
    title: SHARE.TITLE,
    imageUrl: SHARE.IMG
  }
});

// 到处分享到全局
window.SHARE = SHARE;
