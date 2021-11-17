import {route, api, ui} from "../../../../js/core";

route.add('/goback/permission/group/index', function (tpl, params) {
    let spa = route.spa()

    ui.content(tpl, params);
    ui.focusNav(2)
    ui.focusMenu('gobui-menu-permission')

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10

    api.request('goback.permission.group.list', {page:page, page_size:pageSize}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("名称", "name")
            .col("排序", "ord")
            .col("操作", (row) => `<a href="$goback/permission/group/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                      <a href="@goback/permission/group/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});