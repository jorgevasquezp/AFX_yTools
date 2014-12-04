#include '/c/Program Files/01_Design/Adobe After Effects CS5.5/Support Files/Scripts/yScripts/y_JSExtensions.jsx'
function getComps(folderItem){
    _comps = [];
        for(i=1;i<=folderItem.numItems;i++){
            item = folderItem.item(i);
            if(item.typeName=='Composition'){
                _comps.push(item);
            }
        }
    return _comps
}
function getFolders(folderItem){
    _folders = [];
    for(i=1;i<=folderItem.numItems;i++){
        item = folderItem.item(i);
        if(item.typeName=='Folder'){
            _folders.push(item);
        }
    }
    return _folders
}
function getItems(folderItem){
    _folders = getFolders(folderItem);
    _comps = getComps(folderItem);
    while(_folders.length!=0){
        newFolderItem = _folders.shift();
        _comps = _comps.concat(getComps(newFolderItem));
        _folders = _folders.concat(getFolders(newFolderItem));
        }
    return _comps
}
function getLayers(compItem){
    layers = [];
    for(i=1;i<=compItem.numLayers;i++){
        item = compItem.layer(i);
        if(item.matchName == 'ADBE AV Layer'){
        if(item.source.typeName == 'Composition'){
            layers.push(item)
        }
    }
    }
    return layers
}


//_replaceMe = getLayers(app.project.item(6))
//b = app.project.ac
function doIt(){
app.beginUndoGroup('a')
for(i=0;i<_replaceMe.length;i++){
         replaceable = _replaceMe[i];
   
    hit = null;
    
    for(k=0;k<_replaceWith.length;k++){
        replacement = _replaceWith[k];
        //alert(String(replaceable.source.name)+','+String(replacement.name))
       
        if(replaceable.source.name==replacement.name){
            hit = replacement;
            }
        }
    if(hit!=null){
        _replaceMe[i].replaceSource(hit,false)
        }else{
    _replaceMe[i].property("Marker").addKey(0)
    }
}
app.endUndoGroup()
}

function getComp(){
    comp = app.project.activeItem
    return  comp
    }

/*
//STEP 1
_replaceMe = getLayers(getComp())

//STEP 2
_replaceWith = getItems(app.project.activeItem)
doIt()

*/