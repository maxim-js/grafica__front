$(function () {
    $('.avtor').submit(function () {
        var forrm = $(this);
        if (valid2(forrm)) {
            //console.log($(this).serializeArray());
            var form = $(this).serializeArray();
            var prov = true;
            setTimeout(function () {
                if (prov)
                    getLoader();
            }, 400);
            ajaxLoad({"shop": "getCountItem"}, "/ajax/ajaxShop/").complete(function (dat) {
                prov = false;
                removeLoader();
                var result = dat.responseText;
                try {
                    var mas = JSON.parse(result);
                    if (mas.result == "ok") {
                        // location.href = href;
                    } else {
                        if (!confirm('После входа в личный кабинет ваша корзина будет отчищена. Продолжить?')) {
                            return false;
                        }
                        //sendMesseg(mas.hend, mas.mess);
                    }
                } catch (e) {
                    console.log(e);
                    console.log(result);
                } 
                    prov = true;
                    setTimeout(function () {
                        if (prov)
                            getLoader();
                    }, 400);
                    $.ajax({
                        type: 'POST', data: form, url: '/ajax/ajaxAvtor/', dataType: 'text',
                        success: function (data) {
                            prov = false;
                            removeLoader(); 
                            try {
                                var event = JSON.parse(data);

                                switch (event.result) {
                                    case 'ok':
                                        var reload = typeof(event.reload) != "undefined" ? event.reload : true;
                                        var messeg = typeof(event.messeg) != "undefined" ? event.messeg : false;
                                        var time = 0;
                                        if (messeg){
                                            sendMesseg(event.hend, event.text);
                                            time = 3000;
                                        }
                                        console.log(reload);
                                        if (reload){
                                            setTimeout(function () {
                                                location.reload();
                                            }, time);                                           
                                        }
                                        break;
                                    case 'no':
                                        //addShaik(forrm);
                                        console.log(event);
                                        console.log(forrm.find(".errorText"));
                                        if (forrm.find(".errorText").length)
                                            forrm.find(".errorText").html(event.error);
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
            });        
        }
        return false;
    });
    $('input,textarea').focus(function () {
        $('.rt.error').remove();
        $("input").removeClass("error");
        $("input").removeClass("valid");
        return true;
    });
    $('.logout').click(function () {
        var prov = true;
        setTimeout(function () {
            if (prov)
                getLoader();
        }, 400);
        ajaxLoad({"shop": "getCountItem"}, "/ajax/ajaxShop/").complete(function (dat) {
            prov = false;
            removeLoader();
            var result = dat.responseText;
            try {
                var mas = JSON.parse(result);
                if (mas.result == "ok") {
                    location.href = href;
                } else {
                    if (!confirm('После выхода из личного кабинета ваша корзина будет отчищена. Продолжить?')) {
                        return false;
                    }
                    //sendMesseg(mas.hend, mas.mess);
                }
            } catch (e) {
                console.log(e);
                console.log(result);
            }
                prov = true;
                setTimeout(function () {
                    if (prov)
                        getLoader();
                }, 200);
                $.ajax({
                    type: 'POST', data: 'action=logout', url: '/ajax/ajaxAvtor/', dataType: 'text',
                    success: function (data) {
                        prov = false;
                        removeLoader(); 
                        console.log(data);
                        location.reload();
                    }
                });
        });
    });
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
