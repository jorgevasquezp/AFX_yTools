if (Array.prototype.getOne==null) Array.prototype.getOne=function(item){    //Extends the Array class with the getOne functions wich 
    var val = -1;
    for(i=0;i<=this.length;i++){
        if(this[i]==item){
            var val = i;
            }
        }
   return val;
}
function yFactor(n,f){
    if((typeof(n)=='number'&&typeof(f)=='number')&&(n>f)){
        value = n - (n%f);
        return(value);
    }else{
        alert('error');
    }
}
