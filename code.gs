//HOMEPAGE CARD
function onHomepage(e) {

  var user = Session.getActiveUser().getEmail();
  var userName = user.split('@')[0];
  userName = userName.substr(0, 1).toUpperCase() + userName.slice(1).toLowerCase();

  var textParagraph = CardService.newTextParagraph()
        .setText( 'Hey ' + userName + ', please select the gdoc that you would like to fax.');

  var cardSection = CardService.newCardSection()
     .addWidget(textParagraph);
     
  var card = CardService.newCardBuilder()
    .setName("Open")
    .setHeader(CardService.newCardHeader().setTitle("Send Patient Letters"))
    .addSection(cardSection)
    .build();

  return card;
}