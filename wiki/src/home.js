async function getBase64Image(imgUrl, maxWidth = 200, quality = 0.8) {
    if (!imgUrl || imgUrl.includes('default-cover.jpg')) {
        return null;
    }

    try {
        const response = await fetch(imgUrl);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                let canvas;

                if (typeof OffscreenCanvas !== 'undefined') {
                    canvas = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
                } else {
                    canvas = document.createElement('canvas');
                }
                const ctx = canvas.getContext('2d');

                let width = img.naturalWidth;
                let height = img.naturalHeight;

                if (width > maxWidth) {
                    height = Math.round(height * (maxWidth / width));
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                if (typeof OffscreenCanvas !== 'undefined') {
                    canvas.convertToBlob({ type: 'image/webp', quality: quality })
                        .then(compressedBlob => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.onerror = reject;
                            reader.readAsDataURL(compressedBlob);
                        })
                        .catch(error => {
                            console.error('Lỗi khi convertOffscreenCanvasToBlob to WebP:', error);
                            reject(null);
                        });
                } else {
                    resolve(canvas.toDataURL('image/webp', quality));
                }
            };
            img.onerror = (error) => {
                console.error('Lỗi khi tải ảnh:', imgUrl, error);
                reject(null);
            };
            img.src = URL.createObjectURL(blob);
        });
    } catch (error) {
        console.error('Lỗi khi fetch hoặc xử lý ảnh:', imgUrl, error);
        return null;
    }
}


async function home() {
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

    const jsonData = JSON.stringify(results);
    sendToApp('response_json', buildJsonMessage('LIST_BOOK', jsonData, 'action'));
}