const {route} = require("../core");

// 劫持所有的A标签链接
// 如果以 "/" 开始，标识站内链接，使用自定义导航
$(document).on('click','a',function () {
    let href = $(this).attr('href')
    if (!href) {
        return false;
    }
    let first = href.substr(0,1)

    if (first === '/') {
        location.hash = href
        return false
    }

    if (first === "$") {
        href = '/' + href.substr(1)
        route.to(href, $(this))
        return false
    }

    if (first === '@') {
        route.to(href, $(this))
        return false
    }
    return true
});