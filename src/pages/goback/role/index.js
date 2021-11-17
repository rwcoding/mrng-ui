const {route, ui, api} = require("../../../js/core");

route.add('/goback/role/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params);
    ui.focusNav(1)
    ui.focusMenu('gobui-menu-role')

    let page = parseInt(params.page ? params.page : 1)

    api.request('goback.role.list', {page:page, page_size:10}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("名称", "name")
            .col("操作", row => `<a href="/goback/role/permission?id=${row.id}&name=${row.name}" class="btn btn-sm btn-secondary">权限设置</a>
                                    <a href="$goback/role/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                    <a href="@goback/role/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>` )
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});