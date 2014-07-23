(function () {
    "use strict";
    WinJS.Namespace.define("print", {

        button: function() {
            document.getElementById("Print").addEventListener("click", PrintButtonHandler, false);

            // Register for Print Contract
            registerForPrintContract();
        }
    });

    function registerForPrintContract() {
        var printManager = Windows.Graphics.Printing.PrintManager.getForCurrentView();
        printManager.onprinttaskrequested = onPrintTaskRequested;
        WinJS.log && WinJS.log("Print Contract registered. Use Print button to print.", "sample", "status");
    }

    /// <summary>
    /// Print event handler for printing via the PrintManager API. The user has to manually invoke
    /// the print charm after this function is executed.
    /// </summary>
    /// <param name="printEvent" type="Windows.Graphics.Printing.PrintTaskRequest">
    /// The event containing the print task request object.
    /// </param>
    function onPrintTaskRequested(printEvent) {
        var printTask = printEvent.request.createPrintTask("Print Sample", function (args) {
            args.setSource(MSApp.getHtmlPrintDocumentSource(document));

            // Register the handler for print task completion event
            printTask.oncompleted = onPrintTaskCompleted;
        });
    }

    /// <summary>
    /// Print Task event handler is invoked when the print job is completed.
    /// </summary>
    /// <param name="printTaskCompletionEvent" type="Windows.Graphics.Printing.PrintTaskCompleted">
    /// The event containing the print task completion object.
    /// </param>
    function onPrintTaskCompleted(printTaskCompletionEvent) {
        // Notify the user about the failure
        if (printTaskCompletionEvent.completion === Windows.Graphics.Printing.PrintTaskCompletion.failed) {
            WinJS.log && WinJS.log("Failed to print.", "sample", "error");
        }
    }

    /// <summary>
    /// Executed just before printing.
    /// </summary>
    var beforePrint = function () {
        // Replace with code to be executed just before printing the current document:
        $(".print_charm, .link_wrap").hide();
        $("#win_listview_host .win-listview").height(1150);
        $("#win_listview_host .win-viewport").height(1100).css('overflow-y', 'hidden');

        //$(".print_charm_content").height("100%");
        //$(".win-itembox").height("100%");


        //$(".article").width(1000).height(2000);
    };

    /// <summary>
    /// Executed immediately after printing.
    /// </summary>
    var afterPrint = function () {
        $(".print_charm, .link_wrap").show();
        $("#win_listview_host .win-listview").height(500);
        $("#win_listview_host .win-viewport").height(490).css('overflow-y', 'visible');


        //$(".win-listview").height(580);
        //$(".print_charm_content").height(500);
        //$(".win-itembox").height("100%");

    };

    function PrintButtonHandler() {
        // Optionally, functions to be executed immediately before and after printing can be configured as following:
        window.document.body.onbeforeprint = beforePrint;
        window.document.body.onafterprint = afterPrint;

        // If the print contract is registered, the print experience is invoked.
        Windows.Graphics.Printing.PrintManager.showPrintUIAsync();
    }

})();
