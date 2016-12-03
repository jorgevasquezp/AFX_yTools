#include "../yScripts/y_JSExtensions.jsx";
function YBindBetween2()
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
		    icon: Image\
		    {\
			preferredSize: [15, 18]\
		    },\
		    website: StaticText\
		    {\
			text:'" + this.info.url + "', alignment:['fill','center']\
		    },\
		}\
	    }";
    }
    this.createUI = function createUI()
    {
		
	this.window = new Window( this.res );
	this.refresh();
	this.window.exec_btn.onClick = this.run;
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
        yBindBetween2.yMainFunction();
    }
    this.run = function run()
    {
	app.beginUndoGroup('Bind Between Two');

	selectedLayerName=String(this.window.lst_layer.selection);
	parentALayerName=String(this.window.lst_pa.selection);
	parentBLayerName=String(this.window.lst_pb.selection);
	layerN = selectedLayerName.substr(0, selectedLayerName.indexOf('.'));
	paN = parentALayerName.substr(0, parentALayerName.indexOf('.'));
	pbN = parentBLayerName.substr(0, parentBLayerName.indexOf('.'));
	layer = app.project.activeItem.layers[layerN];
	pa = app.project.activeItem.layers[paN];
	pb = app.project.activeItem.layers[pbN];
	layer("Effects").addProperty("Layer Control");
	layer("Effects")("Layer Control").name = 'ctrl01';
	layer("Effects")("ctrl01")("Layer").setValue(pa.index);     
	layer("Effects").addProperty("Layer Control");
	layer("Effects")("Layer Control").name = 'ctrl02';
	layer("Effects")("ctrl02")("Layer").setValue(pb.index);
	layer("Effects").addProperty("Angle Control");
	layer("Effects")("Angle Control").name = 'offset';
	layer("Effects")("offset")("Angle").setValue(0);
	layer("Effects").addProperty("Slider Control");
	layer("Effects")("Slider Control").name = 'weight';
	layer("Effects")("weight")(1).setValue(50);
	layer("Effects").addProperty("Checkbox Control");
	layer("Effects")("Checkbox Control").name = 'stretch';
	posExp ='\
	    a = effect("ctrl01")("Layer");\
	    b = effect("ctrl02")("Layer");\
	    aPos = a.toComp(a.anchorPoint);\
	    bPos = b.toComp(b.anchorPoint);\
	    w= effect("weight")(1)/100;\
	    (aPos*(1-w)+bPos*(w))'
	rotExp ='\
	    a =effect("ctrl01")("Layer");\
	    b = effect("ctrl02")("Layer");\
	    aPos = a.toComp(a.anchorPoint);\
	    bPos = b.toComp(b.anchorPoint);\
	    rx =  lookAt(aPos,bPos)[0];\
	    ry = lookAt(aPos,bPos)[1];\
	    offset = effect("offset")("Angle");\
	    if (aPos[1] > bPos[1]){\
		(ry) -90 + offset\
	    }else{\
		90 - (ry) + offset\
	    }'
	scaleExp ='\
	    a = effect("ctrl01")("Layer");\
	    b = effect("ctrl02")("Layer");\
	    aPos = a.toComp(a.anchorPoint);\
	    bPos = b.toComp(b.anchorPoint);\
	    d = Math.sqrt(Math.pow((aPos[0]-bPos[0]),2)+Math.pow((aPos[1]-bPos[1]),2));\
	    x = transform.scale[0];\
	    y = transform.scale[1];\
	    sx = ((d*100)/this.width)/100;\
	    stretch = effect("stretch")("Checkbox");\
	    if(stretch==true){\
		[x*sx,y]\
	    }else{\
		[x,y]\
	    }'

	layer.transform.position.expression = posExp;
	layer.transform.rotation.expression= rotExp;
	layer.transform.scale.expression= scaleExp;

	app.endUndoGroup();
    }

    this.refresh = function refresh()
    {

	var lists = [ this.window.lst_pa , this.window.lst_layer , this.window.lst_pb ]//they should be in this order for the assignment of the selection index works right/

	for(i=0;i<lists.length;i++)
	{
	    lists[i].removeAll();
	}

	var sel = app.project.activeItem.selectedLayers;
	var compLayers = app.project.activeItem.layers;
	var selectableLayers = [];
	for ( var i = 1 ; i <= compLayers.length ; i++ )
	{
	    selectableLayers.push(compLayers[i]);
	}

	var lst_layer = this.window.lst_layer;
	var lst_pa = this.window.lst_pa;
	var lst_pb = this.window.lst_pb;

	for( var i = 0 ; i < lists.length ; i++ )
	{
	    for( j = 0 ; j < selectableLayers.length ; j++ )
	    {
		lists[i].add('item',selectableLayers[j].index+"."+selectableLayers[j].name);		
	    }
	}
	
	lst_layer.selection = 0;
	lst_pa.selection = 0;
	lst_pb.selection = 0;
    }

    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    yBindBetween2 = new YBindBetween2();
    yBindBetween2.activate();
}
else
{
    yBindBetween2 = YTB.addTool(new YBindBetween2());
}
