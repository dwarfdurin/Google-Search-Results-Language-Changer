// ==UserScript==
// @name Google Search Results Language Changer
// @description Supports Polish, English, German, Chinese.
// @version 1.01
// @include *google.com/*
// @include *google.pl/*
// @include *google.de/*
// @namespace Durin
// ==/UserScript==

(function() {

    function get_form_lr(){

        var list = ['lang_pl', 'lang_en', 'lang_de', 'lang_zh-CN%7Clang_zh-TW', ''];
        var strlist = ['Polski', 'English', 'Deutsch', '中文', 'default'];

        var baseurl = document.location.href.replace(/lr=([^&]+)&?/, '');
        var current = (RegExp.$1)? RegExp.$1 : '';
        var generateOption = function(v) {
            var i;
            var valuestr;
            for( i = 0 ; i < list.length ; i++ ){
                if( v == list[i] ){
                    valuestr = strlist[i];
                }
            }
            return '<option value="' + v + '"' 
                 + ((v == current)? ' selected="1"' : '') + '>' + valuestr + '</option>';
        };
        var opts = list.map(generateOption).join("\n");

        var func =  "var baseurl = document.location.href.replace(/&+lr=([^&]+|)(&+|$)/, '&');" + 
                    "baseurl = baseurl.replace( /\\?lr=.+?&/ , '?' );" + 
                    "var url = baseurl.replace(/https:\\/\\/www\\.google\\.com\\/search\\?/, 'search?');" + 
                    "url = url + '&lr=' + this.options[ this.selectedIndex ].value;" + 
                    "location.href = url;";
        return '<select style="width:110px" size="1" name="lr5" onchange="' + func + '">' + opts + '</select>';

    }

	document.getElementById('logocont').innerHTML = document.getElementById('logocont').innerHTML + "<div style=\"position:fixed;margin-left:17px; margin-top:20px; display\"><form>" + get_form_lr() + "</form></div>";
})();