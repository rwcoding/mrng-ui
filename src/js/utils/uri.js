export default function parseURI(href) {
    if (!href) {
        href = location.href
    } else if (href.indexOf('#') === -1) {
        href = '#'+href
    }
    let api = ""
    let params = {}
    let pos1 = href.indexOf('#')
    let pos2 = href.indexOf('?')
    let full = ""

    if (pos1 === -1) {
        api = "/"
        full = pos2 === -1 ? "/" : href.substr(pos2 + 1)
    } else {
        let q = href.substr(pos1+1)
        full = q
        if (pos2 === -1) {
            api = q
        } else {
            api = q.substr(0, pos2-pos1-1)
        }
        if (api.substr(0,1) !== '/') {
            api = '/' + api
        }
    }
    if (pos2 !== -1) {
        let qs = href.substr(pos2 + 1)
        let arr = qs.split('&')
        for (let i in arr) {
            let item = arr[i].split('=')
            if (typeof item[0] == "undefined" || item[0] === "") {
                continue
            }
            params[item[0]] = item.length < 2 ? null : decodeURIComponent(item[1])
        }
    }
    if (full.substr(0,1) !== '/') {
        full = '/' + full
    }

    return {path:api, query: params, full: full}
}