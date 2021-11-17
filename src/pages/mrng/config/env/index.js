import {route, ui, api} from "../../../../js/core";



route.add('/mrng/config/env/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu('mrng-menu-config-env')

    ui.fill('#gobui-form', params)
    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({
            name: $('input[name=name]').val().trim(),
            sign: $('input[name=sign]').val().trim(),
            page: 1,
        })
    })

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10
    let name = params.name ?? ""
    let sign = params.sign ?? ""

    api.request('mrng.config.env.list', {page, page_size:pageSize, name, sign}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("名称", "name")
            .col("标识", "sign")
            .col("密钥", row => {
                return `v1: ${row.key_v1}<br>v2: ${row.key_v2}`
            })
            .col("序列", "ord")
            .col("版本", "version")
            .col("操作", row => `<a href="$mrng/config/env/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                <a href="@/mrng/config/env/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});
