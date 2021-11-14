
main();
function main(){
    var doc = app.activeDocument;

    var bold = getOrCreateCharacterStyle(doc, "Bold", "Bold");
    var italic = getOrCreateCharacterStyle(doc, "Italic", "Italic");
    var regular = getOrCreateCharacterStyle(doc, "Regular", "Regular");
    var blackOut = getOrCreateCharacterStyle(doc, "Blackout", "");
    var underline = getOrCreateCharacterStyle(doc, "Underline", "");
    
    underline.underline = true;
    underline.underlineColor = "Black"
    underline.underlineOffset = 1;
    underline.underlineType = "Solid";
    underline.underlineWeight = 1;
    
    var x = 1;
}


function getOrCreateCharacterStyle(doc, name, fontStyle){
    var result;
    try{
        result = doc.characterStyles.item(name)
        var name = result.name;
        if (fontStyle != ""){
            result.fontStyle = fontStyle;
        }
    }
    catch (myError){
        result = doc.characterStyles.add({name: name, fontStyle: fontStyle});
    }
    return result;
}

