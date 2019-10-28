// thenet UI LIB guide
// banisle@gmail.com
'use strict';

TNUI.wsg = (function () {
    return {
        createH1: function (s2ItemTXT) {
            var ct = $('.guide-container'),
                ctH1 = ct.find('.guide-h1');

            ctH1.text(s2ItemTXT);
        },
        moGuideMenu: function () {
            var mobtn = $('.mo-guide-btn'),
                sg = $('.guide-side'),
                dimBtn = $('.mo-guide-dim'),
                openSt = 'false';

            var dimLyOpen = function () {
                $('html').addClass('fixed');
                mobtn.addClass('active');
                sg.addClass('open');
                dimBtn.addClass('active');
                openSt = 'true';
            }

            var dimLyClose = function () {
                $('html').removeClass('fixed');
                mobtn.removeClass('active');
                sg.removeClass('open');
                dimBtn.removeClass('active');
                openSt = 'false';
            }
            mobtn.add(dimBtn).on('click', function (e) {
                (openSt == 'false') ? dimLyOpen(): dimLyClose();
            });

        },
        toggleOn: function () {
            var t = this,
                guSide = $('.guide-side'),
                s1Item = guSide.find('.menu-item > a'),
                s2Item = guSide.find('.sub-menu > li > a'),
                s2ItemTXT;

            s2Item.on('click', function () {

                if ($(this).hasClass('on')) return;

                s1Item.add(s2Item).removeClass('on');
                $(this).addClass('on').closest('.menu-item').find('> a').addClass('on');

                s2ItemTXT = s2Item.parent().find('a.on').text();

                t.createH1(s2ItemTXT);
            });
        },
        modalEvt: function () {
            var t = this,
                btnTog = $('#btn-transtoggle'),
                modalT = $('#mot-tog');

            btnTog.on('click', function (e) {
                modalT.toggleClass('trans-ms');
                modalT.hasClass('trans-ms') ? $(this).find('span').text('모션 제거') : $(this).find('span').text('모션 생성');
            });
        },
        init: function () {
            var t = this;

            t.createH1();
            t.toggleOn();
            t.moGuideMenu();
            t.modalEvt();

            console.log('init');
        }
    }
})();

