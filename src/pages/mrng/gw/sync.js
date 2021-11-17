import {api, route, ui} from "../../../js/core";

route.add('/mrng/gw/sync', function ($ele, params) {
    api.request('mrng.gw.sync', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('同步成功')
        }
    })
});