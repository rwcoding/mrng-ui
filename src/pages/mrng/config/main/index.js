import {route, ui, api, transfer} from "../../../../js/core";

function renderStatusTd(id, status) {
    if (status === 0) {
        return `<strong class="text-danger">下架</strong> <button data-id="${id}" data-status="1" class="ud btn btn-secondary btn-sm ms-2">发布</button>`
    }
    return `<strong class="text-success">正常</strong> <button data-id="${id}" data-status="0" class="ud btn btn-secondary btn-sm ms-2">下架</button>`
}

route.add('/mrng/config/main/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu('mrng-menu-config-main')

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

    api.request('mrng.config.main.list', {page, page_size:pageSize, name, k}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("环境", row => {
                return rd.data.env_names[row.env] + " [" + row.env + "]"
            })
            .col("工程", row => {
                return rd.data.project_names[row.project] + " [" + row.project + "]"
            })
            .col("名称", "name")
            .col("键", "k")
            .col("值", row => {
                return row.v.substr(0,10) + (row.v.length > 10 ? "......" : "")
            })
            .col("状态", row => {
                return renderStatusTd(row.id, row.status)
            })
            .col("操作", row => `<a href="$mrng/config/main/view?id=${row.id}" class="btn btn-sm btn-info me-3">查看</a>
                                <a href="$mrng/config/main/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                <a href="@/mrng/config/main/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)

        transfer.set("config_env_names", rd.data.env_names)
        transfer.set("config_project_names", rd.data.project_names)
    })

    $('#gobui-table').on('click', ".ud", function() {
        let id = parseInt($(this).data("id"))
        let status = parseInt($(this).data('status'))
        let $this = $(this)
        api.request('mrng.config.main.status', {id:id, status:status}, function (rd) {
            if (!rd.msg) {
                ui.success('修改成功')
            }
            $this.parent().html(renderStatusTd(id, status))
        })
    })
});
