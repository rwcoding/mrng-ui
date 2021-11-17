import {route, ui, api, utils} from "../../../js/core";

route.add('/goback/config/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu('gobui-menu-config')

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10

    api.request('goback.config.list', {page:page, page_size:pageSize}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("名称", "name")
            .col("键", "k")
            .col("数据", "v")
            .col("操作", (row) => `<a href="$goback/config/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                      <a href="@goback/config/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});