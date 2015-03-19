#include "../yScripts/y_JSExtensions.jsx";
function YSetProjectTool()
{
    this.info =
    {
	name : "YSetStructure",
	version : 0.11,
	stage : "alpha",
	description : "Set the Folder Structure for a new Project",
	url : "yorchnet.com"
    };
    this.appearence =
    {
	buttonHeight : 30,
	buttonWidth : 126
    };
    this.init = function init()
    {
	//alert("my name is:" + this.info.name);
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
    this.ySetProject = function ySetProject()
    {
	//alert("is this working");
	app.beginUndoGroup('ySetProject');
	var preStruct = ["01 MAIN","02 PComp","03 Source Layers" ,"04 Movies","05 Other Projects","06 Audio" , "07 Reference"];
	var newStruct = [];
	var projectItems = [];

	for(i=1;i<=app.project.items.length;i++)
	{
	    if(app.project.items[i].parentFolder.name=='Root')
	    {
		projectItems.push(app.project.items[i].name);
	    }
	}

	//to start a new organized project since the beginning

	if (projectItems.length == 0)
	{
	    newStruct = preStruct;
	}
	else
	{
	    for(a=0;a<preStruct.length;a++)
	    {
		if ((projectItems.getOne(preStruct[a]))==-1)
		{
		    newStruct.push(preStruct[a]);
		}
	    }
	}

	for(i = 0;i<newStruct.length;i++)
	{
	    app.project.items.addFolder(newStruct[i]);
	}
	
	saveNow = confirm("Project Succesfully Set, Save Project?",true,"ySetProject");
	
	if(saveNow==true){
	    app.project.save()
	}else{
	    
	}
	app.endUndoGroup();
    }
    
    this.activate = this.ySetProject;
    
    this.init();
    return this;
}

function build_ySetProject_data_UI()
{
    ySetProject_data.window = new Window ( ySetProject_data.res );
    ySetProject_data.window.show();
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    ySetProject_data = new YSetProjectTool();
    ySetProject_data.activate();
}
else
{
    YTB.addTool(new YSetProjectTool());
}
