yColorProbe_data = new Object();

yColorProbe_data.scriptName = 'yColorProbe';
yColorProbe_data.scriptDesc = 'Creates a Null that will Sample the selected layer within the specified radius.';
yColorProbe_data.scriptVer = '0.2a';
yColorProbe_data.webLink = 'yorchnet.com';

//if yToolBox Exists add it to its tool list.
if (typeof(yToolBox_data)!=='undefined'){
    yToolBox_data.tools.push(yColorProbe_data);
    
    //it should be called from toolbox.
    /* yColorProbe_data.buttonWidth=76;
     yColorProbe_data.buttonHeight=30;
*/
    yColorProbe_data.btnLayout = "btn_"+yColorProbe_data.scriptName+": Button { preferredSize: ['"+ yToolBox_data.buttonWidth+"','"+ yToolBox_data.buttonHeight+"'], text:'"+yColorProbe_data.scriptName+"', helpTip:'"+yColorProbe_data.scriptDesc+"' }";
    
    }

yColorProbe_data.res = "window { \
    type:'palette' , text:'"+yColorProbe_data.scriptName+' '+yColorProbe_data.scriptVer+"',\
    \
    \
    info: Group { \
        alignment:['center','bottom'], \
        icon: Image {preferredSize: [15, 18]},\
			website: StaticText { text:'"+yColorProbe_data.webLink+"', alignment:['fill','center'] },\
        }\
    \
    }";
    
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
    //                  MAIN SCRIPT GOES HERE.
    
    #include "usefulFunctions.jsx";

function yColorProbe(){
	//It works with Sampled layers at a 100% scale only.
	
    app.beginUndoGroup('Create ColorProbe');
    sel = app.project.activeItem.selectedLayers[0];
    
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
    myNull("Effects")('sampledLayer')(1).setValue(sel.index)
    
    app.endUndoGroup();
    return 'ok'
    }

    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
        
function build_yColorProbe_data_UI(){
	yColorProbe_data.window = new Window ( yColorProbe_data.res);
	yColorProbe_data.window.show();
	}
yColorProbe_data.activate =yColorProbe ;

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(yToolBox_data)=='undefined'){
       yColorProbe_data.activate();
	}else{
    }
