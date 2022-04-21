const deck = [
  "Pear",
  "Apple",
  "Orange",
  "Banana",
  "Strawberry",
  "Watermelon",
  "Pineapple",
  "Peach",
]

$(document).ready(function () {
  // in vanilla javascript this would be
  // let cards = [].concat(deck, deck);
  let cards = $.merge(deck, deck);

  // Shuffle the cards
  cards.sort(() => Math.random() - 0.5);

  // Create the board
  for (let i = 0; i < cards.length; i++) {
    let cardName = cards[i]; // will be "banana" or "apple"..

    $("#content").append(
      `<div class="card" data-name="${cardName}">
        <img src="images/${cardName}.jpg">
        <div class="card-back"></div>
      </div>`
    )
  }

  // Add event listener to each card
  $(".card").click(function () {
    console.log('clicked');
    // If the card has already been flipped, do nothing
    if ($(this).hasClass("flipped")) {
      return
    }

    // If two cards have already been flipped, do nothing
    if ($(".flipped").length === 2) {
      return
    }

    // implicit conditions at this point:
    // 1. the clicked card has not been flipped yet
    // 2. only 0 or 1 card has been flipped

    // Flip the card
    $(this).addClass("flipped")

    // Check to see if two cards are face up
    if ($(".flipped").length === 2) {
      // Get the data-name values of both cards
      let cardName1 = $(".flipped")[0].getAttribute("data-name")
      let cardName2 = $(".flipped")[1].getAttribute("data-name")

      // If the two cards match, lock them in the open position
      if (cardName1 === cardName2) {
        $(".flipped").addClass("matched")
        $(".flipped").removeClass("flipped")
        // Check to see if all cards are matched
        if ($(".matched").length === cards.length) {
          alert("You win!")
        }
      } else {
        // If the two cards do not match, flip them back over
        setTimeout(function () {
          $(".flipped").removeClass("flipped")
        }, 1000)
      }
    }
  })
})
