/**
 * @class stringTools
 * 字符串工具类
 */


/**
 * @method 截取名字
 * @param {String} str 被截取字符串
 * @param {number} n 截取字节长度
 * @return {String} 截取后的字符串
 */
function cutName(str: string, n: number): string {
  if (!n) n = 10;
  const r = /[^\x00-\xff]/g;
  if (str.replace(r, 'mm').length <= n) { return str; }
  const m = Math.floor(n / 2);
  for (let i = m; i < str.length; i++) {
    if (str.substr(0, i).replace(r, 'mm').length >= n) {
      return str.substr(0, i) + '...';
    }
  }
  return str;
};

/**
 * @method numInsertComma 给数字插入逗号
 * @param {number} num 待转化的数值
 * @return {String} 返回转化后的字符串
 */
function numInsertComma(num: number): string {
  const str = num.toString();
  const len = str.length;
  if (len <= 4) {
    return str;
  }
  const r = len % 3;
  return r > 0 ? str.slice(0, r) + ',' + str.slice(r, len).match(/\d{3}/g).join(',') : str.slice(r, len).match(/\d{3}/g).join(',');
};

const stringTools = { cutName };
export default stringTools;