var indexTpl = require("../templates/index.string");//引入文件
var util = require("../pack/util");

SPA.defineView("index",{	//SPA.defineView()为方法，index为页面文件名
	html:indexTpl,
	plugins:["delegated"],//插件，用来协助bindActions绑定事件
	modules:[{				
		name:"content",				//子视图名称
		defaultTag:"home",			//要引用的洁
		views:["home","find","my"],
		container:".m-index"
	}],
	bindEvents:{
		show:function(){
			
		}
	},
	bindActions:{		//给DOM元素绑定事件
		"switch.tabs":function(e,data){	//对应的DOM元素上添加action-type="switch.tabs"属性
			$(e.el).addClass("active").siblings().removeClass("active");
			// console.log(this)
			this.modules.content.launch(data.tag);
		},
		"goto.detail":function(){
			SPA.show("detail",{
				ani:{
					name:"header"
				}
			});
		},
		"goto.my":function(){
			SPA.show("my",{
				ani:{
					name:"dialog",
					width:280,
					height:300
				}
			})
		}
	}
})
SPA.config({
	indexView:"guide"
})






















