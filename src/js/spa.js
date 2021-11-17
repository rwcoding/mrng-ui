import {route} from "./core";

class table {
    instance = null
    selector = "#gobui-table"
    columns  = []

    constructor(selector) {
        this.selector = selector
    }

    col(name, target, options) {
        if (!options) {
            options = {}
        }
        if (typeof target === "string") {
            options.title = name
            options.data = target
        } else {
            options.title = name
            options.render = function(d,t,row) { return target(row) }
        }
        this.columns.push(options)
        return this
    }

    render(data) {
        if (this.instance) {
            this.instance.destroy()
        }

        let options = {
            data: data,
            autoWidth: false,
            ordering: false,
            searching: false,
            lengthChange: false,
            paging: false,
            info: false,
            retrieve: true,
            language: {
                "info":           "_START_ 到 _END_ 总数：_TOTAL_",
                "infoEmpty":      "",
                "paginate": {
                    "first":      "首页",
                    "last":       "尾页",
                    "next":       "下一页",
                    "previous":   "上一页"
                },
                "emptyTable": "没有数据",
            },
            columns: this.columns,
        }

        this.instance = $(this.selector).DataTable(options)
    }
}

class pager {
    instance = null
    selector = ""

    constructor(selector) {
        this.selector = selector
    }

    render(total, size, current, callback) {
        if (this.instance && this.instance.data('twbs-pagination')) {
            return;
        }
        if (total <= 0) {
            return
        }
        if (this.instance) {
            this.instance.removeData('twbs-pagination').html("")
        }
        let pages = total % size > 0 ? (total / size + 1) : total / size
        this.instance = $(this.selector).twbsPagination({
            totalPages: pages,
            visiblePages: size ?? 10,
            initiateStartPageClick: false,
            startPage: current ?? 1,
            prev:"上一页",
            next:"下一页",
            first:"首页",
            last:"尾页",
            onPageClick: function (event, page) {
                if (callback) {
                    callback(page)
                } else {
                    route.hashPage(page)
                }
            }
        });
    }
}

$.fn.dataTable.ext.errMode = 'throw';

class spa {
    _isFirst = true
    pool = {}

    isFirst() {
        if (this._isFirst) {
            this._isFirst = false
            return true
        }
        return false
    }

    pager(selector = "#gobui-pager") {
        if (this.pool[selector]) {
            return this.pool[selector]
        }
        return this.pool[selector] = new pager(selector)
    }

    table(selector = "#gobui-table") {
        if (this.pool[selector]) {
            this.pool[selector].columns = []
            return this.pool[selector]
        }
        return this.pool[selector] = new table(selector)
    }

    resetPager(selector = "#gobui-pager") {
        if (this.pool[selector]) {
            this.pool[selector].instance.removeData('twbs-pagination').html("")
        }
    }
}

export default spa

// export default {
//     _isFirst: true,
//     pool: {},
//
//     isFirst() {
//         if (this._isFirst) {
//             this._isFirst = false
//             return true
//         }
//         return false
//     },
//
//     pager(selector = "#gobui-pager") {
//         if (this.pool[selector]) {
//             return this.pool[selector]
//         }
//         return this.pool[selector] = new pager(selector)
//     },
//
//     table(selector = "#gobui-table") {
//         if (this.pool[selector]) {
//             this.pool[selector].columns = []
//             return this.pool[selector]
//         }
//         return this.pool[selector] = new table(selector)
//     },
//
//     resetPager(selector = "#gobui-pager") {
//         if (this.pool[selector]) {
//             this.pool[selector].instance.removeData('twbs-pagination').html("")
//         }
//     }
// }