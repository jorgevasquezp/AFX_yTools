//app.project.renderQueue.render()
sl = app.project.activeItem.selectedLayers;
//a = app.project.renderQueue.items[1]

function Marker(time,comment,layer){
    
    this.time = time;
    this.comment = comment;
    this.layer = layer;
    
    return this
    }
markers = [];

//alert(new marker(50,'asdads').time);

for(i=0;i<sl.length;i++){
    
    for(j=1;j<=sl[i].property("Marker").numKeys;j++){
        var time = sl[i].property("Marker").keyTime(j);
        var comment = sl[i].property("Marker").keyValue(j).comment;
        var layer = sl[i];
        markers.push(new Marker(time,comment,layer));
        }    
    }

function addMarkers(){
    for(i=0;i<markers.length;i++){
        var item = app.project.renderQueue.items.add(markers[i].layer.containingComp);
        item.timeSpanStart = markers[i].time;
        item.timeSpanDuration = markers[i].layer.containingComp.frameDuration;
        alert(item.timeSpanStart)
    }
    return 'Markers Succesfully added to render Queue.'
}
addMarkers()
//nKeys = app.project.activeItem.lselectedLayers.property(1).numKeys;

//var myMarker = new MarkerValue("Fade Up");
//app.project.activeItem.property("Marker").setValueAtTime(2, myMarker);