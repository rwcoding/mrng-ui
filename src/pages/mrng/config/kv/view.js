import {api, route, ui, utils} from "../../../../js/core";

route.add('/mrng/config/kv/view', function (tpl, params) {
    ui.dialog(tpl, params, {title: "缓存详情"})
    api.request('mrng.config.kv.info', {id: parseInt(params.id)}, function (rd) {
        ui.fill('#gobui-pop-table', rd.data, {
            created_at: () => utils.date('Y-m-d H:i:s', rd.data.created_at),
            updated_at: () => utils.date('Y-m-d H:i:s', rd.data.updated_at),
        })
    })
});