import {route, ui, api, transfer} from "../../../../js/core";

route.add('/mrng/config/log/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu('mrng-menu-config-log')

    ui.fill('#gobui-form', params)
    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({
            name: $('input[name=name]').val().trim(),
            k: $('input[name=k]').val().trim(),
            page: 1,
        })
    })

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10
    let name = params.name ?? ""
    let k = params.k ?? ""

    api.request('mrng.config.log.list', {page, page_size:pageSize, name, k}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("环境", row => {
                return (rd.data.env_names[row.env]  ?? "----") + " [" + row.env + "]"
            })
            .col("工程", row => {
                return (rd.data.project_names[row.project] ?? "----") + " [" + row.project + "]"
            })
            .col("名称", "name")
            .col("键", "k")
            .col("值", row => {
                return row.v.substr(0,10) + (row.v.length > 10 ? "......" : "")
            })
            .col("类型", row => {
                return rd.data.type_names[row.type]
            })
            .col("操作", row => `<a href="$mrng/config/log/view?id=${row.id}" class="btn btn-sm btn-info">查看</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)

        transfer.set("config_env_names", rd.data.env_names)
        transfer.set("config_project_names", rd.data.project_names)
        transfer.set("config_log_type_names", rd.data.type_names)
    })
});
