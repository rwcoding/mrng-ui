import {api, route, ui, utils} from "../../../js/core";

route.add('/goback/cache/index', function (tpl, params) {
    let spa = route.spa()

    ui.main(tpl, params);
    ui.focusNav(1)
    ui.focusMenu('gobui-menu-cache')

    let sign = ''
    let page = params.page ? parseInt(params.page) : 1
    let pageSize = 10

    api.request('goback.cache.list', {
        page:page,
        page_size:pageSize,
        sign: sign,
    }, function (rd) {
        spa.table()
            .col("ID", "id")
            .col("标识", "sign")
            .col("更新时间", (row) => utils.date('Y-m-d H:i:s', row.updated_at) )
            .col("操作", (row) => `<a href="$goback/cache/view?id=${row.id}" class="btn btn-sm btn-info">查看</a>
                                      <a href="@goback/cache/delete?id=${row.id}" class="btn btn-sm btn-danger">删除</a>`)
            .render(rd.data.datas)

        spa.pager().render(rd.data.count, rd.data.page_size, page)
    })
});