var context = window,
    $root = $(document.documentElement).addClass("js"),
    tmpInput = document.createElement("input"),
    isTouch = ("ontouchstart" in context),
    isMobile = ("orientation" in context) || isTouch || window.IS_MOBILE === true,
    supportPlaceholder = ("placeholder" in tmpInput);
    isTouch && $root.addClass("touch");
    isMobile && $root.addClass("mobile");
    if (typeof Function.prototype.bind === "undefined") {
    Function.prototype.bind = function() {
        var fn = this,
            args = arraySlice.call(arguments),
            object = args.shift();
        return function(context) {
            var local_args = args.concat(arraySlice.call(arguments));
            if (this !== window) {
                local_args.push(this)
            }
            return fn.apply(object, local_args)
        }
    }
}

var TNUI = TNUI || {};

TNUI.wsg = (function(){
    return{
        createH1 : function(s2ItemTXT){
            var ct = $('.guide-container'),
                ctH1 = ct.find('.guide-h1');

            ctH1.text(s2ItemTXT);
        },
        moGuideMenu : function(){
            var mobtn = $('.mo-guide-btn'),
                sg = $('.guide-side'),
                dimCt = $('.guide-container'),
                dimBtn = $('.mo-guide-dim');
                openSt = 'false';

            var dimLyOpen = function(){
                $('html').addClass('fixed');
                mobtn.addClass('active');
                sg.addClass('open');
                dimBtn.addClass('active');
                openSt = 'true';
            }

            var dimLyClose = function(){
                $('html').removeClass('fixed');
                mobtn.removeClass('active');
                sg.removeClass('open');
                dimBtn.removeClass('active');
                openSt = 'false';
            }
            mobtn.add(dimBtn).on('click', function(e){
                (openSt == 'false')? dimLyOpen():dimLyClose();
            });

        },
        toggleOn : function(){
            var t = this,
                guSide = $('.guide-side'),
                s1Item = guSide.find('.menu-item > a'),
                s2Item = guSide.find('.sub-menu > li > a'),
                s2ItemTXT;

            s2Item.on('click',function(){
                
                if( $(this).hasClass('on') ) return;
                
                s1Item.add(s2Item).removeClass('on');
                $(this).addClass('on').closest('.menu-item').find('> a').addClass('on');
                
                s2ItemTXT = s2Item.parent().find('a.on').text();
                
                t.createH1(s2ItemTXT);
            });
        },
        init : function(){
            var t = this;

            t.createH1();
            t.toggleOn();
            t.moGuideMenu();
            
            console.log('init');
        }
    }
})();

TNUI.module = (function(){
    
    // (sta) TNUI returm module
    return{
        
        tabUi : function(){
            var uiTabWrap = $('.ui-tabWrap'),
                uiTab = uiTabWrap.find('.ui-tab'),
                uiTabBtn = uiTab.find('.ui-tab-btn'),
                uiTabList = $('.ui-tab-list'),
                index;

            //init
            uiTabList.first().addClass("on").attr('tabindex', '0');
            uiTabBtn.first().attr('aria-selected', 'true');

    
            uiTabBtn.on('click', function(e){
                if( $(e.target).prev().is('input[type=checkbox]') || $(e.target).prev().is('input[type=radio]') ){
                    return;
                };
                
                e.preventDefault();
    
                if( $(this).hasClass('on') ) return;
                
                $(this).closest(uiTabWrap).find(uiTabBtn).removeClass('on').attr({
                    "tabindex": "-1",
                    "aria-selected": "false"});
                $(this).addClass('on').attr({
                    "tabindex": "0",
                    "aria-selected": "true"})
                    .focus();
                
                $("#" + $(this).attr("aria-controls"))
                    .attr("tabindex", "0")
                    .addClass("on")
                    .siblings(uiTabList)
                    .attr("tabindex", "-1")
                    .removeClass("on");

                    
                });
            // 탭 키 초점
            uiTabBtn.on("keydown", function (event) {
                event = event || window.event;
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                var keycode = event.keyCode || event.which;

                if( $(event.target).prev().is('input[type=checkbox]') ||  $(event.target).prev().is('input[type=radio]')){
                    return;
                };

                switch (keycode) {
                    case 37: // left arrow
                    
                        if ( $(this).closest('li').prev().length == 1 ) {
                            $(this)
                                .attr("tabindex", "-1")
                                .closest('li').prev().find(uiTabBtn)
                                .attr("tabindex", "0")
                                .focus();
                        } else {

                            // 초점이 첫 번째 요소에 있었다면, 마지막 탭으로 초점 이동
                            $(this)
                                .attr("tabindex", "-1");
                            $(this).closest(uiTab).children().last().find(uiTabBtn)
                                .attr("tabindex", "0")
                                .focus();
                        }
                        break;
                    case 39: // right arrow

                        if ( $(this).closest('li').next().length  == 1) {
                            $(this)
                                .attr("tabindex", "-1")
                                .closest('li').next().find(uiTabBtn)
                                .attr("tabindex", "0")
                                .focus();

                        } else {
                            // 초점이 마지막 요소에 있었다면, 첫 번째 탭으로 초점 이동
                            $(this)
                                .attr("tabindex", "-1");
                                $(this).closest(uiTab).children().first().find(uiTabBtn)
                                .attr("tabindex", "0")
                                .focus();
                        }
                        break;
                    case 32: // Space
                    case 13: // Enter
                        // 기존 탭 비활성화
                        $(this).closest(uiTab).children().find(uiTabBtn)
                        .removeClass("on")
                        .attr("aria-selected", "false");
                        // 선택된 탭 활성화
                        $(this)
                        .addClass("on")
                        .attr("aria-selected", "true")
                        // 연관된 탭 패널 활성화
                        $("#" + $(this).attr("aria-controls"))
                        .attr("tabindex", "0")
                        .addClass("on");
                        // 기존 탭 패널 비활성화
                        $("#" + $(this).attr("aria-controls")).siblings()
                        .attr("tabindex", "-1")
                        .removeClass("on");
                        break;
                }
            });

            

            console.log('tabUi');
        },

        selectUi : function(){

            console.log('selectUi');
        },

        init : function(){
            var t = this;

            t.tabUi();
            t.selectUi();
        }


        
    }
    // (end) TNUI returm module
    
})();