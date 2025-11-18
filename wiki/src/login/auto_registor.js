function fillInput(selector, value) {
    const el = document.querySelector(selector);
    if (el) {
        el.focus();
        el.value = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        console.log("✅ Đã điền " + selector + " = " + value);
    } else {
        console.warn("⚠️ Không tìm thấy " + selector);
    }
}

const data = {
    email: 'example9876@gmail.com',
    username: 'tennguoidung_demo54',
    password: 'MatKhau123',
    passwordConfirm: 'MatKhau123'
};


function autoRegistor() {
    fillInput('#email', data.email);
    fillInput('#username', data.username);
    fillInput('#password', data.password);
    fillInput('#password-confirm', data.passwordConfirm);

    const form = document.querySelector('form[component="register/local"]');
    const registerBtn = document.querySelector('#register');

    if (registerBtn) {
        console.log('✅ Tìm thấy nút Đăng ký, đang click...');
        registerBtn.click();

        // Gửi JS phụ qua sendToApp
    } else if (form) {
        console.log('⚠️ Không tìm thấy nút, gửi form thủ công...');
        form.submit();
        taskSuccess('autoRegistor');
    } else {
        console.warn('❌ Không tìm thấy form đăng ký!');
    }
}



function autoAcceptPolicy() {
    const checkbox = document.querySelector('#agree-terms');
    if (checkbox) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        console.log('✅ Đã tick vào ô đồng ý điều khoản.');
    } else {
        console.warn('⚠️ Không tìm thấy ô đồng ý điều khoản!');
    }

    const form = document.querySelector('form[component="register/local"]');
    const registerBtn =
        document.querySelector('#register') ||
        document.querySelector('button.btn.btn-primary.btn-block');

    if (registerBtn) {
        console.log('✅ Tìm thấy nút Submit, đang click...');
        registerBtn.click();
        taskSuccess('autoAcceptPolicy');
    } else if (form) {
        console.log('⚠️ Không tìm thấy nút, gửi form thủ công...');
        form.submit();
    } else {
        console.warn('❌ Không tìm thấy form đăng ký!');
    }
}



function urlRegister() {
    window.location.href = 'https://forum.dichtienghoa.com/register';

    taskSuccess('urlRegister');
}

function decodeCookieValue(value) {
    if (!value) return '';
    return value.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}




function getCookie() {
    const targetCookie = cookies.find(c => c.name === "express.sid");

    let obj = [{
        "url": "https://truyenwikidich.net",
        "domain": "truyenwikidich.net",
        "name": "express.sid",
        "value":
            decodeCookieValue(targetCookie['value']),
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "expirationDate": targetCookie['expirationDate'],
    },];
    taskSuccess('getCookie');

    return JSON.stringify(obj);
}

function urlWiki() {
    window.location.href = 'https://truyenwikidich.net/';

    taskSuccess('urlWiki');
}

function checkLogin() {
    taskSuccess('checkLogin');
}