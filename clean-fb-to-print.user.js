// ==UserScript==
// @name         clean facebook for printing
// @include      http://*.facebook.com/*
// @include      https://*.facebook.com/*
// @version      0.1
// @description  hide fb sidebars which mess up printing to pdf and expand all comments
// @author       mulllhausen
// @updateURL    https://github.com/mulllhausen/clean-fb-to-print/raw/master/clean-fb-to-print.user.js
// @downloadURL  https://raw.githubusercontent.com/mulllhausen/clean-fb-to-print/master/clean-fb-to-print.user.js
// ==/UserScript==

(function() {
    'use strict';

    // add some buttons at the top
    var div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:0;left:0;z-index:1000;';
    div.innerHTML = '<button id="hide_sidebars">hide sidebars</button><br>' +
        '<button id="expand_all">expand all comments</button><br>' +
        '<button id="hide_buttons">hide these buttons</button>';
    div.id = 'manipulation_buttons';
    document.body.appendChild(div);

    document.getElementById('hide_sidebars').addEventListener("click", function() {
        // hide elements but maintain their dimensions on the page
        document.getElementById('pagelet_bluebar').style.visibility = 'hidden';
        document.getElementById('leftCol').style.visibility = 'hidden';
        document.getElementById('rightCol').style.visibility = 'hidden';
        document.getElementById('pagelet_dock').style.visibility = 'hidden';
        // begins with 'headerAction', eg 'headerAction_12345'
        document.querySelectorAll('*[id^="headerAction"]')[0].style.visibility = 'hidden';
    });

    // this  doesn't work perfectly - it takes a few clicks. i suspect that's because
    // react.js is debouncing click events
    document.getElementById('expand_all').addEventListener("click", function() {
        // expand all "x replies" comments of type <span class='UFIReplySocialSentenceLinkText'>x replies</span>
        var reply_span_els = document.getElementsByClassName('UFIReplySocialSentenceLinkText');
        for (var i = 0; i < reply_span_els.length; i++) reply_span_els[i].click();

        // expand all "see more" and "view more comments" links
        var see_more_els = document.querySelectorAll('a[role="button"]');
        for (i = 0; i < see_more_els.length; i++) {
            switch (see_more_els[i].innerText) {
                case 'See More': // expand all "see more" comments of type <a href="#" role="button">See More</a> or <a href="#" role="button">See More</a>
                case 'View more comments': // expand all "view more comments" links of type <a class="UFIPagerLink" href="#" role="button">View more comments</a>
                    see_more_els[i].click();
                    break;
            }
        }
    });

    document.getElementById('hide_buttons').addEventListener("click", function() {
        document.getElementById('manipulation_buttons').style.display = 'none';
    });
})();
