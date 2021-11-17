const {route, ui, api, transfer} = require("../../../js/core");

route.add('/goback/permission/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params);
    ui.focusNav(1)
    ui.focusMenu('gobui-menu-permission')
    ui.fill('#gobui-form', params)

    let kw = params.kw ?? ''
    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10

    if (params.to === "group") {
        route.to("/goback/permission/group/index?page="+page)
        return;
    }

    api.request('goback.permission.list', {
        page: page,
        page_size: pageSize,
        permission: kw
    }, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("名字", "name")
            .col("标识", "permission")
            .col("分组", row => rd.data.group_names[row.gid])
            .col("类型", row => rd.data.type_names[row.type])
            .col("操作", (row) => `<a href="$goback/permission/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                      <a href="@goback/permission/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)

        transfer.set("permission_groups", rd.data.group_names)
        transfer.set("permission_types", rd.data.type_names)
    })

    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({
            kw: $('input[name=kw]').val(),
            page: 1
        })
    })
});