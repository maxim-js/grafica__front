$(function () {
    if (!$(".ispl").length) {
        $("body").append("<div class='ispl'></div>");
    }
//    $('form').submit(function () {
//        if ($(this).attr('ispl') == "none") {
//            return true;
//        } else {
//            var form = $(this);
//            var url1 = $(this).attr('url');
//            var pr = valid2($(this));
//            if (pr) {
//                ajaxSend(form.serializeArray(), url1, form);
//            } else {
//                addShaik(form);
//            }
//            return false;
//        }
//    });
});

function addShaik(form) {
    if (!form.closest(".modal").hasClass("animated")) {
        form.closest(".modal").addClass("animated");
        form.closest(".modal").addClass("shake");
        setTimeout(function () {
            form.closest(".modal").removeClass("animated");
            form.closest(".modal").removeClass("shake");
        }, 700);
    }
}

function ajaxSend(form, url1, form1) {
    $.ajax({type: 'POST', data: form, url: url1, dataType: 'text', success: function (data) {
            console.log(data);
            try {
                var event = JSON.parse(data);
                //console.log(event);
                switch (event.result) {
                    case 'ok':
                        //$('.ispl').html(event.data);
                        sendMesseg(event.hend, event.text);
                        break;
                    case 'no':
                        addShaik(form1);
                        if (form1.find(".errorText").length)
                            form1.find(".errorText").html(event.error);
                        //$('.ispl').html(event.data);
                        pr = false;
                        break;
                    default:
                        break;
                }

            } catch (e) {
                console.log(data);
                console.log(e);
            }
        }
    });
}

function sendError(text) {
    $(".errorText").html(text);
}

