#include "../yScripts/y_JSExtensions.jsx";
function YStopMotionLayer()
{
    this.info =
    {
	name : "YStopMotionLayer",
	version : 0.1,
	stage : "development",
	description : "Tool to create a sprite-like behaviour with a composition.",
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
	e_0000 : "There are no comps in project.",
	e_0001 : "No Comps selected."
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
    
    
    /** MEAT **/
    
    
    this.yApplyStopMotionLayer = function yApplyStopMotionLayer(){
	
	myName = "yStopMotionLayer";
	myVer = "0.2a";
	nComps = app.project.items.length;
	    app.beginUndoGroup(myName);
	if(nComps>0){
	    sel = app.project.activeItem.selectedLayers;  //array containing selection;
		if(sel.length == 1&&sel[0].source!= null){
		    
		    myItem = sel[0].source;
		    myItemType = myItem.typeName;
		    
		    if(myItemType!="Composition"){
			alert(e_0001,myName+' '+myVer); 
		    }else{

			sliderCtrl = sel[0]("Effects").addProperty("Slider Control");
			sliderCtrl.name =  "Animation State"; //should check for previously created sliders named the same and name uniquely accordingly.
			txtExpression = 'myLayer = thisLayer;myComp =comp(myLayer.name);\
    max = myComp.numLayers;\
    myValue = effect("'+sliderCtrl.name+'")("'+sliderCtrl("Slider").name+'");\
    if(myValue<=max&&myValue>1){\
    parseInt(myValue)\
    }else if (myValue>max){\
    max\
    }else if(myValue<1){1}';
			//'l = thisComp.layer('+'"'+app.project.activeItem.selectedLayers[0].name+'"'+');'+'fromWorld(l.toComp(l.transform.anchorPoint))';
			sliderCtrl("Slider").expression =  txtExpression;
			sliderCtrl("Slider").setValue(1);
			txtExpression = null;
			nLayers =myItem.numLayers;
			txtExpression = 'extValue = comp("'+sel[0].containingComp.name+'").layer("'+myItem.name+'").effect("'+sliderCtrl.name+'")("'+sliderCtrl("Slider").name+'");if(extValue == thisLayer.index){100}else{0}';
			for (z=1;z<=nLayers;z++){
			    myItem.layer(z).opacity.expression=txtExpression;
			    }
			txtExpression = null;
		    } 
		}else{
		    alert( this.resources.e_0001,myName+' '+myVer); 
		}
	}else{
	    alert(this.resources.e_0000,myName+' '+myVer+" : Error");
	}
    app.endUndoGroup();
    }

    
    /**/
    
    
    this.yMainFunction = function yMainFunction()
    {
        //this.createUI();
	this.YStopMotionLayer();
    }
    this.activate = function activate()
    {
        yStopMotionLayer.yApplyStopMotionLayer();
        //this.yMainFunction();
    }
    
    
    
    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    yStopMotionLayer = new YStopMotionLayer();
    yStopMotionLayer.activate();
}
else
{
    yStopMotionLayer = YTB.addTool(new YStopMotionLayer());
}
