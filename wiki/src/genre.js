async function genre() {
    try {
        const categoriesResponse = await fetch("wiki/src/categories.json");
        const fillsResponse = await fetch("wiki/src/fill.json");

        const categories = await categoriesResponse.json();
        const fills = await fillsResponse.json();

        let responseString = {
            listGroup: categories,
            fill: fills
        };

        sendToApp('response_json', buildJsonMessage('CATEGORY', ensureString(responseString), 'action'));
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}
