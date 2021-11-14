

main();
 function main(){
    var doc = app.activeDocument;
    var preferences = app.documentPreferences;
    with(preferences){
        pageHeight = "11in";
        pageWidth = "8.5in";
        pageOrientation = PageOrientation.portrait;
        pagesPerDocument = 1;
        facingPages = true;
        createPrimaryTextFrame = true;
       
    }
    
        with(doc.viewPreferences){
            rulerOrigin = RulerOrigin.pageOrigin;
            horizontalMeasurementUnits = MeasurementUnits.inches;
            verticalMeasurementUnits = MeasurementUnits.inches;
            
           
        }
        
        
        
           
}
