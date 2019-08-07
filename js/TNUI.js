'use strict';
var context = window,
    $root = $(document.documentElement).addClass("js"),
    tmpInput = document.createElement("input"),
    isTouch = ("ontouchstart" in context),
    isMobile = ("orientation" in context) || isTouch || window.IS_MOBILE === true,
    supportPlaceholder = ("placeholder" in tmpInput),
    detectIe = get_version_of_IE();

    isTouch && $root.addClass("touch");
    isMobile && $root.addClass("mobile");

    function get_version_of_IE() { //ie aegent 체크
        var word;
        var agent = navigator.userAgent.toLowerCase();
        // IE old version ( IE 10 or Lower ) 
        if (navigator.appName == "Microsoft Internet Explorer") word = "msie ";
        // IE 11 
        else if (agent.search("trident") > -1) word = "trident/.*rv:";
        // Microsoft Edge  
        else if (agent.search("edge/") > -1) word = "edge/";
        // 그외, IE가 아니라면 ( If it's not IE or Edge )  
        else return -1;
        var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
        if (reg.exec(agent) != null) return parseFloat(RegExp.$1 + RegExp.$2);
        return -1;
    }

    if (!(window.console && console.log)) {
        console = {
            log: function () {},
            debug: function () {},
            info: function () {},
            warn: function () {},
            error: function () {}
        };
    }
    

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
                dimBtn = $('.mo-guide-dim'),
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
        modalEvt :function(){
            var t = this,
                btnTog = $('#btn-transtoggle'),
                modalT = $('#mot-tog');
            
                btnTog.on('click', function(e){
                    modalT.toggleClass('trans-ms');
                    modalT.hasClass('trans-ms') ? $(this).find('span').text('모션 제거') : $(this).find('span').text('모션 생성');
                });
        },
        init : function(){
            var t = this;

            t.createH1();
            t.toggleOn();
            t.moGuideMenu();
            t.modalEvt();
            
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

            //탭 상세로 이동 (tab키)
            uiTab.on("keydown", ".on", function (event) {
                event = event || window.event;
                var keycode = event.keyCode || event.which;

                // tab 키 눌렀을 때 (shift + tab은 제외)
                if (!event.shiftKey && keycode === 9) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    $("#" + $(this).attr("aria-controls"))
                        .attr("tabindex", "0")
                        .addClass("on")
                        .focus()
                        .siblings(uiTabList)
                        .attr("tabindex", "-1")
                        .removeClass("on");
                }
            });
            

            console.log('tabUi');
        },

        selectUi : function(){

            console.log('selectUi');
        },

        modalUi : function(){
            var t = this,
                mvBtn = $('a[data-modal]'),
                btnClose = $('.mvClose'),
                optTrans = 'false',
                openSt = 'false',
                mvId;

                var dimLyOpen = function(mvId){
                    if( openSt == 'true'){
                        return;
                    }

                    $('html').addClass('fixed');
                    $('[data-target='+ mvId +']').fadeIn(0);
                    if(!isMobile) t.scrollUi();

                    if( optTrans == 'true'){
                        $('[data-target='+ mvId +']').addClass('on');
                    }
                    
                    //ie9 flag
                    if( detectIe == '9' ){
                        $('[data-target='+ mvId +'] .inner').css({
                            'top' : '50%',
                            'marginTop' : -(  $('[data-target='+ mvId +']').find('.inner').height() / 2)
                        });
                    }
                    openSt = 'true';

                }
    
                var dimLyClose = function(){
                    $('html').removeClass('fixed');
                    if( optTrans == 'true'){
                        //css transition ease값 = delay
                        $('[data-target='+ mvId +']').removeClass('on').delay(500).fadeOut(0);
                    } else{
                        $('[data-target='+ mvId +']').hide(0);
                    }
                    openSt = 'false';
                }

                mvBtn.on('click', function(e){
                    e.preventDefault();

                    mvId = $(this).attr('data-modal');
                    $('[data-target='+ mvId +']').hasClass('trans-ms')? optTrans = 'true': optTrans = 'false';

                    dimLyOpen(mvId);
                });

                btnClose.on('click', function(e){
                    e.preventDefault();
                    dimLyClose();
                });

            console.log('modalUi');
        },

        scrollUi :function() {
            var t = this,
                scrollWrap = $('.ui-scrollview'),
                scrollArea = scrollWrap.find('.ui-scrollarea'),
                scrollCt = scrollArea.find('.ui-content'),
                barCursor = $('.bar');
                
                //scroll width & height 구하기
                var calWidth = function(){
                    var i = 0;

                    scrollWrap.each(function(i){
                        var wrapW = scrollWrap.eq(i).parent().width(),
                            wrapH = scrollCt.eq(i).prop('scrollHeight'),
                            wrapOrgH = scrollWrap.eq(i).height(),
                            barSize =  parseInt( (wrapOrgH / wrapH) * 100 );
    
                        scrollWrap.eq(i).width(wrapW);
                        scrollCt.eq(i).width(wrapW).height(wrapOrgH);
                        
                        barCursor.eq(i).height( barSize + '%');
                        // console.log(
                        //     'wrapOrgH' + wrapOrgH,
                        //     'wrapH' + wrapH,
                        //     'barSize' + barSize
                        //     );

                    });

                    // scrollbar 위치 구하기
                    scrollArea.on('scroll', function(){
                        var t = $(this),
                            wrapH = t.find('.ui-content').prop('scrollHeight'),
                            wrapOrgH = t.parent().height(),
                            barCursor = t.parent().find('.bar'),
                            barSize =  barCursor.height(),
                            scTop = $(this).scrollTop(),
                            scTopPer = parseInt(scTop / ((wrapH - wrapOrgH) / 100) ),
                            barPer = (wrapOrgH - barSize) / 100;

                            barCursor.eq(i).css({
                                'top': parseInt(barPer * scTopPer) + 'px'
                            });

                        
                    });

                    //스크롤바 drag 이벤트
                    // barCursor.on('mousemove', function(e){
                    //     var t = $(this),
                    //         curY,disY,iY,
                    //         barPer = parseInt( t.css('top').slice(0,2) ),
                    //         dragIng = 'false';

                    //     t.on('mousedown', function(e){

                    //         curY = e.pageY;
                    //         iY = t.offset().top;
                    //         disY = 0;
                    //         dragIng = 'true';

                    //         console.log('mousedown', 'curY' + curY, 'disY' + disY );

                    //     }).on('mousemove', function(e){
                    //         if(dragIng == 'true'){ 
                    //             disY = e.pageY - curY;
                                
                    //             t.offset({ 'top': iY + disY });
                    //             t.closest('.ui-scrollview').find('.ui-scrollarea').scrollTop(barPer);
                    //             console.log(barPer);

                    //         }
                    //     }).on('mouseup', function(e){
                    //         disY = e.pageY - curY;

                    //         t.offset({ 'top': iY + disY });

                    //         dragIng = 'false';
                            
                    //         console.log('mouseup', 'disY' + disY, 'iY' + iY);
                    //     });
                    // });

                    
                    
                }();

                console.log('scrollUi');
        },

        init : function(){
            var t = this;

            t.tabUi();
            t.selectUi();
            t.modalUi();
            t.scrollUi();
        }


        
    }
    // (end) TNUI returm module
    
})();