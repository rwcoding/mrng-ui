import {utils, ui} from "./core";
import parseURI from "./utils/uri";
import sapp from "./spa"

window.$functions = {}

export const spa = function() {
    return new sapp()
}

function render(path, html) {
    if (path === '/login') {
        ui.app(html)
    } else {
        ui.main(html)
    }
}

export const to = function (url, ele) {
    let isOnlyScript = false
    let $functions = window.$functions
    if (url.startsWith("@")) {
        isOnlyScript = true
        url = url.substr(1)
    }
    let u = utils.parseURI(url)
    let path = u.path
    if (isOnlyScript) {
        let func = $functions[path]
        if (func) {
            func(ele, u.query);
        }
        return
    }
    let template = window.$templates[path]
    if (template) {
        let func = $functions[path]
        if (func) {
            func(template, u.query);
        } else {
            render(path, template);
        }
    } else {
        $.get(path, function(template) {
            let func = $functions[path]
            if (func) {
                func(template, u.query);
            } else {
                render(path, template);
            }
        })
    }
}

export const add = function (route, func) {
    window.$functions[route] = func
}

const buildString = function (params) {
    let str = ""
    for(let k in params) {
        str += `&${k}=${params[k]}`
    }
    return str.substr(1)
}

export const reload = function () {
    location.hash = location.hash
}

export const hash = function (url, params) {
    if (params) {
        if (url.indexOf("?") === -1) {
            location.hash = url + '?' + buildString(params);
        } else {
            location.hash = url + '&' + buildString(params);
        }
    } else {
        location.hash = url
    }
}

export const hashParams = function (data) {
    let uri = parseURI(location.hash)
    let query = uri.query
    for (let k in data) {
        query[k] = data[k]
    }
    location.hash = uri.path + '?' + buildString(query);
}

export const hashPage = function (page) {
    let uri = parseURI(location.hash)
    let query = uri.query
    query.page = page
    location.hash = uri.path + '?' + buildString(query);
    // location.hash = uri.path + '?' + (new URLSearchParams(query)).toString();
}