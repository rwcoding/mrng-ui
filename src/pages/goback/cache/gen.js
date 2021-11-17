import {api, route, ui} from "../../../js/core";

route.add('/goback/cache/gen', function ($ele, params) {
    api.request('goback.cache.generate', function (rd) {
        if (!rd.msg) {
            ui.success('生成成功')
        }
    })
});