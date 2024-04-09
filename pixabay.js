const download = require('./src/download.js')
const parserHtml = require('./src/parserHtml')
// const files = require('./fileurl/src1');
// console.log(files.files);
// files.files.forEach((item) => {
//   console.log(item);
//   download(item);
// });
//download('https://ickeyvedio.ickey.cn/mp4/quality-testing_3.mp4')
const url1 = 'https://pixabay.com/zh/videos/search/%E8%87%AA%E7%84%B6/'
const url2 = 'https://pixabay.com/zh/videos/search/%e8%87%aa%e7%84%b6/?pagi=2'
parserHtml(url1).then((res) => {
    console.log(res)
})


//// 嵌入js
// 初始化indexdb
const {init, setData} = require('./src/indexdDB')
init('pixabay','pixabay')
const getList = function () {
    let getListTime =  setInterval(() => {
        if (window.__BOOTSTRAP__) {
            clearInterval(getListTime)
            let page = window.__BOOTSTRAP__.page.page
            window.__BOOTSTRAP__.page.id = window.__BOOTSTRAP__.page.page
            // 写入数据
            setData('pixabay','pixabay',window.__BOOTSTRAP__.page, function(){
                page += 1
                if (page <= 241) {
                    location.href = 'https://pixabay.com/zh/videos/search/%e8%87%aa%e7%84%b6/?pagi=' + page
                }
            })
        }
    },2000)
}
setTimeout(() => {
    getList()
}, 1000)