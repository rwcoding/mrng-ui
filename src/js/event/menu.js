export default function initMenuEvent() {
    let $menu = $('#gobui-menu')
    $menu.on("click", "dt", function () {
        let $pEle = $(this).parent();
        let index = $(this).data('index')
        let dds = $pEle.find('dd.menu-index-'+index)
        if (!dds.length) {
            return true;
        }
        $(this).toggleClass("active");
        dds.toggle();
        return false;
    });
    $menu.on("click", "dd", function () {
        $(this).parent().find('dd').removeClass('active')
        $(this).addClass('active')
    });
    // $menu.find('dt:first').click()
}