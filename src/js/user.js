import {api} from "./core";

window.adminer = {}

export const set = function (data) {
    window.adminer = data
}

export const get = function () {
    return window.adminer
}

export const update = function (k,v) {
    return window.adminer[k] = v
}

export const init = function (cb) {
    api.request('goback.profile.info', function (rd) {
        set(rd.data)
        if (cb) {
            cb()
        }
    })
}