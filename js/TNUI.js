$(function(){

var TNUI = TNUI || {};

var guSide = $('.guide-side'),
    s1Item = guSide.find('.menu-item > a'),
    s2Item = guSide.find('.sub-menu > li > a'),
    s2ItemTXT,
    ct = $('.guide-container'),
    ctH1 = ct.find('.guide-h1');


//init
TNUI.init = (function(){
    TNUI.module.createH1();
    TNUI.module.toggleOn();
    
    console.log('init');
});

TNUI.module = (function(){
    
    //external function
    var mod2 = function(){
        console.log('mod2');
    };

    // (sta) TNUI returm module
    return{
        createH1 : function(s2ItemTXT){
            ctH1.text(s2ItemTXT);
        },

        toggleOn : function(){
            s2Item.on('click',function(){
                if( $(this).hasClass('on') ) return;
                
                s1Item.add(s2Item).removeClass('on');
                $(this).addClass('on').closest('.menu-item').find('> a').addClass('on');
                
                s2ItemTXT = s2Item.parent().find('a.on').text();
                
                TNUI.module.createH1(s2ItemTXT);
            });
        }
        
    }
    // (end) TNUI returm module
    
})();




//init
TNUI.init();

});
