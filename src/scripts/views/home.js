var homeTpl = require("../templates/home.string");

SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.livedata = [];
		}
	}],
	init:{
       vm:null, 
       livelistArr:[],
       homeSlider:null,
       hotSlider:null,
       formatData:function(data){
          var tempArr = [];
          for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
              tempArr[i] = [];
              tempArr[i].push(data[2*i]);
              tempArr[i].push(data[2*i+1]);
          }
          return tempArr;
       }
	},
	bindEvents:{
		beforeShow:function(){
		   // 获取视图
		   var that = this;
		   // 获取vm
		   that.vm = this.getVM();
           $.ajax({
           	  	//url:"/footballApp/mock/livelist.json",
           	   url:"/api/getLivelist.php",
           	   type:"get",
               data:{
               	   rtype:"origin" 
               },
               success:function(rs){
                  that.livelistArr = rs.data;
                  that.vm.livedata = that.formatData(rs.data);
               },
               error:function(){
               	   console.log("请求失败");
               }
           })
		},
		show:function(){
			var that = this;
			this.hotSwiper = new Swiper('#home-container',{
				// 循环
				loop:false,
				// 方法，
				onSlideChangeStart:function(swiper){
					// activeIndex获取当前页的索引
					var index = swiper.activeIndex;
					var list = $(".header_ul .li");
					// util.setFocus($(list));
					list.eq(index).addClass("back").siblings().removeClass("back");
				}
			});
			this.homeSwiper = new Swiper('#swiper_container',{
				loop:false,
				onSlideChangeStart:function(swiper){
					var index = swiper.activeIndex;
					var list = $(".main .nav li");
					// util.setFocus($(list));
					list.eq(index).addClass("green").siblings().removeClass("green");
				}
			})
			// 下拉刷新--上拉加载
			var myScroll = this.widgets.homeListScroll;

			var scrollSize = 30;

			myScroll.scrollBy(0,-scrollSize);

			var head=$(".head img"),
			  topImgHasClass=head.hasClass("up");
			var foot=$(".foot img"),
			  bottomImgHasClass=head.hasClass("down");
			myScroll.on("scroll",function(){
			var y=this.y,
			    maxY=this.maxScrollY-y;
			    if(y>=0){
			         !topImgHasClass && head.addClass("up");
			         return "";
			    }
			    if(maxY>=0){
			         !bottomImgHasClass && foot.addClass("down");
			         return "";
			    }
			})

      		myScroll.on("scrollEnd",function(){
		        if(this.y>=-scrollSize && this.y<0){
		            myScroll.scrollTo(0,-scrollSize);
		            head.removeClass("up");
		        }else if(this.y>=0){
		            head.attr("src","/football-app/images/ajax-loader.gif");
		            /*$.ajax({
						//url:"/footballApp/mock/livelist.json",  mock数据
						url:"/api/getLivelist.php",
						type:"get",
						data:{
							rtype:"more"
						},
						success:function(rs){

							that.livelistArr = that.livelistArr.concat(rs.data);
							that.vm.livedata = that.formatData(that.livelistArr);

							myScroll.refresh();
							myScroll.scrollTo(0,self.y);
							foot.removeClass("down");
							foot.attr("src","/football-app/images/arrow.png");
						}
		            })*/
		            setTimeout(function(){
		                  myScroll.scrollTo(0,-scrollSize);
		                  head.removeClass("up");
		                  head.attr("src","/football-app/images/arrow.png");
		            },1000)
		        }

		        var maxY=this.maxScrollY-this.y;
		        var self=this;
		        if(maxY>-scrollSize && maxY<0){
		              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
		              foot.removeClass("down");
		              console.log("refresh");
		        }else if(maxY>=0){
		            foot.attr("src","/football-app/images/ajax-loader.gif")
		              // 请求加载数据
		            $.ajax({
						//url:"/footballApp/mock/livelist.json",  mock数据
						url:"/api/getLivelist.php",
						type:"get",
						data:{
							rtype:"more"
						},
						success:function(rs){

							that.livelistArr = that.livelistArr.concat(rs.data);
							that.vm.livedata = that.formatData(that.livelistArr);

							myScroll.refresh();
							myScroll.scrollTo(0,self.y);
							foot.removeClass("down");
							foot.attr("src","/football-app/images/arrow.png");
						}
		            })
		        }
	      	})
		}
	},
	bindActions:{		//给DOM元素绑定事件
		"switch.navs":function(e){	//对应的DOM元素上添加action-type="switch.tabs"属性
			// console.log(e);
			//$(e.el).addClass("green").siblings().removeClass("green");
			var index = $(e.el).index();
			this.homeSwiper.slideTo(index);
		},
		"switch.hot":function(e){	//对应的DOM元素上添加action-type="switch.tabs"属性
			// console.log(e);
			//$(e.el).addClass("green").siblings().removeClass("green");
			var index = $(e.el).index();
			this.hotSwiper.slideTo(index-1);
		}
		
	}
})






















