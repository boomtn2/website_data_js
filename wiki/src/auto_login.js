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


function autoLogin() {
    // Chờ đến khi phần tử username xuất hiện
    const observer = new MutationObserver(() => {
        const usernameEl = document.querySelector('#username');
        const passwordEl = document.querySelector('#password');
        const loginBtn = document.querySelector('#login');

        if (usernameEl && passwordEl && loginBtn) {
            observer.disconnect(); // Dừng theo dõi

            console.log('✅ Tìm thấy form đăng nhập, đang điền thông tin...');

            fillInput('#username', data.username);
            fillInput('#password', data.password);

            console.log('✅ Điền xong, đang click nút đăng nhập...');
            loginBtn.click();

            // Báo cho Flutter hoặc app biết là đã xong bước login
            taskSuccess('autoLogin');
        }
    });

    // Theo dõi toàn bộ body, lắng nghe khi các phần tử mới được thêm
    observer.observe(document.body, { childList: true, subtree: true });

    // Nếu DOM đã sẵn sàng sẵn (form đã có)
    const ready = document.querySelector('#username') && document.querySelector('#password');
    if (ready) {
        observer.disconnect();
        fillInput('#username', data.username);
        fillInput('#password', data.password);
        document.querySelector('#login')?.click();
        taskSuccess('autoLogin');
    }
}

function logOut() {
    const logoutBtn = document.querySelector('[component="user/logout"] a');
    if (logoutBtn) {
        logoutBtn.click();

    } else {
        window.location.href = 'https://forum.dichtienghoa.com/login';
    }

    taskSuccess('logOut');
}

function urlLogin() {
    window.location.href = 'https://forum.dichtienghoa.com/login';

    taskSuccess('urlLogin');
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

    return JSON.stringify(obj);
}

function urlWiki() {
    window.location.href = 'https://truyenwikidich.net/';

    taskSuccess('urlWiki');
}

function checkLogin() {

    const observer = new MutationObserver(() => {
        const logoutBtn = document.querySelector('[component="user/logout"] a');
        if (logoutBtn) {
            observer.disconnect();
            taskSuccess('checkLogin');
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const logoutBtn = document.querySelector('[component="user/logout"] a');
    if (logoutBtn) {
        observer.disconnect();
        taskSuccess('checkLogin');
    }
}

