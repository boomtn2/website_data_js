function search() {

const mappedList = list.map(item => {
  const obj = item;
  const key = Object.keys(obj)[0];
  const value = obj[key];
  return { tag: key, value: value };
});
     const filterQuery = mappedList.map(f => `${encodeURIComponent(f.tag)}=${encodeURIComponent(f.value)}`).join("&");
    const fullUrl = BASE_URL + `/tim-kiem?qs=1&${filterQuery}`;
return fullUrl;
}