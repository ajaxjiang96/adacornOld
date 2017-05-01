"use strict"

$(document).ready(function() {


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

    $("#emailButton").on("click", function() {
        $("#memberForm").prop("action", "/newEmail");
        $("#memberForm").prop("method", "post");
        $("#memberForm").submit();
    });

    $("#email").ajaxSubmit({
        url: '/email',
        type: 'post',
        success: function(res) {
            console.log("success");
            console.log(res);
            $("emailContainer").html(res.html);
        }
    })

});
