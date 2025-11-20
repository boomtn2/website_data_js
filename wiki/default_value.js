const BASE_URL = "https://truyenwikidich.net/";

function normalizeUrl(url) {
    url = url.trim();

    return url.replace(/\/+$/, "");
}

class Response {
    static success(data = {}) {
        window.flutter_inappwebview.callHandler('RESPONSE', JSON.stringify(data));
    }

    static next(data = {}) {
        window.flutter_inappwebview.callHandler('NEXT', JSON.stringify(data));
    }

    static error(data = {}) {
        window.flutter_inappwebview.callHandler('ERROR', JSON.stringify(data));
    }

    static create(data = {}) {
        window.flutter_inappwebview.callHandler('CREATE', JSON.stringify(data));
    }

    static cookie(data = {}) {
        window.flutter_inappwebview.callHandler('COOKIE', JSON.stringify(data));
    }

    static saveAccount(data = {}) {
        window.flutter_inappwebview.callHandler('SAVE_ACCOUNT', JSON.stringify(data));
    }
}

function modifyUrl(url, changes = {}) {
    url = normalizeUrl(url);

    const u = new URL(url);
    const base = new URL(BASE_URL);

    if (changes.protocol !== undefined) u.protocol = changes.protocol;
    if (changes.host !== undefined) u.host = base.host;
    if (changes.port !== undefined) u.port = changes.port;
    if (changes.pathname !== undefined) u.pathname = changes.pathname;
    if (changes.hash !== undefined) u.hash = changes.hash;

    if (changes.params) {
        const params = u.searchParams;

        for (const [key, value] of Object.entries(changes.params)) {
            if (value === null) {
                params.delete(key);
            } else if (Array.isArray(value)) {
                params.delete(key);
                value.forEach(v => params.append(key, v));
            } else {
                params.set(key, value);
            }
        }
    }

    return u.toString();
}
