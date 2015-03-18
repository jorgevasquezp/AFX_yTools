#include "../yScripts/y_JSExtensions.jsx";

ySetProject_data = new Object();

ySetProject_data.scriptName = 'YSetStructure';
ySetProject_data.scriptDesc = 'Set the Folder Structure for a new Project';
ySetProject_data.scriptVer = '0.1a';
ySetProject_data.webLink = 'yorchnet.com';

//if yToolBox Exists add it to its tool list.
if (typeof(YTB)!=='undefined'){
    YTB.tools.push(ySetProject_data);
    
    //it should be called from toolbox.
    /*
     ySetProject_data.buttonWidth=76;
     ySetProject_data.buttonHeight=30;
     */
     ySetProject_data.btnLayout = "btn_"+ ySetProject_data.scriptName+": Button { preferredSize: ['"+ YTB.buttonWidth+"','"+ YTB.buttonHeight+"'], text:'"+ySetProject_data.scriptName+"', helpTip:'"+ySetProject_data.scriptDesc+"' }";
    
    }

ySetProject_data.res = "window { \
    type:'palette' , text:'"+ySetProject_data.scriptName+' '+ySetProject_data.scriptVer+"',\
    \
    \
    info: Group { \
        alignment:['center','bottom'], \
        icon: Image {preferredSize: [15, 18]},\
			website: StaticText { text:'"+ySetProject_data.webLink+"', alignment:['fill','center'] },\
        }\
    \
    }";
    
//------------------------------------------------------------------------------------------------------------------------
function ySetProject(){
	app.beginUndoGroup('ySetProject');
var preStruct = ["01 MAIN","02 PComp","03 Source Layers" ,"04 Movies","05 Other Projects","06 Audio" , "07 Reference"];
var newStruct = [];
var projectItems = [];

for(i=1;i<=app.project.items.length;i++){
    if(app.project.items[i].parentFolder.name=='Root'){
	projectItems.push(app.project.items[i].name);
	}
    }

//to start a new organized project since the beginning

if (projectItems.length == 0){
	newStruct = preStruct;
	}else{
		for(a=0;a<preStruct.length;a++){
			if ((projectItems.getOne(preStruct[a]))==-1){
				newStruct.push(preStruct[a]);
				};
		}
}


for(i = 0;i<newStruct.length;i++){
	app.project.items.addFolder(newStruct[i]);
}
saveNow = confirm("Project Succesfully Set, Save Project?",true,"ySetProject");
if(saveNow==true){
app.project.save()
}else{
}
app.endUndoGroup();
}
//------------------------------------------------------------------------------------------------------------------------

function build_ySetProject_data_UI(){
	ySetProject_data.window = new Window ( ySetProject_data.res);
	ySetProject_data.window.show();
	}
ySetProject_data.activate = ySetProject ;

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined'){
        ySetProject_data.activate();
	}else{
    }
