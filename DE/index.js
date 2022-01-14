// プリセット切り替え
const changePreset = function(p){
    const data = {programid:"default",presetid:p}
    fetch("http://localhost:8234/trinity/v1/presets.json", {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    // ブラウザ再読み込み
    location.reload()
}

// threshold = 100 進捗率100%で処理で更新ボタンを押す
const startViewer = function (threshold = 100) {
    const startDEViewer = function (threshold) {
        // スタートタブをクリック
        document.getElementById('start').click();

        // コントローラーで各ユニットデータの進捗率をチェックする
        let elem = document.getElementById('t8frame');
        let els = elem.contentWindow.document.querySelectorAll("#view_labels .view_label_wrap");
        let isOK = true;
        console.log(els);
        for (const key in els) {
            if (Object.hasOwnProperty.call(els, key)) {
                const element = els[key];
                let progressnum = parseInt(element.querySelector(".view_label_progress_bar").style.width);
                if (progressnum <= threshold) {
                    isOK = false;
                }
            }
        }
        if (isOK) {
            console.log("OK");
            // 更新ボタンをクリック
            elem.contentWindow.document.querySelector("#convert_preview_button").click();
            // ダイアログのOKをクリック
            let dialogOk = elem.contentWindow.document.querySelector("#cboxContent #gui_comfirm_ok_button");
            if (dialogOk){
                console.log("Viewr START");
                dialogOk.click();
            }
            return true;
        } else {
            console.log("Retry.");
            return false;
        }
    }

    let fn = function () {
        let sec = tm * i / 1000;
        console.log(`${sec}秒経過 試行${i}回目`);
        if (startDEViewer(threshold)) {
            clearInterval(id);
        }
        i++;
    }
    var tm = 5000; // msec
    var i = 1;
    let id = setInterval(fn, tm);
}
