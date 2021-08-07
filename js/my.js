var myView = {

  init() {
    this.randerUserName();
  },


  randerUserName() {
    var userName = location.search;
    if (!userName) return;


    var reg = /\?phone=(.+)/;
    var str = userName.match(reg)[1];

    str = str.replace(/^(\d{3})(.+)(\d{4})$/, function ($, $1, $2, $3) {
      return $1 + '****' + $3;
    })

    $('.login').text(str).prop('href', `./setting.html?phone=${str}`);
    $('.setting').prop('href', `./setting.html?phone=${str}`);
  }
}



myView.init();