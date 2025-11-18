function search(key) {
    const obj = JSON.parse(key);

    const baseQuery = new URLSearchParams(params).toString();
    const filterQuery = obj.map(f => `${encodeURIComponent(f.tag)}=${encodeURIComponent(f.key)}`).join("&");
    const fullUrl = BASE_URL + `/tim-kiem?${baseQuery}&${filterQuery}`;

}  