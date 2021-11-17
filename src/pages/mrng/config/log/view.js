import {api, route, transfer, ui, utils} from "../../../../js/core";

route.add('/mrng/config/log/view', function (tpl, params) {
    ui.dialog(tpl, params, {title: "日志详情"})

    let typeNames = transfer.get("config_log_type_names")
    let envNames = transfer.get("config_env_names")
    let projectNames = transfer.get("config_project_names")

    api.request('mrng.config.log.info', {id: parseInt(params.id)}, function (rd) {
        ui.fill('#gobui-pop-table', rd.data, {
            created_at: function () {
                return utils.date('Y-m-d H:i:s', rd.data.created_at)
            },
            type: function () {
                return typeNames[rd.data.type] ?? '----'
            },
            env: function () {
                return (envNames[rd.data.env] ?? '----') + "(" + rd.data.env + ")"
            },
            project: function () {
                return (projectNames[rd.data.project] ?? '----') +  "(" + rd.data.project + ")"
            },
        })
    })
});