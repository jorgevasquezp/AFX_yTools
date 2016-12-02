#include "../yScripts/y_JSExtensions.jsx";
function YGenericTool()
{
    this.info =
    {
	name : "yStopMotion",
	version : 0.1,
	stage : "development",
	description : "Dynamically change layer sequence opacity from a slider in pComp",
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
	    res = 
	    "window {\
		resizeable : true\
		closeButton : true\
		text:'wtf'\
	    }"		    
		
	this.window = new Window( res );
	this.window.layout.layout(true);
	this.window.center();
	this.window.show();
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
    yGenericTool = new YGenericTool();
    yGenericTool.activate();
}
else
{
    YTB.addTool(new YGenericTool());
}
