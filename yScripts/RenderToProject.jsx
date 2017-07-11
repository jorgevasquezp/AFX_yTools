#include "../yScripts/y_JSExtensions.jsx";

function RenderToProject()
{
    this.info =
    {
	name : "RenderToProject",
	btn1 : "RenderToProject",
	btn2 : "SetAllToProject",
	version : 0.1,
	stage : "development",
	description : "Set Renders to project appropriate folders according to the studio folder structure.",
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
    };
    this.methods =
    {	
	getSelectedProjectItems: function(){
	    var items = [];
	    var p = app.project;
	    for ( var i = 1 ; i <= p.numItems ; i ++ ){
		var item = p.item(i);
		if ( item.selected ){
		    items.push(item);
		}
	    }
	    return items;
	},
	pad : function ( n , pad ) {
		zeros = "";
		for ( i = 0 ; i < pad ; i ++ )
		{
		    zeros+="0";
		}
		n = String(n);
		padded = zeros.substr( 0, pad - n.length ) + String(n) ;
		return padded
	},
	getTodayTag : function(){
	    var today = new Date();
	    var month_component = pad(String(today.getMonth()+1),2);
	    var date_component = pad(today.getDate(),2);
	    var full_year_component = String(today.getFullYear())
	    var year_component = full_year_component.substr(full_year_component.length - 2,full_year_component.length );
	    var tag = month_component + date_component + year_component
	    return tag;
	},
	getOutputBasePath : function(){
	    var file = app.project.file;
	    var file_path = String(app.project.file);
	    var gfx_output_base = "05_Graphics_Output";
	    var endtag_output_extra = "02_EndTags";
	    var scene_output_extra = "01_GFX_Scenes";
	    var vfx_output_base = "03_Composite_Outputs";
	    var vfx_output_base;
	    var gfx_string = "09_Graphics";
	    var vfx_string = "08_Composite";
	    var endtag_string = "EndTags";
	    
	    var search_gfx = file_path.search(gfx_string);
	    var search_vfx = file_path.search(vfx_string);
	    var search_endtag = file_path.search(endtag_string);
	    var base_path;
	    
	    if ( search_gfx != -1 ){
		var base_path = file_path.substr(0,search_gfx+gfx_string.length)+"/"+gfx_output_base;
		if ( search_endtag != -1 ){
		    base_path += "/" + endtag_output_extra;
		}else{
		    base_path += "/" + scene_output_extra;
		}
	    }
	    
	    if( search_vfx != -1 ){
		var base_path = file_path.substr(0,search_vfx+vfx_string.length)+"/"+vfx_output_base ;;
	    }
	    
	    alert(base_path);
	    
	    return base_path + "/" + this.getTodayTag();
	},
	setRenderToProjectPath : function( rqItem ){
	    if ( (rqItem.status == 3015) || (rqItem.status == 3013) ){
		    for ( var j = 1 ; j <= rqItem.numOutputModules ; j ++ ){
			o_module = rqItem.outputModule(j);
			var old_name = rqItem.comp.name.replace(".","_");
			//alert(old_name);
			if ( o_module.file != null ){
			    
			    
			    var new_path = this.getOutputBasePath();
			    var new_folder = Folder( new_path );
			    if ( !new_folder.exists ){
				new_folder.create();
			    }
			    //alert(new_path + "/" + old_name)
			    var new_file = new File( new_path + "/" + old_name );
			    o_module.file = new_file ;
			    //alert ( new_path );
			    //o_module.file= new_file;
			    
			}
			
		    var p = String( o_module.file.path ).split("/");
		    
		    p.splice(0,3);
		    
		    var s = "";
		    
		    for ( var i = 0 ; i < p.length ; i ++ ){
			s += "\n"+p[i];
		    }
		    //alert( "Rendering to :" + "\n" + s + "\n\n" + o_module.file.name );
		    }
		}
	},
	setRendersToProjectPath : function(){
	    var q = app.project.renderQueue;
	    //check the render queue item is not already rendered.
	    
	    for ( var i = 1 ; i <= q.numItems ; i ++ ){
		item = q.item(i);
		//3015 is QUEUED 
		//3013 is NEEDS_OUTPUT
		
		if ( (item.status == 3015) || (item.status == 3013) ){
		    this.setRenderToProjectPath( item );
		}
	    }
	},
	renderSelectedToProjectPath: function(){
	    var q = app.project.renderQueue;
	    var items = this.getSelectedProjectItems();
	    for ( var i = 0 ; i < items.length; i ++){
		rqItem = q.items.add(items[i]);
		this.setRenderToProjectPath(rqItem);
	    }
	    q.showWindow(true);
	}
    }

    this.init = function init()
    {	
        /*
	 * Sketching a possible multi button approach.
	this.btnLauyout = 
	"group\
	 {\
	    btn1:Button{\
		preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'],\
		text:'" + this.info.btn1 + "',\
		onClick: "+ this.methods.setRendersToProjectPath;+" ,\
		helpTip:'" + this.info.description + "'\
	    },\
	    btn2:Button{\
		preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'],\
		text:'" + this.info.btn2 + "',\
		helpTip:'" + this.info.description + "'\
	    }\
	}";
	*/
	
	this.btnLauyout = 
	"button{\
	    preferredSize: ['" + this.appearence.buttonWidth + "','" + this.appearence.buttonHeight + "'],\
	    text:'" + this.info.btn1 + "',\
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
		    icon:'" + this.resources.icon.path + '/' + this.resources.icon.name + "',\
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
    this.createUI = function createUI( )
    {
	var myUI = this;
	var res =
	" window {\
	    text: 'RenderToProject',\
		alignment: ['fill','fill'], \
		alignChildren: ['center','top'], \
		orientation: 'column', \
		resizeable: 'true'\
	}";
		
	myUI.window = new Window( res );
	myUI.window.layout.layout(true);

	myUI.window.show();
	
	myUI.window.layout.onResizing = myUI.window.layout.onResize = function () { myUI.layout.resize();}
	
	//EVENT HANDLERS
	
	/*
	myUI.window.tabs.search_tab.doItBtn.onClick = function(){
	    var search_str = myUI.window.tabs.search_tab.searchGrp.searchString.text;
	    var replace_str = myUI.window.tabs.search_tab.replaceGrp.replaceString.text;
	    myUI.methods.replace( myUI.methods.getSelectedProjectItems() , search_str , replace_str );
	};
	
	myUI.window.tabs.suprefix.suprefixGrp.pre.prefixBtn.onClick = function(){
	    var pre = myUI.window.tabs.suprefix.suprefixGrp.su.prefixString.text;
	    myUI.methods.prefix( myUI.methods.getSelectedProjectItems() , pre );
	};
	
	myUI.window.tabs.suprefix.suprefixGrp.su.sufixBtn.onClick = function(){
	    var su = myUI.window.tabs.suprefix.suprefixGrp.su.sufixString.text;
	    myUI.methods.suffix( myUI.methods.getSelectedProjectItems() , su );
	};
	
	myUI.window.tabs.rename_tab.renameGrp.renameBtn.onClick = function(){
	    var new_name = myUI.window.tabs.rename_tab.renameGrp.renameString.text;
	    myUI.methods.rename( myUI.methods.getSelectedProjectItems() , new_name );
	};
	*/
	
	//END EVENT HANDLERS
	
	return(this);
    }
    
    this.yMainFunction = function yMainFunction()
    {	
	//Have to Separate this into "Operators" so I can have mutiple buttons in a single Tool.
        w = this.methods.renderSelectedToProjectPath();
    }
    this.activate = function activate()
    {
	this.yTool.yMainFunction();
    }
    
    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    rtp = new RenderToProject();
    rtp.activate();
}
else
{
    YTB.addTool(new RenderToProject());
}
