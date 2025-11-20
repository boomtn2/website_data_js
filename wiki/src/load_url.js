function run() {
    try {
        let url = windown.url;
        window.location.href = url;
        Response.next();
    } catch (e) {
        Response.error();
    }

}