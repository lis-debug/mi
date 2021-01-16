$(document).ready(function() {
    var banner = $(".banner0");
    var control = $(".banner-control");
    var btn_perv = $(".perv");
    var btn_next = $(".next");
    var img_all = $(".list-img");
    var img_list = $(".list-img li");
    var lis = $(".list-control li");
    var view_index = 0;
    var timer = setInterval(autoPlay, 3000);
    banner.hover(function() {
        // control.show();
        clearInterval(timer);
    }, function() {
        // control.hide();
        timer = setInterval(autoPlay, 3000);
    });

    btn_perv.click(function() {

        if (!img_all.is(":animated")) {
            view_index = view_index - 1;

            if (view_index < 0) {
                view_index = 3;
            }

            changeImg(view_index);
        }


    });

    btn_next.click(function() {

        if (!img_all.is(":animated")) {
            view_index = view_index + 1;

            if (view_index > 3) {
                view_index = 0;
            }
            changeImg(view_index);
        }

    });


    function changeImg(index) {
        view_index = index;
        img_all.animate({ opacity: "0.2" }, 200, function() {
            img_all.css("left", index * -1226 + "px");
            img_all.animate({ opacity: "1" });
        });

        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
        }

        lis[index].className = "active";
    }

    function autoPlay() {
        view_index = view_index + 1;
        if (view_index > 3) {
            view_index = 0;
        }
        changeImg(view_index);
    }


    /**
     * 使用闭包解决方案
     */
    // for (var i = 0; i < lis.length; i++) {
    //     (function (arg) {
    //         lis[i].onclick = function () {
    //             changeImg(arg);
    //         }
    //     }(i));
    // }

    /**
     *
     */
    for (var i = 0; i < lis.length; i++) {
        lis[i].i = i;
        lis[i].onclick = function() {
            if (this.className != "active") {
                changeImg(this.i);
            }

        }
    }


});