function search(key, page) {
    let responseString = {
        url: BASE_URL + "tim-kiem/" + encodeURIComponent(key) + "/trang-" + page + ".html",
        page: page,
        max: 20
    };
    sendToApp('response_json', buildJsonMessage('URL', ensureString(responseString), 'action'));
}