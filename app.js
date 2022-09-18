// 모듈 선언
const express = require('express'); // nodejs express 서버 모듈
const morgan = require('morgan'); // 요청 로그 기록
const path = require('path'); // 파일 디렉토리 모듈 
const nunjucks = require('nunjucks'); //넌적스 모듈
const dotenv = require('dotenv'); // 환경변수 관리 모듈

dotenv.config();
const pageRouter = require('./routes/page'); // '/'에 대한 미들웨어 변수 지정

// express 모듈 호출, 포트 설정(process.env에 지정되어있지 않다면 3004포트로)
const app = express();
app.set('port', process.env.PORT || 3004);
app.set('view engine', 'html');
// template engine conf : 1.views의 경로 2.app객체연결 3.html파일변경때마다템플릿엔진reload
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev')); // 로그 모듈인 morgan
app.use(express.static(path.join(__dirname, 'public'))); // 현재 경로+public 에 있는 데이터들을 정적으로 서비스해주기
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.urlencoded({ extended: false })); // url에 있는 데이터,즉 js객체들을(쿼리스트링 등등등..) queryString라이브러리를 이용하여 파싱

// '/' 요청에 대한 렌더링 미들웨어 작성
app.use('/', pageRouter);

// 요청에 대해 등록된 라우터 없는 경우의 에러 세팅 : 404
// 에러처리 미들웨어는 next 반드시 넣어줘야함
app.use((req, res, next) => {
    // req.method : get이냐,post냐 등등
    const error = new Error(`${req.method}${req.url}라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// 에러처리 미들웨어 
// 템플릿 엔진의 변수(res.locals)에 에러상태코드 넘김
// production 서버가 아닌 경우의 에러 : 500
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    // process.env.NODE_ENV가 개발모드(dev)일 때는 err 표시, 배포(production)일 때는 빈 객체를 넘겨 에러내역을 안 보여주게함
    res.locals.error = (process.env.NODE_ENV !== 'production') ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// port에서 대기
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})