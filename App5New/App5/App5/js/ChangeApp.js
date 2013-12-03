(function (){
    var i = "";
    var j = "";
    WinJS.Namespace.define("design", {
        colorChange: function (themeColor,themeTextColor) {
            i = themeColor;
            j = themeTextColor;
        },
        getHome: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("main_header").style.backgroundColor = i;
            document.getElementById("age_display").style.borderColor = i;
            document.getElementById("sel_age_pic").style.borderColor = i;
        },
        getBase: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("main_header").style.backgroundColor = i;
            document.getElementById("the_bases").style.borderColor = i;
            document.getElementById("sel_base_pic").style.borderColor = i;
        },
        getFlav: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("main_header").style.backgroundColor = i;
            document.getElementById("the_flavor").style.borderColor = i;
            document.getElementById("choosen_flav_pic").style.borderColor = i;
        },
        getFlavSel: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("main_header").style.backgroundColor = i;
            document.getElementById("the_flav_sel").style.borderColor = i;
            document.getElementById("flav_sel_sel_pic").style.borderColor = i;
        },
        getBoost: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("main_header").style.backgroundColor = i;
            document.getElementById("boost_list_id").style.borderColor = i;
            document.getElementById("choosen_bg_img").style.borderColor = i;
        },
        getFinal: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("main_header").style.backgroundColor = i;
            document.getElementById("my_flav_img").style.borderColor = i;
            document.getElementById("my_base_img").style.borderColor = i;
            document.getElementById("my_boost3_img").style.borderColor = i;
            document.getElementById("my_boost2_img").style.borderColor = i;
            document.getElementById("my_boost1_img").style.borderColor = i;
        },
        changeTextColor: function () {
            document.getElementById("footer_company_name").style.color = j;
            document.getElementById("company_name").style.color = j;
        },
        getThanks: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
            document.getElementById("yes_btn").style.backgroundColor = i;
            document.getElementById("no_btn").style.backgroundColor = i;
            document.getElementById("yes_btn").style.color = j;
            document.getElementById("no_btn").style.color = j;
            document.getElementById("yes_btn").style.borderColor = i;
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
        },
        getWelcome: function () {
            document.getElementById("main_footer").style.backgroundColor = i;
        }

    })

})()