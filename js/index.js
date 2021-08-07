var homeView = {
  init() {
    this.str = '';
    this.getHomeData();
  },

  async getHomeData() {
    var self = this;

    await utils.getData('film/getList', {}, 'get')
      .then(function (res) {
        self.randerMovieData(res.films);
        self.randerSwiperData(res.banners);

      }).catch(function (err) {
        alert(err);
      })
  },


  // 渲染电影列表
  randerMovieData(data) {

    var $ul = $('.container').find('ul');
    data.forEach((value) => {
      this.str += `
        <li class="wp-100 fs-14">
          <a href="./detail.html?filmId=${value.filmId}" class="flex jc-sb">
            <img src="${value.poster}" alt="">
            <div class="fg1 ml-10">
              <p class="mb-10 flex ">
                <span class="fs-16">${value.name}</span>
                <span class="fc-fff fs-12 ml-5">${value.filmType}</span>
              </p>
              <p class="mb-10">
                <span>观众评分</span>
                <span class="score">${value.grade ? Number(value.grade).toFixed(1) : '6.0'}</span>
              </p>
              <p class="mb-10">主演：${value.actorStr}</p>
              <p>${value.nation} | ${value.runtime}分钟</p>
            </div>
            <span class="buy">购票</span>
          </a>
        </li>`
    })

    $ul.html(this.str);

  },


  // 轮播图插件
  swiperPlugin() {
    new Swiper('.swiper-container', {

      // 循环模式选项
      loop: true,
      autoplay: true,

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      }
    })
  },


  // 渲染轮播图数据
  randerSwiperData(data) {
    var str = '';
    var $swiper = $('.swiper');

    data.forEach((value) => {
      if (value.url) {
        str += `<div class="swiper-slide wp-100">
                <img src="${value.url}" alt="">
              </div>`
      }
    })

    $swiper.html(str);

    // 数据渲染完成才去加载轮播功能和上拉功能
    this.getPullData();
    this.swiperPlugin();
  },


  // 上拉获取数据
  getPullData() {

    // 到达底部的判断： 滚动条滚动的距离 + 视口高度 = 元素底部的相对于文档的距离
    var H = window.innerHeight;
    var $Container = $('.container');
    var $NavBottomBar = $('.nav-bottom-bar');
    var $GetPullData = $('.get-pull-data');

    var containerBot = parseInt($Container.css('height')) + $Container.offset().top;
    var navBottomH = parseInt($NavBottomBar.css('height'));
    var lock = true;
    var page = 2;

    var self = this;

    $GetPullData.text('正在拼命加载中 👻👻👻');


    // 全局滚动事件
    window.onscroll = async function () {
      var scrollY = Math.ceil(window.pageYOffset);

      // 重新获取元素底部的相对于文档的距离
      containerBot = parseInt($Container.css('height')) + $Container.offset().top;
      if ((scrollY + H - navBottomH) - containerBot >= 10 && lock) {

        lock = false;

        var pageNum = {
          pageNum: page,
        };

        await utils.getData('film/getList', pageNum, 'get')
          .then(function (res) {
            if (res.films.length != 0) {
              self.randerMovieData(res.films);

              lock = true;
              page++;

            } else if (res.films.length == 0) {
              $GetPullData.text('没有更多了数据 😨😨😨');
              window.onscroll = null;
            }

          }).catch(function (err) {
            console.log(err);
          });
      }
    }
  }
}


homeView.init();