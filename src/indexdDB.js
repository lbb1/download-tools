var db;
const init = (tb, store) => {
    var request = window.indexedDB.open(tb, 1);
    request.onsuccess = function (event) {
        db = request.result;
        console.log('数据库打开成功');
    };
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains(store)) {
            var objectStore = db.createObjectStore(store, { keyPath: 'id' });
            // objectStore.createIndex('name', 'name', { unique: true });
            // objectStore.createIndex('email', 'email', { unique: true });
        }
    }
}
const setData = (tb, store, data, callback) => {
    var request = db.transaction(store, 'readwrite')
        .objectStore(store)
        .add(data);

        request.onsuccess = function (event) {
        console.log('数据写入成功');
        callback && typeof callback === 'function' && callback()
    };

    request.onerror = function (event) {
        console.log('数据写入失败');
        console.log(event)
    }
}
const read = (tb, store, index) => {
    var transaction = db.transaction(store);
    var objectStore = transaction.objectStore(store);
    var request = objectStore.get(index);
 
    request.onerror = function(event) {
      console.log('事务失败');
    };
 
    request.onsuccess = function( event) {
       if (request.result) {
         console.log('Name: ' + JSON.stringify(request.result));
       } else {
         console.log('未获得数据记录');
       }
    };
 }

 // db数据导出json
 const exportDataToJson = (dbName, objectStoreName) => {
    // 打开数据库
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
        console.error('Database error:', event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(objectStoreName, 'readonly');
        const objectStore = transaction.objectStore(objectStoreName);

        const data = [];

        objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        } else {
            // 将数据导出为 JSON 文件
            const jsonData = JSON.stringify(data, null, 2); // 使用两个空格缩进，使 JSON 格式更可读
            const blob = new Blob([jsonData], { type: 'application/json' });

            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'data.json'; // 设置下载文件名
            a.click();

            db.close();
        }
        };
    };

 }
 
 module.exports = {
    init,
    setData,
    read,
    exportDataToJson
 }