
main();
function main(){
    
        var doc = app.activeDocument;
        
       
        if (doc){
            
            var image = getOrCreateObjectStyle(doc, "Proportional Image");
            var text = getOrCreateObjectStyle(doc, "Padded Text");
            var grid = getOrCreateObjectStyle(doc, "Grid");
            
            
            
            text.basedOn = "[Basic Text Frame]";         
            image.basedOn = "[Basic Graphics Frame]";
            grid.basedOn = "[Basic Grid]";
            
            image.frameFittingOptions.autoFit = true;
            image.frameFittingOptions.fittingOnEmptyFrame = EmptyFrameFittingOptions.PROPORTIONALLY;
            
        } else {

            
        }


}

function getOrCreateObjectStyle(doc, styleName){
     var result;
    try{
        result = doc.objectStyles.item(styleName)
        var name = result.name;
    }
    catch (myError){
        result = doc.objectStyles.add({name: styleName});
    }
    return result;       
    
}