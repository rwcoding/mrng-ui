import {api, route, ui, utils} from "../../../js/core";

route.add('/goback/cache/view', function (tpl, params) {
    ui.dialog(tpl, params, {title: "缓存详情"})

    api.request('goback.cache.info', {id: parseInt(params.id)}, function (rd) {
        ui.fill('#gobui-pop-table', rd.data, {
            updated_at: function () {
                return utils.date('Y-m-d H:i:s', rd.data.updated_at)
            },
        })
    })
});