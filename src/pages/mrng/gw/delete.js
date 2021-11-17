import {api, route, ui} from "../../../js/core";

route.add('/mrng/gw/delete', function ($ele, params) {
    api.request('mrng.gw.delete', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('删除成功')
        }
        $ele.parents('tr').remove()
    })
});