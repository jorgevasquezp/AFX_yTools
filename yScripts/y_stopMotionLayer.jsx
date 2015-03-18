yStopMotion_data = new Object();

yStopMotion_data.scriptName = 'yStopMotion';
yStopMotion_data.scriptDesc = 'Dynamically change layer sequence opacity from a slider in pComp';
yStopMotion_data.scriptVer = '0.1a';
yStopMotion_data.webLink = 'yorchnet.com';

//if yToolBox Exists add it to its tool list.
if (typeof(YTB)!=='undefined'){
    YTB.tools.push(yStopMotion_data);
    
    //it should be called from toolbox.
    /* yStopMotion_data.buttonWidth=76;
     yStopMotion_data.buttonHeight=30;
*/
    yStopMotion_data.btnLayout = "btn_"+yStopMotion_data.scriptName+": Button { preferredSize: ['"+ YTB.buttonWidth+"','"+ YTB.buttonHeight+"'], text:'"+yStopMotion_data.scriptName+"', helpTip:'"+yStopMotion_data.scriptDesc+"' }";
    
    }

yStopMotion_data.res = "window { \
    type:'palette' , text:'"+yStopMotion_data.scriptName+' '+yStopMotion_data.scriptVer+"',\
    \
    \
    info: Group { \
        alignment:['center','bottom'], \
        icon: Image {preferredSize: [15, 18]},\
			website: StaticText { text:'"+yStopMotion_data.webLink+"', alignment:['fill','center'] },\
        }\
    \
    }";
    
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
    //                  MAIN SCRIPT GOES HERE.
    
    e_0000 = "There are no comps in project."
e_0001 = "No Comps selected."

function yStopMotionLayer(){
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
                alert(e_0001,myName+' '+myVer); 
            }
    }else{
        alert(e_0000,myName+' '+myVer+" : Error");
    }
app.endUndoGroup();
}


    
    
    
    
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
        
function build_yStopMotion_data_UI(){
	yStopMotion_data.window = new Window ( yStopMotion_data.res);
	yStopMotion_data.window.show();
	}
yStopMotion_data.activate = yStopMotionLayer ;

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined'){
       yStopMotion_data.activate();
	}else{
    }
