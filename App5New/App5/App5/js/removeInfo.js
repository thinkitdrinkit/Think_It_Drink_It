(function () {

    WinJS.Namespace.define("remove", {

        pop_list: function (list) {
            var i = 0;
            while (i < list.length + 100) {
                list.pop();
                i++
            }
        }

    })

})()