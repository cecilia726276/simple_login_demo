
export const prepareRequest = function (filter, url) {
    let temp = '';
    for (let it in filter) {
        temp += encodeURIComponent(it) + '=' + encodeURIComponent(filter[it]) + '&'
    }
    let getInformation = {
        method: "POST",
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        /* axios 会自动进行json格式转换 */
        data: temp,
    };
    return getInformation;
}