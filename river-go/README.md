# ScriptAutoRunnerを使ってhttps://www.river.go.jp/kawabou を拡張します。

<img width="500" src="rever-go-plugin.png">

ScriptAutoRunnerの設定キャプチャ
<img width="500" src="rever-go-setting.png">

貼り付け用コード

タイトル:川の防災情報
```
// raw url
let gistScript = 'https://raw.githubusercontent.com/misaki-s/sar/main/river-go/sar.js';
fetch(gistScript).then((response) => response.text().then(cb));
function cb(retrievedText){
  eval(retrievedText);
}
```
雷雲アイコン（対象ホスト）: www.river.go.jp
