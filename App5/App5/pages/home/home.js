(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
        }
    });

    WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
        var user_age = JSON.parse(xhr.responseText);
        user_age.forEach(function (user_ages) {
            for (var i = 0; i < user_ages.length; i++) {
               age_data.model.age.push({age : user_ages[i].AgeGroup, img: user_ages[i].AgeGroupImage })
            }
        });
    });

    // the following namespace will be used to complete all click events on the home.html page

    var _choosen_age = "";
    WinJS.Namespace.define('clicked_me', {
        //the clicked function will show the photo and the more indept information of the clicked age group
        //at the bottem of the home.html page
        clicked: function (me) {
            remove.pop_list(age_data.model.info)
            _choosen_age = me;
            var num = 0;
            num = age_data.get_age_num(me);

            WinJS.xhr({ url: "resource/data.txt" }).then(function (xhr) {
                var user_age = JSON.parse(xhr.responseText);
                user_age.forEach(function (user_ages) {
                    age_data.model.info.push({ the_info: user_ages[num].info, info_img: user_ages[num].AgeGroupImage })
                });
            });
        },
        next_page: function () {
            WinJS.Navigation.navigate('pages/base/base.html');
            get_set.get_age(_choosen_age, document.getElementById("sel_age_pic").src, "null", "null");
        }
    })


})();
