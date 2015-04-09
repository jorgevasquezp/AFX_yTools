#include "../yScripts/y_JSExtensions.jsx";
function YGenericTool()
{
    this.info =
    {
	name : "yBindBetween2",
	version : 0.13,
	stage : "development",
	description : "Constraints a layer between two others, position and rotation-wise",
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
	"window { \
	    type:'palette' ,\
	    text:'" + this.info.name + ' ' + this.info.version + "',\
	    margins:[10,10,10,10],\
	    spacing:[5,5,5,5]\
		\
		lst_layer: DropDownList\
		{\
		    title:'layer to constrain',\
		    preferredSize:[150,35],\
		    textSelection:'Escoge',\
		    helpTip:'Select the layer you wish to constrain'\
		}\
		lst_pa: DropDownList\
		{\
		    title:'parent a',\
		    preferredSize:[150,35],\
		    textSelection:'Escoge',\
		    helpTip:'Select the first parent'\
		}\
		lst_pb: DropDownList\
		{\
		    title:'parent b',\
		    preferredSize:[150,35],\
		    textSelection:'Escoge',\
		    helpTip:'Select the second parent'\
		}\
		exec_btn: Button\
		{\
		    text:'do It',\
		    preferredSize:[150,35],\
		    helpTip:'do it'\
		}\
		info: Group\
		{\
		    alignment:['center','bottom'], \
		    icon: Image {preferredSize: [15, 18]},\
		    website: StaticText { text:'" + this.info.url + "', alignment:['fill','center'] },\
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
