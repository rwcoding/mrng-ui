import {route, ui, api} from "../../../js/core";

route.add('/mrng/service/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params)
    ui.focusNav(1)
    ui.focusMenu("mrng-menu-service")
    ui.fill('#gobui-form', params)
    $('#gobui-form').on('submit', function (e) {
        e.preventDefault()
        let min = $('input[name=min]').val()
        let max = $('input[name=max]').val()
        let recycle = $('select[name=recycle]').val()
        route.hashParams({
            name: $('input[name=name]').val().trim(),
            sign: $('input[name=sign]').val().trim(),
            min: min === "" ? 0 : parseInt(min),
            max: max === "" ? 100 : parseInt(max),
            recycle: parseInt(recycle),
            page: 1,
        })
    })

    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10
    let min = params.pagmine ? parseInt(params.min) : 0
    let max = params.max ? parseInt(params.max) : 100
    let name = params.name ?? ''
    let sign = params.sign ?? ''
    let recycle = params.recycle ? parseInt(params.recycle) : 0

    api.request('mrng.service.list', {page:page, page_size:pageSize, name,sign,min,max,recycle}, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("名称", "name")
            .col("标识", "sign")
            .col("状态", row => {
                if (row.status === 0) {
                    return `<strong class="text-danger"><i class="bi bi-x-circle-fill"></i> 熔断 ${row.status}</strong>`
                } else if (row.status === 100) {
                    return `<strong class="text-success"><i class="bi bi-check-lg"></i> 正常 ${row.status}</strong>`
                }
                return `<strong class="text-primary"><i class="bi bi-arrow-down-circle-fill"></i> 降级 ${row.status}</strong>`
            })
            .col("操作", row => {
                if (row.deleted > 0) {
                    return `<a href="$mrng/service/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                <a href="@/mrng/service/recover?id=${row.id}" class="btn btn-sm btn-dark">恢复</a>`
                }
                return `<a href="$mrng/service/edit?id=${row.id}" class="btn btn-sm btn-primary">编辑</a>
                                <a href="@/mrng/service/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`
            })
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});