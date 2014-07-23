(function () {
    "use strict";
    var i = "";
    var j = "";
    WinJS.Namespace.define("design", {
        colorChange: function (themeColor,themeTextColor) {
            i = themeColor;
            j = themeTextColor;
        },
        getHome: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("appBar").style.backgroundColor = i;
            document.getElementById("age_display").style.borderColor = i;
            document.getElementById("sel_age_pic").style.borderColor = i;

            document.getElementById("info_btn").style.backgroundColor = i;
            document.getElementById("sel_btn").style.backgroundColor = i;
            
        },
        getBase: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("appBar").style.backgroundColor = i;
            document.getElementById("the_bases").style.borderColor = i;
            document.getElementById("sel_base_pic").style.borderColor = i;
            document.getElementById("info_btn2").style.backgroundColor = i;
            document.getElementById("sel_btn2").style.backgroundColor = i;
        },
        getFlav: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("appBar").style.backgroundColor = i;
            document.getElementById("the_flavor").style.borderColor = i;
            document.getElementById("choosen_flav_pic").style.borderColor = i;
            document.getElementById("sel_btn9").style.backgroundColor = i;
        },
        getFlavSel: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("appBar").style.backgroundColor = i;
            document.getElementById("the_flav_sel").style.borderColor = i;
            document.getElementById("flav_sel_sel_pic").style.borderColor = i;

            document.getElementById("info_btn4").style.backgroundColor = i;
            document.getElementById("sel_btn4").style.backgroundColor = i;
        },
        getBoost: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("appBar").style.backgroundColor = i;
            document.getElementById("boost_list_id").style.borderColor = i;
            document.getElementById("choosen_bg_img").style.borderColor = i;

            document.getElementById("info_btn3").style.backgroundColor = i;
            document.getElementById("sel_btn3").style.backgroundColor = i;

            document.getElementById("del_btn10").style.backgroundColor = i;
            document.getElementById("sel_btn10").style.backgroundColor = i;
            document.getElementById("the_number").style.color = i;
            document.getElementById("the_num").style.color = i;
        },
        getFinal: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("appBar").style.backgroundColor = i;
            document.getElementById("my_flav_img_final").style.borderColor = i;
            document.getElementById("my_base_img_final").style.borderColor = i;
            document.getElementById("my_boost3_img_final").style.borderColor = i;
            document.getElementById("my_boost2_img_final").style.borderColor = i;
            document.getElementById("my_boost1_img_final").style.borderColor = i;
            document.getElementById("sel_base_pic_final").style.borderColor = i;
            document.getElementById("my_flav_label_img_final").style.borderColor = i;
            document.getElementById("my_boost1_img_label_final").style.borderColor = i;
            document.getElementById("my_boost2_img_label_final").style.borderColor = i;
            document.getElementById("my_boost3_img_label_final").style.borderColor = i;

        },

        changeTextColor: function () {
            document.getElementById("footer_company_name").style.color = j;
            document.getElementById("company_name").style.color = j;
        },

        getThanks: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            //document.getElementById("yes_btn").style.backgroundColor = i;
            document.getElementById("no_btn").style.backgroundColor = i;
            //document.getElementById("yes_btn").style.color = j;
            document.getElementById("no_btn").style.color = j;
            //document.getElementById("yes_btn").style.borderColor = i;
            document.getElementById("no_btn").style.borderColor = i;
        },

        getSignUp: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("pass").style.borderColor = i;
            document.getElementById("phone").style.borderColor = i;
            document.getElementById("Fname").style.borderColor = i;
            document.getElementById("Lname").style.borderColor = i;
            document.getElementById("email").style.borderColor = i;
            document.getElementById("cPass").style.borderColor = i;
            document.getElementById("sign_btn").style.backgroundColor = i;
            document.getElementById("sign_btn").style.borderColor = i;
            document.getElementById("zip").style.borderColor = i;
            document.getElementById("sign_btn").style.color = j;

            //document.getElementById("signup_img1").style.borderColor = i;
            //document.getElementById("signup_img2").style.borderColor = i;
        },

        getWelcome: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
        },

        getInfoHome: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            //document.getElementById("info1_bases").style.borderColor = i;
            //document.getElementById("info1_boost").style.borderColor = i;
            //document.getElementById("info1_flav").style.borderColor = i;
            //document.getElementById("info1_age").style.borderColor = i;
            //document.getElementById("info_age_id").style.backgroundColor = i;
            //document.getElementById("info_boost_id").style.backgroundColor = i;
            //document.getElementById("info_base_id").style.backgroundColor = i;
            //document.getElementById("info_boost_id").style.backgroundColor = i;
            //document.getElementById("info_flav_id").style.backgroundColor = i;
        },
        all_products: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("all_info1").style.borderColor = i;
        },

        getSport: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("sport_display").style.borderColor = i;
        },

        getSport_info: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("sport_info_pic").style.borderColor = i;
        },

        item_info: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("item_info_pic").style.borderColor = i;
        },

        launch: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("make_drink").style.borderColor = i;
            document.getElementById("learn_more").style.borderColor = i;
            document.getElementById("supl_sport").style.borderColor = i;
            //document.getElementById("sign_up").style.borderColor = i;
            document.getElementById("appBar").style.backgroundColor = i;

        },

        login: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("login_btn").style.backgroundColor = i;

            //document.getElementById("login_image_first").style.borderColor = i;
            //document.getElementById("login_image_last").style.borderColor = i;
        },

        login_home: function () {
            document.getElementById("main_footer").style.backgroundColor = i;

            document.getElementById("the_previous_purchases_bases").style.borderColor = i;
            document.getElementById("the_previous_purchases_boost1").style.borderColor = i;
            document.getElementById("the_previous_purchases_boost2").style.borderColor = i;
            document.getElementById("the_previous_purchases_boost3").style.borderColor = i;
            document.getElementById("the_previous_purchases_flav").style.borderColor = i;
            document.getElementById("purchased1").style.borderColor = i;
            document.getElementById("buyAgain_btn").style.backgroundColor = i;
            document.getElementById("buyAgain_btn").style.borderColor = i;
            document.getElementById("buyAgain_btn").style.color = j;
            document.getElementById("profile_info").style.borderColor = i;
            document.getElementById("edit_btn").style.backgroundColor = i;
            document.getElementById("edit_btn").style.borderColor = i;
            document.getElementById("edit_btn").style.color = j;
            document.getElementById("appBar").style.background = i;

            document.getElementById("tier_one").style.borderColor = i;
            document.getElementById("tier_two").style.borderColor = i;
            document.getElementById("tier_three").style.borderColor = i;

        },

    })

})()