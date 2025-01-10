const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://en.shadowverse-evolve.com/cards/searchresults/?expansion_name=BP01&view=text&sort=new', {
    waitUntil: 'networkidle0'
  });

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const scrollToBottom = async () => {
    let lastScrollTop = 0;
    let currentScrollTop = 0;

    while (true) {
      currentScrollTop = await page.evaluate(() => window.scrollY || document.documentElement.scrollTop);

      // Check if we have reached the bottom
      const maxScrollTop = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
      if (currentScrollTop >= maxScrollTop) break;

      // Scroll incrementally
      await page.evaluate(scrollStep => {
        window.scrollBy(0, scrollStep);
      }, 200); // Scroll by {x}px each time

      // Delay between each small scroll step
      await delay(150); // ms between steps (adjust for slower/faster scrolling)

      lastScrollTop = currentScrollTop;
    }
    await delay(2000); // Additional delay to let cards load after reaching the bottom
  };

  const getAllCards = async () => {
    let cards = [];
    const seenCards = new Set(); // Track unique cards

    while (true) {
      const newCards = await page.evaluate(() => {
        const getText = (selector, parent) => {
          const element = parent.querySelector(selector);
          return element ? element.innerText.trim() : null;
        };

        const getHref = (selector, parent) => {
          const link = parent.querySelector(selector);
          return link ? link.href : null;
        };

        const cardElements = document.querySelectorAll('.cardlist-Result_List.cardlist-Result_List_Txt li');

        return Array.from(cardElements).map(card => {
          // Helper function to safely extract inner text or a specific property
          const extract = (selector, transform = text => text, parent = card) => {
            const element = parent.querySelector(selector);
            return element ? transform(element.innerText.trim()) : null;
          };

          const extractStatusItems = () =>
            Array.from(card.querySelectorAll('.status-Item')).map(el => el.innerText.trim());

          const statusItems = extractStatusItems();

          // Collect data
          return {
            cardLink: getHref('a', card),
            cardImage: card.querySelector('img')?.src || null,
            cardNumber: extract('.number'),
            cardTitle: extract('.ttl'),
            cardType: statusItems[0] || null,
            cardTrait: statusItems[1] || null,
            cardRarity: statusItems[2] || null,
            cardCost: extract('.status-Item-Cost', text => text.replace('Cost', '').trim()),
            cardPower: extract('.status-Item-Power', text => text.replace('Attack', '').trim()),
            cardHp: extract('.status-Item-Hp', text => text.replace('Defense', '').trim()),
            cardDetail: extract('.detail'),
            cardSpeech: extract('.speech'),
          };
        });
      });

      // Filter out duplicates
      const uniqueCards = newCards.filter(card => {
        const uniqueKey = card.cardNumber || card.cardLink;
        if (!uniqueKey || seenCards.has(uniqueKey)) {
          return false;
        }
        seenCards.add(uniqueKey);
        return true;
      });

      cards = [...cards, ...uniqueCards]; // Add only unique cards to the main list

      // Break if no new unique cards are found
      if (uniqueCards.length === 0) {
        break;
      }

      await scrollToBottom();
    }

    console.log(`Loaded ${cards.length} unique cards`);
    return cards;
  };

  const allCards = await getAllCards();
  // TODO: Save to a file or database

  await browser.close();
})();
