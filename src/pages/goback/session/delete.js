import {api, route, ui} from "../../../js/core";

route.add('/goback/session/delete', function ($ele, params) {
    api.request('goback.session.delete', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success('删除成功')
        }
        $ele.parents('tr').remove()
    })
});