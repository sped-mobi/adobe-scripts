main();

function main() {
    //Make certain that user interaction (display of dialogs, etc.) is turned on.
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
    displayDialog();
}

function displayDialog() {
    var doc = app.activeDocument;
    var dialog = app.dialogs.add({
        name: "Create Default InDesign Styles"
    });
    with(dialog.dialogColumns.add()) {
        staticTexts.add({
            staticLabel: "Base Body Style Name: "
        });
        staticTexts.add({
            staticLabel: "Heading Level 6 Name: "
        });
         staticTexts.add({
            staticLabel: "Heading Level 5 Name: "
        });
         staticTexts.add({
            staticLabel: "Heading Level 4 Name: "
        });
         staticTexts.add({
            staticLabel: "Heading Level 3 Name: "
        });
         staticTexts.add({
            staticLabel: "Heading Level 2 Name: "
        });
         staticTexts.add({
            staticLabel: "Heading Level 1 Name: "
        });
    }

    with(dialog.dialogColumns.add()) {
        var baseStyleEditBox = textEditboxes.add({
            editContents: "B0_Body",
            minWidth: 100
        });
        var heading6StyleEditBox = textEditboxes.add({
            editContents: "H6_Heading",
            minWidth: 100
        });
         var heading5StyleEditBox = textEditboxes.add({
            editContents: "H5_Heading",
            minWidth: 100
        });
         var heading4StyleEditBox = textEditboxes.add({
            editContents: "H4_Heading",
            minWidth: 100
        });
         var heading3StyleEditBox = textEditboxes.add({
            editContents: "H3_Heading",
            minWidth: 100
        });
         var heading2StyleEditBox = textEditboxes.add({
            editContents: "H2_Heading",
            minWidth: 100
        });
         var heading1StyleEditBox = textEditboxes.add({
            editContents: "H1_Heading",
            minWidth: 100
        });
    }
    
    with(dialog.dialogColumns.add()) {
        var italicCheckBox = checkboxControls.add({
            staticLabel: "Italic",
            minWidth: 100,
            checkedState: true
        });
        var obliqueCheckBox = checkboxControls.add({
            staticLabel: "Oblique",
            minWidth: 100,
            checkedState: true
        });
        var boldCheckBox = checkboxControls.add({
            staticLabel: "Bold",
            minWidth: 100,
            checkedState: true
        });
        var blackCheckBox = checkboxControls.add({
            staticLabel: "Black",
            minWidth: 100,
            checkedState: true
        });
    }

    var result = dialog.show();
    if (result){
        var baseName = baseStyleEditBox.editContents;
        var heading6Name = heading6StyleEditBox.editContents;
        var heading5Name = heading5StyleEditBox.editContents;
        var heading4Name = heading4StyleEditBox.editContents;
        var heading3Name = heading3StyleEditBox.editContents;
        var heading2Name = heading2StyleEditBox.editContents;
        var heading1Name = heading1StyleEditBox.editContents;
                       
        baseStyle = createParagraphStyle(baseName);
        updateBodyStyleHyphenation(baseStyle);
        
        heading6Style = createParagraphStyle(heading6Name);   
        heading5Style = createParagraphStyle(heading5Name);
        heading4Style = createParagraphStyle(heading4Name);
        heading3Style = createParagraphStyle(heading3Name);
        heading2Style = createParagraphStyle(heading2Name);
        heading1Style = createParagraphStyle(heading1Name);
               
        heading6Style.basedOn = baseStyle;
        heading6Style.nextStyle = baseStyle;
        heading6Style.hyphenation = false;
        
        heading5Style.basedOn = heading6Style;
        heading5Style.basedOn = baseStyle;
        heading5Style.hyphenation = false;
        
        heading4Style.basedOn = heading5Style;
        heading4Style.nextStyle = baseStyle;
        heading4Style.hyphenation = false;
              
        heading3Style.basedOn = heading4Style;
        heading3Style.nextStyle = baseStyle;
        heading3Style.hyphenation = false;
        
        heading2Style.basedOn = heading3Style;
        heading2Style.nextStyle = baseStyle;
        heading2Style.hyphenation = false;
            
        heading1Style.basedOn = heading2Style;
        heading1Style.nextStyle = baseStyle;
        heading1Style.hyphenation = false;
        
        if (italicCheckBox.checkedState){
            createCharacterStyle("Italic", "Italic");
        }
         if (obliqueCheckBox.checkedState){
            createCharacterStyle("Oblique", "Oblique");
        }
         if (boldCheckBox.checkedState){
            createCharacterStyle("Bold", "Bold");
        }
         if (blackCheckBox.checkedState){
            createCharacterStyle("Black", "Black");
        }
    
        dialog.destroy();
    } 
    else {
        dialog.destroy();
    }
}

function createCharacterStyle(style_name, font_style){
    var style;
    try {
        style = app.activeDocument.characterStyles.item(style_name);
        var sn = style.name;
    } catch (e){
        style =  app.activeDocument.characterStyles.add();
        style.properties = { name: style_name, fontStyle: font_style};                
    }
    return style;
}

function createParagraphStyle(style_name){
    var style;
    try {
        style = app.activeDocument.paragraphStyles.item(style_name);
        var sn = style.name;
    } catch (e){
        style =  app.activeDocument.paragraphStyles.add();
        style.properties = { name: style_name };                 
    }
    return style;
}

function updateBodyStyleHyphenation(paragraphStyle){
    paragraphStyle.hyphenation = true;
    paragraphStyle.hyphenWeight = 0; 
    paragraphStyle.hyphenateWordsLongerThan = 7;
    paragraphStyle.hyphenateAfterFirst = 5;
    paragraphStyle.hyphenateBeforeLast = 4;
    paragraphStyle.hyphenateLadderLimit = 1;
    paragraphStyle.hyphenateLastWord = false;
    paragraphStyle.hyphenateAcrossColumns = false;
    paragraphStyle.hyphenateCapitalizedWords = false;
}
