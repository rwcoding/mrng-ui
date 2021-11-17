import {api, route} from "../../../js/core";

route.add('/mrng/service/delete', function ($ele, params) {
    api.request('mrng.service.delete', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('删除成功')
        }
        $ele.parents('tr').remove()
    })
});