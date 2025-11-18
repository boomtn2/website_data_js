function decodeCookieValue(value) {
    if (!value) return '';
    return value.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}

function run() {
    const targetCookie = cookies.find(c => c.name === "express.sid");

    let obj = [{
        "url": "https://truyenwikidich.net",
        "domain": "truyenwikidich.net",
        "name": "express.sid",
        "value":
            decodeCookieValue(targetCookie['value']),
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "expirationDate": targetCookie['expirationDate'],
    },];

    window.flutter_inappwebview.callHandler(NAME_SET_COOKIE_JS_CALL_HANDLER, JSON.stringify(obj));
}