const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText, clickNextDate, clickElement, clickFreeSeat, clickNotFreeSeat } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 60000,
  });
});

When("user selects {string} next date", async function (string) {
  return await clickNextDate(this.page, string);
});

When("user selects the session time", async function () {
    return await clickElement(this.page, "a.movie-seances__time");
  });

When("user selects one free spot", async function () {
    return await clickFreeSeat(this.page);;
  });

  When("user selects one not free spot", async function () {
    return await clickNotFreeSeat(this.page);;
  });  

When("user clicks on the reservation button", async function () {
    return await clickElement(this.page, ".acceptin-button");
  });


Then("text {string} appears on the reservation button", async function (string) {
    const actual = await getText(this.page, ".acceptin-button");
    expect(actual).contain(string);
});
