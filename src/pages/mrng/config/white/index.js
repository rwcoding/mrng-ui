import {route, ui, api} from "../../../../js/core";



route.add('/mrng/config/white/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu('mrng-menu-config-white')

    ui.fill('#gobui-form', params)
    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({
            ip: $('input[name=ip]').val().trim(),
            page: 1,
        })
    })

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10
    let ip = params.ip ?? ""

    api.request('mrng.config.white.list', {page, page_size:pageSize, ip}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("IP", "ip")
            .col("操作", row => `<a href="$mrng/config/white/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                <a href="@/mrng/config/white/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});
