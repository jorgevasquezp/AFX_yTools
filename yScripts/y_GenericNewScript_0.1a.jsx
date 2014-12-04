yGeneric_data = new Object();

yGeneric_data.scriptName = 'YTBGen';
yGeneric_data.scriptDesc = 'YToolBox Generic Script is the base for adding tools.';
yGeneric_data.scriptVer = '0.1a';
yGeneric_data.webLink = 'yorchnet.com';
yGeneric_data.img = yToolBox_data.icon;

//if yToolBox Exists add it to its tool list.
if (typeof(yToolBox_data)!=='undefined'){

    //it should be called from toolbox.
     yGeneric_data.buttonWidth=76;
     yGeneric_data.buttonHeight=30;

    yGeneric_data.btnLayout = "btn_"+yGeneric_data.scriptName+": Button { preferredSize: ['"+ yGeneric_data.buttonWidth+"','"+ yGeneric_data.buttonHeight+"'], text:'"+yGeneric_data.scriptName+"', helpTip:'"+yGeneric_data.scriptDesc+"' }";
    
    }

yGeneric_data.res = "window { \
    type:'palette' , text:'"+yGeneric_data.scriptName+' '+yGeneric_data.scriptVer+"',\
    \
    \
    info: Group { \
        alignment:['center','bottom'], \
        icon: Image {icon:'"+String(yGeneric_data.img.path+"/"+yGeneric_data.img.name)+"',preferredSize: [15, 18]},\
        website: StaticText { text:'"+yGeneric_data.webLink+"', alignment:['fill','center'] }\
        }\
    \
    }";
    
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
    //                  MAIN SCRIPT GOES HERE.
    
    
    
    
    
    
    //--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------//--------
        
function build_yGeneric_data_UI(){
	yGeneric_data.window = new Window ( yGeneric_data.res);
	yGeneric_data.window.show();
	}
yGeneric_data.activate = build_yGeneric_data_UI ;
//alert();
//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
//if (typeof(yToolBox_data)=='undefined'){
       yGeneric_data.activate();
	//}else{
    //}
