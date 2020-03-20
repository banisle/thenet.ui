// thenet UI LIB 0.7
// banisle@gmail.com

'use strict';
var context = window,
    $root = $(document.documentElement).addClass("js"),
    tmpInput = document.createElement("input"),
    isTouch = ("ontouchstart" in context),
    isMobile,
    supportPlaceholder = ("placeholder" in tmpInput),
    detectIe = get_version_of_IE();

isTouch && $root.addClass("touch");
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    console.log('mobile');
    $root.addClass("mobile");
    isMobile = true;
}

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
    if (reg.exec(agent) != null) return parseInt(RegExp.$1 + RegExp.$2);
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
    Function.prototype.bind = function () {
        var fn = this,
            args = arraySlice.call(arguments),
            object = args.shift();
        return function (context) {
            var local_args = args.concat(arraySlice.call(arguments));
            if (this !== window) {
                local_args.push(this)
            }
            return fn.apply(object, local_args)
        }
    }
}

// polyfill 
if (!Math.sign) {
    Math.sign = function(x) {
      // If x is NaN, the result is NaN.
      // If x is -0, the result is -0.
      // If x is +0, the result is +0.
      // If x is negative and not -0, the result is -1.
      // If x is positive and not +0, the result is +1.
        return ((x > 0) - (x < 0)) || +x;
      // A more aesthetic pseudo-representation:
      //
      // ( (x > 0) ? 1 : 0 )  // if x is positive, then positive one
      //          +           // else (because you can't be both - and +)
      // ( (x < 0) ? -1 : 0 ) // if x is negative, then negative one
      //         ||           // if x is 0, -0, or NaN, or not a number,
      //         +x           // then the result will be x, (or) if x is
      //                      // not a number, then x converts to number
    };
}

var TNUI = TNUI || {};

TNUI.module = (function () {
    // (sta) TNUI returm module
    return {
        // mark : tabUi
        tabUi: function () {
            var uiTabWrap = $('.ui-tabWrap'),
                uiTab = uiTabWrap.find('.ui-tab'),
                uiTabBtn = uiTab.find('.ui-tab-btn'),
                uiTabBtnA = $('a.ui-tab-btn'),
                uiTabBtnRad = $('label.ui-tab-btn').prev('input[type=radio]'),
                uiTabList = $('.ui-tab-list'),
                index;
                

            // a 탭 버튼
            uiTabBtnA.on('click', function(e) {
                e.preventDefault();

                if ($(this).hasClass('on')) return;

                $(this).closest(uiTabWrap).find(uiTabBtn).removeClass('on').attr({
                    "tabindex": "-1",
                    "aria-selected": "false"
                });
                $(this).addClass('on').attr({
                        "tabindex": "0",
                        "aria-selected": "true"
                    })
                    .focus();

                $("#" + $(this).attr("aria-controls"))
                    .attr("tabindex", "0")
                    .addClass("on")
                    .siblings(uiTabList)
                    .attr("tabindex", "-1")
                    .removeClass("on");

            });

            // 라디오 탭 버튼
            uiTabBtnRad.on('click change', function(e) {
                
                
                var _this = $(this).next('label');

                if ( _this.hasClass('on')) return;

                $(this).closest(uiTabWrap).find(uiTabBtn).removeClass('on');
                
                _this.attr({
                    "tabindex": "-1",
                    "aria-selected": "false"
                });

                _this.addClass('on').attr({
                        "tabindex": "0",
                        "aria-selected": "true"
                    });

                $("#" + _this.attr("aria-controls"))
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

                if ($(event.target).prev().is('input[type=checkbox]') || $(event.target).prev().is('input[type=radio]')) {
                    return;
                };

                switch (keycode) {
                    case 37: // left arrow

                        if ($(this).closest('li').prev().length == 1) {
                            $(this)
                                .attr("tabindex", "-1")
                                .closest('li').prev().find(uiTabBtn)
                                .attr("tabindex", "0")
                                .focus();
                        } else {

                            // 초점이 첫 번째 요소에 있었다면, 마지막 탭으로 초점 이동
                            $(this)
                                .attr("tabindex", "-1")
                                .closest(uiTab).children().last().find(uiTabBtn)
                                .attr("tabindex", "0")
                                .focus();
                        }
                        break;
                    case 39: // right arrow

                        if ($(this).closest('li').next().length == 1) {
                            $(this)
                                .attr("tabindex", "-1")
                                .closest('li').next().find(uiTabBtn)
                                .attr("tabindex", "0")
                                .focus();

                        } else {
                            // 초점이 마지막 요소에 있었다면, 첫 번째 탭으로 초점 이동
                            $(this)
                                .attr("tabindex", "-1")
                                .closest(uiTab).children().first().find(uiTabBtn)
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

        // mark : selectUi
        selectUi: function () {
            var selId,
                selectUibox,
                $selWrap = $('.selectWrap.ui-selectbox'),
                $selBox,
                $optGrp,
                scrollOn = false;

            selectUibox = function (selId) {
                $selBox = $('#' + selId + ''),
                $optGrp = $selBox.find('option');


                //포커스 잃었을때 
                $(document).on('focusin click', function (e) {
                    if ($selWrap) {
                        if (!$selWrap.find(e.target).length) {
                            //셀렉트 결과 창 닫기
                            $selWrap.removeClass('active ui-result-active');
                        }
                    }
                });

                this.init();
                this.createDiv();
                this.selUpdate();
                this.selOne();

            };

            selectUibox.prototype.init = function () {
                $selBox.hide();
                $selBox.closest($selWrap).attr('data-select', selId);

            };
            selectUibox.prototype.createDiv = function () {
                var appendLi = '';
                

                // 중복생성 체크
                if ( $selBox.closest($selWrap).find('.pc_selwrap').length < 1 ){
                        $selBox.closest($selWrap)
                        .append($('<div class="pc_selwrap"><div class="selOneWrap"><button class="ui-selected-one" aria-haspopup="listbox" aria-labelledby="sel_' + selId + '">' + $selBox.find(':selected').text() + '</button></div><div class="ui-result-ul" tabindex="-1" role="listbox" ><ul></ul></div>'));
                        
                    $selBox.find($optGrp).each(function (i) {
                        var isDisabled = $(this).prop('disabled') ? 'disabled' : '',
                            isHidden = $(this).prop('hidden') ? true : false,
                            selVal = $(this).prop('value'),
                            optTitle = $(this).prop('title');

                            //히든속성 체크
                            if( isHidden  === true ){
                                return;
                            } else{
                                appendLi += '<li><button role="option" ' + isDisabled + ' title="' + optTitle + '" aria-labelledby="sel_' + selId + '" value=' + selVal + '>' + $optGrp.eq(i).text() + '</button></li>';
                            }

                    });
    
                    $selBox.closest($selWrap).find('ul').html(appendLi);
                    
                    // 옵션 ul 높이 구하기
                    var $uiResult = $selBox.closest($selWrap).find('.ui-result-ul'),
                        uiResultH = Number($uiResult.css('height').split('px')[0]),
                        uiResultulH = $uiResult.show().find('ul').outerHeight()
                        ;
                        // console.log($selBox,uiResultH,uiResultulH);
                        //옵션 이 css지정된 height보다 클 경우 스크롤 실행
                        if( uiResultH < uiResultulH){

                            scrollOn = 'true';
                            $uiResult.find('ul')
                            .wrapAll('<div class="scrollWrap ui-scrollview"><div class="scrollInner ui-scrollarea"><div class="scrollview ui-content"></div></div></div>');

                            $uiResult.find('.ui-scrollview').prepend('<div class="ui-scrollbar"><span class="bar"></span></div>');

                        }
                    


                    
                }


            };

            selectUibox.prototype.selUpdate = function () {
                var $selBox = $('#' + selId + ''),
                    $selectedOne = $selBox.closest($selWrap).find('.ui-selected-one'),
                    $uiResult = $selBox.closest($selWrap).find('.ui-result-ul'),
                    isHidden = $selBox.find('option').prop('hidden') ? true : false;

                $uiResult.find('button').on('click', function (e) {
                    var index = isHidden ? $(this).parent().index() + 1 : $(this).parent().index();

                    //셀렉트박스 셀렉트
                    $selBox.find('option').eq(index).prop('selected', true).change();
                    // 선택된 값 출력
                    $selectedOne.text($selBox.find('option').eq(index).text()).removeAttr('aria-expanded');
                    //셀렉트 결과 창 닫기
                    $selWrap.removeClass('ui-result-active');
                    //셀렉트박스 포커스
                    $(this).closest($selWrap).find($selectedOne).focus();


                    e.preventDefault();
                });
            }

            selectUibox.prototype.selOne = function () {
                var $selBox = $('#' + selId + ''),
                    $selectedOne = $selBox.closest($selWrap).find('.ui-selected-one');


                $selectedOne.on('click', function (e) {
                    // console.log($selBox.prop('disabled'));
                    if ($selBox.prop('disabled')) {
                        return false;
                    }
                    $selWrap.removeClass('active ui-result-active');
                    $selectedOne.removeAttr('aria-expanded');
                    $(this).attr('aria-expanded', true).closest($selWrap).removeClass('active ui-result-active').addClass('active ui-result-active');
                    e.preventDefault();
                    // 스크롤 길때 스크롤 ui호출
                    if(scrollOn == 'true'){
                        TNUI.module.scrollUi();
                        scrollOn = 'false';
                    }

                });

            }


            $.each($selWrap, function (i) {
                selId = $selWrap.eq(i).find('select').attr('id');
                new selectUibox('' + selId + '');

            });
        


            console.log('selectUi');


        },
        // mark :tooltipUi
        tooltipUi: function (arrW, arrH, opt) {
            var tooltip,
                $tooltip = $('.ui-tooltip a'),
                opt = opt || 0; // 페이드 효과 없엘때 0으로;


            tooltip = function () {

                this.evt();
            }

            tooltip.prototype.evt = function () {
                $tooltip.on('mouseenter focus', function () {
                    var t = $(this),
                        targetOff = t.offset(),
                        dataOpt = t.data('option'),
                        tarId = t.data('id'),
                        tarH = $('#' + tarId + '').outerHeight(),
                        tarW = $('#' + tarId + '').outerWidth(),
                        thisBtnW = t.outerWidth(),
                        thisBtnH = t.outerHeight();

                    // console.log( 
                    //     'targetOff top' + targetOff.top,
                    //     'targetOff left' + targetOff.left,
                    //     'thisBtnW' + thisBtnW);
                    var config = {
                        top: {
                            'top': parseInt(targetOff.top - tarH - arrH),
                            'left': parseInt(targetOff.left)
                        },
                        left: {
                            'top': parseInt(targetOff.top - tarH / 4),
                            'left': parseInt(targetOff.left - tarW - arrW)
                        },
                        right: {
                            'top': parseInt(targetOff.top - tarH / 4),
                            'left': parseInt(targetOff.left + thisBtnW + arrW)
                        },
                        bottom: {
                            'top': parseInt(targetOff.top + thisBtnH + arrH),
                            'left': parseInt(targetOff.left)
                        }
                    };

                    $('#' + tarId + '').css(config[dataOpt]).addClass(dataOpt).stop().fadeIn(opt);

                }).on('blur mouseleave', function () {
                    var t = $(this),
                        tarId = t.data('id');
                    $('#' + tarId + '').stop().fadeOut(opt);
                });;
            }
            new tooltip(arrW, arrH, opt);
            console.log('tooltipUi');

        },
        // mark : modalUi
        modalUi: function (maskClick) { 
            var mvBtn = $('[data-modal]'),
                btnClose = $('.mvClose'),
                optTrans = 'false',
                openSt = 'false',
                mask = '<div class="mask">',
                $layer = $('.wrap-modal .inner'),
                $mask = $('.laypop .mask'),
                mvId,
                maskClick = maskClick || false,
                bodyIsOverflowing,
                $this
                ;

            // 브라우저 스크롤바 크기 구하기
            function scrollbarWidth () {
                var inner = document.createElement('p');
                inner.style.width = "100%";
                inner.style.height = "200px";
            
                var outer = document.createElement('div');
                outer.style.position = "absolute";
                outer.style.top = "0px";
                outer.style.left = "0px";
                outer.style.visibility = "hidden";
                outer.style.width = "200px";
                outer.style.height = "150px";
                outer.style.overflow = "hidden";
                outer.appendChild (inner);
            
                document.body.appendChild (outer);
                var w1 = inner.offsetWidth;
                outer.style.overflow = 'scroll';
                var w2 = inner.offsetWidth;
                if (w1 == w2) w2 = outer.clientWidth;
            
                document.body.removeChild (outer);
            
                return (w1 - w2);
            };

            // 접근성 키보드 포커스 제어
            function trapFocus(mvId, namespace) {
                var element = $('[data-target=' + mvId + ']')[0],
                    firstFocusableEl = $('[data-target=' + mvId + ']').find('.dialog-start')[0],
                    lastFocusableEl = $('[data-target=' + mvId + ']').find('.dialog-end')[0],
                    KEYCODE_TAB = 9;
            
                element.addEventListener('keydown', function(e) {
                    var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);
            
                    if (!isTabPressed) { 
                        return; 
                    }
            
                    if ( e.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            e.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            e.preventDefault();
                        }
                    }
            
                });
            }

            
            var dimLyOpen = function (mvId, maskClick) {
                var $targetM = $('[data-target=' + mvId + ']'),
                    wrapStat = $targetM.find('.dialog-start').length;

                if (openSt == 'true') {
                    return;
                }
                //스크롤바가 생겼는지 체크
                bodyIsOverflowing = Math.sign( $(window).height() - $(document).height() ) > 0 ? 'true' : 'false';

                //모달 출력시 바닥 고정
                $('html').addClass('fixed');
                // pc일떄만 스크롤바 있을때만 오른쪽 여백 생성
                if (!isMobile) {
                    if (bodyIsOverflowing && scrollbarWidth){
                        $('html').css('padding-right', scrollbarWidth);
                    }
                }
                // 접근성 : 호출 모달에 포커스 및 탭 인덱스 설정
                $targetM.attr('tabindex',-1).fadeIn(0).focus();

                // trapFocus를 위한 엘리먼트 추가
                if( wrapStat < 1 ){
                    $targetM.prepend('<div class="dialog-start" tabindex="0">').append('<div class="dialog-end" tabindex="0">');
                }

                if ( $targetM.find('.mask').length ) {
                    $mask.show();
                } else {
                    $targetM.prepend(mask);
                }

                if (optTrans == 'true') {
                    $targetM.addClass('on');
                }

                //ie9 flag
                if (detectIe == '9') {
                    $('[data-target=' + mvId + '] .inner').css({
                        'top': '50%',
                        'marginTop': -( $targetM.find('.inner').height() / 2)
                    });
                }

                // pc에서만 스크롤 ui 호출
                if (!isMobile) { TNUI.module.scrollUi();}

                openSt = 'true';
                // console.log('open');

                //바닥 클릭시 창 닫기 옵션
                if (maskClick == true) {
                    $(document).on('click', function (e) {
                        // e.preventDefault();
                        if (e.target.className === 'wrap-modal') {
                            $('.mvClose').find(':visible').trigger('click');
                        }
                    });
                } else {
                    $(document).off('click');
                }

                // 트랩포커스
                trapFocus(mvId);


            }

            var dimLyClose = function (mvId) {
                $('html').removeClass('fixed');
                $('html').css('padding-right', '');
                if (optTrans == 'true') {
                    //css transition ease값 = delay
                    $('[data-target=' + mvId + ']').removeClass('on').delay(500).fadeOut(0);
                } else {
                    $('[data-target=' + mvId + ']').hide(0);
                }
                openSt = 'false';
                // console.log('close');
            }

            mvBtn.on('click', function (e) {
                e.preventDefault();

                mvId = $(this).attr('data-modal');
                $('[data-target=' + mvId + ']').hasClass('trans-ms') ? optTrans = 'true' : optTrans = 'false';

                dimLyOpen(mvId, maskClick);

                $this = $(this);
            });

            btnClose.on('click', function (e) {
                e.preventDefault();
                dimLyClose(mvId);
                $this.focus();
            });

            //외부 제어용 플러그인형식
            $.fn.modalUi = function (evt, mvId, maskClick, t) {

                
                if (evt === 'open') {
                    $this = t;
                    dimLyOpen(mvId, maskClick);
                } else if (evt === 'close') {
                    dimLyClose(mvId);
                }
                return this;
            }


            console.log('modalUi');
        },
        // mark :scrollUi
        scrollUi: function () {
            
            // 모바일 체크
            // console.log('pc',!isMobile);

            if (!isMobile) {

                var scrollWrap = $('.ui-scrollview'),
                    scrollArea = scrollWrap.find('.ui-scrollarea'),
                    scrollCt = scrollArea.find('.ui-content'),
                    scrollBar = scrollWrap.find('.ui-scrollbar'),
                    barCursor = scrollBar.find('.bar'),
                    down = false,
                    rangeTop,
                    rangeSize;

                if (scrollWrap.length !== 0) {
                    //scroll width & height 구하기
                        var i = 0;

                        scrollWrap.each(function (i) {
                            var wrapW = scrollWrap.eq(i).parent().width(),
                                wrapH = scrollCt.eq(i).prop('scrollHeight'),
                                wrapOrgH = scrollWrap.eq(i).height(),
                                barSize = parseFloat((wrapOrgH / wrapH) * 100);

                            // console.log(
                            //     'wrapW' + wrapW,
                            //     'wrapOrgH' + wrapOrgH,
                            //     'wrapH' + wrapH,
                            //     'barSize' + barSize
                            //     );
                            scrollWrap.eq(i).width(wrapW);
                            scrollCt.eq(i).width(wrapW).height(wrapOrgH);

                            barCursor.eq(i).height(barSize + '%');

                        });

                        // scrollbar 위치 구하기
                        scrollArea.on('scroll', function () {
                            var t = $(this),
                                wrapH = t.find('.ui-content').prop('scrollHeight'),
                                wrapOrgH = t.parent().height(),
                                barCursor = t.parent().find('.bar'),
                                barSize = barCursor.height(),
                                scTop = $(this).scrollTop(),
                                scTopPer = parseFloat(scTop / ((wrapH - wrapOrgH) / 100)),
                                barPer = (wrapOrgH - barSize) / 100;

                            barCursor.eq(i).css({
                                'top': parseFloat(barPer * scTopPer) + 'px'
                            });
                        });

                        scrollBar.on('mousedown', function (e) {
                            var t = $(this);
                                rangeTop = t.offset().top,
                                rangeSize = t.height();
                                scrollCt = t.closest(scrollWrap).find(scrollArea),
                                down = true;

                                
                            // console.log(scrollCt);


                            return false;
                        });

                        $(document).on('mousemove', function (e) {
                            updateDrag(e);
                        });

                        $(document).on('mouseup', function () {
                            down = false;
                        });

                        //스크롤바 drag 이벤트
                        var updateDrag = function(e) {
                            var t = $(e.target),
                                barCursor = t.closest(scrollWrap).find('.bar'),
                                barSize = parseFloat(barCursor.height()) / 2,
                                curTop = e.pageY - rangeTop - barSize,
                                curScTop = Math.round((curTop * 100) / (rangeSize - (barSize * 2)) * (scrollCt.find('.ui-content').prop('scrollHeight') - scrollCt.height()) / 100);

                            // console.log('updateDrag',e.pageY,rangeTop,barSize);

                            if (down && e.pageY >= (rangeTop + barSize) && e.pageY <= (rangeTop + rangeSize - barSize)) {
                                barCursor.css('top', curTop + 'px');
                                scrollCt.scrollTop(curScTop);

                            }
                            
                        }




                    // 리사이즈시 적용
                    var thisObj = this;

                    $(window).on('resize', function () {
                        clearTimeout(window.resizedFinished);
                        window.resizedFinished = setTimeout(function () {
                            thisObj.scrollUi();
                            // console.log('s');

                        }, 250);
                    });


                    console.log('scrollUi');
                }
            }
        },
        // mark : accoUi
        accoUi: function () {
            var uiAccoWrap = $('.ui-accordian'),
                uiAccobtn = uiAccoWrap.find('.ui-btn-acco'),
                uiAccoCt = uiAccoWrap.find('.ui-acco-ct'),
                ArrBtn = Array.prototype.slice.call(uiAccobtn),
                ArrSubBtn = ArrBtn.filter(function (i) {
                    return $(i).hasClass('sub');
                }),
                opendSt = $('[data-open]'),
                tarCtH;

            // console.log( ArrSubBtn );


            //click evt
            uiAccobtn.on('click', function (e) {
                var t = $(this),
                    allowMultiple = t.closest(uiAccoWrap).attr('data-allow-multiple') == 'true',
                    isExpanded = t.attr('aria-expanded') == 'true',
                    isSub = t.closest(uiAccoWrap).hasClass('sub-accord'),
                    tarId = t.attr('aria-controls'),
                    tarCt = t.closest(uiAccoWrap).find('#' + tarId),
                    motSpd = parseInt(t.closest(uiAccoWrap).attr('data-trans-speed')),
                    tarCtH = t.closest(uiAccoWrap).find(tarCt).height(),
                    tarCtAH = t.closest(uiAccoWrap).find(tarCt).css('height', 'auto').height();

                if (tarCt.is(':animated')) {
                    return
                }

                if (!isExpanded) {
                    //다중 열기 불가능
                    if (!allowMultiple) {
                        t.closest(uiAccoWrap).find(uiAccoCt).animate({
                            'height': 0
                        }, 0);
                        t.closest(uiAccoWrap).find(uiAccobtn).attr('aria-expanded', 'false').removeAttr('aria-disabled');
                        t.closest(uiAccoWrap).find('li').removeClass('active');
                        t.attr('aria-disabled', 'true');
                    };

                    t.attr('aria-expanded', 'true');
                    t.closest('li').addClass('active');
                    //서브 어코디언 클릭시 부모의 높이값 증가
                    if (isSub) {
                        var pH = t.closest(uiAccoCt).height();
                        t.closest(uiAccoCt).height(parseInt(pH) + parseInt(tarCtAH));
                    }
                    t.closest(uiAccoWrap).find(tarCt).stop().height(tarCtH).animate({
                        'height': tarCtAH + 'px'
                    }, motSpd);


                } else {

                    //다중 열기 불가능
                    if (!allowMultiple) {
                        if (isExpanded) {
                            return
                        };
                        t.attr('aria-expanded', 'false');
                        t.closest(uiAccoWrap).find(uiAccoCt).animate({
                            'height': 0
                        }, motSpd);
                        t.closest(uiAccoWrap).find(uiAccobtn).attr('aria-expanded', 'false');
                        t.closest(uiAccoWrap).find(tarCt).stop().animate({
                            'height': tarCtAH + 'px'
                        }, motSpd);
                        t.removeAttr('aria-disabled');
                        t.closest('li').addClass('active');
                        return;
                    };

                    t.attr('aria-expanded', 'false')
                    //서브 어코디언 클릭시 부모의 높이값 감소
                    if (isSub) {
                        var pH = t.closest(uiAccoCt).height();
                        t.closest(uiAccoCt).height(parseInt(pH) - parseInt(tarCtAH));
                    }
                    t.closest(uiAccoWrap).find(tarCt).stop().animate({
                        'height': 0
                    }, motSpd);
                    t.closest('li').removeClass('active');
                }

                e.preventDefault();

            }).on('focus', function () {
                $(this).closest(uiAccoWrap).addClass('focus');
            }).on('blur', function () {
                $(this).closest(uiAccoWrap).removeClass('focus');
            });

            // 키 바인딩
            uiAccoWrap.on('keydown', function (e) {
                var target = e.target;
                var key = e.which.toString();


                // 33 = Page Up, 34 = Page Down
                var ctrlModifier = (e.ctrlKey && key.match(/33|34/));

                // Is this coming from an accordion header?
                if (uiAccobtn) {
                    // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
                    // 38 = Up, 40 = Down
                    if (key.match(/38|40/) || ctrlModifier) {
                        var index = ArrBtn.indexOf(target);
                        var direction = (key.match(/34|40/)) ? 1 : -1;
                        var length = ArrBtn.length;
                        var newIndex = (index + length + direction) % length;

                        //서브 아코디언 있을경우 
                        if ($(target).is('.sub-has') && $(target).attr('aria-expanded') == 'false') {
                            direction == 1 ? newIndex = newIndex + ArrSubBtn.length : newIndex;
                        } else if ($(target).is('.ui-sub-next') && $(target).closest('[data-li]').prev().find(uiAccobtn).attr('aria-expanded') == 'false') {
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
            uiAccoWrap.each(function () {
                var t = $(this);
                t.find('.ui-btn-acco').last().addClass('last');
            });
            // 서브 어코디언 있을때 다음 어코디언(키맵핑)에 클래스 추가
            if ($('.sub-has').length !== 0) $('.sub-has').closest('[data-li]').next().find(uiAccobtn).addClass('ui-sub-next');

            console.log('accoUi');

        },
        // mark : sliderUi
        sliderUi: function (container_id, vert, min, max, inc, jump, showVals, range, val1, val2) {
            var sliderUiIn,
                keyCodes;

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

            sliderUiIn = function () {
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

            }


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
            sliderUiIn.prototype.createHandle = function (val, num) {

                var id = this.id + '_handle' + (num == undefined ? '' : num);
                var label = this.id + '_label' + (num == undefined ? '' : num);
                var controls = this.id + '_text' + (num == undefined ? '' : num);
                var $handle;

                var handle = '<span id="' + id + '" class="' + (this.vert == true ? 'v' : 'h') + 'sliderHandle" ' +
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
            sliderUiIn.prototype.createRangeDiv = function () {

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
            sliderUiIn.prototype.positionHandle = function ($handle, val) {

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
                    yPos = Math.round(-((this.height / 2) - (handleHeight / 4)));
                } else {
                    // vertical slider

                    // calculate the vertical pixel position of the specified value
                    // valPos = ((val - this.min) / (this.max - this.min)) * this.height + this.top;
                    valPos = ((val - this.min) / (this.max - this.min)) * this.height;

                    // xPos = Math.round(this.left + (this.width / 2) - (handleWidth / 2));
                    xPos = Math.round(-((this.width / 2) - (handleWidth / 4)));
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
            sliderUiIn.prototype.positionRangeDiv = function () {

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
            sliderUiIn.prototype.updateValBox = function ($handle, valPos) {

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
            sliderUiIn.prototype.bindHandlers = function ($handle) {

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

                // $handle.mousedown(function (e) {
                //     return thisObj.handleMouseDown($handle, e);
                // });

                $handle.on('touchstart mousedown', function (e) {
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
            sliderUiIn.prototype.handleKeyDown = function ($handle, evt) {

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
            sliderUiIn.prototype.handleKeyPress = function ($handle, evt) {

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
            sliderUiIn.prototype.handleFocus = function ($handle, evt) {

                // $handle.attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_' + (this.vert == true ?
                //     'v' : 'h') + '-focus.png');
                $handle.addClass('focus');
                $handle.css('z-index', '2');

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
            sliderUiIn.prototype.handleBlur = function ($handle, evt) {

                // $handle.attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_' + (this.vert == true ?
                //     'v' : 'h') + '.png');
                $handle.removeClass('focus');
                $handle.css('z-index', '1');

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
            sliderUiIn.prototype.handleMouseDown = function ($handle, evt) {

                var thisObj = this; // store the this pointer



                // remove focus highlight from all other slider handles on the page
                // $('.hsliderHandle').attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_h.png')
                //     .removeClass('focus').css('z-index', '10');
                // $('.vsliderHandle').attr('src', 'http://www.oaa-accessibility.org/media/examples/images/slider_v.png')
                //     .removeClass('focus').css('z-index', '10');
                $('.hsliderHandle').removeClass('focus').css('z-index', '1');
                $('.vsliderHandle').removeClass('focus').css('z-index', '1');

                // Set focus to the clicked handle
                $handle.focus();

                // bind a mousemove event handler to the document to capture the mouse
                // $(document).mousemove(function (e) {
                //     thisObj.handleMouseMove($handle, e);
                // });
                $(document).on('mousemove touchmove', function (e) {
                    thisObj.handleMouseMove($handle, e);
                });

                //bind a mouseup event handler to the document to capture the mouse
                // $(document).mouseup(function (e) {
                //     return thisObj.handleMouseUp($handle, e);
                // });

                $(document).on('mouseup touchend', function (e) {
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
            sliderUiIn.prototype.handleMouseUp = function ($handle, evt) {

                // unbind the event listeners to release the mouse
                // $(document).unbind('mousemove');
                // $(document).unbind('mouseup');
                // $(document).unbind('touchmove');
                // $(document).unbind('touchend');

                $(document).off('mousemove mouseup touchmove touchend');

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
            sliderUiIn.prototype.handleMouseMove = function ($handle, evt) {

                var curVal = parseInt($handle.attr('aria-valuenow'));
                var newVal;
                var startVal = this.min;
                var stopVal = this.max;
                var touch = undefined,
                    pos_x = evt.pageX,
                    pos_y = evt.pageY;

                if (evt.originalEvent.touches) {
                    touch = evt.originalEvent.touches[0],
                        pos_x = touch.pageX,
                        pos_y = touch.pageY;
                }

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
                    newVal = Math.round((pos_x - this.left) / this.width * (this.max - this.min)) + this.min;
                } else {
                    // vertical slider

                    // Calculate the new slider value based on the vertical pixel position of the mouse
                    // newVal = Math.round((evt.pageY - this.top) / this.height * (this.max - this.min)) + this.min;
                    newVal = Math.round((pos_y - this.top) / this.height * (this.max - this.min)) + this.min;
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

            //슬라이더 호출 생성
            var container_id = new sliderUiIn('' + container_id + '', vert, min, max, inc, jump, showVals, range, val1, val2);

            console.log('sliderUi');


        },
        // mark : swiperUi
        swipeUi: function (container_id, opt) {
            var swipeUiIn,
                $swipeWrap = $('.ui-swipe-wrap'),
                sWW = $swipeWrap.width(),
                t = $('#' + container_id + ''),
                c = t.children('[data-item]'),
                N = c.length,
                x0 = null,
                i = 0,
                tx = 0,
                locked = false,
                opt = {
                    'loop': opt.loop || 'false', //무한 롤링
                    'transition': opt.transition || 500, // 슬라이드시 모션 속도
                    'transition2': opt.transition2 || 100, // 원복할때 모션 속도
                    'thresold': opt.thresold || .2 //감도(%)
                },
                $prevBtn = t.closest($swipeWrap).find('.ui-swipe-btn .ui-btn-prev'),
                $nextBtn = t.closest($swipeWrap).find('.ui-swipe-btn .ui-btn-next');


            function unify(e) {
                return e.changedTouches ? e.changedTouches[0] : e
            };


            swipeUiIn = function () {
                this.init();
                var thisObj = this,
                    $bullet = $('.ui-bullet button');


                $swipeWrap.on('mousedown touchstart', function (e) {
                    return thisObj.lock(e);
                });

                $swipeWrap.on('mouseup touchend', function (e) {
                    return thisObj.move(e);
                });

                $swipeWrap.on('mousemove touchmove', function (e) {
                    e.preventDefault();
                    return thisObj.drag(e);
                });

                $prevBtn.on('click', function (e) {
                    return thisObj.prev(e)
                });
                $nextBtn.on('click', function (e) {
                    return thisObj.next(e)
                });

                $bullet.on('click', function (e) {
                    var t = $(this),
                        buN = t.data('bullet').split('b'),
                        n = parseInt(buN[1]);

                    return thisObj.bulletEvt(e, n);

                });

                //ie edge fix
                // $swipeWrap.on('touchmove', function(e){
                //     e.preventDefault();
                // });
            };

            swipeUiIn.prototype.init = function () {
                t.css({
                    'width': sWW * N
                });
                c.css({
                    'width': sWW
                });
                this.createBullet();
                this.bulletOn();
                // this.rolling();
            };

            swipeUiIn.prototype.rolling = function () {

                var delay = 1000,
                    thisObj = this,


                    timer = setInterval(function () {
                        thisObj.next(i)
                    }, delay);


            };

            swipeUiIn.prototype.prev = function (e) {
                locked = true;
                t.css('trasnlate', 'none');
                if (locked) {
                    if (i > 0) {
                        i = i - 1;
                        this.move(e, i);
                    }
                }
                locked = false;
            };
            swipeUiIn.prototype.next = function (e) {
                locked = true;
                t.css('trasnlate', 'none');
                if (locked) {
                    if (i - (N - 1)) {
                        i = i + 1;
                        this.move(e, i);
                    }
                }
                locked = false;
            };

            swipeUiIn.prototype.createBullet = function () {
                var appendBul = '';

                t.closest($swipeWrap).append($('<div class="ui-bullet">'));
                c.each(function (i) {
                    appendBul += '<button data-bullet="b' + i + '">' + i + '</button>';
                });
                t.closest($swipeWrap).find('.ui-bullet').html(appendBul);
            };

            swipeUiIn.prototype.bulletOn = function () {
                var $bullet = $('.ui-bullet');

                $bullet.children().removeClass('active').eq(i).addClass('active');
            };

            swipeUiIn.prototype.bulletEvt = function (e, n) {
                locked = true;
                t.css('trasnlate', 'none');
                this.move(e, n);
                locked = false;
            }


            swipeUiIn.prototype.lock = function (e) {
                // console.log('touchstart');
                x0 = unify(e).clientX;
                locked = true;
                t.css('trasnlate', 'none');
            };

            swipeUiIn.prototype.drag = function (e) {
                tx = -(sWW * i) + Math.round(unify(e).clientX - x0);

                // console.log(tx);
                if (locked) {
                    if (detectIe > 0 && detectIe < 12) {
                        t.css({
                            'left': tx + 'px'
                        });
                    }
                    t.css({
                        '-webkit-transform': 'translate(' + tx + 'px)'
                    });
                }
            }

            swipeUiIn.prototype.move = function (e, idx) {

                if (locked) {
                    // console.log('touchend', i);
                    var dx = unify(e).clientX - x0,
                        // s = Math.sign(dx);// < = 1 , > = -1
                        s = dx > 0 ? s = 1 : s = -1, // 방향 < = 1 , > = -1
                        f = +(s * dx / sWW).toFixed(2); // 이동 감도

                    //prev,next 통해서 올때
                    if (idx >= 0 || !!idx) {
                        i = idx;
                        if (detectIe > 0 && detectIe < 12) {
                            t.stop().animate({
                                'left': -(sWW * i) + 'px'
                            }, opt.transition);
                        } else {
                            t.css({
                                '-webkit-transform': 'translate(-' + (sWW * i) + 'px)',
                                'transition': 'all ' + opt.transition + 'ms ease-out'
                            });
                        }
                        this.bulletOn();

                        return false;
                    } else {
                        //무한 롤링 옵션
                        if (opt.loop == 'true') {
                            if (i == 0 && s == 1 && f > .2) {
                                i = N - 1
                                if (detectIe > 0 && detectIe < 12) {
                                    t.css({
                                        'left': (sWW * i) + 'px'
                                    });
                                } else {
                                    t.css({
                                        '-webkit-transform': 'translate(-' + (sWW * i) + 'px)',
                                        'transition': 'all ' + opt.transition + 'ms ease-out'
                                    });
                                }

                            } else if (i == N - 1 && s == -1 && f > .2) {
                                i = 0;
                                if (detectIe > 0 && detectIe < 12) {
                                    t.css({
                                        'left': (sWW * i) + 'px'
                                    });
                                } else {
                                    t.css({
                                        '-webkit-transform': 'translate(-' + (sWW * i) + 'px)',
                                        'transition': 'transform :' + opt.transition + 'ms ease-out'
                                    });
                                }
                            } else if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > opt.thresold) {
                                i -= s;
                                if (detectIe > 0 && detectIe < 12) {
                                    t.stop().animate({
                                        'left': -(sWW * i) + 'px'
                                    }, opt.transition);
                                } else {
                                    t.css({
                                        '-webkit-transform': 'translate(-' + (sWW * i) + 'px)',
                                        'transition': 'all ' + opt.transition + 'ms ease-out'
                                    })
                                }
                                this.bulletOn();
                            }
                        } else { //롤링 없음
                            if (i == 0 && s == 1 && f > .2) {
                                i = 0;
                                if (detectIe > 0 && detectIe < 12) {
                                    t.css({
                                        'left': -(sWW * i) + 'px'
                                    });
                                } else {
                                    t.css({
                                        '-webkit-transform': 'translate(-' + (sWW * i) + 'px)'
                                    });
                                }
                            } else if (i == N - 1 && s == -1 && f > .2) {
                                i = N - 1;
                                if (detectIe > 0 && detectIe < 12) {
                                    t.css({
                                        'left': -(sWW * i) + 'px'
                                    });
                                } else {
                                    t.css({
                                        '-webkit-transform': 'translate(-' + (sWW * i) + 'px)'
                                    });
                                }
                            } else if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > opt.thresold) {
                                // console.log(
                                // 'i' + i,
                                // 's' + s, 
                                // 'N' + N,
                                // -((i / N) * sWW) + tx
                                // );
                                i -= s;
                                if (detectIe > 0 && detectIe < 12) {
                                    t.stop().animate({
                                        'left': -(sWW * i) + 'px'
                                    }, opt.transition);
                                } else {
                                    t.css({
                                        '-webkit-transform': 'translate(-' + (sWW * i) + 'px)',
                                        'transition': 'all ' + opt.transition + 'ms ease-out'
                                    });
                                }

                                this.bulletOn();

                                x0 = null;
                                locked = false;
                                return false;

                            }
                        }

                        //페이지 이동없이 원래 슬라이드 돌아갈떄
                        if (detectIe > 0 && detectIe < 12) {
                            t.stop().animate({
                                'left': -(sWW * i) + 'px'
                            }, opt.transition2);
                        } else {
                            t.css({
                                '-webkit-transform': 'translate(-' + (sWW * i) + 'px)',
                                'transition': 'all ' + opt.transition2 + 'ms ease-out'
                            });
                        }
                        x0 = null;
                        locked = false;

                    }

                }

            };


            var container_id = new swipeUiIn(container_id, opt);



            console.log('swipeUi');
        },
        // mark : searchUi
        searchUi: function () {
            var searchBtn = function () {
                var $searchWrap = $('.searchWrap'),
                    $searchInp = $searchWrap.find('.inp_form input'),
                    $btnIcn = $searchWrap.find('.icn_search');

                $searchInp.on('click focus', function () {
                    $(this).closest($searchWrap).find($btnIcn).addClass('active');
                }).on('blur', function () {
                    $(this).closest($searchWrap).find($btnIcn).removeClass('active');
                }); 
            }();

            this.inputDelUi();

            console.log('searchUi');

        },
        // mark : input del
        inputDelUi: function () {
            var inpTxtDel = function () {
                var $inp_form = $('.ui-hasDelForm'),
                    $inp = $inp_form.find('input.ui-hasDel'),
                    $btnDel = $('.ui-deltxt'),
                    isOpen = false;
                
                // 삭제 버튼 생성
                var createDelbtn = function(e){
                    var $btn = '<button type="button" class="ui-deltxt" title="내용 삭제"></button>',
                        $parent = $(e).parent();

                    if ( $parent.find('.ui-deltxt').length < 1 ) {
                        $parent.append($btn);

                    }
                }

                $inp.on('propertychange change keyup paste input focusin', function (e) {
                    var t = $(e.target),
                        curVal = t.val(),
                        oldVal,
                        $btnDel = $('.ui-deltxt');
                    
                    // 삭제 버튼 생성
                    createDelbtn($(this));


                    if (curVal !== oldVal && curVal !== '') {

                        t.closest($inp_form).find($btnDel).addClass('active');
                        isOpen = true;
                        return;
                    } else {

                        $btnDel.removeClass('active');
                        isOpen = false;
                    }

                    oldVal = curVal;
                });

                //포커스 잃었을때 
                $(document).on('focusin click', function (e) {
                    if ($inp_form) {
                        if (!$inp_form.find(e.target).length) {
                            $btnDel.removeClass('active');
                        }
                    }
                });

                // 삭제 버튼 클릭
                $(document).on('click',$btnDel, function (e) {
                    if (isOpen == true) {
                        var t = $(e.target);
                        t.prev($inp).val('');
                        $btnDel.removeClass('active');
                        isOpen = false;

                    }
                });
            }();
            console.log('inputDelUI');
        },
        // mark : gnb2Ui
        gnb2Ui: function () {
            var $menu = $('.ui-menu2depth > li');

            //init
            $menu.on('mouseenter focusin', function (e) {
                var $t = $(this).find('> a');

                $t.parent('li').addClass('active').siblings('li').removeClass('active');

            }).on('mouseleave foucsout', function () {
                $menu.removeClass('active');
            });
        },
        // mark : scrlTopUi
        scrlTopUi: function (rV) {
            var scrTopF,
                optLen = arguments.length,
                rV,
                $top = $('.ui-scrlTop');

            scrTopF = function () {
                this.init(rV);
                this.evt();
                this.resize();
                this.scroll();
            };

            //init
            scrTopF.prototype.init = function (rV) {

                if (optLen === 0) {
                    rV = $(window).width() >= $('.guide-container').width() ? ($(window).width() - $('.guide-container').width()) / 2 - $top.width() - 30 : 0;
                } else {
                    rV = rV;
                }

                $top.css({
                    'right': rV
                });

            };

            scrTopF.prototype.evt = function () {
                $top.on('click', function () {
                    $('html,body').animate({
                        scrollTop: 0
                    }, 500);
                });
            };

            scrTopF.prototype.resize = function () {
                var thisObj = this;

                $(window).on('resize', function () {
                    clearTimeout(window.resizedFinished);
                    window.resizedFinished = setTimeout(function () {
                        thisObj.init();

                    }, 250);
                });

            };

            scrTopF.prototype.scroll = function () {
                $(window).scroll(function () {
                    var height = $(window).scrollTop();

                    if (height > 100) {
                        $top.fadeIn();
                    } else {
                        $top.fadeOut();
                    }
                });
            };

            new scrTopF(rV);
        },

        // mark : tab anckorUI
        tabAnchorUi: function(fix){
                var $t = $('.ui-tabAnchor'),
                    $tabList = $t.find('.ui-tabList'),
                    tH = Math.round( $t.outerHeight() ),
                    $aWrap = $('.ui-anchorWrap'),
                    tTop = $t.offset().top,
                    $linkA = $tabList.find('a'),
                    $target = $($linkA.attr('href')),
                    $lastTarget = $target.parent().children().last(),
                    lastTargetTop = $lastTarget.position().top + $lastTarget.height(),
                    tabFixed,
                    linkArr = $linkA.get(),
                    rangeArr = new Array(),
                    optFix = fix
                    ;
                
                


            tabFixed = function () {

                $linkA.each(function(i){
                    var targetArr = $(linkArr[i]).attr('href');
                    var range = Math.round( $(targetArr).position().top - tH );
                    rangeArr.push(range);
                    console.log(tH,rangeArr);
                });
                //옵션 fix값 true
                if(optFix == 'true' ) this.scroll();
                this.evt();
            }

            tabFixed.prototype.scroll = function () {
                var tPosY = $t.offset().top;

                $(window).on('scroll', function () {
                    var curTop = $(document).scrollTop();

                    //스크롤시 탭고정 되는 순간 상단 여백 처리
                    if (curTop < lastTargetTop) {
                        if( curTop > (tPosY ) ){
                            $t.addClass('fixed-on');
                            $aWrap.css('paddingTop', tH)
                        } else{
                            $t.removeClass('fixed-on')
                            $aWrap.removeAttr('style');
                        }
                    } else {
                        $t.removeClass('fixed-on')
                        $aWrap.removeAttr('style');
                    }
                    
                });
            };

            tabFixed.prototype.evt = function () {
                $(document).on("scroll", onScroll);

                $linkA.on('click', function (e) {
                    $(document).off("scroll");

                    var _t = $(this),
                        idx = _t.parent().index();
                        
                        // 첫번쨰 요소 선택시 분기
                        if ( _t.parent().index() == 0 ){
                            var scrVal = tTop;
                        } else{
                            // animate에 따라 스크롤이 조금씩 부족한 현상 fix +2
                            var scrVal = rangeArr[idx] + 2;
                            // console.log(scrVal);
                        }
                        ;

                    e.preventDefault();
                    
                    
                    $('html,body').animate({
                        'scrollTop': scrVal
                    }, 500, function () {
                        $(document).on("scroll", onScroll);
                    });

                    $linkA.removeClass('active');
                    _t.addClass('active');
                });

                function onScroll(e) {
                    // var curTop = $(document).scrollTop() + padT;
                    var curTop = $(document).scrollTop();

                    $linkA.each(function () {
                        var _t = $(this),
                        idx = _t.parent().index();

                        //fix :
                        // animate에 따라 스크롤이 조금씩 부족한 현상 fix
                        if ( rangeArr[idx] <= curTop + 1) {
                            
                            $linkA.removeClass("active");
                            _t.addClass("active");
                        } else {
                            _t.removeClass("active");
                            // console.log( 'no')

                        }


                    });
                }
            };

            // 인자값 : 고정 탭 높이값, 고정됐을때 컨텐츠가 상단으로부터의 여백 지정
            new tabFixed(fix);
        },

        // mark : parallaxUi
        parallaxUi: function(){
            // makes the parallax elements
            function parallaxIt() {

                // create variables
                var $fwindow = $(window);
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // on window scroll event
                $fwindow.on('scroll resize', function () {
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                });

                // for each of content parallax element
                $('[data-type="content"]').each(function (index, e) {
                    var $contentObj = $(this);
                    var fgOffset = parseInt($contentObj.offset().top);
                    var yPos;
                    var speed = ($contentObj.data('speed') || 1);

                    $fwindow.on('scroll resize', function () {
                        yPos = fgOffset - scrollTop / speed;

                        $contentObj.css('top', yPos);
                    });
                });

                // for each of background parallax element
                $('[data-type="background"]').each(function () {
                    var $backgroundObj = $(this);
                    var bgOffset = parseInt($backgroundObj.offset().top);
                    var yPos;
                    var coords;
                    var speed = ($backgroundObj.data('speed') || 0);

                    $fwindow.on('scroll resize', function () {
                        yPos = ((scrollTop - bgOffset) / speed);
                        coords = '50% ' + yPos + 'px';

                        $backgroundObj.css({
                            backgroundPosition: coords
                        });
                    });
                });

                // triggers winodw scroll for refresh
                $fwindow.trigger('scroll');
            };

            parallaxIt();

        },

        // mark: updown changeUi
        updnChgUi: function(elType){
            var $el = elType; // div && tr 

            var $up = $('.ui-row-up'),
                $dn = $('.ui-row-dn');
    
                $up.on('click',function(){
                    upFunc( $(this) );
                });
                $dn.on('click',function(){
                    dnFunc( $(this) );
                });
    
                var upFunc = function(t){
                    var $tr = t.closest($el); // 클릭한 버튼이 속한 tr 요소
                    $tr.prev().before($tr); // 현재 tr 의 이전 tr 앞에 선택한 tr 넣기
                }
    
                var dnFunc = function(t){
                    var $tr = t.closest($el); // 클릭한 버튼이 속한 tr 요소
                    $tr.next().after($tr); // 현재 tr 의 다음 tr 뒤에 선택한 tr 넣기
                }
        },

        // mark : floatGnbUi
        floatGnbUi : function(){

            var $t = $('.ui-floatGnb'),
                $call = $t.find('.call'),
                $dimBg = $t.find('.dim_bg');
                //스크롤바 width 구하기
                // scrlW = window.innerWidth - document.documentElement.clientWidth;

            function floatGnb(){
                function showMenu() {
                    $call.addClass('active');
                    $('.subMenu:not(:last)').add($dimBg).addClass('show');
                    // $('html').addClass('fixed').css('padding-right', scrlW);
                    // $('html').addClass('fixed');
                }
    
                function hideMenu() {
                    // $('html').removeClass('fixed').css('padding-right','');
                    $call.removeClass('active');
                    // $('html').removeClass('fixed');
                    $('.subMenu:not(:last)').removeClass('show');
                    $call.tog = 0;
                    window.setTimeout(function () {
                        $dimBg.removeClass('show');
                    }, 300);
                }   
    
                $call.on('click', function () {
                    (this.tog ^= 1) ? showMenu(): hideMenu();
                });
    
                // $dimBg.on('click', hideMenu);
            }

            //init
            if($t.length > 0 ){
                floatGnb();
            }
        },
        // mark : allChkUi
        allChkUi : function(opt){

            var $t = $('.ui-allChk'),
                $allChk = $t.find('[data-allchk]'), //부모 체크박스
                $optChk = $t.find('[data-optchk]'),
                $subChk = $t.find('[data-subchk] input').not($optChk),//자식 체크박스
                allChkFn,
                opt = {
                    'req': opt.req || true //전체 체크시 선택요소 체크 부분
                };

            allChkFn = function(opt){
                this.init();
                this.evt();
                
            }
            allChkFn.prototype.init = function(){
            }
            allChkFn.prototype.evt = function(){
                
                //전체체크 버튼 이벤트
                $allChk.on('change', function(){
                    var _t = $(this);

                    $optChk = _t.closest($t).find('[data-optchk]'),
                    $subChk = _t.closest($t).find('[data-subchk] input').not($optChk);

                    if( _t.prop('checked')  == true){
                        //전체체크 옵션값이 true일때 선택요소도 체크되게, false 일때 선택요소는 체크 안되게 함
                        opt.req == true ? $subChk.add($optChk).prop('checked', true) : $subChk.prop('checked', true);
                    } else{
                        $subChk.add($optChk).prop('checked', false);
                    }
                });

                //자식요소 체크 이벤트
                $subChk.on('change', function(){
                    var f_name = $(this).attr('name'),
                    checkBoxLength,checkedLength;
                    
                    $allChk = $(this).closest($t).find('[data-allchk]'),
                    $optChk = $(this).closest($t).find('[data-optchk]'),
                    $subChk = $(this).closest($t).find('[data-subchk] input').not($optChk);

                    if( $(this).prop("checked") ){
                        checkBoxLength = $("[name="+ f_name +"]").not($optChk).length;
                        checkedLength = $("[name="+ f_name +"]:checked").not($optChk).length;
                        
                        if( checkBoxLength == checkedLength ) {
                            $allChk.prop("checked", true);
                        } else {
                            $allChk.prop("checked", false);
                        }
                    } else {
                        $allChk.prop("checked", false);
                    }


                });
            }
            new allChkFn(opt);

            console.log('allChkUi');

        },
        
        // mark : sticky
        stickyUi : function(){
            var $fixed = $('.totalSticky');
            $(window).on('scroll',function(){
                var scr = $(window).scrollTop();
                var dHeight = $(document).height();
                var wHeight = $(window).height();
                if(scr == dHeight - wHeight){
                    if(!$fixed.parent().hasClass('active')){
                        $fixed.addClass('fixed');
                    }
                }else{
                    $fixed.removeClass('fixed');
                }
            });
        },

        //mark : click center
        clickCenter : function(){
            $('.mo_submenu_wrap li a').on('click',function(e){
                e.preventDefault();
                $(this).parent().addClass('active').siblings('li').removeClass('active');
                var navLi = $(this).parent('li');
                var navWd = navLi.outerWidth();
                var posL = navLi.position().left - $('.mo_submenu_wrap').outerWidth() * 0.5 + navWd * 0.5;
                $('.mo_submenu_wrap').animate({scrollLeft: posL}, 300);

            });
        },

        // mark : scrollMenu
        scrollMenu : function(){
            var prevScroll = 0;
            var body = $('body');

            $(window).on('scroll',function(){
                var thisScr = $(this).scrollTop();
                if(thisScr > prevScroll && thisScr > 0){
                    body.addClass('is-hidden');
                    if(body.hasClass('is-hidden')){
                        body.addClass('is-hidden');
                    }
                    prevScroll = thisScr;
                }else if(thisScr < prevScroll) {
                    if (body.hasClass('is-hidden')){ 
                        setTimeout(function(){body.removeClass("is-hidden")},200);
                    }
                    prevScroll = thisScr;
                }
            });
        },
        //mark : custom alert 창 + callback 
        alertui : function(option,callback){
            var option = {// 내용 받아오기
                    title : option.title,
                    msg : option.msg
                },
                callback = callback;
                
            if(!option.title){
                console.log('title no');
                var alertTit = '';
                alertT();
            }else if(option.title){
                console.log('title ok');
                var alertTit = '<div class="costomAlert_tit"> ' + option.title + '</div> ';
                alertT();
            }

            function alertT() {//alert 창 
                var str = '';
                str = '<div class="costomAlert_wrap" class=""><div class="dim"></div> '
                +' <div class="costomAlert"> '
                +alertTit
                +'<div class="costomAlert_content"> '
                +'<p class="costomAlert_p">' + option.msg + '</p> '
                +'</div> '
                +'<div class="costomAlert_btnWrap"> '
                +'<button class="costomAlert_btn ui-close" >확인</button> '
                +'</div>'+'</div>' +'</div>';

                $(str).appendTo(document.body);

                $('.costomAlert_bg').addClass('on');
                
                function alertClose(){// alert창 닫기
                    $('.costomAlert_wrap').remove();
                    return false;
                }
                               
                $(document).on('click','.ui-close', function(){
                    alertClose();
                    if (typeof callback == 'function') {//callback 실행
                        callback.call(this);
                    }
                });
            }
            // alertT();
            
        },
        //mark : prev, next 버튼으로 paging 
        pageMove : function($btn){
            //인자값 받아오기($(this)==$this)
            var moveEvt = function($this){
                //누르는 버튼($this)의 클래스 구함
                var direction = $this.attr('class'), 
                //동작해야하는(셀렉터를 누름으로써 바뀔) 화면 함수 선언
                    thisView = $('.ui-tab-list'),
                    //동작할 화면의 전체 갯수 구하기 
                    thisViewNum = thisView.length - 1,
                    curNum = parseFloat($('.ui-tab-list.on').attr('id').split('ui-tab-list')[1]) - 1;
                //버튼별 동작  
                //만약에 클릭한 셀렉터의 클래스가 left_btn이면
                if( direction == 'left_btn'){
                    //left_btn을 눌렀을 때 현재 보여지는 화면이 첫번째가 아니면
                    if(curNum !== 0){
                        //현재 화면 값에 -1 => 하나값 이전 화면에 이벤트 실행하게 됌
                        curNum = curNum - 1;
                    } else{
                        //left_btn을 눌렀을 때 현재 보여지는 화면이 첫번째이면
                        //보여지는 화면이 첫번째 0번 이하로 가지 않게 //첫번째 화면 이전으로 더 가지 않게 
                        curNum = 0;
                    }
                    
                } else if( direction == 'right_btn'){
                    //만약에 클릭한 셀렉터의 클래스가 left_btn이 아니면(right_btn일시)
                    //전체 동작화면 수 보다 현재 표출 화면의 숫자(순서값)이 작으면
                    if(curNum < thisViewNum){
                        //현재 표출 화면의 번호에 +1 => 하나값 다음 화면에 이벤트 실행하게 됌
                        curNum = curNum + 1;
                        //전체 동작화면 수 보다 현재 표출 화면의 숫자(순서값)이 크면
                    } else{
                        //전체값 이상으로 수가 늘어나지 않게 //마지막 화면 이상으로 가지 않게.
                        curNum = thisViewNum;
                    }
                }
                //현재 표출 화면 값 찍어보기 
                console.log('curNum',curNum);
    
                //페이지 전환 
                //현재 화면 값이 -1보다 크고 and 전체 화면 갯수보다 작거나 크면 작동해라
                if( 0 <= curNum && curNum <= (thisViewNum) ){
                    //동작해야하는 화면에 on클래스 제거 //초기화
                    thisView.removeClass('on');
                    //동작해야하는 화면값에 on 클래스 추가 //화면 표출
                    $(thisView[curNum]).addClass('on');
    
                    // 버튼 제한 효과 초기화 : disabled : 더 넘어갈 것 없으면 버튼 투명도 주기 
                    //모든 셀렉터 초기화  
                    $btn.removeClass('disabled');
    
                    //현재 화면값이 0이거나 or 현재 화면값이 전체화면값과 동일하면
                    // == 첫번째 화면 또는 마지막 화면이면 
                    if( curNum == 0 || curNum == thisViewNum ){
                            //지금 누른 셀렉터에 disabled 클래스 추가
                            $this.addClass('disabled'); 
                    }
                    //잘 동작하나 현재 화면값 찍어보기 
                    console.log('sucess', curNum);
                }
            }

            $btn.on('click',function(){
                moveEvt( $(this) );
            });
        },
        
        //mark : flowSelect 
        flowSelect : function(tarO,curF,baseF,spd) {
            var flowSelectBox,
                $uiFlow = $('.' + tarO),
                $flowEv = $uiFlow.find('.ui-flowEV'),
                $flowlist = $uiFlow.find('.ui-flowList'),
                $floor = $flowlist.find('li'),
                speed = spd || 500,
                baseF = baseF || 0,
                curF = curF -1,
                curNum = curF + baseF || 0,
                destNum = curNum,
                isMove = false
                ;
            
                flowSelectBox = function(){
                    
                    this.init();
                }

                flowSelectBox.prototype.init = function(){
                    var floorLn = $floor.length - 1, //가장 아래 data-floor=0 부터 시작하기 위해
                        _this = this;

                        // console.log( 'curF',curF, 'baseF',baseF,'curNum',curNum ) 

                    // 데이터 속성 추가
                    $.each( $floor, function(i){
                        $(this).attr('data-floor',floorLn - i);
                    });

                    // ev 높이 그리기
                    $flowEv.height($flowlist.outerHeight());



                    // 액션
                    $floor.on('click', function(){

                        if( $(this).hasClass('on') ){
                            return false;
                        }
                        destNum = $(this).attr('data-floor');

                        // 층수 이동 : 중복실행 방지
                        if( isMove == false ){
                            flowStart(curNum,destNum);
                        }
                    });

                    // 초기 층수 표시                    
                    $flowlist.find('li[data-floor="'+curNum+'"]').addClass('on');
                    evH(curNum,0);
                    flowDone();

                }


                // 이동
                var flowMove = function(curNum,destNum){
                    isMove = true;
                    var _this = flowSelectBox.prototype;
                    var floorDist = destNum - curNum > 0 ? destNum - curNum : curNum - destNum;
                    
                    // console.log('destNum',destNum,'curNum',curNum,'floorDist',floorDist);
                    
                    var loop = setInterval(function(){
                        
                        var $floorOn = $floor.siblings().filter('.on');
                            curNum = $floorOn.attr('data-floor');


                            // console.log('destNum',destNum);

                        var direction = Math.sign(destNum - curNum);//위아래인지 방향만

                        // console.log('direction',direction);

                        $floorOn.removeClass('on active');

                        // ev모션 제거
                        _this.evOff();

                        if(direction >= 1){//높은층으로 //prev
                            // console.log('+', 'curNum',curNum);
                            $floorOn.prev().addClass('on');
                            if(curNum  >= destNum - 1){
                                // 이동 후 완료
                                flowDone();
                                clearInterval(loop);
                            }
                            
                        }else if(direction < 0){//낮은층으로 //next
                            // console.log('-','curNum',curNum);
                            $floorOn.next().addClass('on');
                            if(curNum - 1 <= destNum){
                                clearInterval(loop);
                                // 이동 후 완료
                                flowDone();
                            } 
                            
                        } else{
                            clearInterval(loop);
                            flowDone();
                        }


                        // console.log('curNum',curNum, 'destNum', destNum,direction);

                    },speed);
                    // ev 이동
                    evH(destNum,floorDist);
                }
                
                // 이동 완료
                var flowDone = function(){
                    var _this = flowSelectBox.prototype;
                        isMove = false,
                        curNum = destNum;

                    $floor.find('li[data-floor="'+destNum+'"]').addClass('on').addClass('active');

                    // 창문 열기 딜레이
                    setTimeout(function(){
                        _this.evOn();
                    }, 500);
                }

                // 이동 시작
                var flowStart = function(c,d){
                    var _this = flowSelectBox.prototype;
                        isMove = true;

                    // 창문 열기 딜레이
                    _this.evOff();
                    setTimeout(function(){
                        flowMove(c,d);
                    }, 500);
                }

                // ev 높이 계산 & 이동
                var evH = function(curNum,floorDist){
                    var evH = $flowEv.outerHeight(),
                        _fl_L = $floor.length,
                        _ev_1H = evH /_fl_L,
                        $evCt = $flowEv.find('.flw_ct'),
                        evCtH = $evCt.outerHeight(),
                        curFloor = _fl_L - destNum,
                        speed = spd * Math.abs(floorDist);

                        // ev 이동
                        $evCt.stop().animate({
                                'top': _ev_1H * curFloor - evCtH
                        },speed)
                        // console.log(curNum,floorDist,speed);

                    
                }
                
                //ev 모션 off
                flowSelectBox.prototype.evOff = function(){
                    $flowEv.removeClass('active');

                }
                //ev 모션 on
                flowSelectBox.prototype.evOn = function(){
                    $flowEv.addClass('active');

                }

                new flowSelectBox(tarO,curF,baseF,spd);
                console.log('flowSelect');

        },

        // mark : init 
        init: function () {
            // var t = this;

            // t.tabUi();
            // t.selectUi();
            // t.tooltipUi();
            // t.modalUi();
            // t.scrollUi();
            // t.accoUi();
        }

    }
    // (end) TNUI returm module
    

})();
