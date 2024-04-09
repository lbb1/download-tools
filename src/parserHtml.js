const https = require('https');


const parserHtml = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
              data += chunk;
            });
            response.on('end', () => {
                resolve(data)
            });
          }).on('error', (error) => {
            reject(error.message)
          });
    })
}
module.exports = parserHtml