import {api, route, ui} from "../../../js/core";

route.add('/goback/session/clean', function ($ele, params) {
    let type = params.type ? parseInt(params.type) : 0

    api.request('goback.session.clean', {type:type}, function (rd) {
        if (!rd.msg) {
            ui.success('清理成功')
        }
        route.to('/goback/session/index')
    })
});