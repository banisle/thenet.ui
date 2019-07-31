$(function () {
    var s2Item = $('.guide-side .sub-menu > li > a');

    s2Item.click(function() {
        
        var s2ItemId = $(this).attr('data-menu');

        $.ajax({
            type: 'get',
            url: 'pages/'+ s2ItemId +'.html',
            dataType: 'html',
            success: function (data) {
                $("#load-ct").html(data);
                SyntaxHighlighter.highlight()
            }
        });

    })
})