

function getFullUrl(relativeUrl) {
    return relativeUrl ? new URL(relativeUrl, BASE_URL).href : null;
}



async function run() {
    try {
        const bookDetailData = {};

        // 1. Tên truyện và Đường dẫn truyện (URL của trang hiện tại)
        const titleElement = document.querySelector('.book-info .cover-info h2');
        bookDetailData.title = titleElement ? titleElement.textContent.trim() : null;
        bookDetailData.url = window.location.href; // URL của trang chi tiết truyện hiện tại

        // 2. Ảnh bìa truyện (Base64 WebP)
        const coverImgElement = document.querySelector('.book-info .cover-wrapper img');
        let coverImageUrl = coverImgElement ? coverImgElement.getAttribute('src') : null;
        if (coverImageUrl && !coverImageUrl.startsWith('http')) {
            coverImageUrl = getFullUrl(coverImageUrl);
        }
        bookDetailData.coverImageBase64 = coverImageUrl ? await getBase64Image(coverImageUrl, 300, 0.7) : null; // Kích thước lớn hơn cho ảnh bìa chính

        // 3. Tên tác giả
        const authorElement = document.evaluate(
            "//p[contains(., 'Tác giả:')]/a",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        bookDetailData.author = authorElement ? authorElement.textContent.trim() : null;

        // 4. Tình trạng
        const statusElement = document.evaluate(
            "//p[contains(., 'Tình trạng:')]/a",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        bookDetailData.status = statusElement ? statusElement.textContent.trim() : null;

        // 5. Đường dẫn chapter mới nhất và Tên chapter mới nhất
        const latestChapterLinkElement = document.evaluate(
            "//p[contains(., 'Mới nhất:')]/a",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        bookDetailData.latestChapterTitle = latestChapterLinkElement ? latestChapterLinkElement.textContent.trim() : null;
        bookDetailData.latestChapterUrl = latestChapterLinkElement ? getFullUrl(latestChapterLinkElement.getAttribute('href')) : null;

        // 6. Tên các thể loại
        // Dựa vào cấu trúc HTML, thể loại có thể nằm trong các thẻ <p> không có nhãn cố định
        const genreElements = document.querySelectorAll('.book-info .cover-info p');
        const excludedLabels = ['Hán Việt:', 'Tác giả:', 'Tình trạng:', 'Mới nhất:', 'Thời gian đổi mới:', 'Cảm ơn:'];
        const genres = [];
        genreElements.forEach(p => {
            const text = p.textContent.trim();
            const isExcluded = excludedLabels.some(label => text.startsWith(label));
            const isStatsBox = p.classList.contains('book-stats-box');

            // Nếu không phải là các label đã loại trừ và không phải là box thống kê
            if (!isExcluded && !isStatsBox && text !== '' && !text.includes('Thời gian đổi mới')) {
                // Lấy text content trực tiếp hoặc text của thẻ <a> nếu có
                const genreLink = p.querySelector('a');
                if (genreLink) {
                    genres.push(genreLink.textContent.trim());
                } else if (text.length > 0) {
                    // Nếu không có thẻ a, lấy text content của p, nhưng cần lọc thêm
                    // Ví dụ: "Ngôn tình" là một p tag không có a trong snippet
                    // Cần đảm bảo nó không phải là Hán Việt nếu Hán Việt không có a
                    if (!text.startsWith('Hán Việt:')) {
                        genres.push(text);
                    }
                }
            }
        });
        bookDetailData.genres = genres.filter(g => g !== '').map(g => g.replace('Tình trạng:', '').trim()); // Lọc bỏ các giá trị rỗng và tiền tố nếu còn sót

        // 7. Nội dung book-desc-detail
        const theloaiElement = document.querySelectorAll('.book-desc p:nth-child(1) a');
        const theloai = [];
        theloaiElement.forEach(link => {
            const genreName = link.textContent.trim();
            if (genreName.length > 0) {
                theloai.push(genreName);
            }
        });
        const genreText = theloai.length > 0 ? `Thể loại: ${theloai.join(', ')}` : '';

        // 7. Mô tả + gộp thể loại
        const descriptionElement = document.querySelector('.book-desc-detail');
        const descText = descriptionElement ? descriptionElement.textContent.trim() : '';
        bookDetailData.description = genreText
            ? `${genreText}\n\n${descText}`
            : descText;

        // 8. Đường dẫn đọc của button 'Đọc'
        // Giả định button 'Đọc' có thể là một thẻ <a> hoặc <button> với text "Đọc"
        const readButtonElement = document.evaluate(
            "//a[contains(@class, 'orange-btn') and normalize-space(text())='Đọc']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
        bookDetailData.readUrl = readButtonElement ? getFullUrl(readButtonElement.getAttribute('href')) : null;

        // 9. Danh sách các truyện cùng thể loại
        const similarBooks = [];
        const similarBookItems = document.querySelectorAll('.mobile-similar-books li > div'); // Lấy div chứa cover và info
        for (const item of similarBookItems) {
            const simTitleElement = item.querySelector('.book-title');
            const simLinkElement = item.querySelector('.cover-wrapper');
            const simImgElement = item.querySelector('.cover-wrapper img');
            const simAuthorElement = item.querySelector('.book-author a');
            const simStatusElement = item.querySelector('.book-publisher a[href*="status="]'); // Tìm thẻ <a> trong p.book-publisher có href chứa "status="

            const simTitle = simTitleElement ? simTitleElement.textContent.trim() : null;
            const simRelativeUrl = simLinkElement ? simLinkElement.getAttribute('href') : null;
            const simFullUrl = simRelativeUrl ? getFullUrl(simRelativeUrl) : null;

            let simImageUrl = simImgElement ? simImgElement.getAttribute('src') : null;
            if (simImageUrl && !simImageUrl.startsWith('http')) {
                simImageUrl = getFullUrl(simImageUrl);
            }
            const simImageBase64 = simImageUrl ? await getBase64Image(simImageUrl, 100, 0.6) : null; // Kích thước nhỏ hơn cho ảnh phụ

            const simAuthor = simAuthorElement ? simAuthorElement.textContent.trim() : null;
            const simStatus = simStatusElement ? simStatusElement.textContent.trim() : null;

            similarBooks.push({
                title: simTitle,
                url: simFullUrl,
                coverImageBase64: simImageBase64,
                author: simAuthor,
                status: simStatus
            });
        }
        bookDetailData.similarBooks = similarBooks;

        Response.success(bookDetailData);
    } catch (e) {
        Response.error(e);

    }
}