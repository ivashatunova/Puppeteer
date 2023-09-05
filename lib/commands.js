module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
  clickFreeSeat: async function (page) {
    try {
      const selector = `.buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_selected)`; 
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Free seat is not clickable`);
    }
  },
  clickNextDate: async function (page, days) {
    let today = new Date();
    today.setUTCHours(21, 0, 0, 0);
    const todayTimestamp = today.getTime()/1000;
    const tomorrow = todayTimestamp + days * 24 * 60 * 60;
    const selector = `a[data-time-stamp="${tomorrow}"]`; 
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Date is not clickable: ${tomorrow} ${selector}`);
    }
  },
};
