(function(){
  // 国土交通省 川の防災情報にObsrvtnPointFullCodeを表示する
  // https://www.river.go.jp/
  function initPlugin(){
      let deExt = document.createElement("div");
      deExt.classList.add('de-ext');
      deExt.style.position = "absolute";
      deExt.style.bottom = "4px";
      deExt.style.right = "4px";
      deExt.innerHTML = `
      <div style="border:1px solid #ccc; border-radius:4px; padding:4px;">
          <label for="de-obsrvtnpointfullcode">ObsrvtnPointFullCode</label>:
          <input type="text" id="de-obsrvtnpointfullcode" style="border: 1px solid #ccc; padding: 0 4px;"/>
      </div>
      `;
      document.body.append(deExt);
  }

  function updateOBSFullCd(){
      let url = new URL(location.href);
      let ofcCd = url.searchParams.get("ofcCd");
      let itmkndCd = url.searchParams.get("itmkndCd");
      let obsCd = url.searchParams.get("obsCd");
      let obsFullCd = "0000000000000";
      if (ofcCd && itmkndCd && obsCd) {
          obsFullCd = ofcCd.padStart(5, "0")
              + itmkndCd.padStart(3, "0")
              + obsCd.padStart(5, "0");
          let input = document.querySelector('#de-obsrvtnpointfullcode');
          input.value = obsFullCd;
      }
  }

  let href = location.href;
  let observer = new MutationObserver(function (mutations) {
      if (href !== location.href) {
          console.log(`[pjax] Before:${href} After:${location.href}`);
          href = location.href;
          updateOBSFullCd();
      }
  });

  observer.observe(document, { childList: true, subtree: true });
})();
