var loginView = {

  init() {
    this.phone = '';
    this.code = null;
    this.flag = null;
    this.randerCountDown();
    this.validateLogon();
    this.checkPhone();
  },

  // 获取验证码逻辑
  getCode() {
    var reg = /^(13[0-9]|14[57]|15[0-9]|166|17[3678]|18[0-9]|19[0-9])[0-9]{8}$/;

    this.phone = $('#phone').val();
    self = this;
    this.flag = reg.test(this.phone);
    if (!this.flag) {
      alert('请输入正确的号码');
      $('#phone').val('')
    } else {

      $.ajax({
        url: 'http://huruqing.cn:3000/api/user/getSmsCode',
        type: 'get',
        data: {
          phone: this.phone,
        },
        dataType: 'json',
        success(res) {
          if (res.code == '666') {
            self.code = res.smsCode;
            var layout = self.randomLayout(5000, 20000)

            console.log(`设置 5~20 s 的随机时间来模仿短信请求, 当前次的短信返回时间为 ${layout}毫秒`);

            setTimeout(function () {
              console.log('验证码为' + res.smsCode);

              // 设置 5~20 s 的随机时间来模仿短信请求
            }, layout)

            alert(`验证码已发送到尾号为 ${self.phone.slice(-4)} 的用户\n请打开  控制台  注意查收（有效时间为2分钟）`);

          } else {
            alert(res.code);
          }
        }
      })
    }
  },



  // 倒计时渲染逻辑
  randerCountDown() {
    var oGetPhoneCode = $('.get-phone-code');

    var num = 59;
    var timer = null;
    var lock = true;
    var slef = this;
    oGetPhoneCode.on('click', () => {

      if (lock) {
        this.getCode();


        if (slef.flag) {
          lock = false;

          oGetPhoneCode.text(num);

          timer = setInterval(() => {
            if (num == 1) {
              num = 59;
              oGetPhoneCode.text('重新获取');
              clearInterval(timer);

              lock = true;

            } else {
              num--;
              oGetPhoneCode.text(num);
            }
          }, 1000)
        }
      }
    })
  },


  // 手机号输入时动态检查
  checkPhone() {
    $('#phone').on('input', function () {

      var val = $(this).val();

      // 禁止超长号码
      if (val.length > 11) {
        var value = val.slice(0, 11);
        $(this).val(value);
      } else {

        // 禁止非数字的字符
        var newVal = val.replace(/\D+/, '')
        $(this).val(newVal);
      }


    })
  },


  // 登录验证逻辑
  validateLogon() {
    var self = this;
    $('.submit').on('click', async function () {

      // 验证手机号和验证码
      if ($('#phone').val() == self.phone && $(".code").val() == self.code) {
        console.log($('#phone').val(), self.phone, $(".code").val(), self.code, '用户身份识别成功！');
        console.log('正在登录..........')
        var code = $(".code").val();

        var data = {
          phone: self.phone,
          smsCode: code
        }

        await utils.getData('user/loginBySmsCode', data, 'post')
          .then(function (res) {
            console.log(`${res.msg}，6秒后将自动跳转....`);

            setTimeout(function () {
              var str = self.phone.replace(/^(\d{3})(.+)(\d{4})$/, function ($, $1, $2, $3) {
                return $1 + '****' + $3;
              })
              location.href = `./my.html?phone=${str}`;
            }, 6000)

          }).catch(function (err) {
            alert(err);
          })
      } else {
        console.log($('#phone').val(), self.phone, $(".code").val(), self.code, '用户识别失败！')
      }
    })
  },


  // 随机验证码返回时间
  randomLayout(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}


loginView.init();