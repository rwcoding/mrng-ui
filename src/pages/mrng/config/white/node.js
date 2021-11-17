import {api, route} from "../../../../js/core";

route.add('/mrng/config/white/node', function ($ele, params) {
    api.request('mrng.config.white.node', {}, function (rd) {
        if (!rd.msg) {
            ui.success('同步成功')
        }
        route.to("/mrng/config/white/index?_c")
    })
});