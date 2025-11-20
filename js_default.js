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