import php_date from "./date";

export const unixTime = function() {
    return Math.round(new Date().getTime()/1000)
}

export const date = php_date
