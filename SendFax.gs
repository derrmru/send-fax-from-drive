function sendFax(e) {
  //if new entry update sheet
  Logger.log(e.parameters.foundRow)
  if (e.parameters.foundRow === '0') {
    SpreadsheetApp.openById(e.parameters.sheetId).appendRow([e.formInputs['Address'][0], e.formInputs['Post Code'][0], "'" + e.formInputs['Fax Number'][0], e.formInputs['Email'][0]])
  }

  //first correct or update any entries
  Logger.log(e)
  const recipient = e.formInputs['Fax Number'] + '@efaxsend.com';
  const subject = 'London Foot & Ankle Surgery | Patient Report';
  const body = '';
  
  GmailApp.sendEmail(recipient, subject, body, {
        htmlBody:
          '<html style="font-family: fixed width, arial; font-size: 12px;">' +
            '<div>' +
              '<p style="white-space: pre-line">' + body + '</p>' +
              '<img src="https://www.podogo.com/wp-content/uploads/2019/07/Podogo_Long_Black_LS.png" style="width: 200px; margin-left: 10px" />' +
              '<p style="font-size: 11px; margin-left: 10px;"><strong>A:</strong> 17 Harley Street, London W1G 9QH</p>' +
            '</div>' +
          '</html>', 
         attachments: [DriveApp.getFileById(e.drive.activeCursorItem.id).getAs(MimeType.PDF)]
        })
        
  return onHomepage()
}