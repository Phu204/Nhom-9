window.Bizweb||(window.Bizweb={}),Bizweb.mediaDomainName="//bizweb.dktcdn.net/",Bizweb.each=function(a,b){for(var c=0;c<a.length;c++)b(a[c],c)},Bizweb.getClass=function(a){return Object.prototype.toString.call(a).slice(8,-1)},Bizweb.map=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(b(a[d],d));return c},Bizweb.arrayContains=function(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1},Bizweb.distinct=function(a){for(var b=[],c=0;c<a.length;c++)Bizweb.arrayContains(b,a[c])||b.push(a[c]);return b},Bizweb.getUrlParameter=function(a){var b=RegExp("[?&]"+a+"=([^&]*)").exec(window.location.search);return b&&decodeURIComponent(b[1].replace(/\+/g," "))},Bizweb.uniq=function(a){for(var b=[],c=0;c<a.length;c++)Bizweb.arrayIncludes(b,a[c])||b.push(a[c]);return b},Bizweb.arrayIncludes=function(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1},Bizweb.Product=function(){function a(a){if("undefined"!=typeof a)for(property in a)this[property]=a[property]}return a.prototype.optionNames=function(){return"Array"==Bizweb.getClass(this.options)?this.options:[]},a.prototype.optionValues=function(a){if("undefined"==typeof this.variants)return null;var b=Bizweb.map(this.variants,function(b){var c="option"+(a+1);return"undefined"==typeof b[c]?null:b[c]});return null==b[0]?null:Bizweb.distinct(b)},a.prototype.getVariant=function(a){var b=null;return a.length!=this.options.length?null:(Bizweb.each(this.variants,function(c){for(var d=!0,e=0;e<a.length;e++){var f="option"+(e+1);c[f]!=a[e]&&(d=!1)}if(d)return void(b=c)}),b)},a.prototype.getVariantById=function(a){for(var b=0;b<this.variants.length;b++){var c=this.variants[b];if(c.id==a)return c}return null},a.name="Product",a}(),Bizweb.money_format="{{amount}} VND",Bizweb.formatMoney=function(a,b){function f(a,b,c,d){if("undefined"==typeof b&&(b=2),"undefined"==typeof c&&(c="."),"undefined"==typeof d&&(d=","),"undefined"==typeof a||null==a)return 0;a=a.toFixed(b);var e=a.split("."),f=e[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+c),g=e[1]?d+e[1]:"";return f+g}"string"==typeof a&&(a=a.replace(/\./g,""),a=a.replace(/\,/g,""));var c="",d=/\{\{\s*(\w+)\s*\}\}/,e=b||this.money_format;switch(e.match(d)[1]){case"amount":c=f(a,2);break;case"amount_no_decimals":c=f(a,0);break;case"amount_with_comma_separator":c=f(a,2,".",",");break;case"amount_no_decimals_with_comma_separator":c=f(a,0,".",",")}return e.replace(d,c)},Bizweb.OptionSelectors=function(){function a(a,b){return this.selectorDivClass="selector-wrapper",this.selectorClass="single-option-selector",this.variantIdFieldIdSuffix="-variant-id",this.variantIdField=null,this.selectors=[],this.domIdPrefix=a,this.product=new Bizweb.Product(b.product),"undefined"!=typeof b.onVariantSelected?this.onVariantSelected=b.onVariantSelected:this.onVariantSelected=function(){},this.replaceSelector(a),this.initDropdown(),!0}return a.prototype.replaceSelector=function(a){var b=document.getElementById(a),c=b.parentNode;Bizweb.each(this.buildSelectors(),function(a){c.insertBefore(a,b)}),b.style.display="none",this.variantIdField=b},a.prototype.buildSelectors=function(){for(var a=0;a<this.product.optionNames().length;a++){var b=new Bizweb.SingleOptionSelector(this,a,this.product.optionNames()[a],this.product.optionValues(a));b.element.disabled=!1,this.selectors.push(b)}var c=this.selectorDivClass,d=this.product.optionNames(),e=Bizweb.map(this.selectors,function(a){var b=document.createElement("div");if(b.setAttribute("class",c),d.length>1){var e=document.createElement("label");e.htmlFor=a.element.id,e.innerHTML=a.name,b.appendChild(e)}return b.appendChild(a.element),b});return e},a.prototype.initDropdown=function(){var a={initialLoad:!0},b=this.selectVariantFromDropdown(a);if(!b){var c=this;setTimeout(function(){c.selectVariantFromParams(a)||c.selectors[0].element.onchange(a)})}},a.prototype.selectVariantFromDropdown=function(a){var b=document.getElementById(this.domIdPrefix).querySelector("[selected]");return!!b&&this.selectVariant(b.value,a)},a.prototype.selectVariantFromParams=function(a){var b=Bizweb.getUrlParameter("variantid");return null==b&&(b=Bizweb.getUrlParameter("variantId")),this.selectVariant(b,a)},a.prototype.selectVariant=function(a,b){var c=this.product.getVariantById(a);if(null==c)return!1;for(var d=0;d<this.selectors.length;d++){var e=this.selectors[d].element,f=e.getAttribute("data-option"),g=c[f];null!=g&&this.optionExistInSelect(e,g)&&(e.value=g)}return"undefined"!=typeof jQuery?jQuery(this.selectors[0].element).trigger("change",b):this.selectors[0].element.onchange(b),!0},a.prototype.optionExistInSelect=function(a,b){for(var c=0;c<a.options.length;c++)if(a.options[c].value==b)return!0},a.prototype.updateSelectors=function(a,b){var c=this.selectedValues(),d=this.product.getVariant(c);d?(this.variantIdField.disabled=!1,this.variantIdField.value=d.id):this.variantIdField.disabled=!0,this.onVariantSelected(d,this,b),null!=this.historyState&&this.historyState.onVariantChange(d,this,b)},a.prototype.selectedValues=function(){for(var a=[],b=0;b<this.selectors.length;b++){var c=this.selectors[b].element.value;a.push(c)}return a},a.name="OptionSelectors",a}(),Bizweb.SingleOptionSelector=function(a,b,c,d){this.multiSelector=a,this.values=d,this.index=b,this.name=c,this.element=document.createElement("select");for(var e=0;e<d.length;e++){var f=document.createElement("option");f.value=d[e],f.innerHTML=d[e],this.element.appendChild(f)}return this.element.setAttribute("class",this.multiSelector.selectorClass),this.element.setAttribute("data-option","option"+(b+1)),this.element.id=a.domIdPrefix+"-option-"+b,this.element.onchange=function(c,d){d=d||{},a.updateSelectors(b,d)},!0},Bizweb.Image={preload:function(a,b){for(var c=0;c<a.length;c++){var d=a[c];this.loadImage(this.getSizedImageUrl(d,b))}},loadImage:function(a){(new Image).src=a},switchImage:function(a,b,c){if(a&&b){var d=this.imageSize(b.src),e=this.getSizedImageUrl(a.src,d);c?c(e,a,b):b.src=e}},imageSize:function(a){var b=a.match(/thumb\/(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\//);return null!=b?b[1]:null},getSizedImageUrl:function(a,b){if(null==b)return a;if("master"==b)return this.removeProtocol(a);var c=a.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);if(null!=c){var d=Bizweb.mediaDomainName+"thumb/"+b+"/";return this.removeProtocol(a).replace(Bizweb.mediaDomainName,d).split("?")[0]}return null},removeProtocol:function(a){return a.replace(/http(s)?:/,"")}};
$(document).on('click', '.add_to_cart_detail', function(e) {	
	e.preventDefault();		
	$('#quickview').modal('hide');
	var $this = $(this);
	var form = $this.parents('form');	
	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		async: false,
		data: form.serialize(),
		dataType: 'json',
		error: addToCartFail,
		beforeSend: function() {  
		},
		success: addToCartSuccess,
		cache: false
	});
});
var GLOBAL = {
	common : {
		init: function(){
			$('.add_to_cart').bind( 'click', addToCart );
		}
	},
	templateIndex : {
		init: function(){
		}
	},
	templateProduct : {
		init: function(){
		}
	},
	templateCart : {
		init: function(){
		}
	}
}
var UTIL = {
	fire : function(func,funcname, args){
		var namespace = GLOBAL;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}
	},
	loadEvents : function(){
		var bodyId = document.body.id;
		UTIL.fire('common');
		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(classnm);
			UTIL.fire(classnm,bodyId);
		});
	}
};
$(document).ready(UTIL.loadEvents);
Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
		c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "." : t, 
		s = n < 0 ? "-" : "", 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function addToCart(e){
	if (typeof e !== 'undefined') e.preventDefault();
	var $this = $(this);
	var form = $this.parents('form');		
	$.ajax({
		type: 'POST',
		url: '/cart/add.js',
		async: false,
		data: form.serialize(),
		dataType: 'json',
		error: addToCartFail,
		beforeSend: function() {  
		},
		success: addToCartSuccess,
		cache: false
	});
}
function addToCartSuccess (jqXHR, textStatus, errorThrown){
	$.ajax({
		type: 'GET',
		url: '/cart.js',
		async: false,
		cache: false,
		dataType: 'json',
		success: function (cart){
			awe_hidePopup('.loading');
			Bizweb.updateCartFromForm(cart, '.top-cart-content .mini-products-list');
			Bizweb.updateCartPopupForm(cart, '#popup-cart-desktop .tbody-popup');
			Bizweb.updateCartPageForm(cart, '.cart_desktop_page .page_cart');
		}
	});
	var url_product = jqXHR['url'];
	var class_id = jqXHR['product_id'];
	var name = jqXHR['name'];
	var textDisplay = ('<i style="margin-right:5px; color:red; font-size:13px;" class="fa fa-check" aria-hidden="true"></i>Sáº£n pháº©m vá»«a thÃªm vÃ o giá» hÃ ng');
	var id = jqXHR['variant_id'];
	if( jqXHR['image'] != null){
		var src = Bizweb.resizeImage(jqXHR['image'], 'medium');
	}else{
		var src = "//bizweb.dktcdn.net/thumb/large/assets/themes_support/noimage.gif";
	}
	var dataList = $(".item-name a").map(function() {
		var plus = $(this).text();
		return plus;
	}).get();
	$('.title-popup-cart .cart-popup-name').html('<a href="'+ url_product +'"style="color:red;" title="'+name+'">'+ name + '</a> ');
	var nameid = dataList,
		found = $.inArray(name, nameid);
	var textfind = found;
	$(".item-info > p:contains("+id+")").html('<span class="add_sus" style="color:#898989;"><i style="margin-right:5px; color:red; font-size:13px;" class="fa fa-check" aria-hidden="true"></i>Sáº£n pháº©m vá»«a thÃªm!</span>');
	var windowW = $(window).width();
	if(windowW > 768){				
		$('#popup-cart').modal();
	}else{
		$('#myModal').html('');
		var $popupMobile = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">'
		+ '<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="position: relative; z-index: 9;"><span aria-hidden="true">Ã—</span></button>'
		+ '<h4 class="modal-title"><span><i class="fa fa-check" aria-hidden="true"></i></span>ThÃªm vÃ o giá» hÃ ng thÃ nh cÃ´ng</h4></div>'
		+ '<div class="modal-body"><div class="media"><div class="media-left"><div class="thumb-1x1">'
		+ '<img width="70px" src="'+ src +'" alt="'+ jqXHR['title'] +'"></div></div>'
		+ '<div class="media-body"><div class="product-title">'+ jqXHR['name'] +'</div>'
		+ '<div class="product-new-price"><span>' + (jqXHR['price']).formatMoney(0) + ' Ä‘</span></div></div></div>'
		+ '<button class="btn btn-block btn-outline-red" data-dismiss="modal">Tiáº¿p tá»¥c mua hÃ ng</button>'
		+ '<a href="/checkout" class="btn btn-block btn-red">Tiáº¿n hÃ nh thanh toÃ¡n Â»</a></div></div></div>';
		$('#myModal').html($popupMobile);
		$('#myModal').modal();
		clearTimeout($('#myModal').data('hideInterval'));
	}
}
function addToCartFail(jqXHR, textStatus, errorThrown){
	var response = $.parseJSON(jqXHR.responseText);
	var $info = '<div class="error">'+ response.description +'</div>';
}
$(document).on('click', ".remove-item-cart", function () {
	var variantId = $(this).attr('data-id');
	removeItemCart(variantId);
});
$(document).on('click', ".items-count", function () {
	$(this).parent().children('.items-count').prop('disabled', true);
	var thisBtn = $(this);
	var variantId = $(this).parent().find('.variantID').val();
	var qty =  $(this).parent().children('.number-sidebar').val();
	updateQuantity(qty, variantId);
});
$(document).on('change', ".number-sidebar", function () {
	var variantId = $(this).parent().children('.variantID').val();
	var qty =  $(this).val();
	updateQuantity(qty, variantId);
});
function updateQuantity (qty, variantId){
	var variantIdUpdate = variantId;
	$.ajax({
		type: "POST",
		url: "/cart/change.js",
		data: {"quantity": qty, "variantId": variantId},
		dataType: "json",
		success: function (cart, variantId) {
			Bizweb.onCartUpdateClick(cart, variantIdUpdate);
		},
		error: function (qty, variantId) {
			Bizweb.onError(qty, variantId)
		}
	})
}
function removeItemCart (variantId){
	var variantIdRemove = variantId;
	$.ajax({
		type: "POST",
		url: "/cart/change.js",
		data: {"quantity": 0, "variantId": variantId},
		dataType: "json",
		success: function (cart, variantId) {
			Bizweb.onCartRemoveClick(cart, variantIdRemove);
			$('.productid-'+variantIdRemove).remove();
			if($('.tbody-popup>div').length == '0' ){
				$('#popup-cart').modal('hide');
			}
			if($('.list-item-cart>li').length == '0' ){
				$('.mini-products-list').html('<div class="no-item"><p>KhÃ´ng cÃ³ sáº£n pháº©m nÃ o trong giá» hÃ ng.</p></div>');
			}
			if($('.cart_page_mobile>div').length == '0' ){
				$('.cart_page_mobile').remove();
				$('.header-cart-price').remove();
				$('.header-cart').remove();
				jQuery('<div class="cart-empty">'
					   + '<img src="//bizweb.dktcdn.net/100/325/189/themes/675912/assets/empty-cart.png?1533693226542" class="img-responsive center-block" alt="Giá» hÃ ng trá»‘ng" />'
					   + '<div class="btn-cart-empty">'
					   + '<a class="btn btn-default" href="/" title="Tiáº¿p tá»¥c mua sáº¯m">Tiáº¿p tá»¥c mua sáº¯m</a>'
					   + '</div>'
					   + '</div>').appendTo('.header-cart-content');
			}
			if($('.cart-tbody>div').length == '0' ){
				$('.bg-cart-page').remove();
				$('.bg-cart-page-mobile').remove();
				jQuery('<div class="bg-cart-page" style="min-height: auto"><p>KhÃ´ng cÃ³ sáº£n pháº©m nÃ o trong giá» hÃ ng. Quay láº¡i <a href="/">cá»­a hÃ ng</a> Ä‘á»ƒ tiáº¿p tá»¥c mua sáº¯m.</p></div>').appendTo('.cart');
			}
			if($('.cart-tbody>div').length == '0' ){
				$('.bg-cart-page').remove();
				$('.bg-cart-page-mobile').remove();
				$('.cart_des_page').remove();
				jQuery('<div class="cart-empty">'
					   + '<img src="//bizweb.dktcdn.net/100/325/189/themes/675912/assets/empty-cart.png?1533693226542" class="img-responsive center-block" alt="Giá» hÃ ng trá»‘ng" />'
					   + '<div class="btn-cart-empty">'
					   + '<a class="btn btn-default" href="/" title="Tiáº¿p tá»¥c mua sáº¯ms">Tiáº¿p tá»¥c lá»±a chá»n</a>'
					   + '</div>'
					   + '</div>').appendTo('.cart_desktop_page');
			}
		},
		error: function (variantId, r) {
			Bizweb.onError(variantId, r)
		}
	})
}