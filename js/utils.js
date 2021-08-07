utils = {

  // 请求数据
  getData(url, data = {}, type) {
    var url = 'http://huruqing.cn:3000/api/' + url;

    var result = new Promise(function (resolve, reject) {
      $.ajax({
        url,
        type,
        data,
        dataType: 'json',
        success(res) {
          if (res.code == '666') {
            resolve(res);
          } else {
            reject('请求失败!')
          }
        },
        error (err) {
          reject('请求失败，' + err + '，请稍后重试')
        }
      })
    })
    return result;
  },

  // 将一个秒数转换为 xxxx-yy-zz 格式的时间
  conversionTime(timeStr) {
    var time = new Date(timeStr * 1000);
    var str;

    var year = time.getFullYear();
    var month = '0' + (+time.getMonth() + 1);
    var day = '0' + time.getDate();

    str = `${year}-${month.slice(0, 2)}-${day.slice(0, 2)}`

    return str;
  },
}