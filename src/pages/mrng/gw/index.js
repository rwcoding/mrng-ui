import {route, ui, api, utils} from "../../../js/core";

function renderStatusTd(id, status) {
    if (status === 0) {
        return `<strong class="text-danger">下架</strong> <button data-id="${id}" data-status="1" class="ud btn btn-secondary btn-sm ms-2">上架</button>`
    }
    return `<strong class="text-success">正常</strong> <button data-id="${id}" data-status="0" class="ud btn btn-secondary btn-sm ms-2">下架</button>`
}

route.add('/mrng/gw/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu('mrng-menu-gw')

    ui.fill('#gobui-form', params)
    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        route.hashParams({
            name: $('input[name=name]').val().trim(),
            addr: $('input[name=addr]').val().trim(),
            page: 1,
        })
    })

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10
    let name = params.name ?? ""
    let addr = params.addr ?? ""

    api.request('mrng.gw.list', {page:page, page_size:pageSize, name: name, addr: addr}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("名称", "name")
            .col("地址", "addr")
            .col("权重", "weight")
            .col("接口", "api")
            .col("密钥", "key")
            .col("状态", row => {
                return renderStatusTd(row.id, row.status)
            })
            .col("操作", row => `<a href="$mrng/gw/bind?id=${row.id}&gname=${row.name}-${row.addr}" class="btn btn-sm btn-primary me-3">节点</a>
                                <a href="@mrng/gw/sync?id=${row.id}" class="btn btn-sm btn-primary me-3">同步</a>
                                <a href="$mrng/gw/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                <a href="@/mrng/gw/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)

        $('#gobui-table').on('click', ".ud", function() {
            let id = parseInt($(this).data("id"))
            let status = parseInt($(this).data('status'))
            let $this = $(this)
            api.request('mrng.gw.status', {id:id, status:status}, function (rd) {
                if (!rd.msg) {
                    ui.success('修改成功')
                }
                $this.parent().html(renderStatusTd(id, status))
            })
        })
    })
});
