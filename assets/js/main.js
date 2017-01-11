"use strict"

$(document).ready(function() {
    function checkAll() {
        $("input[name=members]").prop("checked", true);
        $("#checkAll").on("click", unCheckAll);
    };
    function unCheckAll() {
        $("input[name=members]").prop("checked", false);
        $("#checkAll").on("click", checkAll);
    };


    $('#nav').scrollFix({zIndex:1000});
    $("#checkAll").on("click", checkAll);
    $('#downloadPDFButton').on("click", function() {
        window.print();
    })
});
