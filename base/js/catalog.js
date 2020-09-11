var block = true;
$(function () {
    /*if ((typeof (actManu) != "undefined")) {
        $.each(actManu, function (k, v) {
            console.log(v);
            $(".submenu.s" + v).addClass("open");
        });
    }*/

    $(document).on("click", ".btn-buy", function (e) {
        e.preventDefault();
        //console.log("btn-buy");
        beyItem($(this).data('id'), 1, $(this));
    });



    function beyItem(elem, valueC, el) {
        try {
            var param = [{name: "id", value: elem}];
            /*if (typeof (dioptrii) != "undefined"){
                param.push({name: "dioptrii", value: dioptrii});
            }*/
            param.push({name: "shop", value: "bayprod"});
            param.push({name: "count", value: valueC});
            //console.log(param);          
        } catch (e) {
            console.log(e);
        }
        var prov = true;
        setTimeout(function () {
            if (prov)
                getLoader();
        }, 500);
        ajaxLoad(param, "/ajax/ajaxShop/").complete(function (dat) {
            prov = false;
            removeLoader();
            try {
                var result = dat.responseText;
                var mas = JSON.parse(result);
               /* console.log("mas = "+mas);
            return false;*/
                var message = typeof (mas.message) != "undefined" ? mas.message : false;
                var danger = typeof (mas.shop.danger) != "undefined" ? mas.shop.danger : false;
                if (danger) {
                    console.log(mas.shop.dangerError);
                    sendMesseg(mas.shop.dangerError, "");
                }else{
                    sendMesseg(message, "");
                }
                //UpdateCart(mas.shop);
                el.addClass("animated").addClass("pulse").addClass("active");
                setTimeout(function () {
                    el.removeClass("animated").removeClass("pulse");
                }, 800);
                $('.prodCount').html(mas.shop.prod_count);
                $('.prodSum').html(mas.shop.sum_priсe_format);
                $('.btn-action-ico.cart').data("count", mas.shop.prod_count);
                $(".countItemName").html(sklonen(mas.shop.prod_count, "товар", "товара", "товаров"));
                //console.log(mas);
                block = true;
                location.reload();
            } catch (e) {
                console.log(result);
                console.log(e);
                block = true;
            }
        });
    }

    $("#orderForm").submit(function (e) {
        e.preventDefault();
        var form = $(this).closest('form');
        var url = $(this).attr('action') || "/ajax/";
        //console.log(form);
        //if (!isNan)
        var prov = true;
        if (valid2(form)) {
            setTimeout(function () {
                if (prov)
                    getLoader();
            }, 500);
            ajaxLoad(form.serializeArray(), url).complete(function (dat) {
                prov = false;
                removeLoader();
                var result = dat.responseText;
                try {
                    var mas = JSON.parse(result);
                    console.log(mas);
                    if (mas.result == "ok") {
                        sendMesseg(mas.hend, mas.mess);
                        form.find("[type='text'],textarea").val("");
                    }
                    var reload = typeof (mas.reload) != "undefined" ? mas.reload : false;
                    if (reload) {
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } 
                } catch (e) {
                    console.log(e);
                    console.log(result);
                }
            });
        }
    });
    //$("#orderItems").change(function(){
    $( "#orderItems" ).on( "selectmenuchange", function(){
        var cur = $(this).val();
        window.location = cur;
        console.log(cur);
    });
    hideIf();
    $("[type='radio']").change(function () {
        hideIf();
    });
    $(window).on('popstate', function (e) {
        getCatalog();
    });
});

/*function getCatalog() {
    var param = [];
    param.push({name: "ajax", value: "1"});
    var url = window.location.href;
    var prov = true;
    setTimeout(function () {
        if (prov)
            getLoader();
    }, 500);
    ajaxLoad(param, url).complete(function (dat) {
        prov = false;
        removeLoader();
        var result = dat.responseText;
        try {
            var mas = JSON.parse(result);
            //console.log(mas);
            $(".forPagi").html(mas.page);
            $(".catalog-box").html(mas.items);
        } catch (e) {
            console.log(e);
            console.log(result);
        }
    });
}*/

function hideIf() {
    $(".showif").each(function () {
        var val = $("." + $(this).data("field") + ":checked").val();
        if ($(this).data('val') == val) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    return true;
}

function sendMesseg(header, txte) {
   $('#messM').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        draggable: false,
        width: 310,
        show: { effect: "fade", duration: 400 },
        hide: { effect: "fade", duration: 400 },
        dialogClass: '',
        title: header
    })
    $('#messM .texxt').html(txte);

    $('#messM').dialog('open');
}


