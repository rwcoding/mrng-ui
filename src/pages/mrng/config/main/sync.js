import {api, route} from "../../../../js/core";

route.add('/mrng/config/main/sync', function ($ele, params) {
    api.request('mrng.config.sync', {}, function (rd) {
        if (!rd.msg) {
            ui.success('同步成功')
        }
    })
});