
import $config from "./config"
import {ui, utils, route} from "./core"

const RESPONSE_OK    = 10000
const RESPONSE_GUEST = 19000
const RESPONSE_ERR   = 19999

const getSessionId = function () {
    return localStorage.getItem("session_id") || ""
}

const getSessionKey = function () {
    return localStorage.getItem("session_key") || ""
}

export const setSession = function (session, key) {
    localStorage.setItem("session_id", session)
    localStorage.setItem("session_key", key)
}

export const request = function (api, params, success, failure) {

    if (typeof params == "function") {
        success = params
        params = {}
        failure = success
    }

    let time = utils.unixTime()
    let body = JSON.stringify(params)
    let sessionId = getSessionId();
    let sessionKey = getSessionKey();
    let sign = md5(api + body + time + sessionId + sessionKey)
    let options = {
        "url": $config.api,
        "type": "post",
        "dataType": "json",
        "timeout": 60000,
        "headers": {
            "Content-Type":"application/json",
            "Go-Session":sessionId,
            "Go-Api":api,
            "Go-Time":time,
            "Go-Sign":sign,
        },
        "data": body,
        "success": function(data) {
            if (!data.code) {
                ui.error("接口错误：" + api)
                if (failure) {
                    failure()
                }
                return
            }
            if (data.code === RESPONSE_GUEST) {
                setSession("","")
                if (api === "goback.profile.password") {
                    ui.success(data.msg ? data.msg : "请重新登陆")
                }
                route.to("/login")
                return
            }
            if (data.code !== RESPONSE_OK) {
                ui.error(data.msg ? data.msg : "接口返回异常")
                if (failure) {
                    failure()
                }
                return
            }
            if (data.msg) {
                ui.success(data.msg ? data.msg : "接口操作成功")
            }
            if (success) {
                success(data)
            }
        },
        "error": function (err) {
            console.log(err)
            ui.error("接口请求异常")
        }
    };

    if ($config.onlyGP) {
        options.url = $config.api + "?Go-Session="+sessionId+"&Go-Time="+time+"&Go-Api="+api+"&Go-Sign="+sign
        delete options.headers
    }

    $.ajax(options)
};