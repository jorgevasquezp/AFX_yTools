#include "usefulFunctions.jsx"
alert(pad(5,10))
/*
 app.project.renderQueue.items.add(app.project.item(1))
a = app.project.renderQueue.items[1];
a = app.project.activeItem;
alert(a)
*/

function rndrPatch(){
    
    if(String(app.project.activeItem)=='[object CompItem]'){    
        var myComp = app.project.activeItem;
        var item =app.project.renderQueue.items.add(myComp);
        item.timeSpanStart = app.project.activeItem.workAreaStart;
        item.timeSpanDuration = app.project.activeItem.workAreaDuration;
        return 'Done'
    }else{
        return 'Error'
    }
}

function rndrAddStamp(RQItem){
    return RQItem
}

function rndrRelocate(){
    justEnabled = true;
    var numItems = app.project.renderQueue.items.length;
    var myFolder = Folder.selectDialog();
    
    for(i=1;i<=numItems;i++){
        myItem =app.project.renderQueue.item(i);
        
        if(!justEnabled||myItem.render){
            var f =new File(myFolder.absoluteURI+'/'+myItem.outputModule(1).file.name);
            myItem.outputModule(1).file = f;
        }
    }
    return 'Done.'
}

 //rndrRelocate()
/*
myFolder = Folder.selectDialog();
a = new File(myFolder.absoluteURI+'/'+'asdasd_[######].png');
app.project.renderQueue.item(1).outputModule(1).file = a;
//a = rndrAddStamp(app.project.renderQueue.item(1).outputModule(1).file.name);
*/
rndrPatch()