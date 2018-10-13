(function(window){var svgSprite='<svg><symbol id="icon-shuaxin" viewBox="0 0 1024 1024"><path d="M56.9344 578.6624c0 147.626667 73.147733 285.184 193.194667 366.148267 3.106133 2.525867 77.585067 62.1568 188.791466 74.274133 29.3888 3.208533 31.1296 3.310933 61.7472 3.310933 244.667733 0 443.733333-199.0656 443.733334-443.733333a443.392 443.392 0 0 0-196.5056-368.5376l-0.273067 0.4096a33.826133 33.826133 0 0 0-20.343467-6.4512 34.372267 34.372267 0 0 0-32.9728 35.703467 33.723733 33.723733 0 0 0 15.6672 26.8288l-0.136533 0.170666a375.261867 375.261867 0 0 1 166.2976 311.876267c0 207.018667-168.448 375.466667-375.466667 375.466667-27.784533 0-27.784533 0-54.340266-2.901334-90.453333-9.864533-152.610133-58.948267-155.5456-61.201066a375.330133 375.330133 0 0 1-165.5808-311.364267c0-201.386667 159.5392-365.841067 358.843733-374.647467l-41.984 40.823467 0.8192 0.853333a33.8944 33.8944 0 0 0-15.2576 29.218134c0.750933 18.978133 16.725333 33.792 35.669333 33.041066a33.792 33.792 0 0 0 26.0096-14.472533l0.3072 0.341333 128.648534-124.996266-128.273067-128.4096-0.4096 0.4096a33.621333 33.621333 0 0 0-26.3168-11.400534c-18.944 0.750933-33.6896 16.725333-32.9728 35.703467a33.8944 33.8944 0 0 0 13.038933 25.156267l45.226667 45.2608C249.480533 142.0288 56.9344 338.056533 56.9344 578.6624"  ></path></symbol><symbol id="icon-weixin" viewBox="0 0 1258 1024"><path d="M318.592 302.737c-32.571 0-64.523-21.514-64.523-53.462 0-32.571 31.954-53.462 63.903-53.462 32.571 0 53.462 20.895 53.462 53.462 0.619 31.954-20.895 53.462-52.843 53.462zM617.835 195.812c32.571 0 53.462 20.895 53.462 53.462 0 31.954-20.895 53.462-53.462 53.462-31.954 0-64.523-21.514-64.523-53.462 0-32.571 32.569-53.462 64.523-53.462zM848.266 311.948c13.518 0 27.037 0.619 41.167 2.455-37.484-172.667-221.828-300.477-431.977-300.477-235.34 0-428.289 160.375-428.29 363.772 0 117.983 63.903 213.84 171.437 288.805l-43.012 129.040 149.935-74.966c53.462 10.443 96.476 21.514 149.935 21.514 12.9 0 26.421-0.619 39.938-1.842-8.599-28.266-13.518-58.99-13.518-89.717 0-186.794 160.375-338.574 364.384-338.574z" fill="#25b415" ></path><path d="M992.050 591.532c-20.895 0-42.403-20.895-42.403-42.403 0.619-21.514 21.514-43.012 42.403-43.012 32.569 0 54.075 21.514 54.075 43.012 0 21.514-21.514 42.403-54.075 42.403zM756.707 591.532c-20.895 0-42.403-20.895-42.403-42.403s21.514-43.012 42.403-43.012c32.569 0 53.462 21.514 53.462 43.012 0.619 21.514-20.895 42.403-53.462 42.403zM1238.451 645.611c0-171.437-171.437-310.928-363.772-310.928-203.385 0-363.772 139.483-363.772 310.928 0 171.437 160.375 310.313 363.772 310.313 43.012 0 86.028-11.063 128.428-21.514l117.983 64.523-32.569-106.916c86.028-64.523 149.927-149.927 149.927-246.404z" fill="#25b415" ></path></symbol><symbol id="icon-login" viewBox="0 0 1024 1024"><path d="M647.754944 472.513448c76.714682-43.008235 128.641992-125.615074 128.641992-220.477964 0-139.197322-111.788257-252.035484-249.671663-252.035484-137.889546 0-249.671663 112.838162-249.671663 252.035484 0 94.861868 51.925263 177.470753 128.639946 220.477964-161.455099 51.758465-278.442739 204.295514-278.442739 384.414564 0 222.753782 798.947889 222.753782 798.947889 0 0-180.120074-116.987639-332.657122-278.443762-384.414564zM351.953984 252.036507c0-97.434441 78.246561-176.429034 174.771289-176.429034s174.77129 78.993569 174.77129 176.429034c0 97.439558-78.246561 176.428011-174.77129 176.428011s-174.77129-78.988453-174.771289-176.428011z m174.771289 696.329414c-185.50365 0-324.573059-51.71344-324.573059-91.437909 0-180.959179 145.31358-327.646026 324.573059-327.646026 179.254363 0 324.573059 146.686848 324.57306 327.646026 0 39.725492-139.069409 91.437909-324.57306 91.437909z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)