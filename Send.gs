function send(e) {
  const faxAction = CardService.newAction().setFunctionName('sendFax').setParameters({'sheetId': e.sheetId, 'foundRow': e.foundRow})
  const emailAction = CardService.newAction().setFunctionName('sendEmail').setParameters({'sheetId': e.sheetId, 'foundRow': e.foundRow})

  //FIXED FOOTER
  const fixedFooter = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                  .setBackgroundColor('#1d355e')
                  .setText("Fax")
                  .setOnClickAction(faxAction))
                .setSecondaryButton(CardService.newTextButton()
                  .setBackgroundColor('#248ec2')
                  .setText("Email")
                  .setOnClickAction(emailAction));
  
   //FORM
   const emailAddress = CardService.newTextInput()
                .setFieldName("Email")
                .setTitle("Email")
                .setHint('Recipient Email');
                
   if (e.email) {
     emailAddress.setValue(e.email);
   }
                
   const fax = CardService.newTextInput()
                .setFieldName("Fax Number")
                .setTitle("Recipient")
                .setHint('Destination fax number');
                
   if (e.faxNo) {
     fax.setValue(e.faxNo);
   }
                
                
   const address = CardService.newTextInput()
                .setFieldName("Address")
                .setTitle("Recipient Address")
                .setHint('Physical Location');
                
   if (e.address) {
     address.setValue(e.address);
   }
   
  const pCode = CardService.newTextInput()
                .setFieldName("Post Code")
                .setTitle("Recipient Post Code")
                .setHint('User to Identify Details in Database');
                
  if (e.postCode) {
    pCode.setValue(e.postCode);
  }
                  
  const form = CardService.newCardSection()
        .addWidget(emailAddress)
        .addWidget(fax)
        .addWidget(address)
        .addWidget(pCode);
  
  //THE CARD      
  const card = CardService.newCardBuilder()
              .setHeader(CardService.newCardHeader()
                  .setTitle('Send Letters'))
              .addSection(form)
              .setFixedFooter(fixedFooter);
              
  return card.build()
}
