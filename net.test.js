const {
  clickElement,
  putText,
  getText,
  clickFreeSeat,
  clickNotFreeSeat,
  clickNextDate,
} = require("./lib/commands.js");
// const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Бронирование билетов", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Happy path: Бронирование билета проходит успешно(несколько мест)", async () => {
    await clickNextDate(page, 1);
    await clickElement(page, "a.movie-seances__time");
    await clickFreeSeat(page);
    await clickFreeSeat(page);
    await clickFreeSeat(page);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toContain("Получить код бронирования");
  });

  test("Happy path: Бронирование билета проходит успешно(одно мест)", async () => {
    await clickNextDate(page, 1);
    await clickElement(page, "a.movie-seances__time");
    await clickFreeSeat(page);
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toContain("Получить код бронирования");
  });

  test("Sad path: Бронирование билета не проходит если место занато", async () => {
    await clickNextDate(page, 1);
    await clickElement(page, "a.movie-seances__time");
    await clickNotFreeSeat(page);
    const buttonSelector = `.acceptin-button`;
    await page.waitForSelector(buttonSelector);
    const button = await page.$(buttonSelector);
    const isDisabled = await page.evaluate(button => button.disabled, button);
    expect(isDisabled).toBe(true);
  })
})
