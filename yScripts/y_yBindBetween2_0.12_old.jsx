yEntreDeux_data = new Object();

yEntreDeux_data.scriptName = 'yBindBetween2';
yEntreDeux_data.scriptDesc = 'Constraints a layer between two others, position and rotation-wise';

yEntreDeux_data.scriptVer = '0.12a';
yEntreDeux_data.webLink = 'yorchnet.com';

//if yToolBox Exists add it to its tool list.
if (typeof(yToolBox_data)!=='undefined'){
    yToolBox_data.tools.push(yEntreDeux_data);
    
    //it should be called from toolbox.
    /* yEntreDeux_data.buttonWidth=76;
     yEntreDeux_data.buttonHeight=30;
*/
    yEntreDeux_data.btnLayout = "btn_"+yEntreDeux_data.scriptName+": Button { preferredSize: ['"+yToolBox_data.buttonWidth+"','"+ yToolBox_data.buttonHeight+"'], text:'"+yEntreDeux_data.scriptName+"', helpTip:'"+yEntreDeux_data.scriptDesc+"' }";
    
    }
    
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
    //                  MAIN SCRIPT GOES HERE.
    
    function build_yEntreDeux_data_UI(){
	    //script info
	yEntreDeux_data = new Object();
	yEntreDeux_data.scriptName = 'yEntreDeux';
	yEntreDeux_data.scriptVer = '0.1a';
	yEntreDeux_data.webLink = 'yorchnet.com';
	
	
	// GUI
	yEntreDeux_data.res= "window { \
		type:'palette' , text:'"+yEntreDeux_data.scriptName+' '+yEntreDeux_data.scriptVer+"',margins:[10,10,10,10],spacing:[5,5,5,5]\
		\
		lst_layer: DropDownList {title:'layer to constrain',preferredSize:[150,35],textSelection:'Escoge',helpTip:'Select the layer you wish to constrain'}\
		lst_pa: DropDownList {title:'parent a',preferredSize:[150,35],textSelection:'Escoge',helpTip:'Select the first parent'}\
		lst_pb: DropDownList {title:'parent b',preferredSize:[150,35],textSelection:'Escoge',helpTip:'Select the second parent'}\
    exec_btn: Button {text:'do It',preferredSize:[150,35],helpTip:'do it'}\
		\
		info: Group { \
			alignment:['center','bottom'], \
			icon: Image {preferredSize: [15, 18]},\
			website: StaticText { text:'"+yEntreDeux_data.webLink+"', alignment:['fill','center'] },\
			}\
		\
		}";
	
	
	yEntreDeux_data.window = new Window (yEntreDeux_data.res);
	//never got around of assigning the icon any other way, but it works.
	yEntreDeux_data.window.info.icon.image = yToolBox_data.icon;	
	
	refresh(); // reloads the possible layers in the gui.
	
    yEntreDeux_data.window.exec_btn.onClick = run;
	
	
	yEntreDeux_data.window.show();
	}

function run(){
    app.beginUndoGroup('Bind Between Two');
     
    selectedLayerName=String(yEntreDeux_data.window.lst_layer.selection);
    parentALayerName=String(yEntreDeux_data.window.lst_pa.selection);
    parentBLayerName=String(yEntreDeux_data.window.lst_pb.selection);
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
    layer("Effects")("offset")("Angle").setValue(90);
    posExp ='a = effect("ctrl01")("Layer");\
b = effect("ctrl02")("Layer");\
aPos = a.toComp(a.anchorPoint);\
bPos = b.toComp(b.anchorPoint);\
(aPos+bPos)/2'
    rotExp ='a =effect("ctrl01")("Layer");\
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
    layer.transform.position.expression = posExp;
   layer.transform.rotation.expression= rotExp;
    
    
    /*  
    myNull = app.project.activeItem.layers.addNull();
    myNull.transform.anchorPoint.setValue([50,50]);
    myNull.name = yUniStr('colorProbe'); //Generates a Unique Name by adding numbers at the end of the main string.
    layerCTRL = myNull("Effects").addProperty("Layer Control");
    layerCTRL.name='sampledLayer';
    colorCTRL = myNull("Effects").addProperty("Color Control");
    colorCTRL.name='outColor';
    radiusCTRL = myNull("Effects").addProperty("Slider Control");
    radiusCTRL.name ='radius';
    myNull("Effects")("radius")('Slider').setValue(0.5);
    colExp = 'myLayer = thisLayer("Effects")("sampledLayer")("Layer");\
    p = thisLayer.toWorld(thisLayer.transform.anchorPoint);\
    r = thisLayer("Effects")("radius")("Slider");\
    myLayer.sampleImage(p, radius = [r, r], postEffect=true, t=time)';
    myNull("Effects")('outColor')('Color').expression=colExp;
    */
    
    app.endUndoGroup();
    }

function refresh(){
	//alert('going');
	lists=[yEntreDeux_data.window.lst_pa,yEntreDeux_data.window.lst_layer,yEntreDeux_data.window.lst_pb]//they should be in this order for the assignment of the selection index works right/
	for(i=0;i<lists.length;i++){
		lists[i].removeAll();
		}
	
	var sel = app.project.activeItem.selectedLayers;
	var compLayers = app.project.activeItem.layers;
	var selectableLayers = [];
	for(i=1;i<=compLayers.length;i++){
		selectableLayers.push(compLayers[i]);
		}
	
	
	
	var lst_layer = yEntreDeux_data.window.lst_layer;
	var lst_pa = yEntreDeux_data.window.lst_pa;
	var lst_pb = yEntreDeux_data.window.lst_pb;
	
    for(i=0;i<lists.length;i++){
 	for(j=0;j<selectableLayers.length;j++){
        lists[i].add('item',selectableLayers[j].index+"."+selectableLayers[j].name);		
			/*for(i=0;i<lists.length;i++){
				lists[i].add('item',selectableLayers[i].index+"."+selectableLayers[i].name);
				}*/
        //alert(selectableLayers[i].name)  
        }
		//lists[i].add('item',selectableLayers[i].index+"."+selectableLayers[i].name);		
		//lists[i].add('item',selectableLayers[i].index+"."+selectableLayers[i].name);		
		//lists[i].add('item',selectableLayers[i].index+"."+selectableLayers[i].name);
	}
	//var selIndex = sel[0].index-1;
	lst_layer.selection = 0;
	lst_pa.selection = 0;
	lst_pb.selection = 0;
	}
	//build_yEntreDeux_UI();


    
    
    
    
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
        /*
function build_yEntreDeux_data_UI(){
	yEntreDeux_data.window = new Window (yEntreDeux_data.res);
	yEntreDeux_data.window.show();
	}
    */
yEntreDeux_data.activate = build_yEntreDeux_data_UI ;

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(yToolBox_data)=='undefined'){
       yEntreDeux_data.activate();
	}else{
    }
