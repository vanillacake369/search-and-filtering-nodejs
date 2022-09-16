const express = require('express'); // nodejs express 서버 모듈
const path = require('path'); // 파일 디렉토리 모듈 
const nunjucks = require('nunjucks'); //넌적스 모듈
const morgan = require('morgan'); // 요청 로그 기록
const { sequelize } = require('./models'); // 시퀄라이즈 모델 연경

const app = express(); // express 모듈
app.set('port', process.env.PORT || 3004);
app.set('view engine', 'html');
/* nunjucks
첫번째 인수 : views 경로('./views'로 전달됨)
두 번째 인수 : 옵션 (watch:true 지정 시, html 코드 수정될 때마다 템플릿 엔진을 reload하게 됨)
*/
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev')); // 로그 모듈인 morgan
app.use(express.static(path.join(__dirname, 'public'))); // 현재 경로+public 에 있는 데이터들을 정적으로 서비스해주기
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.urlencoded({ extended: false })); // url에 있는 데이터,즉 js객체들을(쿼리스트링 등등등..) queryString라이브러리를 이용하여 파싱

app.use('/', indexRouter);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    // res.locals.error = 
})