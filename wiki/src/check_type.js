function checkType(url) {
    try {
        const u = new URL(url);
        const paths = u.pathname.split('/').filter(Boolean);

        if (paths[0] === 'truyen' && paths.length >= 3) return 'chapter';
        if (paths[0] === 'truyen' && paths.length === 2) return 'detail';
        return 'search';
    } catch (e) {
        return 'unknown';
    }
}
