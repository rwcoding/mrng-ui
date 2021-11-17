import {api, route, ui, utils} from "../../../js/core";

route.add('/goback/session/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params);
    ui.focusNav(1)
    ui.focusMenu('gobui-menu-session')
    ui.fill('#gobui-form', params)

    let adminerId = params.adminer_id ? parseInt(params.adminer_id) : 0
    let page = parseInt(params.page ? params.page : 1)
    let pageSize = 10

    api.request('goback.session.list', {
        page:page,
        page_size:pageSize,
        adminer_id: adminerId,
    }, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("用户ID", "adminer_id")
            .col("类型", row => {
                if (row.type === 1) {
                    return '用户认证'
                } else if(row.type === 2) {
                    return '验证码'
                }
                return '----'
            } )
            .col("SESSION", "session_id")
            .col("创建时间", row => utils.date("Y-m-d H:i:s", row.created_at) )
            .col("更新时间", row => utils.date("Y-m-d H:i:s", row.updated_at) )
            .col("操作", row => `<a href="@goback/session/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>` )
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })

    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        let adminerId = parseInt($('input[name=adminer_id]').val().trim())
        if (!adminerId) {
            ui.error("无效的用户id")
            return
        }
        route.hashParams({
            adminer_id: isNaN(adminerId) ? 0 : adminerId,
            page: 1,
        })
    })
});