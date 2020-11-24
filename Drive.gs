function onDriveItemsSelected(e) {
  //isolate GP details from document
  const itemId = e.drive.selectedItems[0].id;
  const paragraphs = DocumentApp.openById(itemId).getBody().getParagraphs();
  let gpStartIndex;
  let gpEndIndex;
  
  for (let i = 0; i < paragraphs.length; i++){
    let thisParagraph = paragraphs[i].getText();
    if (thisParagraph.indexOf('Location:') >= 0) {
      gpStartIndex = (i + 1)
    } else if (thisParagraph.indexOf('d.o.b.') >= 0) {
      gpEndIndex = (i - 3)
    }
  }
  let difference = 0;

  if (gpEndIndex > gpStartIndex) {
    difference = gpEndIndex - gpStartIndex;
  }
  
  let addressArr = [];
  
  for (let i = 0; i < difference; i++){
    let currentPar = paragraphs[gpStartIndex + i].getText();
    if (currentPar.length !== 0) {
      addressArr.push(currentPar)
    }
  }
  
  let postCode = addressArr.reverse()[0];

  //search database for existing GP
  const sheetId = ''; ///INSERT YOUR SHEET ID HERE TO COLLECT CONTACTS/////////////////////////////////////
  const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  let foundRow = 0;
  
  for (let i = 1; i < values.length; i++){
    if (values[i][1] !== undefined) {
      if (values[i][1] == postCode) { // if postcode is found row is referenced for other practice information
        foundRow = i
      }
    }
  }
  
  let address;
  let faxNo;
  let email;
  
  if (foundRow) {
    address = address = values[foundRow][0];
    faxNo = values[foundRow][2];
    email = values[foundRow][3];
  }
  
  return send({'postCode': postCode, 'address': address, 'faxNo': faxNo, 'email': email, 'foundRow': foundRow.toString(), 'sheetId': sheetId});
  
}