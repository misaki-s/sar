# ScriptAutoRunnerを使ってBacklogを拡張します。

貼り付け用コード
```
// raw url
let gistScript = 'https://raw.githubusercontent.com/misaki-s/sar/main/backlog/n-proj.js';
fetch(gistScript).then((response) => response.text().then(cb));
function cb(retrievedText){
  eval(retrievedText);
}
```

雷雲アイコン（対象ホスト）
xxxxx.backlog.jp ← 一部伏字にしておきますが使う対象のURLはこのように書いてください
