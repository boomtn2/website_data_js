function fill(url) {
  // Chuyển list thành object { key: value }
  const obj = {};
  list.forEach(item => {
    const key = Object.keys(item)[0];
    const value = item[key];
    obj[key] = value;
  });

  const responseString = modifyUrl(url, { params: obj });
  return responseString;
}