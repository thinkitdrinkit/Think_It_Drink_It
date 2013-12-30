(function () {
    var appData = Windows.Storage.ApplicationData.current;
    var roamingSettings = appData.roamingSettings;
    WinJS.Namespace.define("login", {

        check: function (pass,email) {
            server.login(pass, email);
        },
        logout: function () {
            document.getElementById("company_name").textContent = "ThinkitDrinkit";
            document.getElementById("signUp").removeAttribute("hidden");
            document.getElementById("login").removeAttribute("hidden");
            document.getElementById("profile").setAttribute("hidden", true);
            document.getElementById("logout").setAttribute("hidden", true);
            document.getElementById("shop").setAttribute("onclick", "WinJS.Navigation.navigate('pages/home/home.html')");
            document.getElementById("home").setAttribute("onclick", "WinJS.Navigation.navigate('pages/launch_page/launch_page.html')");
            document.getElementById("more_info_home").setAttribute("onclick", "WinJS.Navigation.navigate('pages/info_home/info_home.html')");
            roamingSettings.values["login_lName"] = "";
            roamingSettings.values["login_fName"] = "";
            roamingSettings.values["login_vID"] = "";
            roamingSettings.values["login_vcode"] = "";
          
            roamingSettings.values["true"] = false;
            WinJS.Navigation.navigate('pages/launch_page/launch_page.html');
        }

    })
})()