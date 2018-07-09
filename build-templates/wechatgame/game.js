require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "undefined";
wxDownloader.SUBCONTEXT_ROOT = "";
require('src/settings');

// 配置分享图片
require('share/share.js');

require('main');

