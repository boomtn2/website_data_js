function detectBotVerification() {
    const text = document.body.innerText.toLowerCase();
    const html = document.body.innerHTML.toLowerCase();

    // ⚙️ Từ khóa tiếng Anh + tiếng Việt
    const patterns = [
        // --- English ---
        'captcha',
        'recaptcha',
        'hcaptcha',
        'cloudflare',
        'checking your browser before accessing',
        'please verify you are human',
        'security check',
        'are you a robot',
        'verify you are not a robot',
        // --- Tiếng Việt ---
        'xác minh bạn không phải là rô-bốt',
        'xác nhận bạn không phải là robot',
        'bạn không phải là robot',
        'kiểm tra bảo mật',
        'vui lòng xác minh',
        'hãy xác nhận bạn là con người',
        'kiểm tra trình duyệt',
        'đang kiểm tra trình duyệt của bạn',
        'đang xác minh',
    ];

    const matched = patterns.some(p => text.includes(p) || html.includes(p));

    // ⚙️ Kiểm tra các phần tử đặc trưng
    const suspiciousElements = [
        document.querySelector('#cf-challenge-form'), // Cloudflare
        document.querySelector('iframe[src*="recaptcha"]'),
        document.querySelector('iframe[src*="hcaptcha"]'),
        document.querySelector('div.g-recaptcha'),
        document.querySelector('[id*="captcha"]'),
        document.querySelector('[class*="captcha"]'),
        document.querySelector('form[action*="verify"]'),
    ].filter(Boolean);

    // Nếu có dấu hiệu CAPTCHA hoặc form xác thực
    return matched || suspiciousElements.length > 0;
}
