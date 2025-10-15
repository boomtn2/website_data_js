function modifyUrl(url, changes = {}) {
    const parsed = new URL(url);
    const params = parsed.searchParams;

    for (const [key, value] of Object.entries(changes)) {
        if (value === null) params.delete(key);
        else params.set(key, value);
    }

    return parsed.toString();
}


function nextPage(url, page) {
    const pageMax = 20;
    let responseString = {
        url: modifyUrl(url, { start: page * pageMax }),
        max: 20
    };
    sendToApp('response_json', buildJsonMessage('URL', ensureString(responseString), 'action'));
}