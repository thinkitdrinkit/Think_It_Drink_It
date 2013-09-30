(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var ageGroup = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: Replace the data with your real data.
    // You can add data from asynchronous sources whenever it becomes available.
    //generateSampleData().forEach(function (item) {
    //    list.push(item);
    //});

    WinJS.xhr({ url: "data/Recipes.txt" }).then(function (xhr) {
        var items = JSON.parse(xhr.responseText);

        // Add the items to the WinJS.Binding.List
        items.forEach(function (item) {
            list.push(item);
        });
    });



    WinJS.Namespace.define("Data", {
        items: ageGroup,
        groups: ageGroup.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }
    //Milo: TODO above probably item.group.key the group name will be know as age group 
    //and to add more groups you will need itme.groupBase.key
    

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(teen) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }
    //Milo: TODO create this also for this item.groupBase.key === groupBase.key
    //Milo: TODO create this also for this item.groupFlavor.key === groupFlavor.key
    //Milo: TODO create this also for this item.groupBoost.key === groupBoost.key
    //Milo: TODO create this also for this item.groupFlavorToddler.key === groupFlavorToddler.key MIGHT BE FOR THE ONES THAT ARE DIFFERENT
    //Milo: TODO create this also for this item.groupBase.key === groupFlavor.key

    // Get the unique group corresponding to the provided group key.
    function resolveGroupReference(key) {
        for (var i = 0; i < ageGroup.groups.length; i++) {
            if (ageGroup.groups.getAt(i).key === key) {
                return ageGroup.groups.getAt(i);
            }
        }
    }

    // Get a unique item from the provided string array, which should contain a
    // group key and an item title.
    function resolveItemReference(reference) {
        for (var i = 0; i < ageGroup.length; i++) {
            var item = ageGroup.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    // Returns an array of sample data that can be added to the application's
    // data list. 
})();
