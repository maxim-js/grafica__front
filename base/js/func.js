$(function () {
    getEmp();
});

function getEmp() {
    $('input,textarea').unbind('focus');
    $('.form-tooltip.form-tooltip-top').remove();
    $("input").removeClass("invalid");
    $("input").removeClass("valid");
    $(".invalidText, .errorText").html("");
    $('input,textarea').focus(function () {
        $('.form-tooltip.form-tooltip-top').remove();
        $("input").removeClass("invalid");
        $("input").removeClass("valid");
        $(".invalidText, .errorText").html("");
        return true;
    });
}



function valid2(par, nom) {
    getEmp();

    var nomm = (nom || 100);
    var text = 'dd :';
    var regexp = /^[a-zA-Zа-яА-Я0-9\_\.\!\,\+\- ]+$/;
    text.search(regexp)
    var i = 0;
    var result = true;
    par.find('input,textarea').each(function () {
        if (!$(this).is(":visible")) {
            return true;
        }
        
        switch ($(this).attr('data-type')) {
            case 'email':
                if ($(this).val().match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) === null) {
                    $(this).after(addExcept('некорректный email!'));
                    try {
                        $("html,body").scrollTop($(this).closest(".form-group, .input-row").offset().top - 100);
                    } catch (e) {
                    }
                    $(this).addClass("invalid");
                    result = false;
                }
                break;
            case 'phone':
                if ($(this).val().length < 4) {
                    $(this).before(addExcept('Некорректный номер!'));
                    try {
                        $("html,body").scrollTop($(this).closest(".form-group, .input-row").offset().top - 100);
                    } catch (e) {
                    }
                    $(this).addClass("invalid");
                    result = false;
                } else {
                    if ($(this).val().match(/^[+0-9,. ()-]+$/) === null) {
                        $(this).before(addExcept('Некорректный номер!'));
                        try {
                            $("html,body").scrollTop($(this).closest(".form-group, .input-row").offset().top - 100);
                        } catch (e) {
                        }
                        $(this).addClass("invalid");
                        result = false;
                    }
                }
                break;
            case 'required':
                if ($(this).attr('type') == 'checkbox') {
                    if (!$(this).is(':checked')) {
                        $(this).before(addExcept('Обязательно для заполнения!'));
                        try {
                            $("html,body").scrollTop($(this).closest(".form-group, .input-row").offset().top - 100);
                        } catch (e) {
                        }
                        $(this).addClass("invalid");
                        result = false;
                    }
                } else {
                    if ($(this).val() == "") {
                        $(this).before(addExcept('Обязательно для заполнения!'));
                        try {
                            $("html,body").scrollTop($(this).closest(".form-group, .input-row").offset().top - 100);
                        } catch (e) {
                        }
                        $(this).addClass("invalid");
                        result = false;
                    }
                }
                break;
            case 'agreement':
                if ($(this).attr('type') == 'checkbox') {
                    if (!$(this).is(':checked')) {
                        $(this).before(addExcept('Вы должны согласиться!'));
                        try {
                            $("html,body").scrollTop($(this).closest(".form-group, .input-row").offset().top - 100);
                        } catch (e) {
                        }
                        $(this).addClass("invalid");
                        result = false;
                    }
                } else {
                    if ($(this).val() == "") {
                        $(this).before(addExcept('Вы должны согласиться!'));
                        try {
                            $("html,body").scrollTop($(this).closest(".form-group, .input-row").offset().top - 100);
                        } catch (e) {
                        }
                        $(this).addClass("invalid");
                        result = false;
                    }
                }
                break;
        }
        i++;
        if (i == nomm)
            return result;
    });
    return result;
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function sklonen(n, s1, s2, s3) {
    var m = n % 10;
    var j = n % 100;
    if (m == 0 || m >= 5 || (j >= 10 && j <= 20))
        return s3;
    if (m >= 2 && m <= 4)
        return  s2;
    return s1;
}

function addExcept(text) {
    return '<div class="form-tooltip form-tooltip-top">' + text + '</div>';
}

function floorN(x, n)
{
    var mult = Math.pow(10, n);
    return Math.floor(x * mult) / mult;
}

function getLoader() {
    var text = '<div class="pre-loader">\n\
            <div class="outer">\n\
                <div class="inner">\n\
                    <span class="loader"><span class="loader-inner"></span></span>\n\
                </div>\n\
            </div>\n\
        </div>';
    //console.log($(".pre-loader").length);
    //console.log($(".pre-loader").length == 0);
    if ($(".pre-loader").length == 0) {
        $('body').append(text);
        $('.pre-loader').unbind('click');
        $(".pre-loader").click(function () {
            removeLoader();
        });
    }
}

function removeLoader() {
    $('.pre-loader').remove();
}

function ajaxLoad(data, url, type) {
    type = type || "data";
    var param = {type: "POST", url: url, data: data};
    if (type == 'file') {
        param.contentType = false;
        param.processData = false;
    }
    //console.log(param);
    return $.ajax(param);
}