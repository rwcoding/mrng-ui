import {route, ui, api} from "../../../js/core";

function renderStatusTd(status) {
    if (status === 0) {
        return `<strong class="text-danger"><i class="bi bi-x-circle-fill"></i> 熔断 ${status} </strong>`
    } else if (status === 100) {
        return `<strong class="text-success"><i class="bi bi-check-lg"></i> ${status}</strong>`
    }
    return `<strong class="text-primary"><i class="bi bi-arrow-down-circle-fill"></i> 降级 ${status} </strong>`
}

function renderBindTd(serviceId, isBind) {
    if (!isBind) {
        return `<strong>----</strong> <button data-service="${serviceId}" data-to="bind" class="bind btn btn-secondary btn-sm ms-2">绑定</button>`
    }
    return `<strong class="text-success">已绑定</strong> <button data-service="${serviceId}" data-to="unbind" class="bind btn btn-danger btn-sm ms-2">解除</button>`
}

route.add('/mrng/node/bind', function (tpl, params) {
    let spa = route.spa()
    ui.dialog(tpl, params, {title: `设置节点 <strong class="text-danger">${params.gname}</strong> 的关联服务`, area: "1000px", offset: '200px'})
    if (!params.size) {
        params.size = 100
    }
    if (!params.bind) {
        params.bind = 0
    }
    ui.fill('#gobui-pop-form', params)

    let page = params.page ? parseInt(params.page) : 1
    let nodeId = params.id ? parseInt(params.id) : 1
    let pageSize = parseInt(params.size)
    let bind = parseInt(params.bind)
    let name = params.name ?? ""
    let sign = params.sign ?? ""

    function pullData() {
        api.request('mrng.node.bind.query', {node_id: nodeId, page:page, page_size:pageSize, name: name, sign: sign, bind:bind}, function (rd) {
            spa.table('#gobui-pop-table')
                .col(`<label><input type="checkbox" class="select form-check-input me-2">ID</label>`, row => {
                    return `<label><input type="checkbox" class="form-check-input me-2" value="${row.id}">${row.id}</label>`
                })
                .col("名称", "name")
                .col("标识", "sign")
                .col("状态", row => {
                    return renderStatusTd(row.status)
                })
                .col("绑定", row => {
                    return renderBindTd(row.id, rd.data.binds.findIndex( item => item === row.id) !== -1)
                })
                .render(rd.data.datas)

            spa.pager('#gobui-pop-pager').render(rd.data.count, rd.data.page_size, page, function (p) {
                page = p
                pullData()
            })
        })
    }
    pullData()

    let $table = $('#gobui-pop-table')
    let $form = $('#gobui-pop-form')

    $table.on('click', ".bind", function() {
        let isBind = $(this).data('to') === "bind" ? 1:0
        let serviceId = parseInt($(this).data("service"))
        let $this = $(this)
        api.request('mrng.node.bind', {node_id: nodeId, is_bind:isBind, services:[serviceId]}, function (rd) {
            if (!rd.msg) {
                ui.success('操作成功')
            }
            $this.parent().html(renderBindTd(serviceId, isBind))
        })
    })

    $table.on('click', ".select", function() {
        if ($(this).prop("checked")) {
            $table.find('input:checkbox').prop("checked", true)
        } else {
            $table.find('input:checkbox').prop("checked", false)
        }
    })

    $form.on('click', ".bind", function() {
        let idList = []
        $table.find('input:checkbox').each(function() {
            if (!$(this).prop("checked")) {
                return
            }
            let serviceId = parseInt($(this).val())
            if (serviceId>0) {
                idList.push(serviceId)
            }
        })
        let isBind = $(this).data('to') === 'bind' ? 1:0
        if (idList.length === 0) {
            ui.error("您没有选择服务")
            return
        }
        api.request('mrng.node.bind', {node_id: nodeId, is_bind:isBind, services:idList}, function (rd) {
            if (rd.data.delete === 0 && rd.data.insert === 0) {
                ui.success('什么也没做')
                return
            }
            if (!rd.msg) {
                ui.success('操作成功')
            }
            $table.find('input:checkbox').each(function() {
                if (!$(this).prop("checked")) {
                    return
                }
                let serviceId = parseInt($(this).val())
                if (serviceId > 0) {
                    $(this).parents('tr').find("td:eq(4)").html(renderBindTd(serviceId, isBind))
                }
            })
        })
    })

    $form.on('submit', function (e) {
        e.preventDefault()
        spa.resetPager('#gobui-pop-pager')
        page = 1
        pageSize = parseInt($('#gobui-pop-form select[name=size]').val())
        bind = parseInt($('#gobui-pop-form select[name=bind]').val())
        name = $('#gobui-pop-form input[name=name]').val().trim()
        sign = $('#gobui-pop-form input[name=sign]').val().trim()
        pullData()
    })
});
