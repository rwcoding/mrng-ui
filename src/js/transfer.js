if (!window.$transfer) {
    window.$transfer = {}
}

export const get = function (k) {
    // let v = window.$transfer[k]
    // delete window.$transfer[k]
    // return v
    return window.$transfer[k]
}

export const set = function (k, v) {
    window.$transfer[k] = v
}