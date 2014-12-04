﻿yMultiRenamer_data = new Object();

yMultiRenamer_data.scriptName = 'yMultiRenamer';
yMultiRenamer_data.scriptDesc = 'Tool to make it easy to rename multiple project items and/or comp layers';
yMultiRenamer_data.scriptVer = '0.2a';
yMultiRenamer_data.webLink = 'yorchnet.com';

//if yToolBox Exists add it to its tool list.
if (typeof(yToolBox_data)!=='undefined'){
    yToolBox_data.tools.push(yMultiRenamer_data);
    
    //it should be called from toolbox.
    
     yMultiRenamer_data.buttonWidth=76;
     yMultiRenamer_data.buttonHeight=30;

    yMultiRenamer_data.btnLayout = "btn_"+yMultiRenamer_data.scriptName+": Button { preferredSize: ['"+ yToolBox_data.buttonWidth+"','"+ yToolBox_data.buttonHeight+"'], text:'"+yMultiRenamer_data.scriptName+"', helpTip:'"+yMultiRenamer_data.scriptDesc+"' }";
    
    }

yMultiRenamer_data.res = "window { \
    type:'palette' , text:'"+yMultiRenamer_data.scriptName+' '+yMultiRenamer_data.scriptVer+"', margins:[10,10,10,10],spacing:[5,5,5,5],\
    \
    }";
    /*
    items_tab:Tab{text:'asdasd',helpTip:'asdasdasd'},\
    root_str_chk: Checkbox { text:'New root name:', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.',value:true },\
    root_str: EditText { text:'', alignment:['fill','center'],helpTip:'Includes Items and folders within folders and subfolders.' },\
    search_str_chk: Checkbox { text:'Search for:', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.' },\
    search_str: EditText { text:'', alignment:['fill','center'],helpTip:'Includes Items and folders within folders and subfolders.',enabled:false },\
    search_rplc_tit: StaticText { text:'Replace with:', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.' },\
    search_rplc: EditText { text:'', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.',enabled:false},\
    pre_chk: Checkbox { text:'AddAsPrefix', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.' },\
    pre: EditText { text:'', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.',enabled:false },\
    pre_chk: Checkbox { text:'AddAsSuffix', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.' },\
    su: EditText { text:'', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.',enabled:false },\
    recursive_optn: Checkbox { text:'Recursive', alignment:['fill','center'] , helpTip:'Includes Items and folders within folders and subfolders.' },\
    selectedCompsOnly_optn: Checkbox { text:'Selected Comps Only', alignment:['fill','center'] , helpTip:'Inlcudes selected Layers even in UnActive Comps' },\
    globalItems_optn: Checkbox { text:'All Items', alignment:['fill','center'] , helpTip:'Inlcudes selected Layers even in UnActive Comps' },\
    globalLayers_optn: Checkbox { text:'All Layers', alignment:['fill','center'] , helpTip:'Inlcudes selected Layers even in UnActive Comps' },\
    global_optn: Checkbox { text:'Global', alignment:['fill','center'] , helpTip:'Inlcudes selected Layers even in UnActive Comps' },\
    exec_btn: Button {text:'do It',preferredSize:[150,35],helpTip:'do it'}\
    info: Group { \
        alignment:['center','bottom'], \
        icon: Image {preferredSize: [15, 18]},\
			website: StaticText { text:'"+yMultiRenamer_data.webLink+"', alignment:['fill','center'] },\
        }\
    \
    }";
    */
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
    //                  MAIN SCRIPT GOES HERE.

/*



function yMultiRenamer(){

    recursive_sw = yMultiRenamer_data.window.recursive_optn.value;
    selectedCompsOnly_sw = yMultiRenamer_data.window.selectedCompsOnly_optn.value;
    globalItems_sw = yMultiRenamer_data.window.globalItems_optn.value;
    globalLayers_sw = yMultiRenamer_data.window.globalLayers_optn.value;
    global_sw = yMultiRenamer_data.window.global_optn.value;

    
    //Gathers all SELECTED items into projectItems, 
    
    var rawItems = app.project.items;
    var projectItems = [];
    for(i=1;i<=rawItems.length;i++){
        currentItem = rawItems[i];
        if( (currentItem.selected||(currentItem.parentFolder.selected&recursive_sw))||(globalItems_sw||global_sw) ){
            projectItems.push(currentItem);
        }
    }

    //Gathers all SELECTED layers into projectLayers, 
    var projectComps = [];  
    for(i=1;i<rawItems.length;i++){
        currentItem = rawItems[i];
        if(currentItem.typeName=='Composition'){
            projectComps.push(currentItem)
        }
    }    
    var rawLayers = [];
     for(i=0;i<projectComps.length;i++){
        for(j=1;j<=projectComps[i].layers.length;j++){
            rawLayers.push(projectComps[i].layers[j])
            }
        }
    var projectLayers = [];
    for(i=0;i<rawLayers.length;i++){
        currentItem = rawLayers[i];
        if((currentItem.selected&(currentItem.containingComp.selected||!selectedCompsOnly_sw))||(globalLayers_sw||global_sw) ){
            projectLayers.push(currentItem);
        }
        }
   
    allRenamable = projectItems.concat(projectLayers);
    //alert(allRenamable);
    app.beginUndoGroup('Multi Renamer');
    for(i=0;i<allRenamable.length;i++){        
            writeLn('progress '+(parseInt(((i+1)/allRenamable.length)*100))+'%');
            n = '';
            if(i>0){
                n = ' '+String(i);
                }
            if(!allRenamable[i].locked){
            allRenamable[i].name = yMultiRenamer_data.window.root_str.text+n;
            //allRenamable[i].name = String(Math.random());  //EVIL LAUGHS
            }
            
            
        }
    app.endUndoGroup();
    
}    
*/
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------

function build_yMultiRenamer_data_UI(){
	yMultiRenamer_data.window = new Window ( yMultiRenamer_data.res);
    yMultiRenamer_data.window.tbdpnl = yMultiRenamer_data.window.add("tabbedpanel");
    yMultiRenamer_data.window.tbdpnl.itemsTab  = yMultiRenamer_data.window.tbdpnl.add("tab",undefined,"Layers");
    yMultiRenamer_data.window.tbdpnl.layersTab  = yMultiRenamer_data.window.tbdpnl.add("tab",undefined,"Items");
    yMultiRenamer_data.window.tbdpnl.bothTab  = yMultiRenamer_data.window.tbdpnl.add("tab",undefined,"Both");
    yMultiRenamer_data.window.tbdpnl.txt =  yMultiRenamer_data.window.add("statictext",undefined,"adsad");
    yMultiRenamer_data.window.tbdpnl.onChange = update;
   
    
    
    //yMultiRenamer_data.window.exec_btn.onClick = yMultiRenamer;
	yMultiRenamer_data.window.show();
	}
function update(){
        yMultiRenamer_data.window.tbdpnl.txt.text = yMultiRenamer_data.window.tbdpnl.selection.text;
        }    
yMultiRenamer_data.activate = build_yMultiRenamer_data_UI ;

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.

/*
    if (typeof(yToolBox_data)=='undefined'){
    */
       yMultiRenamer_data.activate();
	/*}else{
    }
*/

// a= yMultiRenamer()