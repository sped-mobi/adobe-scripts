



main();


function main(){
        var doc = app.activeDocument;
        
        var v = get_variables ();
        
        
        
        setVariable("LP_Year", "2021"); 
        setVariable("LP_LessonPlansTitle", "Applied Learning Environment"); 
        setVariable("LP_LessonPlansSubtitle", "Lesson Plans"); 
        setVariable("LP_SchoolTitle", "O'Banion Middle School"); 
        setVariable("LP_TeacherFullName", "Brad Marshall"); 
        setVariable("LP_TeacherAideFullName", "Breshet Lockett"); 
        
        
        
        /*setVariable("LP_Month", "November");
        setVariable("LP_LeveledBookTitle", "Aika's Wedding");

        setVariable("LP_Ch1Title", "Where Will They Travel?");
        setVariable("LP_Ch2Title", "Planning the Trip");
        setVariable("LP_Ch3Title", "Maurice's Beach Trip");
        setVariable("LP_Ch4Title", "Alexa's City Trip");
        setVariable("LP_Ch5Title", "Trey's Fishing Trip");
        setVariable("LP_Ch6Title", "Time to Pick the Trip");
        */
        
        var x = 1;
    
    }


   function setVariable(name, value) {
         var v = app.activeDocument.textVariables;
		for (var i = 0; i < v.length; i++) {
			if (v[i].variableType == VariableTypes.customTextType) {
				if (v[i].name == name){
                        v[i].variableOptions.contents = value;
                    }
			}
		}
	}

function get_variables () {
		var arr = [];
		var v = app.activeDocument.textVariables;
		for (var i = 0; i < v.length; i++) {
			if (v[i].variableType == VariableTypes.customTextType) {
				arr.push ({label: v[i].name, content: v[i].variableOptions.contents});
                  //arr.push(new KeyValuePair(v[i].name, v));
			}
		}
		return arr;
	}

