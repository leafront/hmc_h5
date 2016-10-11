let koa = require('koa');
let app = koa();
let path = require('path');
let serve = require('koa-static');
let koaBody = require('koa-body')();
let Router = require('koa-router')();

const send = require('koa-send');

let request = require('./helpers/request_with_yield');

// let userCenter = require('./routes/user_center');
// let hotCarList = require('./routes/hot_car_list');

app.use(serve(__dirname + '/public'));

// Router.use('/user_center', userCenter.routes());
// Router.use('/getHotCarList', hotCarList.routes());

// Router.post('/user/validate_phone', koaBody, function *(next){
//   let [response, body] = yield request({
//     method: 'POST',
//     url: 'http://10.0.0.100:20010/user/member/validate-phone',
//     headers:{'Content-Type':'application/json'},
//     json:{
//       time: new Date().getTime(),
//       source: '101',
//       data: {
//         userPhone:13512341234
//       }
//     }
//   });
//
//   this.body = {
//     test:this.request.body
//   }
// });

// Router.get('/getCarModelList/:carSeriesId', function *(next){
//   this.body = {
//     data :[
//       {
//         carSeriresName: "3系",
//         carInfo: [
//           {carName: "320i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"},
//           {carName: "320i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"}
//         ]
//       },
//       {
//         carSeriresName: "2系",
//         carInfo: [
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"},
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"}
//         ]
//       },
//       {
//         carSeriresName: "2系",
//         carInfo: [
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"},
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"}
//         ]
//       },
//       {
//         carSeriresName: "2系",
//         carInfo: [
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"},
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"}
//         ]
//       },
//       {
//         carSeriresName: "2系",
//         carInfo: [
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"},
//           {carName: "220i", carPrice: "¥10万 ~ ¥30万", carImageLink: "http://static.haomaiche.com/common/images/type/b509656c684942278092e54fd91fb470.png"}
//         ]
//       }
//     ]
//   }
// })

// Router.get('/getBrandList', function *(next){
//   this.body = {
//     data:[
//       {
//         firstLetter: 'A',
//         carBrandList:[
//           {
//             name: 'Audi',
//             imageLink: 'http://www.haomaiche.com//upload/finalFileDir/brand/d5092878425b48069e452d18d97530a5.png',
//             carBrandId: 'ABCD123'
//           },
//           {
//             name: 'BMW',
//             imageLink: 'http://www.haomaiche.com//upload/finalFileDir/brand/d5092878425b48069e452d18d97530a5.png',
//             carBrandId: '123CD123'
//           }
//         ]
//       }
//     ]
//   }
// });

Router.get('*', function *(next){
  yield send(this, 'public/index.html');
});

app.use(Router.routes());

app.listen(process.env.PORT || 3000);
