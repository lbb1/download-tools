const fs = require('fs');
const https = require('https');

const download = function (url, cb) {
  //let name = url.split('.mp4')[0].split('600/')[1];
  let name = url.split('/')[url.split('/').length - 1];
  let savePath = `path/${name}`;
  const file = fs.createWriteStream(`path/${name}`);
  const request = https.get(url, function (response) {
    const fileStream = fs.createWriteStream(savePath);

    const totalSize = parseInt(response.headers['content-length'], 10);
    let downloadedBytes = 0;

    response.on('data', function (chunk) {
      downloadedBytes += chunk.length;
      const progress = (downloadedBytes / totalSize) * 100;
      console.log(`下载进度: ${progress.toFixed(2)}%`);
      fileStream.write(chunk);
    });

    response.pipe(file).on('end', function () {
      fileStream.end();
      console.log('下载完成');
    });
  });

  file.on('finish', function () {
    console.log('文件下载已完成');
  });

  file.on('error', function (err) {
    console.error('文件下载失败:', err);
  });
};
module.exports = download

