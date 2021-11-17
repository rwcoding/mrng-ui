const {route, api, ui} = require("../../../js/core");

route.add('/goback/permission/delete', function ($ele, params) {
    api.request('goback.permission.delete', {id: parseInt(params.id)}, function (rd) {
        if (!rd.msg) {
            ui.success("删除成功")
        }
        $ele.parents('tr').remove()
    })
});