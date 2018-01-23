//   轮播图片
$(function () {
	// $('.dot').css({
	// 	'text-indent': '-99999px'
	// })
	var  mar = 0;
	function showImageFn () {
		if (mar == -4800) {
			// $('.container div:eq(0)').insertAfter($('.container div:eq(1)'));
			mar = 0;
		}
		if (mar == 0) {
			$('.dot span:eq(0)').attr('class', 'dot2').siblings().attr('class', 'dot1'); 
		}if (mar == -1200) {
			$('.dot span:eq(1)').attr('class', 'dot2').siblings().attr('class', 'dot1');
		}if (mar == -2400) {
			$('.dot span:eq(2)').attr('class', 'dot2').siblings().attr('class', 'dot1');
		}if (mar == -3600) {
			$('.dot span:eq(3)').attr('class', 'dot2').siblings().attr('class', 'dot1');
		}
		$('.container').animate({'margin-left': mar + 'px'},300);
		mar -= 1200;
	}
	var showImage = setInterval(showImageFn, 1000);

	$('.dot').on('click', 'span', function () {
		$(this).attr('class', 'dot2').siblings().attr('class', 'dot1'); 
		// console.log('111');
		mar = parseInt($(this).text());
		// console.log(mar);
		$('.container').animate({'margin-left': mar + 'px'},300);		
	});

	$('.container').hover(function () {
		clearInterval(showImage);
	}, function () {
		showImage = setInterval(showImageFn, 1000);
	})
});

$(function () {
	$.ajax({
		url: 'http://127.0.0.1:8888/getHotList',
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function (data) {
//			console.log(data);
			var str = '';
			for (let phoneObj of data.result) {
//				console.log(phoneObj);	
				str += `<li>
					<a href="#">
					<img src="${phoneObj.img_url}" alt="" />
					<p>${phoneObj.model_alis}</p>
					</a>
					</li>`
			}
			$('#recycle_ul').append(str);
			
		}
	});
});

$(function () {
	$.ajax({
		url: 'http://127.0.0.1:8888/bestChoice',
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function (data) {
//			console.log(data);
			var str = '';
			for (let phoneObj of data.result) {
//				console.log(phoneObj);	
				str += `<li>
					<a href="#">
					<img src="${phoneObj.thum_img.big}" alt="" />
					<p>${phoneObj.model_name}</p>
					<p>￥${phoneObj.price}</p>
					</a>
					</li>`
			}
			$('#best_ul').append(str);
			
		}
	})
})




$(function () {
	$.ajax({
		url: 'http://127.0.0.1:8888/getFaultGroup',
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function (data) {
//			console.log(data);
			var str = '';
			str += `<div class='repair_details'><table width='800'>`;
			for (let problemObj of data.result) {
//				console.log(problemObj)
				str += `<tr><td class='first_td'>${problemObj.name}></td><td >`;
				for (let listObj of problemObj.list) {
//					console.log(listObj.name);
					str +=`<a href='#'><span>${listObj.name}</span></a>`;
				}
				str += `</td></tr>`;
			}
			str += `</table></div>`;
//			$('#repair_phone').append(str);
//			console.log(str);
			$div = $(str)
			$div.appendTo($('#repair_phone'));
			
			$div.css({
				'position': 'absolute',
				'top': '0px',
				'left': '235px',
//				'width': '0',
//				'overflow': 'hidden'
				'display': 'none'
				
			});
			$('.repair_details tr').css({
				'height': '47px',
				'line-height': '14px'
			});
			$('.repair_details span').css({
				'padding': '0 11px',
				'display': 'inline-block',
				'border-left': '1px solid #efefef',
				'font-size': '12px'
			});
			$('.repair_details table').css({
				'background': '#f7f7f7',
				'border': '1px solid #4a6e62',
				'padding': '10px',
				'padding-bottom': 0,
				'width':'700px'
			});
			$('.repair_details tr td:first-child').css({
				'text-align': 'right',	
				'padding-right': '10px'
			});
			$('.repair_details tr td:nth-child(2)').css({
				'border-bottom': '1px solid #efefef'
			});
		}
	})
	$('#repair_phone').hover(function () {
		$('#repair_phone').attr('class', 'repair_li2');
		$('#repair_phone .arrow1').css({
			'display': 'block',
			'top': '35px',
			'left':' 216px',
			"z-index": '999'
		})
//		$('.repair_details').css({
//			'width': '700px'
//		})
		$('.repair_details').css({
			'display': 'block'
		})
		
	}, function () {
		$('#repair_phone').attr('class', 'repair_li');
		
		$('#repair_phone .arrow1').css({
			'display': 'none'
		});
//		$('.repair_details').stop().animate({
//			'width': '0'
//		},1000)
		$('.repair_details').css({
			'display': 'none'
		})
	});
})

$(function () {
	$.ajax({
		url: 'http://127.0.0.1:8888/getcomputerQuestion',
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function (data) {
			var str = '';
			str += `<table class='pc_details'><tr><td>热门问题:</td><td>`;
			for (let hotObj of data.result.hot) {
				str+= `<span><a href=''>${hotObj.name}</a></span>`;
			}
			str += `</td></tr><tr><td>其他问题:</td><td>`;
			for (let otherObj of data.result.other) {
				str+= `<span><a href=''>${otherObj.name}</a></span>`;
			}
			str += `</td></tr></table>`;
			$table = $(str);
			$table.appendTo($('#repair_pc'));
			
			$table.css({
				'position': 'absolute',
				'width': '700px',
				'top': '0px',
				'left': '235px',
				'background': '#f7f7f7',
				'border': '1px solid #4a6e62',
				'height': '340px',
				'display':'none'
			});
			$('#repair_pc td span').css({
				'display': 'inline-block',
				'width': '118px',
				'height': '42px',
				'border': '1px solid #4a6e62',
				'line-height': '42px',
				'margin': '10px 12px',
				'text-align': 'center',
				'float': 'left'
			});
			$('#repair_pc td a').css({
				'display': 'inline-block',
				'width': '118px',
				'height': '42px'
			});
			$('#repair_pc tr td:eq(0)').css({
			'width': '95px',
			'text-align': 'right',
			'vertical-align': 'top',
			'line-height': '70px'
			
			});
			$('#repair_pc tr td:eq(2)').css({
			'text-align': 'right',
			'vertical-align': 'top',
			'width': '95px',
			'line-height': '70px'
			})
		}
	});
	
	$('#repair_pc').hover(function () {
		$('#repair_pc').attr('class', 'pc_li2');
		$('#repair_pc .arrow1').css({
			'display': 'block',
			'top': '120px',
			'left':' 216px',
			"z-index": '999'
		})
		$('.pc_details').show();
		
		
		
	},function () {
		$('#repair_pc').attr('class', 'pc_li');
		$('.pc_details').hide();
		$('#repair_pc .arrow1').css({
			'display': 'none'
		})
	});
});

$(function () {
	$.ajax({
		url: 'http://127.0.0.1:8888/getPinpaiPhoneList',
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function (data) {
			// console.log(data);
			var str = `<div class='sell_details'>`;
			for (let phoneObj of data.result) {
				// console.log(phoneObj.name);	
				str += `<a href='#'><span>${phoneObj.name}</span></a>`;
			}
			str += `</div>`;
			$('#sell_phone').append(str);
		}
	});

	$('#sell_phone').hover(function () {
		$('.sell_details').show();
		$('#sell_phone').attr('class', 'sell_li2');
		$('#sell_phone .arrow1').css({
			'display': 'block',
			'top': '205px',
			'left':' 216px',
			"z-index": '999'
		});
	}, function () {
		$('.sell_details').hide();	
		$('#sell_phone').attr('class', 'sell_li');
		$('#sell_phone .arrow1').css({
			'display': 'none',
		});
	});
});


$(function () {
	$.ajax({
		url: 'http://127.0.0.1:8888/HotPinpai',
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function (data) {
			// console.log(data);
			let $div = $(`<div class='buy_details'></div>`);
			$("#buy_phone").append($div);
			for (let prop in data.result) {
				// console.log(data.result[prop]);
				$div.append($( `<a href="#"><span>${data.result[prop]}</span></a>`))
			}
		}
	});

	$('#buy_phone').hover(function () {
		$('.buy_details').show();
		$('#buy_phone').attr('class', 'buy_li2');
		$('#buy_phone .arrow1').css({
			'display': 'block',
			'top': '290px',
			'left':' 216px',
			"z-index": '999'
		});
	}, function () {
		$('.buy_details').hide();	
		$('#buy_phone').attr('class', 'buy_li');
		$('#buy_phone .arrow1').css({
			'display': 'none',
		});
	});

});





//  渲染地区选框
$(function () {
	$.ajax({
		url: 'http://127.0.0.1:8888/getcitycode',
		type: 'get',
		cache: false,
		dataType: 'json',
		success: function (data) {
		// console.log(data);
			for (let hotcityObj of data.result.hotcity) {
				// console.log(hotcityObj.name);
				$('.hotCityTd').append($(`<a href='javascript:;'><span class='district_name'>${hotcityObj.name}</span></a>`));				
			};
			let citylistObj = data.result.citylist;
			for (let citylistProp in citylistObj) {
				// console.log(cityObj.name)
				$('.allCityTd p:even').append($(`<span><a href='javascript:;'>${citylistProp}</a></span>`));
				if (citylistProp == 'A') {
					let citylistArr = citylistObj[citylistProp];
					for ( let cityObj of citylistArr) {
						//  console.log(cityObj.name);
						 $('.allCityTd p:odd').append($(`<a href='javascript:;'><span class='district_name'>${cityObj.name}</span></a>`));
					 }
				}
				
			}
			$('.allCityTd p:even').delegate('span', 'click', function () {
				$('.allCityTd p:odd').text('');
				// console.log($(this).text());
				for (let citylistProp in citylistObj) {
					if ($(this).text() == citylistProp ) {
						let citylistArr = citylistObj[citylistProp];
						for ( let cityObj of citylistArr) {
						 	// console.log(cityObj.name);
						 	$('.allCityTd p:odd').append($(`<a href='javascript:;'><span class='district_name'>${cityObj.name}</span></a>`));
						 }
					}
				}
				$(this).siblings().attr({
					'class':'Pinyin2'
				});
				$(this).attr({
					'class':'Pinyin1'
				});
			});
		}
	});
	$('.chooseCity_top').click(function () {
		$("#top_district").css({
			'display': 'block'
		});	
	});
	$('#closeMap_top').click(function () {
		$("#top_district").css({
			'display': 'none'
		});	
		// console.log('2')
	});
	$('#closeMap_shop').click(function () {
		$("#shop_district").css({
			'display': 'none'
		});	
		// console.log('2')
	});
	$('#province').click(function () {
		$("#shop_district").show();
		$("#shop_county").hide();
	});	
});






// 初始化下拉选框及shops页面
$(function () {
	//ajax初始化页面
	shopAjaxFn('北京', '选择区县', 1, 5, $('.checked').data('req'),'');
	drawGoodShopAjaxFn($('#province').text(), $('#county').text(), 1, 7, 'comments', '');
	
	$.ajax({
		url: 'http://127.0.0.1:8888/city_data',
		type: 'get',
		dataType: 'json',
		cache: false,
		data:{'cityname': '北京'},
		success (data) {
			// console.log(data);
			var str = '<span>全部区县</span>';
			for (let cityObj of data.cityArr) {
				for (let xianObj of cityObj.regionlist) {
					str += `<span>${xianObj.name}</span>`
				}	
			}
			$('#shop_county div').append(str);
			
		}
	});
	$('#close_county').click(function () {
		$('#shop_county').hide();
	});
	$('#county').click(function () {
		$('#shop_county').show();
		$("#shop_district").hide();
	});

//选择城市促发ajax
	$('#shop_county').on('click', 'span', function () {
		if ($(this).text() == '全部区县') {
			$('#county').text('选择区县');			
			shopAjaxFn($('#province').text(), $('#county').text(), 1, 5, $('.checked').data('req'), '');
		} else if ($(this).text() != $('#county').text()) {
			$('#county').text($(this).text());
			shopAjaxFn($('#province').text(), $('#county').text(), 1, 5, $('.checked').data('req'),'' );
		}
		$("#shop_county").hide();
	});	





	//给下面的省级选框添加事件,及ajax请求数据
	$('#shop_district').on('click', '.district_name', function () {
		// console.log($('#county').text());
		var that = this;
		drawCountyList (that);
		$("#shop_district").hide();	
	});




// 顶部点击事件
	$('#top_district').on('click', '.district_name', function () {
		if ($(this).text() != $('#top_city').text()) {
			$('#top_city').text($(this).text());
			$('#province').text($(this).text());
		};
		$("#top_district").hide();
		if ($(that).text() != $('#province').text() || $('#county').text() != '选择区县') {
			var that = this;
			drawCountyList(that);
		};
	});

	// 封装渲染二级城市列表的ajax请求
	function drawCountyList (that) {
		// if ($(that).text() != $('#province').text() || $('#county').text() != '选择区县') {
		$('#province').text($(that).text());
		$('#county').text('选择区县');
		$('#shop_county div').empty();
		$.ajax({
			url: 'http://127.0.0.1:8888/city_data',
			type: 'get',
			dataType: 'json',
			cache: false,
			data: {
				'cityname':$(that).text() 
			},
			success (data) {
				var str = '<span>全部区县</span>';
				for (let cityObj of data.cityArr) {
					for (let xianObj of cityObj.regionlist) {
						str += `<span>${xianObj.name}</span>`
					}	
				}
				$('#shop_county div').append(str);					
			}
		});
		shopAjaxFn($(that).text(), $('#county').text(), 1, 5, $('.checked').data('req'), '');
		drawGoodShopAjaxFn($(that).text(), $('#county').text(), 1, 7, 'comments', '');
		// }
	}

//二级筛选过滤

	$('#default').data('req', 'level');
	$('#deals').data('req', 'order_count');
	$('#visits').data('req', 'shop_visit');

	
	$('#default').click(function () {
		if(!$(this).hasClass('checked')){
			shopAjaxFn($('#province').text(), $('#county').text(), 1, 5, $(this).data('req'), '');
		};

		$(this).attr('class', 'checked');
		$(this).siblings('span:lt(2)').attr('class', '').css('border-left', '');
	});

	$('#deals').click(function () {
		if(!$(this).hasClass('checked')){
			shopAjaxFn($('#province').text(), $('#county').text(), 1, 5, $(this).data('req'), '');
		};

		$(this).attr('class', 'checked');
		$(this).siblings('span:lt(2)').attr('class', '').css('border-left', '');
		$(this).css('border-left', '1px solid #d6d6d6');
	});

	$('#visits').click(function () {
		if(!$(this).hasClass('checked')){
			shopAjaxFn($('#province').text(), $('#county').text(), 1, 5, $(this).data('req'), '');
		};
		$(this).attr('class', 'checked');
		$(this).siblings('span:lt(2)').attr('class', '').css('border-left', '');
		$(this).css('border-left', '1px solid #d6d6d6');
	})	






	//----------------------------------------------分页-----------------------------------------------------------
	function pageEvent (totalPageNo) {
		if ( totalPageNo < 10) {
			$('.next_page').click(function () {
				var number = parseInt($('.pageNumColor').text());				
				$(`.pageNum:eq(${number})`).addClass('pageNumColor').siblings().removeClass('pageNumColor');
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5, $('.checked').data('req'), '');			
				$(document).scrollTop(1400);
			});	
			$('.pre_page').click(function () {
				var number = parseInt($('.pageNumColor').text());				
				$(`.pageNum:eq(${number - 2})`).addClass('pageNumColor').siblings().removeClass('pageNumColor');
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5, $('.checked').data('req'), '');			
				$(document).scrollTop(1400);
			});	
			$('.pageNum').click(function () {
				// console.log($(this));	
				$(this).addClass('pageNumColor').siblings().removeClass('pageNumColor');
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5, $('.checked').data('req'), '');			
				$(document).scrollTop(1400);
			});
		} else {

			$('.next_page').click(function () {
				$(document).scrollTop(1400);
				var number = parseInt($('.pageNumColor').text());
				if (number < 5) {
					$(`.pageNum:eq(${number})`).addClass('pageNumColor').siblings().removeClass('pageNumColor');
				} else if(number >= totalPageNo - 5) {
					$(`.pageNum:eq(${10 - totalPageNo + number })`).addClass('pageNumColor').siblings().removeClass('pageNumColor');
				} else {
					for (var i = 0; i <=  9; i++ ) {
						$(`.pageNum:eq(${i})`).text(number -3 + i);
					}
				};
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5, $('.checked').data('req'), '');			
			});	
			$('.last_page').click(function () {
				var number = parseInt($(this).text());
				$('.pageNum:last').addClass('pageNumColor').siblings().removeClass('pageNumColor');
				for (var i = 0; i <=  9; i++ ) {
					$(`.pageNum:eq(${i})`).text(totalPageNo - 9 + i);
				};
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5, $('.checked').data('req'), '');			
				$(document).scrollTop(1400);
			});


			$('.pre_page').click(function () {
				var number = parseInt($('.pageNumColor').text());
				if (number == 1) {
					return;
				}
				if (number <= 5) {
					console.log('1');
					$(`.pageNum:eq(${number - 2})`).addClass('pageNumColor').siblings().removeClass('pageNumColor');
				} else if(number <= totalPageNo - 5) {
					for (var i = 0; i <=  9; i++ ) {
						$(`.pageNum:eq(${i})`).text(number -5 + i);
					}
				} else {
					$('.pageNumColor').prev('.pageNum').addClass('pageNumColor').siblings().removeClass('pageNumColor');
				};
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5, $('.checked').data('req'), '');			
				$(document).scrollTop(1400);
			});	
			$('.first_page').click(function () {
				var number = parseInt($(this).text());
				$('.pageNum:first').addClass('pageNumColor').siblings().removeClass('pageNumColor');
				for (var i = 0; i <=  9; i++ ) {
					$(`.pageNum:eq(${i})`).text(i + 1);
				}
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5,$('.checked').data('req'), '');			
				$(document).scrollTop(1400);
			});	
			$('.pageNum').click(function () {
				var number = parseInt($(this).text());
				if (number <= 5) {
					$(`.pageNum:eq(${number-1})`).addClass('pageNumColor').siblings().removeClass('pageNumColor');
					for (var i = 0; i <=  9; i++ ) {
						$(`.pageNum:eq(${i})`).text(1 + i);
					}
				} else {
					if (number + 5 > totalPageNo) {
						$(this).addClass('pageNumColor').siblings().removeClass('pageNumColor');
						for (var i = 0; i <= 9; i++ ) {
							$(`.pageNum:eq(${i})`).text(i + totalPageNo - 9);
						}
					} else {
						$('.pageNum:eq(4)').addClass('pageNumColor').siblings().removeClass('pageNumColor');
						for (var i = 0; i <=  9; i++ ) {
							$(`.pageNum:eq(${i})`).text(number -4 + i);
						}
					}
				}
				showFn(totalPageNo);
				pageAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColor').text(), 5, $('.checked').data('req'), '');			
				$(document).scrollTop(1400);
			});
		}
		
	}
	//渲染页脚
	function pageFn(totalPageNo, pageNum) {
		$('#pages').empty();
		var str = ``;
		// var pageNow = 1;
		if (totalPageNo >= 10) {
			str = `<span class="first_page" onselectstart="return false">首页</span>
			<span class="pre_page" onselectstart="return false"><<上一页</span>`
			for (var i = 0; i <10; i++) {
				str += `<span class="pageNum" onselectstart="return false">${i+1}</span>`;
			}
			str += `<span class="next_page" onselectstart="return false">下一页>></span>
			<span class="last_page" onselectstart="return false">尾页</span>`;
		} else {
			str += `<span class="pre_page" onselectstart="return false"><<上一页</span>`;
			for (var i = 0; i < totalPageNo; i++) {
				str += `<span class="pageNum" onselectstart="return false">${i+1}</span>`;
			}
			str += `<span class="next_page" onselectstart="return false">下一页>></span>`;
		}
		$('#pages').append(str);
		$(`.pageNum:eq(0)`).addClass('pageNumColor');
		pageEvent(totalPageNo);
		showFn(totalPageNo);

	}


	function showFn(totalPageNo) {
		var number = parseInt($('.pageNumColor').text());
		if (totalPageNo == 0) {
			$('.next_page').text('暂无店铺');
			$('.pre_page').css({
				'display': 'none'
			});
		};
		
		if (number == 1) {
			console.log('2');
			$('.first_page').css({
				'display': 'none'
			});
			$('.last_page').css({
				'display': 'none'
			});
			$('.pre_page').css({
				'display': 'none'
			});
			$('.last_page').css({
				'display': 'none'
			});
			$('.next_page').css({
				'display': 'inline-block'
			});

		};
		if (number > 1) {
			$('.pre_page').css({
				'display': 'inline-block'
			});

		};
		if (number > 5) {
			$('.first_page').css({
				'display': 'inline-block'
			});
		} else {
			$('.first_page').css({
				'display': 'none'
			});
		}
		if (number > 10) {
			$('.last_page').css({
				'display': 'inline-block'
			});
		};
		if (number == totalPageNo) {
			$('.last_page').css({
				'display': 'none'
			});
			$('.next_page').css({
				'display': 'none'
			});
		} else {
			$('.next_page').css({
				'display': 'inline-block'
			});
		}
	}

	// pageFn(100);

		
//---------------------------------------------ajax 封装----------------------------------------------

	function shopAjaxFn(province, county, pageNum, pageSize, orderBy, compensate) {
		$.ajax({
			url:'http://127.0.0.1:8888/shop_data',
			type: 'get',
			dataType: 'json',
			cache: false,
			data: {
				province,
				county,
				pageNum,
				pageSize,
				orderBy,
				compensate
			},
			success (data) {
				// console.log(data);
				drawShops(data, orderBy);
				var totalNum = Math.ceil(data.total_count/5);
				pageFn(totalNum, pageNum);	
			}
		}); 
	};	

	
	function pageAjaxFn(province, county, pageNum, pageSize, orderBy, compensate) {
		$.ajax({
			url:'http://127.0.0.1:8888/shop_data',
			type: 'get',
			dataType: 'json',
			cache: false,
			data: {
				province,
				county,
				pageNum,
				pageSize,
				orderBy,
				compensate
			},
			success (data) {
				drawShops(data, orderBy);
				
			}
		}); 
	};
	

	function drawShops(data, orderBy) {
		$('#shop_display').empty();
		var str = '';
		for (let shopObj of data.dataList) {
			str += `<div class="everyShop clearfixed">
			<img src=" ${shopObj.shop_ico}" alt="">
			<div class="mid">
				<p><span>${shopObj.shop_name}</span> 店铺等级 : <em>${cearteLevel(shopObj.level)}</em></p>
				<p><a href="">主营 : ${shopObj.main}</a></p>
				<p><a href="">地址 : ${shopObj.addr}</a></p>
			</div>
			<div class="right">
				<p>先行赔付</p>
				<p>同城帮认证</p>`
				if (orderBy == 'shop_visit') {
					str +=`<p>人气 : <span>${shopObj.shop_visit}</span>次浏览</p>
					</div>
					<div class="enter">进入店铺</div>
				</div>`
				} else {
					str +=`<p>销量 : <span>${shopObj.order_count}</span>次浏览</p>
					</div>
					<div class="enter">进入店铺</div>
				</div>`
				}	
		}
		$('#shop_display').append(str);	

		function cearteLevel (level) {
			var str = ``;
			if (level <= 4) {
				for (let i = 0 ; i < level; i ++) {
					str += `<span class='hotHeart' title ='${level}级'></span>`;
				}
				return str;
			} else if (level <= 8) {
				var number = Math.ceil(level / 4);
				for (let i = 0 ; i < number; i ++) {
					str += `<span class='diamond' title ='${level}级'></span>`;
				}
				return str;
			} else if ( level <=  16){
				var number = Math.ceil(level / 8);
				for (let i = 0 ; i < number; i ++) {
					str += `<span class='blueCrown' title ='${level}级'></span>`;
				}
				return str;
			}
			else {
				var number = Math.ceil(level / 16);
				for (let i = 0 ; i < number; i ++) {
					str += `<span class='yellowCrown' title ='${level}级'></span>`;
				}
				return str;
			}
		}
	}
	
//封装动态渲染good-shop页面的函数
	function drawGoodShop(data) {
		$('.good_shop').remove();
		var str = ``;
		var index = 1;
		for (let shopObj of data.dataList) {
			 str += `<div class= "good_shop">
			 <div class="index">${index}</div>
			 <div class="shop_img"><a href=""><img src="${shopObj.shop_ico}" alt=""></a></div>
			 <div class="right">	
				 <p><a href="">${shopObj.shop_name}</a></p>
				 <p>${shopObj.comments}条评论</p>
			 </div>
		 </div>`
			index++;
		}
		$('.shops .right_shop').append(str);
		$('.shops .right_shop .good_shop .index:gt(2)').css({
			'color': '#666666',
			'border': '1px solid #666666'
		});
	};
	function drawGoodShopAjaxFn(province, county, pageNum, pageSize, orderBy, compensate) {
		$.ajax({
			url:'http://127.0.0.1:8888/shop_data',
			type: 'get',
			dataType: 'json',
			cache: false,
			data: {
				province,
				county,
				pageNum,
				pageSize,
				orderBy,
				compensate
			},
			success (data) {
				drawGoodShop(data);
			}
		}); 
	};








	// ---------------------------------地图模式------------------------------------
	$('.choose .map').click(function () {
		console.log($('.pageNumColorM').text());
		drawMapAjaxFn($('#province').text(), $('#county').text(), 1, 5, $('.checked').data('req'), '');
		$('.brown').show();
		$('.gaodeMap').show();
	});
	$('.gaodeMap p i').click(function () {
		$('.brown').hide();
		$('.gaodeMap').hide();
	})



	function mapPageFn(totalPageNo, pageNum) {
		$('#mapPages').empty();
		var str = ``;
		// var pageNow = 1;
		if (totalPageNo >= 10) {
			str = `<span class="first_pageM" onselectstart="return false">首页</span>
			<span class="pre_pageM" onselectstart="return false"><<上一页</span>`
			for (var i = 0; i <10; i++) {
				str += `<span class="pageNumM" onselectstart="return false">${i+1}</span>`;
			}
			str += `<span class="next_pageM" onselectstart="return false">下一页>></span>
			<span class="last_pageM" onselectstart="return false">尾页</span>`;
		} else {
			str += `<span class="pre_pageM" onselectstart="return false"><<上一页</span>`;
			for (var i = 0; i < totalPageNo; i++) {
				str += `<span class="pageNumM" onselectstart="return false">${i+1}</span>`;
			}
			str += `<span class="next_pageM" onselectstart="return false">下一页>></span>`;
		}
		$('#mapPages').append(str);
		$(`.pageNumM:eq(0)`).addClass('pageNumColorM');
		mapPageEvent(totalPageNo);
		showFnM(totalPageNo);
	};
	var flag = false;
	function drawMapAjaxFn(province, county, pageNum, pageSize, orderBy, compensate) {
		$.ajax({
			url:'http://127.0.0.1:8888/shop_data',
			type: 'get',
			dataType: 'json',
			cache: false,
			data: {
				province,
				county,
				pageNum,
				pageSize,
				orderBy,
				compensate
			},
			success (data) {
				
				if (!flag) {
					var totalNum = Math.ceil(data.total_count/5);
					mapPageFn(totalNum, pageNum);
					flag = true;
				}
				
				var proArr = []
				if (province == '北京') {
					proArr =  [116.480983, 39.989628];
				} else {
					proArr =  [114.06667,22.61667];
				}
				var map = new AMap.Map('container',{
					zoom: 10,
					center: proArr
				});


				for (let shopObj of data.dataList) {
					var marker = new AMap.Marker({
						position: [shopObj.map_longitude, shopObj.map_latitude],
						zIndex: 101,
						map: map
					});	
						// openInfo();
					marker.on('click',function () {
						openInfo(shopObj)
					});
				}
				function openInfo(shopObj) {
				//构建信息窗体中显示的内容
					console.log('d')
					var info = [];
					info.push("<div><div><img class='shop_ico' style=\"float:left;\" src=\" " + shopObj.shop_ico + "\"/></div> ");
					info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>" + shopObj.shop_name +  "</b>");
					info.push("电话 : " + shopObj.mobile + "   邮编 : 100102");
					info.push("地址 :" + shopObj.addr + "</div>");
					infoWindow = new AMap.InfoWindow({
						content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
					});
					infoWindow.open(map, [shopObj.map_longitude, parseFloat(shopObj.map_latitude) + 0.03]);
				}
			}
		}); 
	};

	function mapPageEvent (totalPageNo) {
		if ( totalPageNo < 10) {
			$('.next_pageM').click(function () {
				var number = parseInt($('.pageNumColorM').text());				
				$(`.pageNumM:eq(${number})`).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				showFnM(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5, $('.checked').data('req'), '');			
			});	
			$('.pre_pageM').click(function () {
				var number = parseInt($('.pageNumColorM').text());				
				$(`.pageNumM:eq(${number - 2})`).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				showFnM(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5, $('.checked').data('req'), '');			
			});	
			$('.pageNumM').click(function () {
				// console.log($(this));	
				$(this).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				showFnM(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5, $('.checked').data('req'), '');			
			});
		} else {

			$('.next_pageM').click(function () {
				var number = parseInt($('.pageNumColorM').text());
				if (number < 5) {
					$(`.pageNumM:eq(${number})`).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				} else if(number >= totalPageNo - 5) {
					$(`.pageNumM:eq(${10 - totalPageNo + number })`).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				} else {
					for (var i = 0; i <=  9; i++ ) {
						$(`.pageNumM:eq(${i})`).text(number -3 + i);
					}
				};
				showFnM(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5, $('.checked').data('req'), '');			
			});	
			$('.last_pageM').click(function () {
				var number = parseInt($(this).text());
				$('.pageNumM:last').addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				for (var i = 0; i <=  9; i++ ) {
					$(`.pageNumM:eq(${i})`).text(totalPageNo - 9 + i);
				};
				showFnM(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5, $('.checked').data('req'), '');			
			});
			$('.pre_pageM').click(function () {
				var number = parseInt($('.pageNumColorM').text());
				if (number == 1) {
					return;
				}
				if (number <= 5) {
					console.log('1');
					$(`.pageNumM:eq(${number - 2})`).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				} else if(number <= totalPageNo - 5) {
					for (var i = 0; i <=  9; i++ ) {
						$(`.pageNumM:eq(${i})`).text(number -5 + i);
					}
				} else {
					$('.pageNumColorM').prev('.pageNumM').addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				};
				showFnM(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5, $('.checked').data('req'), '');			
			});	
			$('.first_pageM').click(function () {
				console.log('23')
				var number = parseInt($(this).text());
				$('.pageNumM:first').addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
				for (var i = 0; i <=  9; i++ ) {
					$(`.pageNumM:eq(${i})`).text(i + 1);
				}
				showFnM(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5,$('.checked').data('req'), '');			
			});	
			$('.pageNumM').click(function () {
				var number = parseInt($(this).text());
				if (number <= 5) {
					$(`.pageNumM:eq(${number-1})`).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
					for (var i = 0; i <=  9; i++ ) {
						$(`.pageNumM:eq(${i})`).text(1 + i);
					}
				} else {
					if (number + 5 > totalPageNo) {
						$(this).addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
						for (var i = 0; i <= 9; i++ ) {
							$(`.pageNumM:eq(${i})`).text(i + totalPageNo - 9);
						}
					} else {
						$('.pageNumM:eq(4)').addClass('pageNumColorM').siblings().removeClass('pageNumColorM');
						for (var i = 0; i <=  9; i++ ) {
							$(`.pageNumM:eq(${i})`).text(number -4 + i);
						}
					}
				}
				showFn(totalPageNo);
				drawMapAjaxFn($('#province').text(), $('#county').text(), $('.pageNumColorM').text(), 5, $('.checked').data('req'), '');			
			});
		}
	}


	function showFnM(totalPageNo) {
		var number = parseInt($('.pageNumColorM').text());
		if (totalPageNo == 0) {
			$('.next_pageM').text('暂无店铺');
			$('.pre_pageM').css({
				'display': 'none'
			});
		};
		
		if (number == 1) {
			$('.first_pageM').css({
				'display': 'none'
			});
			$('.last_pageM').css({
				'display': 'none'
			});
			$('.pre_pageM').css({
				'display': 'none'
			});
			$('.last_pageM').css({
				'display': 'none'
			});
			$('.next_pageM').css({
				'display': 'inline-block'
			});

		};
		if (number > 1) {
			$('.pre_pageM').css({
				'display': 'inline-block'
			});

		};
		if (number > 5) {
			$('.first_pageM').css({
				'display': 'inline-block'
			});
		} else {
			$('.first_pageM').css({
				'display': 'none'
			});
		}
		if (number > 10) {
			$('.last_pageM').css({
				'display': 'inline-block'
			});
		};
		if (number == totalPageNo) {
			$('.last_pageM').css({
				'display': 'none'
			});
			$('.next_pageM').css({
				'display': 'none'
			});
		} else {
			$('.next_pageM').css({
				'display': 'inline-block'
			});
		}
	}


















});
//  封装好评榜ajax请求



