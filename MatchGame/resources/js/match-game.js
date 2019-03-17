var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function () {
  var $game = $('#game');
  var cards = MatchGame.generateCardValues();
  MatchGame.renderCards(cards, $game);
});
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var sequentialValues = [];

  for (var i = 1; i <= 8; i++) {
    sequentialValues.push(i);
    sequentialValues.push(i);
  }

  var cardValRandomly = [];

  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1)[0];
    cardValRandomly.push(randomValue);
  }

  return cardValRandomly;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValRandomly, $game) {

  var colors = [
    'hsl(30, 85%, 65%)',
    'hsl(60, 85%, 65%)',
    'hsl(120, 85%, 65%)',
    'hsl(180, 85%, 65%)',
    'hsl(240, 85%, 65%)',
    'hsl(280, 85%, 65%)',
    'hsl(320, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

    $game.empty();
    $game.data('flippedCards', []);

  for (var valueIndex = 0; valueIndex < cardValRandomly.length; valueIndex++) {
    var value = cardValRandomly[valueIndex];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    $game.append($cardElement);
  }
    $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
      return;
    }
    $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

      var flippedCards = $game.data('flippedCards');
      flippedCards.push($card);

    if (flippedCards.length === 2) {
      if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
        var matchCss = {
          backgroundColor: 'rgb(153, 153, 153)',
          color: 'rgb(204, 204, 204)'
        };
        flippedCards[0].css(matchCss);
        flippedCards[1].css(matchCss);
      } else {
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];
        window.setTimeout(function() {
          card1.css('background-color', 'rgb(32, 64, 86)')
              .text('')
              .data('isFlipped', false);
          card2.css('background-color', 'rgb(32, 64, 86)')
              .text('')
              .data('isFlipped', false);
        }, 350);
    }
    $game.data('flippedCards', []);
  }
};
