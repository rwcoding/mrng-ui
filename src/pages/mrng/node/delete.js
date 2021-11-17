import {api, route} from "../../../js/core";

route.add('/mrng/node/delete', function ($ele, params) {
    api.request('mrng.node.delete', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('删除成功')
        }
        $ele.parents('tr').remove()
    })
});