
// [Fetch_API文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

class Fetch {

  get(url) {

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors'
    })
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        console.log(res);
      })
  }
}

const fetchEx = new Fetch();
export default fetchEx;
