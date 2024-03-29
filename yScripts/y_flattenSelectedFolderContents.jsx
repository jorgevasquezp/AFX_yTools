﻿#include "../yScripts/y_JSExtensions.jsx";
function yFlattenSelectedFolderContentsTool()
{
    this.info =
    {
	name : "yFlatten",
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
    this.resources = 
    {
	icon : new File('yNet.png'),
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
    this.createUI = function createUI()
    {
		
		
	this.window = new Window ( this.res );
	this.window.show() ;
    }
    
	this.getSelectedProjectItems = function getSelectedProjectItems (){
		var items = [];
		var p = app.project;
		for ( var i = 1 ; i <= p.numItems ; i ++ ){
			var item = p.item(i);
			if ( item.selected ){
				items.push(item);
			}
		}
		return items;
	}
	this.getAllItems = function getAllItems( folderItem ){
		
		var items = [];
		var folders = [];
		
		for ( var i = 1 ; i <= folderItem.numItems ; i ++ ){
		var item = folderItem.item(i);
		
		if ( (item.typeName != "Folder") ){
				//if ( (isInArray( items ,item )) == false ){
					items.push( item );
				//}
			}else{
					var new_items = yFlattenSelectedFolderContentsTool().getAllItems(item);
					for ( var j = 0 ; j < new_items.length ; j ++ ){
						new_item = new_items[j];
						//if ( (isInArray ( new_item )) == false ){
							items.push ( new_item );
						//}
					}
				}
			}
		return items
	}
	this.flatten = function flatten( items, root ){
		app.beginUndoGroup("Flatten Selected Folder Contents")
		for ( var i = 0; i < items.length ; i ++){
			item = items[i];
			item.parentFolder = root;
		}
		app.endUndoGroup()
		purgeEmptyFolders();
		return
	}
	this.purgeEmptyFolders = function purgeEmptyFolders(){
		//app.beginUndoGroup("Purge Empty Folders")
		var emptyFolders = [];
		
		var p = app.project;
		for ( var i = p.numItems ; i >= 1 ; i -- ){
			item = p.item(i);
			if ( item.typeName == "Folder" ){
				if ( item.numItems <= 0 ){
					item.remove();
				}
			}
		}
		
		//app.endUndoGroup()
	}
    this.yFlattenSelectedFolderContents = function yFlattenSelectedFolderContents()
    {
	//alert("is this working");
	//app.beginUndoGroup(yFlattenSelectedFolderContentsTool().info.description);
	yFlattenSelectedFolderContentsTool().flatten( yFlattenSelectedFolderContentsTool().getAllItems( yFlattenSelectedFolderContentsTool().getSelectedProjectItems()[0] ) , yFlattenSelectedFolderContentsTool().getSelectedProjectItems()[0] );
	//app.endUndoGroup();
    }
    
    this.activate = this.yFlattenSelectedFolderContents;
    
    this.init();
    return this;
}

//CHECKS that the toolbox exists, and if it doesn´t it runs the script on its own.
if (typeof(YTB)=='undefined')
{
    yFlattenSelectedFolderContentsTool = new yFlattenSelectedFolderContentsTool();
    yFlattenSelectedFolderContentsTool.activate();
}
else
{
    yFlattenSelectedFolderContentsTool = YTB.addTool(new yFlattenSelectedFolderContentsTool());
}
