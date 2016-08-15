var detailTpl = require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.imgsrc=null;
			vm.title = null;
			vm.description = null;
			vm.isShowLoading = true;
		}
	}],
	bindEvents:{
		show:function(){
			// 获取视图
		   var that = this;
		   // 获取vm
		   that.vm = this.getVM();
		   console.log(that.vm);
			$.ajax({
           	  	//url:"/footballApp/mock/livelist.json",
           	   url:"/api/getLivelist.php",
           	   type:"get",
               data:{
               	   rtype:"origin"
               },
               success:function(rs){
                  var data = rs.data;
                  that.vm.imgsrc = data.imgsrc;
                  that.vm.title = data.title;
                  that.vm.description = data.description;
               },
               error:function(){
               	   console.log("请求失败");
               }
           })
		}
	},
	bindActions:{
		"goto.index":function(){
			SPA.show("index")
		}
	}
})



















