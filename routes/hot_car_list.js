var router = require('koa-router')();
var path = require('path');
let request = require('../helpers/request_with_yield');

function *getHotCarListData(carListLength){
  const uri = 'http://10.0.0.100:20010/ware/car/hot-car/';
  let cityCode = '310000';
  const source = 101;
  const time = new Date().getTime();
  const pageSize = carListLength;
  let params = 'source=' + source + '&' + 'time=' + time + '&' + 'pageSize=' + pageSize;

  let [response, body] = yield request({
    method: 'GET',
    url: uri + cityCode + '?' + params
  });

  if(response.statusCode == 200){
    let data = JSON.parse(body);
    return data;
  }else{

  }
}

router.get('/', function *(next) {
  // console.log(this.query.pageSize)
  const carListLength = this.query.pageSize;
  const hotCarListData = yield getHotCarListData(carListLength);

  this.body = hotCarListData;
});

module.exports = router;
