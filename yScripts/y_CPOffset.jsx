#include "../yScripts/y_JSExtensions.jsx";
function YCPOffset()
{
    this.info =
    {
	name : "YCornerPinOffset",
	version : 0.12,
	stage : "development",
	description : "Offsets each corner of a CornerPin Effect.",
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
	//if called from the button as opposed as from the script.
	if ( String(this) == "[object Button]" )
	{
	    this.yTool.processCornerPins();
	}
	else
	{
	    this.processCornerPins();
	}
	
    }
    this.getSelectedCornerPins = function getSelectedCornerPins()
    {
	/* Function that returns a list of  effect objects 
	that match any of the names
	specified in validCornerPinNames. */
	validCornerPinNames = ["ADBE Corner Pin","CC Power Pin"];

	selectedLayers = app.project.activeItem.selectedLayers;
	cornerPins = [];
	for (layer=0;layer<selectedLayers.length;layer++)
	{
	    myLayer = selectedLayers[layer];
	    myEffects = myLayer.property("ADBE Effect Parade");
	    for(effect=1;effect<=myEffects.numProperties;effect++)
	    {
		for(validCornerPinName=0;validCornerPinName<validCornerPinNames.length;validCornerPinName++)
		{
		    if ( myEffects.property(effect).matchName == validCornerPinNames[validCornerPinName] )
		    {
			cornerPins.push(myEffects.property(effect));
		    }
		}
	    }
	}	
	return cornerPins;
    }
    this.getLayer = function getLayer(effect)
    {
	/* If given a layer's effect object
	this function returns the layer object */
	layer = effect.parentProperty.parentProperty;
	return layer;
    }
    this.addEffect = function addEffect(layer,effect_string,effect_name)
    {
	new_effect = layer.property("ADBE Effect Parade").addProperty(effect_string);
	new_effect.name = effect_name;
	return new_effect;
    }
    this.addPointControls = function addPointControls(effect)
    {
	/*calling the getLayer(effect) is resetting my effect object to null, and not allowing me to do everything in a single sitting. I think it has to do with variable scopes.*/
	local = {};
	local.effect = effect;    
	base_name = local.effect.name;
	names = ["Upper Left","Upper Right","Lower Left","Lower Right"];

	for (i=1;i<=4;i++)
	{
	    expression = '\
	    try\
	    {\
		effect("'+base_name+'")('+(i)+')+effect("'+base_name+'_'+names[i-1]+'_'+'Offset'+'")("Point")\
	    }\
	    catch(err)\
	    {\
		[0,0]\
	    }'
	local.effect.property(i).expression = expression;
	}
	layer = this.getLayer(effect);
	for(i=0;i<=3;i++)
	{
	    new_effect = this.addEffect(layer,"Point Control",base_name+"_"+names[i]+"_"+"Offset");
	    new_effect.property("Point").setValue([0,0]);
	}
    }
    this.processCornerPins = function processCornerPins(){
    
	app.beginUndoGroup('ySetProject');
	pins = this.getSelectedCornerPins();

	for(pin=0;pin<pins.length;pin++)
	{
	    this.addPointControls(pins[pin])
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
    yCPOffset = new YCPOffset();
    yCPOffset.activate();
}
else
{
    yCPOffset = YTB.addTool(new YCPOffset());
}
