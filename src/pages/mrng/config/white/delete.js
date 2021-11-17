import {api, route} from "../../../../js/core";

route.add('/mrng/config/white/delete', function ($ele, params) {
    api.request('mrng.config.white.delete', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('删除成功')
        }
        $ele.parents('tr').remove()
    })
});