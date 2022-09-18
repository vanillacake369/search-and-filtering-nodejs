const express = require('express');
const router = express.Router();

/* test filter 
key : value 
- size : 1평,3평 ...
- rent : 전체,30,50,...
- type : 원룸, 아파트 ...
*/

router.use((req, res, next) => {
    res.locals.size = [];
    res.locals.rent = [];
    res.locals.type = [];
});

// router.get('/result', (req, res) => {
//     res.render('result', {
//         title: "조회 결과"
//     });
// });

router.get('/', (req, res, next) => {
    res.render('main', {
        title: "원룸 조회하기"
    })
});

module.exports = router;