
var notesLayer;
var guidesLayer;
var textLayer;
var contentLayer;

main();
function main(){
        
        var doc = app.activeDocument;
        
        if (doc){
            
            addCommonLayers(doc);
            
        }
        
        
    
}

function addCommonLayers(doc){
    notesLayer = getOrCreateLayer(doc, "Notes", UIColors.BLACK);
    guidesLayer = getOrCreateLayer(doc, "Guides", UIColors.GRID_GREEN);          
    textLayer =  getOrCreateLayer(doc, "Layer 1", UIColors.RED);
    textLayer.name = "Text";
    contentLayer = getOrCreateLayer(doc, "Content", UIColors.BLUE);
            
    notesLayer.move(LocationOptions.BEFORE, contentLayer);
    guidesLayer.move(LocationOptions.AFTER, notesLayer);
    textLayer.move(LocationOptions.BEFORE, contentLayer);
    
    for (var i = 0; i < doc.layers.length; i++){
                var layer = doc.layers[i];
                if (layer.name == "Notes" || 
                    layer.name == "Guides" ||
                    layer.name == "Text" ||
                    layer.name == "Content"){
                            continue;
                        }
                    layer.remove();
        }
}


function getOrCreateLayer(doc, name, color){    
    var layer = doc.layers.item(name);
    if (!layer.isValid){
         layer = doc.layers.add();
    }
    layer.name = name;
    layer.layerColor = color;
    layer.ignoreWrap = false;
    layer.visible = true;
    return layer;
 }