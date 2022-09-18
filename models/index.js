/*

// 모듈 import
const Sequelize = require('sequelize');
// 모델 import
const Plan = require('./plan');
const Room_Type = require('./room_type');
const Rent = require('./rent');
const Kitchen_Type = require('./kitchen_type');
const Latitude = require('./latitude');
const Longitude = require('./longitude');
const Room = require('./room');

// process.env.NODE_ENV, config, db객체
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json');
const db = {};

// sequlize 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

*/