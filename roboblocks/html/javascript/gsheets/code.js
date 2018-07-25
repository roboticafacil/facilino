var SS = SpreadsheetApp.openById('1iu4uzAYVXN95Mcud6xJ15EOxB0ZPWh4zuXceLgSt7h0');
var str = "";

function doPost(e) {

  var parsedData;
  var result = {};
  
  try { 
    parsedData = JSON.parse(e.postData.contents);
  } 
  catch(f){
    return ContentService.createTextOutput("Error in parsing request body: " + f.message);
  }
   
  if (parsedData !== undefined){
    // Common items first
    // data format: 0 = display value(literal), 1 = object value
    var flag = parsedData.format;
    
    if (flag === undefined){
      flag = 0;
    }
    
    switch (parsedData.command) {
      case "appendRow":
         var tmp = SS.getSheetByName(parsedData.sheet_name);
         var nextFreeRow = tmp.getLastRow() + 1;
         var now = Utilities.formatDate(new Date(), "GMT+2", "dd-MM-yyyy'T'HH:mm:ss'Z'");
         var nowHour = now.slice(11,19);
         var nowDay = now.slice(1,10);
         var values = nowDay+","+nowHour+","+parsedData.values;
         var dataArr = values.split(",");
         tmp.appendRow(dataArr);
         
         str = "Success";
         SpreadsheetApp.flush();
         break;     
       
       
    }
    
    return ContentService.createTextOutput(str);
  } // endif (parsedData !== undefined)
  
  else{
    return ContentService.createTextOutput("Error! Request body empty or in incorrect format.");
  }
  
  
}