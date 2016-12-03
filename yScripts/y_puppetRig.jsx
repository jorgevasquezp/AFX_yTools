#include "../yScripts/y_JSExtensions.jsx";
function YPuppetRigTool()
{
    this.info =
    {
	name : "yPuppetRig",
	version : 0.0,
	stage : "development",
	description : "Tool to create nulls at puppet pin locations, and link the latter to the former.",
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
	scriptName : 'yPuppetRigger',
	scriptVer : 'v0.3.3a',
	scriptDesc : 'Tools for streamlining puppet-based animation rigs.',
	string_info : 'yorchnet.com',
	e_000 : 'e_000 : No layers are selected.',
	e_001 : 'e_001 : Layer contains no effects.',
	e_002 : 'e_002 : Layer contains no Puppet effects.',
	string_001 : 'Rig Pins',
	string_001x : 'Rigs Selected Pins on Layer', 
	string_002 : 'Rig Layers',
	string_002x : 'Rigs Selected Layers', 
	string_003 : 'Rig All',
	string_003x : 'Rig All Layers in Comp'
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
        type:'palette' , text:'" + this.resources.scriptName + " " + this.resources.scriptVer + "',margins:[10,10,10,10],spacing:[5,5,5,5],\
            grp: Group { orientation:'column' , alignment:['fill','fill'] , alignChildren:['fill','fill'] , spacing:'2' , margin:'5', \
			btn_01: Button { preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'], text:'" + this.resources.string_001 + "', helpTip:'" + this.resources.string_001x + "' }, \
					btn_02: Button { preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'], text:'" + this.resources.string_002 + "', helpTip:'" + this.resources.string_002x + "' }, \
					btn_03: Button { preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'], text:'" + this.resources.string_003 + "', helpTip:'" + this.resources.string_003x + "' }, \
					chk_optn: Checkbox { text:'Enable Options', alignment:['fill','center'] , helpTip:'Enable Advanced Options' },\
					optn: Panel{ text:'Options' , visible:'false', orientation:'row' , alignment:['fill','fill'] , alignChildren:['fill','fill'] , spacing:'2' , margin:'5', \
                    nullSizeGrp: Group{ \
                        orientation:'column' , alignment:['fill','fill'] , alignChildren:['fill','fill'] , spacing:'2' , margin:'5', \
                        sldr_tit: StaticText { text:'Set Null Size in Pixels.', alignment:['fill','center'] },\
                        sldr: Slider { value:'125' , minvalue:'6' , maxvalue:'250' , text:'alaverga', helpTip:'" + this.resources.string_001x + "' }, \
                            sldr_Values_txt: Group{\
                             orientation:'row' , alignment:['fill','fill'] , alignChildren:['center','fill'] , spacing:'2' , margin:'5', \
                             mintxt: StaticText { text:'small', alignment:['left','fill'] },\
                             medtxt: StaticText { text:'medium', alignment:['center','fill'] },\
                             maxtxt: StaticText { text:'big', alignment:['right','fill'] },\
                            }\
                             otherOptionsGrp: Group{ \
                               orientation:'row' , alignment:['fill','fill'] , alignChildren:['fill','fill'] , spacing:'8' , margin:'5', \
                               chk_box_01: Checkbox { text:'Enable Draft Mode.', alignment:['fill','center'] , helpTip:'Mostly for oldschool pixelated stuff' },\
							   chk_box_02: Checkbox { text:'Lock Layer', alignment:['fill','center'] , helpTip:'Lock layer after rigging.' },\
                             },\
                        }\
                    },\
                    	info: Group { \
                        alignment:['center','bottom'], \
                            txt_info: StaticText { text:'" + this.resources.string_info + "', alignment:['fill','center'] },\
                    }\
                }\
            }";
		
    
    
	
    }
    this.createUI = function createUI()
    {
	this.window = new Window( this.res );
	this.window.layout.layout(true);
	this.window.center();
	this.window.show();
	
	this.window.grp.optn.enabled = false;
    
	this.window.grp.btn_01.onClick =  yPuppetRigTool.runRigPin; //Defines Button Action
	this.window.grp.btn_02.onClick =  yPuppetRigTool.runRigLayer; //Defines Button Action
	this.window.grp.btn_03.onClick =  yPuppetRigTool.runRigAll; //Defines Button Action
	this.window.grp.chk_optn.onClick = yPuppetRigTool.toggleOptions;
    }
    this.yMainFunction = function yMainFunction()
    {
        this.createUI();
    }
    this.activate = function activate()
    {
        yPuppetRigTool.yMainFunction();
    }
    
    /**/	
    this.toggleOptions = function toggleOptions(){
	    if(this.window.grp.chk_optn==true){
		    this.window.grp.chk_optn=false;
		    }
	    else
	    {
	    this.window.grp.chk_optn=true;
	    }
	    this.window.grp.optn.enabled = this.window.grp.chk_optn;
    }
    this.customColors = function customColors(rsr){
	    g = rsr.graphics;
	    myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.25, 0.05, 0.25, 1]);
	    g.backgroundColor = yToolBoxPalette.graphics.backgroundColor;
	    }
    this.getPuppetEffects = function getPuppetEffects(aLayer){
	 puppetEffects = []
	for(i=1;i<=aLayer('Effects').numProperties;i++){
	    puppetEffects.push(aLayer('Effects')(i));
	    }
	return puppetEffects;
	}
    this.getPosPins = function getPosPins(aLayer){
	puppetEffects = this.getPuppetEffects(aLayer);
	if(puppetEffects.length>0){
	     posPins = [];
	for(i=0;i<puppetEffects.length;i++){
	    posPinGroup = puppetEffects[i]('ADBE FreePin3 ARAP Group')('ADBE FreePin3 Mesh Group')('ADBE FreePin3 Mesh Atom')('ADBE FreePin3 PosPins');
	    for(j=1;j<=posPinGroup.numProperties;j++){
		posPins.push(puppetEffects[i]('ADBE FreePin3 ARAP Group')('ADBE FreePin3 Mesh Group')('ADBE FreePin3 Mesh Atom')('ADBE FreePin3 PosPins')(j));
		}
	    }
	return posPins;
	    }
	else
	{
	  writeLn('No FreePin3 Effect found on Layer');
       return []
	}
	}
    this.rigPins = function rigPins(aLayer,selectedOnly){
	    pins = this.getPosPins(aLayer);
	selectedPins = [];
	createdNulls =[];
	for(i=0;i<pins.length;i++){
		  selectedPins.push(pins[i].selected)
		  }
		      this.setPropsFromUI();
		      
	for(i=0;i<pins.length;i++){
	    if(selectedPins[i]||!selectedOnly){
			    
	    createdNulls.push([app.project.activeItem.layers.addNull(),pins[i]]);// populate register of created Nulls, associated with the pin property groups that will be controlled by them.
	    createdNulls[i][0].source.height = createdNulls[i][0].source.width = nullSize;
	    createdNulls[i][0].name =  aLayer.name+"_"+createdNulls[i][1].name; //set nulls name to it's parent layer's name + the puppuet point name.
	    createdNulls[i][0].label = aLayer.label; // set nulls label equalt to its parent layer.
	    createdNulls[i][0].transform.anchorPoint.setValue([createdNulls[i][0].source.width/2,createdNulls[i][0].source.height/2]); //center pivot of created nulls
	    createdNulls[i][0].moveBefore(aLayer); //stack created null on top of original layer.
		    pinPosition = createdNulls[i][1]('ADBE FreePin3 PosPin Position').value;
		    aLayerPosition = aLayer('ADBE Transform Group')('ADBE Position').value;
		    aLayerAnchorPoint = aLayer('ADBE Transform Group')('ADBE Anchor Point').value;
		    createdNulls[i][0].transform.position.setValue(pinPosition+aLayerPosition-aLayerAnchorPoint);     //needs a toWorld Function
		    txtExpression = 'l = thisComp.layer('+'"'+createdNulls[i][0].name+'"'+');\
		    '+'fromWorld(l.toComp(l.transform.anchorPoint))';
		    createdNulls[i][1]('ADBE FreePin3 PosPin Position').expression =  txtExpression;
		    
		    //there has to be a way to re select the original layer one had selected.
	    }
	else{
	    createdNulls.push([null,null])
	    }

	}

    //stuff to apply to main layer
    aLayer.quality = layerQuality;
    aLayer.locked = layerLock;

    pins = null;
    selectedPins = null;
    createdNulls = null;
    pinPosition = null;
    aLayerPosition= null;
    aLayerAnchorPoint = null;
    txtExpression = null;

    }
    this.runRigPin = function runRigPin(){
	    app.beginUndoGroup( yPuppetRigTool.resources.string_001 );
	    sel =app.project.activeItem.selectedLayers;
	    yPuppetRigTool.setPropsFromUI();
	    yPuppetRigTool.rigPins(sel[0],true);
	    app.endUndoGroup();
	    }
    this.runRigLayer = function runRigLayer(){
        //alert( yPuppetRigTool.resources.string_002 );
	    app.beginUndoGroup( yPuppetRigTool.resources.string_002 );
	    allLayers = app.project.activeItem.layers;
	    workLayers = [];
	    for(i=1;i<=allLayers.length;i++){
		    if(allLayers[i].selected){
		    workLayers.push(allLayers[i]);
		    }
		    }
	    for(x=0;x<workLayers.length;x++){
            //alert( yPuppetRigTool.info );
                yPuppetRigTool.rigPins(workLayers[x],false);
		    }
	    app.endUndoGroup();

	    }
    this.runRigAll = function runRigAll(){
	    app.beginUndoGroup( yPuppetRigTool.resources.string_003 );
	    allLayers = app.project.activeItem.layers;
	    workLayers = [];
	    for(i=1;i<=allLayers.length;i++){
		    workLayers.push(allLayers[i]);
		    }
	    for(x=0;x<workLayers.length;x++){
		    yPuppetRigTool.rigPins(workLayers[x],false);
		    }
	    app.endUndoGroup();
	    }
    this.setPropsFromUI = function setPropsFromUI(){
	    nullSize = yFactor(parseInt(this.window.grp.optn.nullSizeGrp.sldr.value),5)
	    if(this.window.grp.optn.nullSizeGrp.otherOptionsGrp.chk_box_02.value==true){
		    layerLock =true // solo si vamos a hacer vainas pixeladas.
		    }
	    else
	    {
		    layerLock =false // solo si vamos a hacer vainas pixeladas.
		    }

	    if(this.window.grp.optn.nullSizeGrp.otherOptionsGrp.chk_box_01.value==true){
		    layerQuality =LayerQuality.DRAFT // solo si vamos a hacer vainas pixeladas.
		    }
	    else
	    {
		    layerQuality =LayerQuality.BEST // solo si vamos a hacer vainas pixeladas.
		    }
	    }
    /**/

    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    yPuppetRigTool = new YPuppetRigTool();
    yPuppetRigTool.activate();
}
else
{
    yPuppetRigTool = YTB.addTool(new YPuppetRigTool());
}
