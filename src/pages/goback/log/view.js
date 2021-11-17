const {route, ui, api} = require("../../../js/core");

route.add('/goback/log/view', function (tpl, params) {
    ui.dialog(tpl, params, {title: "日志详情"})

    api.request('goback.log.info', {
        id: parseInt(params.id)
    }, function (rd) {
        ui.fill('#gobui-pop-table', rd.data)
    })
});