#include "../yScripts/y_JSExtensions.jsx";

function CompHerder()
{
    this.info =
    {
	name : "CompHerder",
	version : 0.1,
	stage : "development",
	description : "Generic script to use as a base for new tools.",
	url : "yorchnet.com"
    };
    this.appearence =
    {
	buttonHeight : 30,
	buttonWidth : 126
    };
    this.resources = 
    {
	icon : new File('yNet.png'),
    };
    this.init = function init()
    {
        
	this.btnLauyout = 
	"button\
	 {\
	    preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'],\
	    text:'" + this.info.name + "',\
	    helpTip:'" + this.info.description + "'\
	 }";
	
	this. res = 
	 "window\
	{\
	    type:'palette',\
	    text:'" + this.info.name + ' ' + this.info.ver + ' ' + this.info.stage + "',\
	    info: Group \
	    {\
		alignment:['center','bottom'],\
		icon: Image \
		{\
		    icon:'" + this.resources.icon.path + '/' + this.resources.icon.name + "',\
		    preferredSize: [15, 18]\
		},\
		website: StaticText\
		{\
		    text:'" + this.info.url + "',\
		    alignment:['fill','center']\
		},\
	    }\
	}";
    }
    this.createUI = function createUI()
    {
	    var res = 
	    "window { \
		text: 'CompHerder',\
		alignment: ['fill','fill'], \
		alignChildren: ['left','top'], \
		orientation: 'column', \
		resizeable: 'true',\
		tabs: Panel {\
		    type: 'tabbedpanel',\
		    alignment: ['fill','fill'], \
		    alignChildren: ['left','top'], \
		    orientation: 'column', \
		    tab1: Panel {\
			type: 'tab',\
			text: 'search & replace'\
		    },\
		    tab2: Panel {\
			type: 'tab',\
			text: 'suffix/prefix'\
		    },\
		    tab3: Panel {\
			type: 'tab',\
			text: 'rename'\
		    }\
		}\
	    }";
		
	this.window = new Window( res );
	this.window.layout.layout(true);
	/*
	this.window.resize();
	this.window.center();
	*/
	this.window.show();
	
	this.window.layout.onResizing = this.window.layout.onResize = function () {this.layout.resize();}
    }
    this.yMainFunction = function yMainFunction()
    {
        this.createUI();
    }
    this.activate = function activate()
    {
	this.yTool.yMainFunction();
    }
    
    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    CompHerder = new CompHerder();
    CompHerder.activate();
}
else
{
    YTB.addTool(new CompHerder());
}
