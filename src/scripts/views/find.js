var findTpl = require("../templates/find.string");

SPA.defineView("find",{
	html:findTpl,
	plugins:["delegated"],
	bindActions:{
		"goto.index":function(){
			SPA.show("index")
		}
	}
})