//Useful extensions to the JavaScript class versions that come with the default ExtendScript version.

if (Array.prototype.getOne==null) Array.prototype.getOne=function(item){    //Extends the Array class with the getOne functions wich 
    var val = -1;
    for(i=0;i<=this.length;i++){
        if(this[i]==item){
            var val = i;
            }
        }
   return val;
}
