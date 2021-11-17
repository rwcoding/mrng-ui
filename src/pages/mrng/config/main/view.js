import {api, route, transfer, ui, utils} from "../../../../js/core";

route.add('/mrng/config/main/view', function (tpl, params) {
    ui.dialog(tpl, params, {title: "配置详情"})

    let envNames = transfer.get("config_env_names")
    let projectNames = transfer.get("config_project_names")

    api.request('mrng.config.main.info', {id: parseInt(params.id)}, function (rd) {
        ui.fill('#gobui-pop-table', rd.data, {
            created_at: function () {
                return utils.date('Y-m-d H:i:s', rd.data.created_at)
            },
            updated_at: function () {
                return utils.date('Y-m-d H:i:s', rd.data.updated_at)
            },
            env: function () {
                return envNames[rd.data.type] ?? '----'
            },
            project: function () {
                return projectNames[rd.data.type] ?? '----'
            },
        })
    })
});