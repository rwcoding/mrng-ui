const {route, api, ui} = require("../../../js/core");

route.add('/goback/role/delete', function ($ele, params) {
    api.request('goback.role.delete', {
        id: parseInt(params.id)
    }, function (rd) {
        if (!rd.msg) {
            ui.success("删除成功")
        }
        $ele.parents('tr').remove()
    })
});