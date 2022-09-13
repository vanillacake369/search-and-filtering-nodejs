const express = require('express'); // nodejs express 서버 모듈
const path = require('path'); // 파일 디렉토리 모듈 
const morgan = require('morgan'); // 요청 로그 기록

const { sequelize } = require('./models');

const app = express();
