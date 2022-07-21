// backlogのチケットタイトルにリンクをつける
let issue = document.querySelector('#issueArea')
if (issue == null) {
    console.log("個別チケットではないページ");
} else {
    const action = () => {
        let isSuccess = false;
        let g = document.querySelector('.ticket__title.title-group__title');
        let n = document.querySelector('.ticket__key-number').innerText;
        let shortNo = n.replace("NMAPS_", "");
        if (g) {
            let titleUrl = location.href.split("#")[0];
            let html = g.innerHTML;
            let matches = html.match(/<span(.*)>(.*)<\/span>/);
            let a = `<span style="font-weight:normal;width: 10em;padding-left: 26px;">[${shortNo}]</span>&nbsp;<a href="${titleUrl}" style="font-weight:normal;" ${matches[1]}">${matches[2]}</a>`;
            g.querySelector('span').remove();
            g.innerHTML = a;
            g.style.display = "inherit";

            // テスト依頼ひな型差し込みボタン追加(backlogのjQueryで動作します。)
            $("#expnadableArea li.comment-editor__tools-left.button-list__item > ul").append(`<li class="button-list__item" id="js_insertTestTemplate"><button type="button" class="icon-button icon-button--inverse | simptip-position-top simptip-movable simptip-smooth js_emojiButton" tabindex="-1" data-tooltip="テスト依頼ひな型差し込み" aria-label="絵文字"><svg role="image" class="icon -medium project-nav-list__icon">
            <use xlink:href="/images/svg/sprite.symbol.svg#icon_issues"></use>
        </svg></button></li>`);
            $("#js_insertTestTemplate").on("click", function (e) {
                $("#leftCommentContent").html("<p>" +
                    `## 修正内容

（ユーザーストーリーに対する修正内容）
（修正コード、ブランチ、Gitコミット、ドキュメントの場所など　開発向け情報があれば書く）

-----------

## テスト

以下の確認をお願いします。
【バージョン互換テスト】プリセット：要・不要 / シーン：要・不要 / 気象簡易：要・不要
（過去バージョンで作成→テストバージョンで展開するテストの要・不要を記入）

（テスト手順を書く）`.split("\n").map(function (t) { return t.trim(); }).join("</p><p>") + "</p>");
            })

            // 2022/07/11 親子アイコンが追加され、レイアウトが崩れる
            let mdbody = document.querySelector('.title-group__title .markdown-body');
            mdbody.style.position = "relative";
            mdbody.style.display = "inline-block";
            mdbody.style.width = "100%";

            isSuccess = true;
        }
        return isSuccess
    }
    const tid = setInterval(() => {
        if (action()) {
            clearInterval(tid);
        }
    }, 300);

    let href = location.href;
    let observer = new MutationObserver(function (mutations) {
        if (href !== location.href) {
            console.log(`[pjax] Before:${href
                } After:${location.href}`);
            href = location.href;
            location.reload();
        }
    });

    observer.observe(document, { childList: true, subtree: true });
}
