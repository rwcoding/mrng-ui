import {route, ui, api, transfer, utils} from "../../../../js/core";

route.add('/mrng/config/kv/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu('mrng-menu-config-kv')

    ui.fill('#gobui-form', params)
    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({
            k: $('input[name=k]').val().trim(),
            page: 1,
        })
    })

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10
    let k = params.k ?? ""

    api.request('mrng.config.kv.list', {page, page_size:pageSize, k}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("键", "k")
            .col("值", row => {
                return row.v.substr(0,10) + (row.v.length > 10 ? "......" : "")
            })
            .col("创建时间", row => utils.date('Y-m-d H:i:s', row.created_at) )
            .col("更新时间", row => utils.date('Y-m-d H:i:s', row.updated_at) )
            .col("操作", row => `<a href="$mrng/config/kv/view?id=${row.id}" class="btn btn-sm btn-info">查看</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});
