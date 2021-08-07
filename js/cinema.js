var cinemaView = {
  init() {
    this.cinemaData = null;

    this.$AllCityBtn = $('.all-city-btn');
    this.$ChangeCity = $('.change-city');
    this.$Mask = $('.mask');
    this.getCinemaData();
    this.bindElement();
  },


  // 获取数据
  async getCinemaData() {
    var self = this;

    await utils.getData('cinema/getList', {}, 'get')
      .then(function (res) {
        self.renderList(res.cinemas);
        self.cinemaData = res.cinemas;

      }).catch(function (err) {
        alert(err);
      })
  },


  // 渲染列表
  renderList(data) {
    var str = '';
    var $ContainerList = $('.container-list');
    data.forEach(value => {
      str += `<li class="flex jc-sb ai-c">
                <div>
                    <p class="fs-15 place-name">${value.name}</p>
                    <p class="fs-12 mt-10"> ${value.address}</p>
                </div>
                <div class="fs-12">
                    <p>￥ ${value.lowPrice / 100} 元起</p>
                    <p>${value.areaName} ${value.Distance.toFixed(1)} km</p>
                </div>
              </li>`
    });
    $ContainerList.html(str);

  },


  // 绑定事件
  bindElement() {
    var self = this;
    var $ChangeCityContainer = $('.change-city-container');
    
    // 显示城市列表和遮罩层的点击事件
    this.$AllCityBtn.on('click', function () {

      var attr = self.$ChangeCity.css('display');

      if (attr == 'block') {
        self.$ChangeCity.css('display', 'none');
        self.$Mask.css('display', 'none');

      } else {
        self.$ChangeCity.css('display', 'block');
        self.$Mask.css('display', 'block');
      }
    })


    // 城市列表的点击事件
    $ChangeCityContainer.on('click', function (e) {
      self.changeCityList(e);
    })


    // 遮罩层的点击事件
    this.$Mask.on('click', () => {
      self.$ChangeCity.css('display', 'none');
      self.$Mask.css('display', 'none');
    })
  },


  // 城市列表里的城市被点击后的处理函数
  changeCityList(e) {
    var $dom = $(e.target);
    var $Active = $('.active');

    if ($dom.children().length == 0) {
      $Active.removeClass();
      $dom.addClass('active');

      this.$AllCityBtn.find('span').text($dom.text());
    }

    var filtedData = this.cinemaData.filter(value => {
      if ($dom.text() == '全城' || $dom.text().length > 10) {
        return value;
      } else {
        return $dom.text() == value.areaName;
      }
    })

    this.renderList(filtedData);
    this.$ChangeCity.css('display', 'none');
    this.$Mask.css('display', 'none');
  },
}

cinemaView.init();