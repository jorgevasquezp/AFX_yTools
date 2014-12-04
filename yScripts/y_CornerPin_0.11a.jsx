#include "../yScripts/y_JSExtensions.jsx";

yOffsetCornerPin_data = new Object();

yOffsetCornerPin_data.scriptName = 'YCornerPinOffset';
yOffsetCornerPin_data.scriptDesc = 'Offsets each corner of a CornerPin Effect';
yOffsetCornerPin_data.scriptVer = '0.1a';
yOffsetCornerPin_data.webLink = 'yorchnet.com';

//if yToolBox Exists add it to its tool list.
if (typeof(yToolBox_data)!=='undefined'){
    yToolBox_data.tools.push(yOffsetCornerPin_data);
    
    //it should be called from toolbox.
    /*
     yOffsetCornerPin_data.buttonWidth=76;
     yOffsetCornerPin_data.buttonHeight=30;
     */
     yOffsetCornerPin_data.btnLayout = "btn_"+ yOffsetCornerPin_data.scriptName+": Button { preferredSize: ['"+ yToolBox_data.buttonWidth+"','"+ yToolBox_data.buttonHeight+"'], text:'"+yOffsetCornerPin_data.scriptName+"', helpTip:'"+yOffsetCornerPin_data.scriptDesc+"' }";
    
    }

yOffsetCornerPin_data.res = "window { \
    type:'palette' , text:'"+yOffsetCornerPin_data.scriptName+' '+yOffsetCornerPin_data.scriptVer+"',\
    \
    \
    info: Group { \
        alignment:['center','bottom'], \
        icon: Image {preferredSize: [15, 18]},\
			website: StaticText { text:'"+yOffsetCornerPin_data.webLink+"', alignment:['fill','center'] },\
        }\
    \
    }";
    
//------------------------------------------------------------------------------------------------------------------------
   function getSelectedCornerPins() {
            /* Function that returns a list of  effect objects 
                that match any of the names
                specified in validCornerPinNames. */
            validCornerPinNames = ["ADBE Corner Pin","CC Power Pin"]    
            selectedLayers = app.project.activeItem.selectedLayers
            cornerPins = []
            for (layer=0;layer<selectedLayers.length;layer++){
                myLayer = selectedLayers[layer];
                myEffects = myLayer.property("ADBE Effect Parade");
                for(effect=1;effect<=myEffects.numProperties;effect++){
                    for(validCornerPinName=0;validCornerPinName<validCornerPinNames.length;validCornerPinName++){
                        if ( myEffects.property(effect).matchName == validCornerPinNames[validCornerPinName] && myEffects.property(effect).selected == true){
                            cornerPins.push(myEffects.property(effect))
                            }
                    }
                }
            }
        return cornerPins    
        }
        function getLayer(effect){
            /* If given a layer's effect object
                this function returns the layer object */
            layer = effect.parentProperty.parentProperty
            return layer
            }
        function addEffect(layer,effect_string,effect_name){
             new_effect = layer.property("ADBE Effect Parade").addProperty(effect_string);
             new_effect.name = effect_name;
             return new_effect
        }
        function addPointControls(effect){
            /*calling the getLayer(effect) is resetting my effect object to null, and not allowing me to do everything in a single sitting. I think it has to do with variable scopes.*/
            local = {};
            local.effect = effect;    
            base_name = local.effect.name;
            names = ["Upper Left","Upper Right","Lower Left","Lower Right"];
            
            for (i=1;i<=4;i++){
                        expression = 'try{\
            effect("'+base_name+'")('+(i)+')+effect("'+base_name+'_'+names[i-1]+'_'+'Offset'+'")("Point")\
        }catch(err){\
            [0,0]\
        }'
                local.effect.property(i).expression = expression;
                }
            layer = getLayer(effect);
                for(i=0;i<=3;i++){
                    new_effect = addEffect(layer,"Point Control",base_name+"_"+names[i]+"_"+"Offset");
                    new_effect.property("Point").setValue([0,0]);
                }
        }
        function processCornerPins(){
            app.beginUndoGroup('ySetProject');
            pins = getSelectedCornerPins();
            for(pin=0;pin<pins.length;pin++){
                addPointControls(pins[pin])
                }
            app.endUndoGroup();
            }
//------------------------------------------------------------------------------------------------------------------------

function build_yOffsetCornerPin_data_UI(){
	yOffsetCornerPin_data.window = new Window ( yOffsetCornerPin_data.res);
	yOffsetCornerPin_data.window.show();
	}
yOffsetCornerPin_data.activate =processCornerPins ;

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(yToolBox_data)=='undefined'){
        yOffsetCornerPin_data.activate();
	}else{
    }
