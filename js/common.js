$(function () {
    var s2Item = $('.guide-side .sub-menu > li > a'),
        ;

    s2Item.click(function () {
        $.ajax({
            type: 'post',
            url: '/pages/'+  +'.html',
            dataType: 'html',
            success: function (data) {
                $("#listDiv").html(data);
            }
        });
    })
})