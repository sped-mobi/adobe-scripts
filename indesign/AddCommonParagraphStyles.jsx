main();
function main(){
    var doc = app.activeDocument;
        
    var base = getOrCreateParagraphStyle(doc, "Base");
    var body = getOrCreateParagraphStyle(doc, "Body");
    var title = getOrCreateParagraphStyle(doc, "Title");
    var subtitle = getOrCreateParagraphStyle(doc, "Subtitle");
    
    body.basedOn = base;
    title.basedOn = body;
    subtitle.basedOn = body;

}

function getOrCreateParagraphStyle(doc, name){
    var style = doc.paragraphStyles.item(name);
    if (!style.isValid){
        style = doc.paragraphStyles.add({name: name});
    }        
    return style;
}