function getFullUrl(relativeUrl) {
    return relativeUrl; // giữ nguyên đường dẫn tương đối
}


function chapter() {
    const chapterData = {};

    // Tiêu đề chương: phần tử p.book-title thứ 2 (nếu có)
    const bookTitleElements = document.querySelectorAll('p.book-title');
    chapterData.bookTitle = (bookTitleElements.length > 1 && bookTitleElements[1])
        ? bookTitleElements[1].textContent.trim()
        : null;

    // Nội dung chương: chỉ lấy <p> trong #bookContentBody
    const bookContentBodyElement = document.getElementById('bookContentBody');
    const paras = [];
    if (bookContentBodyElement) {
        const pNodes = bookContentBodyElement.querySelectorAll('p');
        pNodes.forEach(p => {
            // Bỏ qua nếu chính nó hoặc ancestor thuộc vùng cần loại
            if (
                p.matches('.tpm-unit, .gliaplayer-container') ||
                p.closest('.tpm-unit, .gliaplayer-container')
            ) {
                return;
            }
            const txt = p.textContent.trim();
            if (txt.length > 0) {
                paras.push(txt);
            }
        });
    }
    chapterData.chapterContent = paras.join('\n\n');

    // Link chương sau (tìm theo text "Chương sau")
    const nextChapterLinkElement = document.evaluate(
        "//a[contains(., 'Chương sau')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    chapterData.nextChapterUrl = nextChapterLinkElement
        ? getFullUrl(nextChapterLinkElement.getAttribute('href'))
        : null;

    const finalJsonData = JSON.stringify(chapterData);
    sendToApp('response_json', buildJsonMessage('CHAPTER', finalJsonData, 'action'));
}