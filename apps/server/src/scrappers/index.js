const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://en.shadowverse-evolve.com/cards/searchresults/?expansion_name=BP01&view=text&sort=new', {
    waitUntil: 'networkidle0'  // Wait until the page is fully loaded
  });

  // Helper function to wait for a specific amount of time (in ms)
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Function to simulate scrolling
  const scrollToBottom = async () => {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await delay(2000);  // Wait for 2 seconds to allow more cards to load after scrolling
  };

  // Function to get all the cards after scrolling
  const getAllCards = async () => {
    let cards = [];
    let previousHeight = await page.evaluate(() => document.body.scrollHeight);

    // Loop to keep scrolling until the page reaches the bottom
    while (true) {
      // Scrape the current set of cards
      const newCards = await page.evaluate(() => {
        // Helper function to safely get the inner text of an element or return null
        const getText = (selector, parent) => {
          const element = parent.querySelector(selector);
          return element ? element.innerText.trim() : null;
        };

        // Helper function to safely get the href of a link or return null
        const getHref = (selector, parent) => {
          const link = parent.querySelector(selector);
          return link ? link.href : null;
        };

        // Get all the <li> elements within the <ul> with the class 'cardlist-Result_List cardlist-Result_List_Txt'
        const cardElements = document.querySelectorAll('.cardlist-Result_List.cardlist-Result_List_Txt li');

        // Map over each card and extract relevant information
        return Array.from(cardElements).map(card => {
          const cardLink = getHref('a', card);
          const cardTitle = getText('.ttl', card);
          const cardNumber = getText('.number', card);
          const cardImage = card.querySelector('img') ? card.querySelector('img').src : null;
          const cardCost = getText('.status-Item-Cost', card)?.replace('Cost', '').trim();
          const cardPower = getText('.status-Item-Power', card)?.replace('Attack', '').trim();
          const cardHp = getText('.status-Item-Hp', card)?.replace('Defense', '').trim();

          return {
            cardLink,
            cardTitle,
            cardNumber,
            cardImage,
            cardCost,
            cardPower,
            cardHp
          };
        });
      });

      // If no new cards were found, break the loop
      if (newCards.length === 0) {
        break;
      }

      // Add new cards to the list
      cards = [...cards, ...newCards];

      // Wait for 1 second before scraping the next card
      await delay(1000);  // Delay between scraping each card

      // Scroll down to load more cards
      await scrollToBottom();

      // Check if the page height has changed (i.e., if new content was loaded)
      const newHeight = await page.evaluate(() => document.body.scrollHeight);
      if (newHeight === previousHeight) {
        // If no new content is loaded (page height didn't change), stop scrolling
        break;
      }
      previousHeight = newHeight;  // Update previousHeight to the new height
    }

    return cards;
  };

  // Get all cards by scrolling
  const allCards = await getAllCards();

  // Save the result to a JSON file
  fs.writeFileSync('cards.json', JSON.stringify(allCards, null, 2));

  console.log('All cards saved to cards.json');
  await browser.close();
})();
