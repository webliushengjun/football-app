var myTpl = require("../templates/my.string");

SPA.defineView("my",{
	html:myTpl,
	plugins:["delegated"],
	styles:{
		background:"transparent!important"
	},
	bindEvents:{
		"show":function(){
			/*var liveScroll = this.widgets["livenavscroll"];

			liveScroll.options.scrollX = true;
			liveScroll.options.scrollY = false;*/
		}
	},
	bindActions:{
		"goto.index":function(){
			SPA.hide("index",{
				ani:{
					name:"dialog",
					width:280,
					height:300
				}
			})
		}
	}
})