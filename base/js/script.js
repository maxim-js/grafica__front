$(function () {

    $(window).scroll(function(){
        ckrol();
    });

	$("form:not('.NoSend')").submit(function(e){
		e.preventDefault();
		var form  = $(this).closest('form');
		//console.log(form);
        //if (!isNan)
		if (valid2(form)){
			ajaxLoad(form.serializeArray(), "/ajax/ajax/").complete(function (dat) {
				var result = dat.responseText;
				try{
					var mas = JSON.parse(result);
					if (mas.result == "ok"){
						sendMesseg(mas.hend, mas.mess);
						form.find("[type='text'],textarea").val("");
					}
				}catch(e){
					console.log(e);
                    console.log(result);
				}
			});
		}
	});


    var slise = $('.sliderCont').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        // asNavFor: '.slider_contain'
    });
    slise.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        //console.log(nextSlide);
        $('.navSlide a div').removeClass("active");
        $('.navSlide a div').eq(nextSlide).addClass("active");
    });
    $('.navSlide a').unbind('click');
    $('.navSlide a').click(function () {
        var ind = $(this).index();
        slise.slick("slickGoTo", ind);
        return false;
    });

	$('.slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        //centerMode: true,
        focusOnSelect: true,
		variableWidth: true,
		infinite: true,
        prevArrow: '<a class="bx-prev navpr"><i class="fa fa-angle-left"></i></a>',
        nextArrow: '<a class="bx-next navpr"><i class="fa fa-angle-right"></i></a>',
    });

    $('.mainSlider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      arrows: false,
      adaptiveHeight: true
    });

    $('.selectpicker').fancySelect();

	$(".dat1").fancybox();

    // $(".dat1").fancybox({
    //     beforeShow : function(){
    //        this.title =  $(this.element).data("caption");
    //     }
    // });

    $(".ajax a").click(function(e){
        e.preventDefault();
        var rootE = $(this).closest(".ajax");
        var rootEAll = $(this).closest(".primeru_box2,.primeru_box1").find(".accordion");
        rootE.find('a').removeClass("active");
        $(this).addClass("active");
        var param = [{name: "work", value: "getwork"}];
        param.push({name: "page", value: $(this).text()});
        param.push({name: "cid", value: rootE.data('cat')});
        ajaxLoad(param, "/ajax/ajax/").complete(function (dat) {
            var result = dat.responseText;
            try{
                if (result != "error"){
                    rootEAll.html(result);
                    rootEAll.accordion();
                }else{
                    sendMesseg("Ошибка", "не верные данные");
                }
            }catch(e){
                console.log(e);
                console.log(result);
            }
        });
    });
});

function ckrol(){
    //console.clear() ;
    console.log($(window).scrollTop());
    if ($(window).scrollTop()>20){
        $(".header .nav").addClass("fix");
        $(".header .container.mar").addClass("marginCont");
    }
    else{
        $(".header .nav").removeClass("fix");
        $(".header .container.mar").removeClass("marginCont");
    }  
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
