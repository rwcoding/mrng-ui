import {api, route, ui} from "../../../../js/core";

route.add('/goback/permission/group/delete', function ($ele, params) {
    api.request('goback.permission.group.delete', {id:parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success("删除成功")
        }
        $ele.parents('tr').remove()
    })
});