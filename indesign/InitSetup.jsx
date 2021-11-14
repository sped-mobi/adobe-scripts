
var notesLayer;
var guidesLayer;
var textLayer;
var contentLayer;

main();
function main(){
        
    
    var doc = createDocument("Test Document");

    
    

}


function createDocument(name){
    var doc = app.documents.add({name: name});
    setDocumentPreferences(doc);
    addCommonLayers(doc);
    addCommonMasters(doc);
    return doc;
}

function addCommonMasters(doc){
            var aMaster = doc.masterSpreads.item("A-Master");
            var bMaster = getOrCreateMasterSpread(doc, "B", "Master", false);
            var masterSpread = getOrCreateMasterSpread(doc, "MS", "Master Spread", false);
            masterSpread.appliedMaster = aMaster;
            var tocSpread = getOrCreateMasterSpread(doc, "TOC", "Table of Contents", false);
            var coverPage = getOrCreateMasterSpread(doc, "CP", "Cover Page", true);
            var backPage = getOrCreateMasterSpread(doc, "BP", "Back Page", true);
            tocSpread.appliedMaster = bMaster;
            setMasterMarginPreferences(aMaster, "1in", "1in", "1in", "2.25in");
            setMasterMarginPreferences(bMaster, "1in", "1in", "2.25in", "1in");
            setMasterMarginPreferences(coverPage, "1in", "1in", "1in", "1in");
            setMasterMarginPreferences(backPage, "1in", "1in", "1in", "1in");
            fixTextFrames(doc);
    }

function fixTextFrames(doc){
    for (var x = 0; x < doc.masterSpreads.length; x++){
            var master = doc.masterSpreads[x];
            for (var i = 0; i < master.pages.length; i++) {
                        var page = master.pages[i];
                        for (var j = 0; j < page.textFrames.length; j++){
                                var frame = page.textFrames[j];
                                frame.geometricBounds = getBounds(doc, page);
                            }
                }              
        }
    }

function createMarginBoundTextFrame(doc, page){
        var frame = doc.textFrames.add();
        frame.geometricBounds = getBounds(doc, page);
        return frame;
}

function getBounds(doc, page){
    var pageWidth = doc.documentPreferences.pageWidth;
    var pageHeight = doc.documentPreferences.pageHeight;
    if(page.side == PageSideOptions.leftHand){
            var X2 = page.marginPreferences.left;
            var X1 = page.marginPreferences.right;
        }
        else{
            var X1 = page.marginPreferences.left;
            var X2 = page.marginPreferences.right;
            }
    var Y1 = page.marginPreferences.top;
    var X2 = pageWidth - X2;
    var Y2 = pageHeight - page.marginPreferences.bottom;
    return [Y1, X1, Y2, X2];
}

function getOrCreateMasterSpread(doc, namePrefix, baseName, single){
        var name = "";
        name += namePrefix;
        name += "-";
        name += baseName;
        var master = doc.masterSpreads.item(name);
        if (!master.isValid){
                master = doc.masterSpreads.add();
                master.namePrefix = namePrefix;
                master.baseName = baseName;
                if (single){
                         for (var i = 1; i < master.pages.length; i++) {
                                master.pages[i].remove();
                        }
                }
        }
        return master;
}

function setMasterMarginPreferences(master, top, bottom, inside, outside){
         for (var i = 0; i < master.pages.length; i++){
                var page = master.pages[i];
                setPageMarginPreferences(page, top, bottom, inside, outside);
        }   
 }

function setPageMarginPreferences(page, top, bottom, inside, outside){
        with (page.marginPreferences){
                columnCount = 1;
                
                bottom = bottom;
                //When document.documentPreferences.facingPages == true,
                //"left" means inside
                left = inside;
                
                // "right" means outside.
                right = outside;
                
                top = top;
         }       
}

function setDocumentPreferences(doc){
    with(doc.documentPreferences){
        pageHeight = "11in";
        pageWidth = "8.5in";
        pageOrientation = PageOrientation.portrait;
        pagesPerDocument = 1;
        facingPages = true;
        createPrimaryTextFrame = true;
        marginGuideColor = UIColors.FIESTA;
        columnGuideColor = UIColors.FIESTA;
     }
     with(doc.viewPreferences){
         rulerOrigin = RulerOrigin.pageOrigin;
         horizontalMeasurementUnits = MeasurementUnits.inches;
         verticalMeasurementUnits = MeasurementUnits.inches;
     }
     with(doc.guidePreferences){
            rulerGuidesColor = UIColors.FIESTA
     }
}



function addCommonLayers(doc){
    notesLayer = getOrCreateLayer(doc, "Notes", UIColors.BLACK);
    guidesLayer = getOrCreateLayer(doc, "Guides", UIColors.CHARCOAL);
            
    textLayer = doc.layers.item("Layer 1");
    textLayer.name = "Text";
    textLayer.layerColor = UIColors.BLACK;
            
    contentLayer = getOrCreateLayer(doc, "Content", UIColors.BLUE);
            
    notesLayer.move(LocationOptions.BEFORE, contentLayer);
    guidesLayer.move(LocationOptions.AFTER, notesLayer);
    textLayer.move(LocationOptions.AFTER, contentLayer);
    doc.activeLayer = textLayer;
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