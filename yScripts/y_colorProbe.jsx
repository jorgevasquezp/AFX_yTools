#include "../yScripts/y_JSExtensions.jsx";
#include "usefulFunctions.jsx";

function YColorProbe()
{
    this.info =
    {
	name : "yColorProbe",
	version : 0.0,
	stage : "development",
	description : "Creates a Null that will Sample the selected layer within the specified radius.",
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
    this.getInfo = function getInfo( )
    {
	alert("asdasdasd");
    }
    this.createUI = function createUI()
    {
        this.window = new Window ( this.res );
        this.window.show() ;
    }
    this.yMainFunction = function yMainFunction()
    {
	app.beginUndoGroup(this.yTool.info.name); // yTool is a refernece to the Tool object, because THIS in this context returns the ButtonObject.... 
	
	//It works with Sampled layers at a 100% scale only.
	try
	    {
		sel = app.project.activeItem.selectedLayers[0];
	    }
	    catch (err)
	    {
		sel = undefined;
	    }
	
	myNull = app.project.activeItem.layers.addNull();
	myNull.transform.anchorPoint.setValue([50,50]);
	myNull.name = yUniStr('colorProbe'); //Generates a Unique Name by adding numbers at the end of the main string.
	layerCTRL = myNull("Effects").addProperty("Layer Control");
	layerCTRL.name='sampledLayer';
	colorCTRL = myNull("Effects").addProperty("Color Control");
	colorCTRL.name='outColor';
	radiusCTRL = myNull("Effects").addProperty("Slider Control");
	radiusCTRL.name ='radius';
	myNull("Effects")("radius")('Slider').setValue(5);
	colExp = 'myLayer = thisLayer("Effects")("sampledLayer")("Layer");\
	p = thisLayer.toWorld(thisLayer.transform.anchorPoint);\
	r = thisLayer("Effects")("radius")("Slider");\
	myLayer.sampleImage(p, radius = [r, r], postEffect=true, t=time)';
	myNull("Effects")('outColor')('Color').expression=colExp;
	myNull.label=2;
	myNull.source.height=30;
	myNull.source.width=30;
	myNull.anchorPoint=(15,15);
	    
	    if(sel!==undefined){
		    myNull("Effects")('sampledLayer')(1).setValue(sel.index);
	    }
	    
        app.endUndoGroup();
    }
    
    this.activate = this.yMainFunction;
    
    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    yColorProbe = new YColorProbe();
    yColorProbe.activate();
}
else
{
    YTB.addTool(new YColorProbe());
}
