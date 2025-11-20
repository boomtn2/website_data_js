async function run() {
    try {
        const bookItems = document.querySelectorAll('.book-item');
        const results = [];
        const baseUrl = window.location.origin;

        for (const item of bookItems) {
            const titleElement = item.querySelector('.book-title');
            const linkElement = item.querySelector('.cover-wrapper');
            const imgElement = item.querySelector('.cover-col img');

            const title = titleElement ? titleElement.textContent.trim() : null;
            const relativeUrl = linkElement ? linkElement.getAttribute('href') : null;
            const fullUrl = relativeUrl ? new URL(relativeUrl, baseUrl).href : null;

            let imageUrl = imgElement ? imgElement.getAttribute('src') : null;
            if (imageUrl && !imageUrl.startsWith('http')) {
                imageUrl = new URL(imageUrl, baseUrl).href;
            }

            const imageBase64 = imageUrl ? await getBase64Image(imageUrl, 200, 0.7) : null;

            results.push({
                title: title,
                id: fullUrl,
                img: imageBase64
            });
        }

        Response.success(results);
    } catch (e) {
        Response.error();

    }
}