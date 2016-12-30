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

    $("#checkAll").on("click", checkAll);
    $("#deleteButton").on("click", function() {
        if (confirm("确定要删除这些成员吗？")) {
            $("#memberForm").prop("action", "/delete");
            $("#memberForm").prop("method", "post");
            $("#memberForm").submit();
        }
    });
    $('.sort').on("click", function() {
        location.href = ("/m?sort=" + this.id);
        console.log("click");
    });
});
