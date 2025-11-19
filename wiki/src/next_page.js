


function nextPage(url, page) {
    const pageMax = 20;
    let responseString = {
        url: modifyUrl(url, { start: page * pageMax }),
        max: 20
    };

    return responseString;
}