# ScriptAutoRunnerを使ってRTコントローラーを拡張します。

貼り付け用コード
```
// raw url
let gistScript = 'https://raw.githubusercontent.com/misaki-s/sar/main/DE/index.js';
fetch(gistScript).then((response) => response.text().then(cb));
function cb(retrievedText){
  eval(retrievedText);
}
```

雷雲アイコン（対象ホスト）に
localhost を指定してください。
