function search(key) {
    const baseQuery = new URLSearchParams(params).toString();
    const filterQuery = key.map(f => `${encodeURIComponent(f.tag)}=${encodeURIComponent(f.key)}`).join("&");
    const fullUrl = BASE_URL + `/tim-kiem?${baseQuery}&${filterQuery}`;
    sendToApp('response_json', buildJsonMessage('URL', ensureString(fullUrl), 'action'));
}  