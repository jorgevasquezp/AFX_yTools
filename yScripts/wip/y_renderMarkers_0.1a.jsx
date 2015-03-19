#include "usefulFunctions.jsx";

function yExportPng(comp,time,name,path){
    var oldResolutionFactor = comp.resolutionFactor;
    comp.resolutionFactor=[1,1];
    if(typeof(name)=='undefined'){
        var name = app.project.activeItem.name;
        }
    if(typeof(comp)=='undefined'){
        var comp = app.project.activeItem;
        }    
    if(typeof(path)=='undefined'){
        var path = app.project.file.path;
        }
    //alert(path+'/'+name+'.png')
    var file = new File(path+'/'+name+'.png');
    comp.saveFrameToPng(time,file);
    file.close();
    comp.resolutionFactor=oldResolutionFactor;
    return 'Exported.'
    }

function marker(time,text){
    this.time = time;
    this.text = text;
    return this
    }

function exportMartkers(){
    
    activeItem = app.project.activeItem;
    myString = 'export_frames';

    if(activeItem.layer(myString)!=null){
        myLayer =activeItem.layer(myString);
        frames = [];

        for(i=1;i<=myLayer.property("Marker").numKeys;i++){
            var time = myLayer.property("Marker").keyTime(i);
            var text = mergeMultiLine(myLayer.property("Marker").keyValue(i).comment);
            frames.push(new marker(time,text));
            }
        if(frames.length==0){
             alert('The '+myString+' layer contains no markers.','yRenderMarkers');
            }
        
        for(i=0;i<frames.length;i++){
        var n = activeItem.name+'_'+frames[i].text;
        yExportPng(activeItem,frames[i].time,n,'/c')
    }
        //alert(frames);
    }else{
        createNull = confirm('No '+myString+' layer found, do you want to create one?',true,'yRenderMarkers');
        if(createNull==true){
            myNull = app.project.activeItem.layers.addNull();
            myNull.name = myString;
            }else{
        alert('A '+myString+' layer is required for the script to work.','yRenderMarkers');
        }
    }

    
}

exportMartkers();
