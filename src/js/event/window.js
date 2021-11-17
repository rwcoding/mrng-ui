export default function resizeWindow() {
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;
    $("#gobui-main").width(width - 186).height(height - 40).fadeIn(500);
    $("#gobui-menu").height(height);
}

$(window).resize(resizeWindow);