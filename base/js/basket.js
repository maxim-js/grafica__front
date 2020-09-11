//var basket = bask;
var mySelect;

$(function () {

    $("#basket2Step").click(function(){
        var href = $(this).attr("href");
        var prov = true;
        setTimeout(function () {
            if (prov)
                getLoader();
        }, 400);
        ajaxLoad({"shop": "getSum"}, "/ajax/ajaxShop/").complete(function (dat) {
            prov = false;
            removeLoader();
            var result = dat.responseText;
            try {
                var mas = JSON.parse(result);
                if (mas.result == "ok") {
                    location.href = href;
                } else {
                    sendMesseg(mas.hend, mas.mess);
                }
            } catch (e) {
                console.log(e);
                console.log(result);
            } 
        });
        return false;
    });

    $(document).on("click", ".frm-counter .btn-minus", function (e) {
        e.preventDefault();
        var cnt = $(this).parents('.frm-counter').find('input').val();
        cnt = parseInt(cnt);
        if (cnt > 0) {
            $(this).parents('.frm-counter').find('input').val(cnt - 1);
        }
        chengeItem($(this).closest(".frm-counter").data("id"), $(this).closest(".frm-counter").find('input').val(), $(this).closest(".inner-block"));
        return false;
    });
    $(document).on("click", ".frm-counter .btn-plus", function (e) {
        e.preventDefault();
        var cnt = $(this).parents('.frm-counter').find('input').val();
        $(this).parents('.frm-counter').find('input').val(cnt - 1 + 2);
        chengeItem($(this).closest(".frm-counter").data("id"), $(this).closest(".frm-counter").find('input').val(), $(this).closest(".inner-block"));
        return false;
    });
    $(document).on("change", ".frm-counter input", function (e) {
        e.preventDefault();
        chengeItem($(this).closest(".frm-counter").data("id"), $(this).closest(".frm-counter").find('input').val(), $(this).closest(".inner-block"));
        return false;
    });
    
    $(".commetColor").change(function(){
        var param = [{name: "id", value: $(this).data('id')}];
        param.push({name: "text", value: $(this).val()});
        param.push({name: "shop", value: "changeText"});
        var prov = true;
        setTimeout(function () {
            if (prov)
                getLoader();
        }, 500);
        ajaxLoad(param, "/ajax/ajaxShop/").complete(function (dat) {
            prov = false;
            removeLoader();
        });

    });

    $(document).on("change", ".count-item", function (e) {
        e.preventDefault();
        var cnt = $(this).parents('.frm-counter').find('input').val();
        $(this).parents('.frm-counter').find('input').val(cnt - 1 + 2);
        chengeItem($(this).closest(".frm-counter").data("id"), $(this).closest(".frm-counter").find('input').val(), $(this).closest(".inner-block"));
        return false;
    });

    function chengeItem(id, count, item){
        try {
            var param = [{name: "id", value: id}];
            param.push({name: "count", value: count});
            param.push({name: "shop", value: "changeItem"});
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
                UpdateCart(mas.shop);
                console.log(item.find(".total"));
                console.log(mas);
                var message = typeof (mas.message) != "undefined" ? mas.message : false;
                var danger = typeof (mas.shop.danger) != "undefined" ? mas.shop.danger : false;
                if (danger) {
                    console.log(mas.shop.dangerError);
                    sendMesseg(mas.shop.dangerError, "");
                }
                item.find(".total").text(mas.item.total);
                item.find("input").val(mas.item.count);
                //item.fadeOut(500);
            } catch (e) {
                console.log(result);
                console.log(e);
                block = true;
            }
        });
    }
    $(document).on("click", ".btn-del", function (e) {
        e.preventDefault();
        var item = $(this).closest(".item-cart");
        console.log("item = "+item);
        try {
            var param = [{name: "id", value: $(this).data('id')}];
            param.push({name: "shop", value: "delItem"});          
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
                //console.log("mas.shop.sum_priсe_format = "+mas.shop.sum_priсe_format);
                UpdateCart(mas.shop);
                if(mas.shop.prod_count == 0){
                    $('.cart-wrap').html("<h3>Корзина пуста</h3>");
                }
                item.fadeOut(500);
            } catch (e) {
                //console.log(result);
                console.log(e);
                block = true;
            }
        });
    });
});

function danger(mas) {
    if (mas.danger === "varning") {
        riv("#bloked");
    }
}

function UpdateItem($mas){
    
}

function UpdateCart(mas) {
    $(".countBasket").html(mas.prod_count);
    $(".sumBasket").html(mas.sum_priсe.formatMoney(2, ',', ' '));
    $(".countItemName").html(sklonen(mas.prod_count, "товар", "товара", "товаров"));
    $('.prodCount').html(mas.prod_count);
    $('.prodSum').html(mas.sum_priсe_format);
    $('.btn-action-ico.cart').data("count", mas.prod_count);
//    $(".countDiscont").html(mas.sum_priсeD.formatMoney(2, ',', ' '));
}
