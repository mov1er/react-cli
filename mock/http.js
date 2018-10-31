var express = require('express');
var app = express();
var Mock = require('mockjs')

var Random = Mock.Random

bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.post('/login', function (req, res) {
  res.json({
    code: 1,
    message: '登陆成功',
    userInfo: Mock.mock({ name: req.body.userName, 'age|1-100': 100, avatar: Random.image('100x100'), uid: '@id', role: 'guest' })
  });
});

router.post('/usage', (req, res) => {
  let list = [];
  for(var i = 0; i < 47; i++) {
    list.push(
      Mock.mock({
        key: i,
        name: '@first',
        comp: '@first',
        'checktimes|1-10000': 10000,
        'successtimes|1-10000': 10000,
        'gottimes|1-10000': 10000,
        'failtimes|1-10000': 10000,
        'successrate|0.1-2': 100,
        'gotrate|0.1-2': 100,
        'restime|1-10': 10
      })
    )
  }
  res.json({
    code: 1,
    message: '请求成功',
    list
  });
})

router.post('/config', (req, res) => {
  let list = [];
  for(var i = 0; i < 47; i++) {
    list.push(
      Mock.mock({
        key: i,
        name: '@cname',
        esname: '@first',
        supply: '@cname',
        'type|1-2': 1,
        'status|1-2': 1
      })
    )
  }
  res.json({
    code: 1,
    message: '请求成功',
    list
  });
})

router.post('/pub', (req, res) => {
  let list = [];
  for(var i = 0; i < Math.floor(Math.random()*100); i++) {
    list.push(
      Mock.mock({
        key: i,
        clientName: '@first',
        site: '@first',
        'version|1-10': 1,
        date: '@date("yyyy-MM-dd")',
        'type|1-3': 1,
        packageName: '@first',
        code: '@first',
        'current|1-2': 1,
        publisher: '@first',
      })
    )
  }
  res.json({
    code: 1,
    message: '请求成功',
    list
  });
})

router.post('/feat', (req, res) => {
  let list = [];
  for(var i = 0; i < Math.floor(Math.random()*100); i++) {
    list.push(
      Mock.mock({
        key: i,
        name: '@first',
        date: '@date("yyyy-MM-dd")',
        'type|1-3': 1
      })
    )
  }
  res.json({
    code: 1,
    message: '请求成功',
    list
  });
})

router.post('/interface/:id', (req, res) => {
  let list = [];
  for(var i = 0; i < 2; i++) {
    list.push(
      Mock.mock({
        key: i,
        name: '@cname',
        'type|1-2': 1,
        'require|1-2': 1,
        'sign|1-2': 1,
        note: '@word'
      })
    )
  }
  res.json({
    code: 1,
    message: '请求成功',
    data: Mock.mock({
      name: '@cname',
      esname: '@first',
      supply: '@cname',
      'type|1-2': 1,
      'status|1-2': 1,
      incharge: '@word',
      url: '@url',
      mapUrl: '@word',
      method: 'POST',
      format: 'JSON',
      crypto: '@word',
      list
    })
  });
})

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
