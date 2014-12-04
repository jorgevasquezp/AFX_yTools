yPuppetRig_data = new Object();

yPuppetRig_data.scriptName = 'yPuppetRigger';
yPuppetRig_data.scriptVer = 'v0.3.3a';
yPuppetRig_data.scriptDesc = 'Tools for streamlining puppet-based animation rigs.';
yPuppetRig_data.string_info = 'yorchnet.com';
yPuppetRig_data.e_000 = 'e_000 : No layers are selected.';
yPuppetRig_data.e_001 = 'e_001 : Layer contains no effects.';
yPuppetRig_data.e_002 = 'e_002 : Layer contains no Puppet effects.';
yPuppetRig_data.string_001 = 'Rig Pins';
yPuppetRig_data.string_001x = 'Rigs Selected Pins on Layer'; 
yPuppetRig_data.string_002 = 'Rig Layers';
yPuppetRig_data.string_002x = 'Rigs Selected Layers'; 
yPuppetRig_data.string_003 = 'Rig All';
yPuppetRig_data.string_003x = 'Rig All Layers in Comp'; 


//it should be called from toolbox.
yPuppetRig_data.buttonWidth=76;
yPuppetRig_data.buttonHeight=30;

//if yToolBox Exists add it to its tool list.
if (typeof(yToolBox_data)!=='undefined'){
    yToolBox_data.tools.push(yPuppetRig_data);
     yPuppetRig_data.btnLayout = "btn_"+ yPuppetRig_data.scriptName+": Button { preferredSize: ['"+yToolBox_data.buttonWidth+"','"+ yToolBox_data.buttonHeight+"'], text:'"+yPuppetRig_data.scriptName+"', helpTip:'"+yPuppetRig_data.scriptDesc+"' }";
    }
        
function build_yPuppetRig_data_UI(){
	//define custom strings for error messages, names, button names and helpTips. //Defines Layout variables.

yPuppetRig_data.res = "window { \
        type:'palette' , text:'"+yPuppetRig_data.scriptName+" "+yPuppetRig_data.scriptVer+"',margins:[10,10,10,10],spacing:[5,5,5,5],\
            grp: Group { orientation:'column' , alignment:['fill','fill'] , alignChildren:['fill','fill'] , spacing:'2' , margin:'5', \
			btn_01: Button { preferredSize: ['"+yPuppetRig_data.buttonWidth+"','"+yPuppetRig_data.buttonHeight+"'], text:'"+yPuppetRig_data.string_001+"', helpTip:'"+yPuppetRig_data.string_001x+"' }, \
					btn_02: Button { preferredSize: ['"+yPuppetRig_data.buttonWidth+"','"+yPuppetRig_data.buttonHeight+"'], text:'"+yPuppetRig_data.string_002+"', helpTip:'"+yPuppetRig_data.string_002x+"' }, \
					btn_03: Button { preferredSize: ['"+yPuppetRig_data.buttonWidth+"','"+yPuppetRig_data.buttonHeight+"'], text:'"+yPuppetRig_data.string_003+"', helpTip:'"+yPuppetRig_data.string_003x+"' }, \
					chk_optn: Checkbox { text:'Enable Options', alignment:['fill','center'] , helpTip:'Enable Advanced Options' },\
					optn: Panel{ text:'Options' , visible:'false', orientation:'row' , alignment:['fill','fill'] , alignChildren:['fill','fill'] , spacing:'2' , margin:'5', \
                    nullSizeGrp: Group{ \
                        orientation:'column' , alignment:['fill','fill'] , alignChildren:['fill','fill'] , spacing:'2' , margin:'5', \
                        sldr_tit: StaticText { text:'Set Null Size in Pixels.', alignment:['fill','center'] },\
                        sldr: Slider { value:'125' , minvalue:'6' , maxvalue:'250' , text:'alaverga', helpTip:'"+yPuppetRig_data.string_001x+"' }, \
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
                            icn_app: Image {icon:'"+ yToolBox_data.icon.path+'/'+ yToolBox_data.icon.name+"',preferredSize: [15, 18]},\
                            txt_info: StaticText { text:'"+yPuppetRig_data.string_info+"', alignment:['fill','center'] },\
                    }\
                }\
            }";
            
    //if (typeof(yToolBox_data)!=='undefined'){
        yPuppetRigDialog = new Window (yPuppetRig_data.res);  // Creates Window
    //}
	//yPuppetRigDialog.onDraw = customColors(yPuppetRigDialog);
	yPuppetRigDialog.grp.optn.enabled = false;
	yPuppetRigDialog.show(); //Shows Window.
    
	
    
    //yPuppetRigDialog.grp.info.icn_app.image = yToolBox_data.icon.substring(3,yToolBox_data.icon.length);
    yPuppetRigDialog.grp.btn_01.onClick =  runRigPin; //Defines Button Action
	yPuppetRigDialog.grp.btn_02.onClick =  runRigLayer; //Defines Button Action
	yPuppetRigDialog.grp.btn_03.onClick =  runRigAll; //Defines Button Action
	yPuppetRigDialog.grp.chk_optn.onClick = toggleOptions;
}
yPuppetRig_data.activate = build_yPuppetRig_data_UI ;


function toggleOptions(){
	if(yPuppetRigDialog.grp.chk_optn==true){
		yPuppetRigDialog.grp.chk_optn=false;
		}
	else
	{
	yPuppetRigDialog.grp.chk_optn=true;
	}
	yPuppetRigDialog.grp.optn.enabled = yPuppetRigDialog.grp.chk_optn;
}
function customColors(rsr){
	g = rsr.graphics;
	myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.25, 0.05, 0.25, 1]);
	g.backgroundColor = yToolBoxPalette.graphics.backgroundColor;
	}

function getPuppetEffects(aLayer){
     puppetEffects = []
    for(i=1;i<=aLayer('Effects').numProperties;i++){
        puppetEffects.push(aLayer('Effects')(i));
        }
    return puppetEffects;
    }
function getPosPins(aLayer){
    puppetEffects = getPuppetEffects(aLayer);
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
function rigPins(aLayer,selectedOnly){
	pins = getPosPins(aLayer);
    selectedPins = [];
    createdNulls =[];
    for(i=0;i<pins.length;i++){
              selectedPins.push(pins[i].selected)
              }
		  setPropsFromUI();
		  
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
function runRigPin(){

	/* NOT WORKING YET
	app.beginUndoGroup(string_001);
	allLayers = app.project.activeItem.layers;
	workLayers = [];
	for(i=1;i<=allLayers.length;i++){
		if(allLayers[i].selected){
		workLayers.push(allLayers[i]);
		}
		}
	for(x=0;x<workLayers.length;x++){
		rigPins(workLayers[x],false);
		}
	app.endUndoGroup();
	*/
	app.beginUndoGroup(yPuppetRig_data.string_001);
	sel =app.project.activeItem.selectedLayers;
	setPropsFromUI();
	rigPins(sel[0],true);
	app.endUndoGroup();
	}
function runRigLayer(){
	app.beginUndoGroup(yPuppetRig_data.string_002);
	allLayers = app.project.activeItem.layers;
	workLayers = [];
	for(i=1;i<=allLayers.length;i++){
		if(allLayers[i].selected){
		workLayers.push(allLayers[i]);
		}
		}
	for(x=0;x<workLayers.length;x++){
		rigPins(workLayers[x],false);
		}
	app.endUndoGroup();

	}
function runRigAll(){
	app.beginUndoGroup(yPuppetRig_data.string_003);
	allLayers = app.project.activeItem.layers;
	workLayers = [];
	for(i=1;i<=allLayers.length;i++){
		workLayers.push(allLayers[i]);
		}
	for(x=0;x<workLayers.length;x++){
		rigPins(workLayers[x],false);
		}
	app.endUndoGroup();
	}
function setPropsFromUI(){
	nullSize = yFactor(parseInt(yPuppetRigDialog.grp.optn.nullSizeGrp.sldr.value),5)
	if(yPuppetRigDialog.grp.optn.nullSizeGrp.otherOptionsGrp.chk_box_02.value==true){
		layerLock =true // solo si vamos a hacer vainas pixeladas.
		}
	else
	{
		layerLock =false // solo si vamos a hacer vainas pixeladas.
		}

	if(yPuppetRigDialog.grp.optn.nullSizeGrp.otherOptionsGrp.chk_box_01.value==true){
		layerQuality =LayerQuality.DRAFT // solo si vamos a hacer vainas pixeladas.
		}
	else
	{
		layerQuality =LayerQuality.BEST // solo si vamos a hacer vainas pixeladas.
		}
	}

//build_yPuppetRig_UI();


//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(yToolBox_data)=='undefined'){
       yPuppetRig_data.activate();
	}else{
    }
