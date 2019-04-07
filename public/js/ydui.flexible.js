! function(e) {
    var t = e.document,
        n = t.documentElement,
        i = "orientationchange" in e ? "orientationchange" : "resize",
        a = function e() {
            var t = n.getBoundingClientRect().width;
            //以下的11.2会在宽420像素以上停止变化，改为21.2后，会在768像素以上才停
            return n.style.fontSize = 5 * Math.max(Math.min(t / 750 * 20, 21.2), 8.55) + "px", e
        }();
    n.setAttribute("data-dpr", e.navigator.appVersion.match(/iphone/gi) ? e.devicePixelRatio : 1), /iP(hone|od|ad)/.test(e.navigator.userAgent) && (t.documentElement.classList.add("ios"), parseInt(e.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8 && t.documentElement.classList.add("hairline")), t.addEventListener && (e.addEventListener(i, a, !1), t.addEventListener("DOMContentLoaded", a, !1))
}(window);
