import {api, route, ui} from "../../../js/core";

route.add('/goback/cache/delete', function ($ele, params) {
    api.request('goback.cache.delete', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('删除成功')
        }
        $ele.parents('tr').remove()
    })
});