const {route, ui, api,utils, transfer} = require("../../../js/core");

route.add('/goback/adminer/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params);
    ui.focusNav(1)
    ui.focusMenu('gobui-menu-adminer')

    ui.fill('#gobui-form', params)

    let username = params.username ?? ''
    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10

    api.request('goback.adminer.list', {
        page: page,
        page_size: pageSize,
        username: username,
    }, function (rd) {
        let roleNames = rd.data.role_names;
        let statusNames = rd.data.status_names;

        spa.table()
            .col("ID", "id")
            .col("账号", "username")
            .col("名字", "name")
            .col("电话", "phone")
            .col("角色", (row) => utils.mapData(row.roles, roleNames))
            .col("状态", (row) => utils.mapData(row.status.toString(), statusNames))
            .col("超管", (row) => row.is_super === 1 ? '超级管理员':'----')
            .col("创建时间", (row) => utils.date('Y-m-d H:i:s', row.created_at))
            .col("操作", (row) => `<a href="$goback/adminer/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                  <a href="@goback/adminer/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)

        transfer.set('adminer_status_names', statusNames)
        transfer.set('adminer_role_names', roleNames)
    })

    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({username: $('input[name=username]').val().trim()})
    })
});