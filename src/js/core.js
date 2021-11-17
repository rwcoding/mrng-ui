import * as route from "./route"
import * as ui from "./ui"
import * as api from "./net"
import * as user from "./user"
import * as transfer from "./transfer"

import parseURI from "./utils/uri";
import {unixTime, date} from "./utils/time";
import mapData from "./utils/map_data";
import {formFields} from "./utils/form";
import options from "./utils/options";

if (!window.$templates) {
    window.$templates = {}
}

const utils = {parseURI, unixTime, mapData, formFields, options, date}

export {
    route,
    ui,
    api,
    user,
    utils,
    transfer,
}