(function () {
    "use strict";
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    var Age = thinkitdrinkitDataClient.getTable("Age");

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            WinJS.Binding.processAll(element, age_data.model);
            design.getHome();
            design.changeTextColor();
        }
    });

    var query = Age.where({
    }).read().done(function (results) {
        for (var i = 0; i < results.length; i++) {
            age_data.model.age.push({ age: results[i].Name, img: results[i].Image })
        }
    }, function (err) {
        console.log(err);
    });
  
    // the following namespace will be used to complete all click events on the home.html page

    var _choosen_age = "";
    WinJS.Namespace.define('clicked_me', {
        //the clicked function will show the photo and the more indept information of the clicked age group
        //at the bottem of the home.html page
        clicked: function (me) {
            remove.pop_list(age_data.model.info)
            _choosen_age = me;
            var query = Age.where({
                Name:me
            }).read().done(function (results) {
                    age_data.model.info.push({ the_info: results[0].Info, info_img: results[0].Image })
            }, function (err) {
                console.log(err);
            });
        },
        next_page: function () {
            WinJS.Navigation.navigate('pages/base/base.html');
            var appData = Windows.Storage.ApplicationData.current;
            var roamingSettings = appData.roamingSettings;
            roamingSettings.values["Age_name"] = _choosen_age;
            roamingSettings.values["Age_pic"] = document.getElementById("sel_age_pic").src;
            roamingSettings.values["Age_info"] = null;
            roamingSettings.values["Age_price"] = null;
        }
    })
    
})();
