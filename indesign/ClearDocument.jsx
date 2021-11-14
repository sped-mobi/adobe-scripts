main();
function main(){
    
var templatePath = "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\TM_BodySpread.fm";

createDocumentFromTemplate(templatePath, "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\CH_NumbersAndQuantity.fm");
createDocumentFromTemplate(templatePath, "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\CH_AlgebraicThinking.fm");
createDocumentFromTemplate(templatePath, "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\CH_Fractions.fm");
createDocumentFromTemplate(templatePath, "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\CH_MeasurementAndData.fm");
createDocumentFromTemplate(templatePath, "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\CH_Geometry.fm");
createDocumentFromTemplate(templatePath, "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\CH_RatioAndProportions.fm");
createDocumentFromTemplate(templatePath, "C:\\Users\\bmars\\Creative Cloud Files\\projects\\Framemaker\\uls-instructional-guides\\CH_StatisticsAndProbability.fm");
    
    
    }







function createDocumentFromTemplate(templatePath, outputPath){
        var document = SimpleNewDoc(templatePath, false);
        
        
        
        document.Save(outputPath,  null, AllocatePropVals());
        document.Close();
        
    }