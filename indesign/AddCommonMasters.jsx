
var doc;


main();
function main(){
        
        doc = app.activeDocument;
        
        if (doc){
            

            
            
            
            var x = 1;
        }
    
}

function addCommonMasters(doc){
            var aMaster = doc.masterSpreads.item("A-Master");
            var bMaster = getOrCreateMasterSpread("B", "Master", false);
            var masterSpread = getOrCreateMasterSpread("MS", "Master Spread", false);
            masterSpread.appliedMaster = aMaster;           
            var coverPage = getOrCreateMasterSpread("CP", "Cover Page", true);            
            var backPage = getOrCreateMasterSpread("BP", "Back Page", true);           
            var tocSpread = getOrCreateMasterSpread("TOC", "Table of Contents", false);           
            tocSpread.appliedMaster = bMaster;
            
            setMasterMarginPreferences(aMaster, "1in", "1in", "1in", "2.25in");
            setMasterMarginPreferences(bMaster, "1in", "1in", "2.25in", "1in");
            setMasterMarginPreferences(coverPage, "1in", "1in", "1in", "1in");
            setMasterMarginPreferences(backPage, "1in", "1in", "1in", "1in");        
    }


function getOrCreateMasterSpread(namePrefix, baseName, single){
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
        for (var i = 0; i < master.pages.length; i++) {
            var currentPage = master.pages[i];
            createMarginBoundTextFrame(doc, currentPage);
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