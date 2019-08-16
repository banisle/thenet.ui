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

        tooltipUi : function(){
            var tooltip = '[class^="tooltip"]';
            
            $(tooltip).on('mouseenter focus', function(e){
                var $this = $(this),
                    $dataOt = $this.data('option'),
                    $dataTip = $this.data('tooltip'),
                    $targetOff = $this.offset(),
                    $thisBtnW = $this.outerWidth(),
                    $thisBtnH = $this.outerHeight(),
                    $targetW = $($dataTip).outerWidth(),
                    $targetH = $($dataTip).outerHeight();

                var config = {
                    top: {
                        top: $targetOff.top - $targetH - 9,
                        left: $targetOff.left,
                    },
                    left: {
                        top: $targetOff.top - $targetH / 4,
                        left: $targetOff.left - $thisBtnW - 44,
                    },
                    right: {
                        top: $targetOff.top - $targetH / 4,
                        left: $targetOff.left + $thisBtnW + 9,
                    },
                    bottom: {
                        top: $targetOff.top + $targetH - 16,
                        left: $targetOff.left,
                    }
                };
                switch ($dataOt) {
                    case 'top':
                        $($dataTip).css(config.top).addClass('top');
                        break;
                    case 'bottom':
                        $($dataTip).css(config.bottom).addClass('bottom');
                        break;
                    case 'left':
                        $($dataTip).css(config.left).addClass('left');
                        break;
                    case 'right':
                        $($dataTip).css(config.right).addClass('right');
                        break;
                };
               
                $($dataTip).addClass('active');
                return false;

            }).on('blur mouseleave', function(e){
                $(tooltip).removeClass('active');
            });
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
                scrollBar = scrollWrap.find('.ui-scrollbar'),
                barCursor = scrollBar.find('.bar'),
                down = false,
                rangeTop,
                rangeSize;
                
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

                    scrollBar.on('mousedown', function(e){
                        var t = $(this);
                        rangeTop = t.offset().top,
                        rangeSize = t.height();
                        scrollCt = t.closest(scrollWrap).find(scrollArea),
                        down = true;
                        // console.log(scrollCt);

                        updateDrag(e);
                        return false;
                    });

                    $(document).on('mousemove', function(e){
                        updateDrag(e);
                    });
                    
                    $(document).on('mouseup', function(){
                        down = false;
                    });



                    //스크롤바 drag 이벤트
                    function updateDrag(e){
                        var t = $(e.target),
                            barCursor = t.closest(scrollWrap).find('.bar'),
                            barSize =  parseInt(barCursor.height())/2,
                            curTop = e.pageY - rangeTop - barSize,
                            curScTop = Math.round((curTop * 100) / (rangeSize - (barSize*2)) * (scrollCt.find('.ui-content').prop('scrollHeight') - scrollCt.height()) / 100);

                            // console.log('updateDrag',e.pageY,rangeTop,barSize);

                        if( down && e.pageY >= (rangeTop + barSize) && e.pageY <= (rangeTop + rangeSize - barSize) ){
                            barCursor.css('top', curTop + 'px');
                            scrollCt.scrollTop(curScTop);
                        }
                    }

                    
                    
                }();

                console.log('scrollUi');
        },

        accoUi : function(){
            var t = this,
            uiAccoWrap = $('.ui-accordian'),
            uiAccobtn = uiAccoWrap.find('.ui-btn-acco'),
            uiAccoCt = uiAccoWrap.find('.ui-acco-ct'),
            ArrBtn = Array.prototype.slice.call(uiAccobtn),
            ArrSubBtn = ArrBtn.filter(function(i){
                return $(i).hasClass('sub');
            }),
            opendSt = $('[data-open]'),tarCtH;

            // console.log( ArrSubBtn );


            //click evtrmsid
            uiAccobtn.on('click',function(e){
                var t = $(this),
                allowMultiple = t.closest(uiAccoWrap).attr('data-allow-multiple') == 'true',
                isExpanded = t.attr('aria-expanded') == 'true',
                isSub = t.closest(uiAccoWrap).hasClass('sub-accord'),
                tarId = t.attr('aria-controls'),
                tarCt = t.closest(uiAccoWrap).find('#' + tarId),
                motSpd = parseInt(t.closest(uiAccoWrap).attr('data-trans-speed')),
                tarCtH = t.closest(uiAccoWrap).find(tarCt).height(),
                tarCtAH = t.closest(uiAccoWrap).find(tarCt).css('height','auto').height();

                if(tarCt.is(':animated')){ return}

                if(!isExpanded){
                    //다중 열기 불가능
                    if (!allowMultiple) {
                        t.closest(uiAccoWrap).find(uiAccoCt).animate({'height' : 0},0);
                        t.closest(uiAccoWrap).find(uiAccobtn).attr('aria-expanded','false').removeAttr('aria-disabled');
                        t.closest(uiAccoWrap).find('li').removeClass('active');
                        t.attr('aria-disabled', 'true');
                    };
                    
                    t.attr('aria-expanded','true');
                    t.closest('li').addClass('active');
                    //서브 어코디언 클릭시 부모의 높이값 증가
                    if(isSub){
                        var pH = t.closest(uiAccoCt).height();
                        t.closest(uiAccoCt).height( parseInt(pH) + parseInt(tarCtAH));
                    }
                    t.closest(uiAccoWrap).find(tarCt).stop().height(tarCtH).animate({ 'height' : tarCtAH + 'px'},motSpd);
                    

                } else {

                    //다중 열기 불가능
                    if (!allowMultiple) {
                        if(isExpanded){ return };
                        t.attr('aria-expanded','false');
                        t.closest(uiAccoWrap).find(uiAccoCt).animate({ 'height' : 0},motSpd);
                        t.closest(uiAccoWrap).find(uiAccobtn).attr('aria-expanded','false');
                        t.closest(uiAccoWrap).find(tarCt).stop().animate({ 'height' : tarCtAH + 'px'},motSpd);
                        t.removeAttr('aria-disabled');
                        t.closest('li').addClass('active');
                        return;
                    };

                    t.attr('aria-expanded','false')
                    //서브 어코디언 클릭시 부모의 높이값 감소
                    if(isSub){
                        var pH = t.closest(uiAccoCt).height();
                        t.closest(uiAccoCt).height( parseInt(pH) - parseInt(tarCtAH));
                    }
                    t.closest(uiAccoWrap).find(tarCt).stop().animate({ 'height' : 0},motSpd);
                    t.closest('li').removeClass('active');
                }

                e.preventDefault();

            }).on('focus',function(){
                $(this).closest(uiAccoWrap).addClass('focus');
            }).on('blur',function(){
                $(this).closest(uiAccoWrap).removeClass('focus');
            });

            // 키 바인딩
            uiAccoWrap.on('keydown', function (e) {
                var target = e.target;
                var key = e.which.toString();


                // 33 = Page Up, 34 = Page Down
                var ctrlModifier = (e.ctrlKey && key.match(/33|34/));

                // Is this coming from an accordion header?
                if ( uiAccobtn ) {
                    // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
                    // 38 = Up, 40 = Down
                    if (key.match(/38|40/) || ctrlModifier) {
                        var index = ArrBtn.indexOf(target);
                        var direction = (key.match(/34|40/)) ? 1 : -1;
                        var length = ArrBtn.length;
                        var newIndex = (index + length + direction) % length;

                        //서브 아코디언 있을경우 
                        if( $(target).is('.sub-has') && $(target).attr('aria-expanded') == 'false' ){
                            direction == 1 ? newIndex = newIndex + ArrSubBtn.length : newIndex;
                        } else if( $(target).is('.ui-sub-next') && $(target).closest('[data-li]').prev().find(uiAccobtn).attr('aria-expanded') == 'false'){
                            direction == -1 ? newIndex = newIndex - ArrSubBtn.length : newIndex;
                        };

                        ArrBtn[newIndex].focus();

                        e.preventDefault();
                    } else if (key.match(/35|36/)) {
                        // 35 = End, 36 = Home keyboard operations
                        switch (key) {
                            // Go to first accordion
                            case '36':
                                ArrBtn[0].focus();
                                break;
                                // Go to last accordion
                            case '35':
                                ArrBtn[ArrBtn.length - 1].focus();
                                break;
                        }
                        e.preventDefault();

                    }

                }
            });
            
            

            //init
            // uiAccoCt.hide();
            opendSt.trigger('click');
            uiAccoWrap.each(function(){
                var t = $(this);
                t.find('.ui-btn-acco').last().addClass('last');
            });
            // 서브 어코디언 있을때 다음 어코디언(키맵핑)에 클래스 추가
            if( $('.sub-has').length !== 0) $('.sub-has').closest('[data-li]').next().find(uiAccobtn).addClass('ui-sub-next');
            
            console.log('accoUi');

        },

        sliderUi : function(container_id, vert, min, max, inc, jump, showVals, range, val1, val2){
            function keyCodes() {
                // Define values for keycodes
                this.backspace = 8;
                this.tab = 9;
                this.enter = 13;
                this.esc = 27;

                this.space = 32;
                this.pageup = 33;
                this.pagedown = 34;
                this.end = 35;
                this.home = 36;

                this.left = 37;
                this.up = 38;
                this.right = 39;
                this.down = 40;

            } // end keyCodes
            
            ////////////////////////////////////////////////////
            //
            // function slider() is a class to define an ARIA-enabled slider widget. The class
            // will create needed handles and define ARIA attributes for the slider
            //
            // @param(container_id string) container_id is the containing div for the slider
            //
            // @param(vert boolean) vert is true if the slider is vertical; false if horizontal
            //
            // @param(inc integer) inc is the increment value for the slider
            //
            // @param(jump integer) jump is the large increment value for the slider (pgUp/pgDown keys)
            //
            // @param(showVals boolean) showVals is true if the slider should display the value of the handles
            //
            // @param(range boolean) range is true if the slider is a range slider
            //
            // @param(val1 integer) val1 specifies the initial value of the slider or of the first
            //         slide handle if this is a range slider. Must be >= min.
            //
            // @param(val2 integer) val2 specifies the initial value of the second slide handle.
            //         Ignored if range is false (i.e. not a range slider). Must be <= max.
            //
            // @return N/A
            //

            // define slider object properties
            this.keys = new keyCodes();

            this.id = container_id;
            this.$container = $('#' + container_id);
            this.vert = vert;
            this.range = range;
            this.showVals = showVals;

            // Store the size of the slider
            this.width = this.$container.outerWidth();
            this.height = this.$container.outerHeight();

            // Store the page position of the slider
            this.left = Math.round(this.$container.offset().left);
            this.top = Math.round(this.$container.offset().top);

            // Store the minimum and maximum and initial values
            this.min = min;
            this.max = max;
            this.inc = inc;
            this.jump = jump;
            this.val1 = val1;

            // If range is true, store the second value
            if (range == true) {
                this.val2 = val2;
            }

            /////////////// Create handles /////////////////

            this.$handle1 = undefined;
            this.$handle2 = undefined;

            if (range == false) {
                // Create the handle
                this.$handle1 = this.createHandle(val1);

              
            } else {
                // create the range highlight div
                this.createRangeDiv();

                // Create the first handle
                this.$handle1 = this.createHandle(val1, 1);

                // create the second handle
                this.$handle2 = this.createHandle(val2, 2);
            }

            

            console.log('sliderUi');

            
        },

        init : function(){
            var t = this;

            t.tabUi();
            t.selectUi();
            t.tooltipUi();
            t.modalUi();
            t.scrollUi();
            t.accoUi();
        }

    }
    // (end) TNUI returm module

    

})();

// 슬라이더 프로토타입 속성
// function createHandle() creates a handle for the slider. It defines ARIA attributes for
// the handle and positions it at the specified value in the slider range. if showVals is true,
// create and position divs to display the handle value.
//
// @param (val integer) val is the initial value of the handle
//
// @param (num integer) num is the handle number. (optional)
//
// @return (object) returns the object pointer of the newly created handle
//
TNUI.module.sliderUi.prototype.createHandle = function (val, num) {

    var id = this.id + '_handle' + (num == undefined ? '' : num);
    var label = this.id + '_label' + (num == undefined ? '' : num);
    var controls = this.id + '_text' + (num == undefined ? '' : num);
    var $handle;

    var handle = '<span id="' + id + '" class="' + (this.vert == true ? 'v' : 'h') + 'sliderHandle" '+
        'role="slider" aria-valuemin="' + this.min +
        '" aria-valuemax="' + this.max +
        '" aria-valuenow="' + (val == undefined ? this.min : val) +
        '" aria-labelledby="' + label +
        '" aria-controls="' + controls + '" tabindex="0"></span>';

    // Create the handle
    this.$container.append(handle);

    // store the handle object
    $handle = $('#' + id);

    if (this.showVals == true) {
        var valContainer = '<div id="' + id + '_val" class="' + (this.vert == true ? 'v' : 'h') +
            'sliderValue" role="presentation"></div>'

        // Create the container.
        this.$container.append(valContainer);
    }

    // store the value object
    $handle = $('#' + id);

    // position handle
    this.positionHandle($handle, val);

    // bind handlers
    this.bindHandlers($handle);

    return $handle;

} // end createHandle()

//
// function createRangeDiv() creates a div for the highlight of a range slider. It sets the initial top or left position
// to match that of the slider container.
//
// @return N/A
//
TNUI.module.sliderUi.prototype.createRangeDiv = function () {

    var id = this.id + '_range';

    var range = '<div id="' + id + '" class="sliderRange"></div>';

    // Create the range div
    this.$container.append(range);

    // Store the div object
    this.$rangeDiv = $('#' + id);

    if (this.vert == false) { // horizontal slider
        // this.$rangeDiv.css('top', this.top + 'px');
        this.$rangeDiv.css('top', 0 + 'px');
        this.$rangeDiv.css('height', this.$container.height() + 'px');
    } else { // vertical slider
        // this.$rangeDiv.css('left', this.left + 'px');
        this.$rangeDiv.css('left', 0 + 'px');
        this.$rangeDiv.css('width', this.$container.width() + 'px');
    }

} // end createRangeDiv()

//
// function positionHandle() is a member function to position a handle at the specified value for the
// slider. If showVal is true, it also positions and updates the displayed value container.
//
// @param($handle object) $handle is a pointer to the handle jQuery object to manipulate
//
// @param (val integer) val is the new value of the slider
//
// @return N/A
//
TNUI.module.sliderUi.prototype.positionHandle = function ($handle, val) {

    var handleHeight = $handle.outerHeight(); // the total height of the handle
    var handleWidth = $handle.outerWidth(); // the total width of the handle
    var handleOffset; // the distance from the value position for centering the handle
    var xPos; // calculated horizontal position of the handle;
    var yPos; // calculated vertical position of the handle;
    var valPos; //calculated new pixel position for the value;

    if (this.vert == false) {
        // horizontal slider

        // calculate the horizontal pixel position of the specified value
        // valPos = ((val - this.min) / (this.max - this.min)) * this.width + this.left;
        valPos = ((val - this.min) / (this.max - this.min)) * this.width;

        xPos = Math.round(valPos - (handleWidth / 2));
        // yPos = Math.round(this.top + (this.height / 2) - (handleHeight / 2));
        yPos = Math.round(- ((this.height / 2) - (handleHeight / 4)));
    } else {
        // vertical slider

        // calculate the vertical pixel position of the specified value
        // valPos = ((val - this.min) / (this.max - this.min)) * this.height + this.top;
        valPos = ((val - this.min) / (this.max - this.min)) * this.height;

        // xPos = Math.round(this.left + (this.width / 2) - (handleWidth / 2));
        xPos = Math.round( -((this.width / 2) - (handleWidth / 4)) );
        yPos = Math.round(valPos - (handleHeight / 2));
    }

    // Set the position of the handle
    $handle.css('top', yPos + 'px');
    $handle.css('left', xPos + 'px');

    // Set the aria-valuenow position of the handle
    $handle.attr('aria-valuenow', val);

    // Update the stored handle values
    if (/1$/.test($handle.attr('id')) == true) {
        // first handle
        this.val1 = val;
    } else {
        // second handle
        this.val2 = val;
    }

    // if range is true, set the position of the range div
    if (this.range == true) {
        this.positionRangeDiv();
    }

    // if showVal is true, update the value container
    if (this.showVals == true) {
        this.updateValBox($handle, Math.round(valPos));
    }

} // end positionHandle()

//
// function positionRangeDiv() is a member function to reposition the range div when a handle is moved
//
// @return N/A
//
TNUI.module.sliderUi.prototype.positionRangeDiv = function () {

    var pos; //calculated new range start position;
    var size; //calculated new range size;

    if (this.vert == false) { // Horizontal slider

        // calculate the range start position
        // pos = Math.round(((this.val1 - this.min) / (this.max - this.min)) * this.width) + this.left;
        pos = Math.round(((this.val1 - this.min) / (this.max - this.min)) * this.width);

        // calculate the new range width
        // size = Math.round(((this.val2 - this.min) / (this.max - this.min)) * this.width) + this.left - pos;
        size = Math.round(((this.val2 - this.min) / (this.max - this.min)) * this.width) - pos;

        // set the new range position
        this.$rangeDiv.css('left', pos + 'px');

        // set the new range width
        this.$rangeDiv.css('width', size + 'px');
    } else {
        // calculate the range start position
        // pos = Math.round(((this.val1 - this.min) / (this.max - this.min)) * this.height) + this.top;
        pos = Math.round(((this.val1 - this.min) / (this.max - this.min)) * this.height);

        // calculate the new range width
        // size = Math.round(((this.val2 - this.min) / (this.max - this.min)) * this.height) + this.top - pos;
        size = Math.round(((this.val2 - this.min) / (this.max - this.min)) * this.height) - pos;

        // set the new range position
        this.$rangeDiv.css('top', pos + 'px');

        // set the new range width
        this.$rangeDiv.css('height', size + 'px');
    }

} // end positionRangeDiv()

//
// function updateValBox() is a member function to reposition a handle value box and update its contents
//
// @param ($handle object) $handle is the jQuery object of the handle that was moved
//
// @param (valPos integer) is the pixel position of the slider value
//
// @return N/A
//
TNUI.module.sliderUi.prototype.updateValBox = function ($handle, valPos) {

    var $valBox = $('#' + $handle.attr('id') + '_val');

    var xPos; // horizontal pixel position of the box
    var yPos; // vertical pixel position of the box

    // Set the position of the handle
    if (this.vert == false) {
        var boxWidth = $valBox.outerWidth();

        yPos = $handle.css('top');

        // Adjust the horizontal position to center the value box on the value position
        xPos = Math.round(valPos) + 'px';

    } else {
        var boxHeight = $valBox.outerHeight();

        xPos = $handle.css('left');

        // Adjust the vertical position to center the value box on the value position
        yPos = Math.round(valPos - (boxHeight / 2)) + 'px';
    }

    // Set the position of the value box
    $valBox.css('top', yPos);
    $valBox.css('left', xPos);

    // Set the text in the box to the handle value
    $valBox.text($handle.attr('aria-valuenow'));

} // end updateValBox()

//
// function bindHandlers() is a member function to bind event handlers to a slider handle
//
// @param ($handle object) $handle is the object pointer of the handle to bind handlers to
//
// @return N/A
TNUI.module.sliderUi.prototype.bindHandlers = function ($handle) {

    var thisObj = this; // store the this pointer

    $handle.keydown(function (e) {
        return thisObj.handleKeyDown($handle, e);
    });

    $handle.keypress(function (e) {
        return thisObj.handleKeyPress($handle, e);
    });

    $handle.focus(function (e) {
        return thisObj.handleFocus($handle, e);
    });

    $handle.blur(function (e) {
        return thisObj.handleBlur($handle, e);
    });

    $handle.mousedown(function (e) {
        return thisObj.handleMouseDown($handle, e);
    });

} // end bindHandlers()

//
// function handleKeyDown() is a member function to process keydown events for a slider handle
//
// @param ($handle object) $handle is the object associated with the event
//
// @parem (evt object) evt is the event object associated witthe the event
//
// @return (boolean) true if propagating; false if consuming event
//
TNUI.module.sliderUi.prototype.handleKeyDown = function ($handle, evt) {

    if (evt.ctrlKey || evt.shiftKey || evt.altKey) {
        // Do nothing
        return true;
    }

    switch (evt.keyCode) {
        case this.keys.home: {
            // move the handle to the slider minimum
            if (this.range == false) {
                this.positionHandle($handle, this.min);
            } else {
                if (/1$/.test($handle.attr('id')) == true) {
                    // handle 1 - move to the min value
                    this.positionHandle($handle, this.min);
                } else {
                    // handle 2 - move to the position of handle 1
                    this.positionHandle($handle, this.val1);
                }
            }
            evt.stopPropagation;
            return false;
            break;
        }
        case this.keys.end: {
            if (this.range == false) {
                // move the handle to the slider maximum
                this.positionHandle($handle, this.max);
            } else {
                if (/1$/.test($handle.attr('id')) == true) {
                    // handle 1 - move to the position of handle 2
                    this.positionHandle($handle, this.val2);
                } else {
                    // handle 2 - move to the max value
                    this.positionHandle($handle, this.max);
                }
            }
            evt.stopPropagation;
            return false;
            break;
        }
        case this.keys.pageup: {

            // Decrease by jump value

            var newVal = $handle.attr('aria-valuenow') - this.jump;
            var stopVal = this.min; // where to stop moving

            if (this.range == true) {
                // if this is handle 2, stop when we reach the value
                // for handle 1
                if (/2$/.test($handle.attr('id')) == true) {
                    stopVal = this.val1;
                }
            }

            // move the handle one jump increment toward the slider minimum
            // If value is less than stopVal, set at stopVal instead
            this.positionHandle($handle, (newVal > stopVal ? newVal : stopVal));

            evt.stopPropagation;
            return false;
            break;
        }
        case this.keys.pagedown: {

            // Increase by jump value

            var newVal = parseInt($handle.attr('aria-valuenow')) + this.jump;
            var stopVal = this.max; // where to stop moving

            if (this.range == true) {
                // if this is handle 1, stop when we reach the value
                // for handle 2
                if (/1$/.test($handle.attr('id')) == true) {
                    stopVal = this.val2;
                }
            }

            // move the handle one jump increment toward the slider maximum
            // If value is greater than maximum, set at maximum instead
            this.positionHandle($handle, (newVal < stopVal ? newVal : stopVal));

            evt.stopPropagation;
            return false;
            break;
        }
        case this.keys.left:
        case this.keys.up: { // decrement

            var newVal = $handle.attr('aria-valuenow') - this.inc;
            var stopVal = this.min; // where to stop moving

            if (this.range == true) {
                // if this is handle 2, stop when we reach the value
                // for handle 1
                if (/2$/.test($handle.attr('id')) == true) {
                    stopVal = this.val1;
                }
            }

            // move the handle one jump increment toward the stopVal
            // If value is less than stopVal, set at stopVal instead
            this.positionHandle($handle, (newVal > stopVal ? newVal : stopVal));

            evt.stopPropagation;
            return false;
            break;
        }
        case this.keys.right:
        case this.keys.down: { // increment

            var newVal = parseInt($handle.attr('aria-valuenow')) + this.inc;
            var stopVal = this.max; // where to stop moving

            if (this.range == true) {
                // if this is handle 1, stop when we reach the value
                // for handle 2
                if (/1$/.test($handle.attr('id')) == true) {
                    stopVal = this.val2;
                }
            }

            // move the handle one increment toward the slider maximum
            // If value is greater than maximum, set at maximum instead
            this.positionHandle($handle, (newVal < stopVal ? newVal : stopVal));

            evt.stopPropagation;
            return false;
            break;
        }
    } // end switch

    return true;

} // end handleKeyDown

//
// function handleKeyPress() is a member function to process keypress events for a slider handle. Needed for
// browsers that perform window scrolling on keypress rather than keydown events.
//
// @param ($handle object) $handle is the object associated with the event
//
// @parem (evt object) evt is the event object associated witthe the event
//
// @return (boolean) true if propagating; false if consuming event
//
TNUI.module.sliderUi.prototype.handleKeyPress = function ($handle, evt) {

    if (evt.ctrlKey || evt.shiftKey || evt.altKey) {
        // Do nothing
        return true;
    }

    switch (evt.keyCode) {
        case this.keys.home:
        case this.keys.pageup:
        case this.keys.end:
        case this.keys.pagedown:
        case this.keys.left:
        case this.keys.up:
        case this.keys.right:
        case this.keys.down: {

            // Consume the event
            evt.stopPropagation;
            return false;
            break;
        }
    } // end switch

    return true;

} // end handleKeyDown

//
// function handleFocus() is a member function to process focus events for a slider handle
//
// @param ($handle object) $handle is the object associated with the event
//
// @parem (evt object) evt is the event object associated witthe the event
//
// @return (boolean) true if propagating; false if consuming event
//
TNUI.module.sliderUi.prototype.handleFocus = function ($handle, evt) {

    $handle.attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_' + (this.vert == true ?
        'v' : 'h') + '-focus.png');
    $handle.addClass('focus');
    $handle.css('z-index', '20');

    return true;

} // end handleFocus()

//
// function handleBlur() is a member function to process blur events for a slider handle
//
// @param ($handle object) $handle is the object associated with the event
//
// @parem (evt object) evt is the event object associated witthe the event
//
// @return (boolean) true if propagating; false if consuming event
//
TNUI.module.sliderUi.prototype.handleBlur = function ($handle, evt) {

    $handle.attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_' + (this.vert == true ?
        'v' : 'h') + '.png');
    $handle.removeClass('focus');
    $handle.css('z-index', '10');

    return true;

} // end handleBlur()

//
// function handleMouseDown() is a member function to process mousedown events for a slider handle. The function
// binds a mousemove handler
//
// @param ($handle object) $handle is the object associated with the event
//
// @parem (evt object) evt is the event object associated witthe the event
//
// @return (boolean) true if propagating; false if consuming event
//
TNUI.module.sliderUi.prototype.handleMouseDown = function ($handle, evt) {

    var thisObj = this; // store the this pointer

    // remove focus highlight from all other slider handles on the page
    $('.hsliderHandle').attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_h.png')
        .removeClass('focus').css('z-index', '10');
    $('.vsliderHandle').attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_v.png')
        .removeClass('focus').css('z-index', '10');

    // Set focus to the clicked handle
    $handle.focus();

    // bind a mousemove event handler to the document to capture the mouse
    $(document).mousemove(function (e) {
        thisObj.handleMouseMove($handle, e);
    });

    //bind a mouseup event handler to the document to capture the mouse
    $(document).mouseup(function (e) {
        return thisObj.handleMouseUp($handle, e);
    });

    evt.stopPropagation;
    return false;

} // end handleMouseDown()

//
// function handleMouseUp() is a member function to process mouseup events for a slider handle. The function
// unbinds the mousemove handler
//
// @param ($handle object) $handle is the object associated with the event
//
// @parem (evt object) evt is the event object associated witthe the event
//
// @return (boolean) true if propagating; false if consuming event
//
TNUI.module.sliderUi.prototype.handleMouseUp = function ($handle, evt) {

    // unbind the event listeners to release the mouse
    $(document).unbind('mousemove');
    $(document).unbind('mouseup');

    evt.stopPropagation;
    return false;

} // end handleMouseUp()

//
// function handleMouseMove() is a member function to process mousemove events for a slider handle.
//
// @param ($handle object) $handle is the object associated with the event
//
// @parem (evt object) evt is the event object associated witthe the event
//
// @return (boolean) true if propagating; false if consuming event
//
TNUI.module.sliderUi.prototype.handleMouseMove = function ($handle, evt) {

    var curVal = parseInt($handle.attr('aria-valuenow'));
    var newVal;
    var startVal = this.min;
    var stopVal = this.max;

    if (this.range == true) {
        // if this is handle 1, set stopVal to be the value
        // for handle 2
        if (/1$/.test($handle.attr('id')) == true) {
            stopVal = this.val2;
        } else {
            // This is handle 2: Set startVal to be the value
            // for handle 1
            startVal = this.val1;
        }
    }

    if (this.vert == false) {
        // horizontal slider

        // Calculate the new slider value based on the horizontal pixel position of the mouse
        newVal = Math.round((evt.pageX - this.left) / this.width * (this.max - this.min)) + this.min;
    } else {
        // vertical slider

        // Calculate the new slider value based on the vertical pixel position of the mouse
        newVal = Math.round((evt.pageY - this.top) / this.height * (this.max - this.min)) + this.min;
    }

    if (newVal >= startVal && newVal <= stopVal) {

        // Do not move handle unless new value is a slider increment
        if (newVal % this.inc == 0) {
            this.positionHandle($handle, newVal);
        }
    } else if (newVal < startVal) {

        // value is less than minimum for slider - set handle to min
        this.positionHandle($handle, startVal);
    } else if (newVal > stopVal) {

        // value is greater than maximum for slider - set handle to max
        this.positionHandle($handle, stopVal);
    }

    evt.stopPropagation;
    return false;

} // end handleMouseMove            