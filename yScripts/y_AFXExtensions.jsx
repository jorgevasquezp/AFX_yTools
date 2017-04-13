//Useful extensions to AFX Extendscript classes.

if (AVLayer.prototype. getPins==null) AVLayer.prototype. getPins=function(){    //Extends the AVLayer class with the getPinsfunctions which returns the Layer's property groups which are pins.
    this.selectedPins = [];
  for(prop=0;prop<this.selectedProperties.length;prop++){
      p= this.selectedProperties[prop];
      if(p.matchName=="ADBE FreePin3 PosPin Atom"){
      this.selectedPins.push(p);
      }
      }
 return this.selectedPins;
 }

function yMkUnique(aString){
	myLayers = app.project.activeItem.layers;
	uniqueness = 1;
	for(i=1;i<=myLayers.length;i++){
		if(aString == myLayers[i].name){
			uniqueness++;
			}
		}
	return(aString+'_'+uniqueness);
}
s = 'asdas_1';
alert(s.length);
alert(yMkUnique('apple'))
