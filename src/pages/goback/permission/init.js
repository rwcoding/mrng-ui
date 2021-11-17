import {route, api} from "../../../js/core";

route.add('/goback/permission/init', function ($ele, params) {
    api.request('goback.permission.init', function (rd) {
        if (!rd.msg) {
            ui.success("初始化成功")
        }
    })
});