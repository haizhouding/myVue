//封装自定义touch事件库
//注意：这里前面有一个分号，是为了防止引用其他库的时候，那个库没有分号结尾
//以后代码压缩的话容易出问题。
;(function (window, undefined) {
	// var query = function (selector) {
	// 	return query.fn.init(selector);
	// }
	function query (selector) {
		return query.fn.init(selector);	
	};
	
	query.fn = query.prototype = {
		/*
		 * 初始化方法（就是模拟获取元素的方法，但这里获取的不是真正的元素，
		 * 真正的元素存在于整个对象的element属性中
		 */
		init : function (selector) {
			if (typeof selector == 'string') {
				this.element = document.querySelector(selector);
				return this;
			}
		},
		//单击
		//handler 是回调函数，就是单击之后做出的响应功能。
		tap : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			
			//用来区分和长按的时间变量，做一个时间差判断
			var startTime;
			var endTime;
			
			//手势触发方法
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下的时候记录一个时间
						startTime = new Date().getTime();
						break;
					case 'touchend':
						//离开的时候记录一个时间
						endTime = new Date().getTime();
						if (endTime - startTime < 500) {
							//如果按下和抬起的时间差为500毫秒以内，那就认为是单击
							//在手势离开的时候，回调
							handler();	
						}
						break;
				}
			}
		},
		//长按
		longTap : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			//这个移动事件 是为了解决和其他滑动事件冲突问题
			this.element.addEventListener('touchmove', touchFn);
			
			var timerId;
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下达到500毫秒，我们认为是在长按
						timerId = setTimeout(function () {
							handler();
						}, 500);
						break;
					case 'touchend':
						//离开的时候清空定时器
						clearTimeout(timerId);
						break;
					case 'touchmove':
						//一旦移动了，就清空定时器（也就不是长按事件了）
						clearTimeout(timerId);
						break;
				}
			}
		},
		//双击
		doubleTap : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			
			//记录点击次数
			var tapCount = 0;
			var timerId;
			
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下的时候记录一次
						tapCount++;
						
						//每次刚进来的时候，清空一下定时器
						clearTimeout(timerId);
						
						timerId = setTimeout(function () {
							//如果达到500毫秒，我们认为就不是双击，要把tapCount清零
							tapCount = 0;
						}, 500);
						
						break;
					case 'touchend':
						if (tapCount == 2) {
							//当按下2次后离开，才算是双击
							handler();
							//触发双击后，清空点击次数
							tapCount = 0;
							//清空定时器
							clearTimeout(timerId);
						}
						break;
				}
			}
		},
		//左滑
		swiperLeft : function (handler) {
			this.element.addEventListener('touchstart', touchFn);
			this.element.addEventListener('touchend', touchFn);
			
			//手势触发的坐标
			var startX, startY, endX, endY;
			
			function touchFn (e) {
				switch (e.type) {
					case 'touchstart':
						//按下的时候记录 按下的时候坐标
						startX = e.targetTouches[0].pageX;
						startY = e.targetTouches[0].pageY;
						
						break;
					case 'touchend':
						//离开的时候记录 离开的时候坐标
						endX = e.changedTouches[0].pageX;
						endY = e.changedTouches[0].pageY;
						//1、判断是否是左右滑动
						//2、判断具体是否是左滑 (我们要给一个容错范围是25px)
						if (Math.abs(endX - startX) >= Math.abs(endY - startY) 
								&& (startX - endX) >= 25) {
							handler();
						}
						break;
				}
			}
		}
	}

	query.fn.init.prototype = query.fn;
	
	window.$ = window.query = query;
	
})(window);

