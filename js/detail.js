var detailData = {
  async getDetailInfo() {

    var filmId = {
      filmId: this.getFilmId()
    }
    var self = this;

    await utils.getData('film/getDetail', filmId, 'get')
      .then(function (res) {
        self.randerFilm(res.film);

      }).catch(function (err) {
        alert(err);
      });
  },

  randerFilm(data) {
    var actorsStr = '';
    data.actors.forEach((value) => {
      actorsStr += `
        <li>
          <img class="wp-100" src="${value.avatarAddress}" alt="">
          <p>${value.name}</p>
          <p>${value.role}</p>
        </li>
        `
    })

    var str = `
      <header class="header wp-100">
        <img src="${data.poster}" alt="">
        <a href="./index.html">
          <i class="iconfont icon-zuojiantou"></i>
        </a>
      </header>


      <div class="content wp-100 bc-fff fs-14 mb-10">
        <div class="flex jc-sb mb-15 fs-18">
          <div>
            <span class="fc-000">${data.name}</span>
            <i class="iconfont icon-CombinedShape"></i>
          </div>
          <address>${data.grade ? (+data.grade).toFixed(1) : "6.0"}分</address>
        </div>
        <p class="mb-10">剧情</p>

        <p class="mb-5">${utils.conversionTime(data.premiereAt)}上映</p>
        <p class="mb-20">${data.nation} | ${data.runtime}分钟</p>
        <p>${data.synopsis}</p>
      </div>


      <div class="actor wp-100 bc-fff ">
        <p>演职人员</p>
        <div>
          <ul class=" flex fs-12">${actorsStr}</ul>
        </div>
      </div>
      
      <div class="footer-log-out wp-100 fixed bc-fff">选座购票</div>
      
      `;

    $('body').html(str);
  },

  getFilmId() {
    return location.search.split('=')[1];
  }
}

detailData.getDetailInfo();