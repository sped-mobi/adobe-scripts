
main();
function main(){
        
        var doc = app.activeDocument;
        if (doc){
                    var guides = getAllGuides(doc);
                    
            
                    var guidesLayer = getOrCreateLayer(doc, "Guides", UIColors.GRID_GREEN);
                    
                    for (var i = 0; i < guides.length; i++){
                            var guide = guides[i];
                            var props = guide.properties;
                            props.itemLayer = guidesLayer;
                            props.guideColor = UIColors.FIESTA
                            
                            document.guides.add(guidesLayer, props);
                            
                            guide.remove();
                        }
                    
                    
                    
                    
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

function getAllGuides(doc){
        var retVal = [];
         for (var i = 0; i < doc.layers.length; i++){
                var layer = doc.layers[i];

                for (var j = 0; j < layer.guides.length; j++){
                        guide = layer.guides[j];
                        retVal.push(guide);
                    }
            }       
         return retVal;
    }

function removeAllGuides(doc){
        for (var i = 0; i < doc.layers.length; i++){
                var layer = doc.layers[i];               
                for (var j = 0; j < layer.guides.length; j++){
                        guide = layer.guides[j];
                        guide.remove();
                    }
            }
        for (var i = 0; i < doc.pages.length; i++){
                 var page = doc.pages[i];               
                for (var j = 0; j < page.guides.length; j++){
                        guide = page.guides[j];
                        guide.remove();
                    }           
            
            }
    }