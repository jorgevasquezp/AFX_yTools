#include "y_JSExtensions.jsx";
/*
if (Array.prototype.getOne==null) Array.prototype.getOne=function(item){    //Extends the Array class with the getOne functions wich 
    var val = -1;
    for(i=0;i<=this.length;i++){
        if(this[i]==item){
            var val = i;
            }
        }
   return val;
}
*/
function sortNumber(a,b)
{
return a - b;
}

function pad(n,i){ //pad n with ceroes up to i places.
    if (String(n).length>=i){
        return String(n)
    }else{
        dif = i- (String(n)).length;
        padding = "";
        for (p=0;p<dif;p++){
            padding = padding+"0"
            }
        return padding+String(n)
}
}


function yUniStr(str){
    if (app.project.activeItem != null) {
        myLayers = app.project.activeItem.layers;
        //myLayerNames = [];
        nameMatches = [];
        for (i=1;i<=myLayers.length;i++){
            if(getBaseName(myLayers[i].name) == getBaseName(str)){
                nameMatches.push(getN(myLayers[i].name))
            }
       
        }
    
    newN = getFirstGap(nameMatches);
    if(nameMatches.length == 0 | (newN==0)){
            return str
        }else{
            return str+' '+newN
        }
    }else{
        alert('E01 : No Comp is ACTIVE')
    }
}
function getN(str){
    lastChunk = str.substr(str.lastIndexOf(' '),str.length);
   if(lastChunk == parseInt(lastChunk)){
       return parseInt(lastChunk);
       }else{
           return 0;
           };
    }
function getBaseName(str){
    lastChunk = str.substr(str.lastIndexOf(' '),str.length);
   if(lastChunk == parseInt(lastChunk)){
       return str.substr(0,str.lastIndexOf(' '));
       }else{
           return str;
           };
    }

function getFirstGap(array){
    length = array.length
    array.sort(function sortNumber(a,b){return a-b})
    max = array[array.length-1]
    for (n=0;n<=max;n++){
        entry = array.getOne(n);
        if (entry == -1){
            return n
            }
        }
      return max+1
   return array[0];
}
function yReplace(inputSTR,replaceSTR,replacementSTR){
    tmpArray = inputSTR.split(replaceSTR);
    tmpSTR = '';
    for(i=0;i<tmpArray.length;i++){
        tmpSTR = tmpSTR+tmpArray[i]
        if(i<tmpArray.length-1){
        tmpSTR = tmpSTR+replacementSTR;
        }
        }
    return tmpSTR;
    }


function genStamp(args){
    d = new Date();
    //alert(d.getMonth());
    y =  String(d.getFullYear()).substring(2,4);
    m = pad(d.getMonth()+1,2);
    d =  pad(d.getUTCDate(),2);
    str = String(m)+String(d)+String(y); 
return str
}

function mergeMultiLine(_str){
    var re = new RegExp('[\n\r]');
    _lines = _str.split(re);
    newStr = '';

    if(_lines.length>1){
        for(L=0;L<_lines.length;L++){
            alert(_lines[L]);
            if(L==_lines.length-1||_lines[L]==''){
                dash = '';
            }else{
                dash = '.';
            }
        if(_lines[L]!=''){
                newStr = newStr+_lines[L]+dash;
            }else{
                newStr = newStr;
            }
        }
    }else{
        newStr = _str;
    }
    return newStr;
}