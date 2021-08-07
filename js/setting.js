var settingView = {
  init() {
    this.getUserId();
    this.logout();
  },

  // 获取用户手机号
  getUserId() {
    var str = location.search;
    if (!str) return;

    $('.account-id').text(str.split('=')[1]);
    $('.back').prop('href', `./my.html${str}`);
  },


  // 退出登录
  logout() {
    $('.footer-log-out').on('click', async function () {

      if (!window.confirm('是否退出登录?')) return ;

      await utils.getData('user/logout', {}, 'get').then(function (res) {
        
        alert('退出登录成功！');
        location.href = './my.html'
      }).catch(function (err) {
        alert(err);
      })
    })
  }
}

settingView.init();