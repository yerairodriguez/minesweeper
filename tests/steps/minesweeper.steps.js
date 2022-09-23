const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/';

Given('the user opens the app', async () => {
	await page.goto(url);
});

Then('the number of columns should be: {string}', async function (string) {
	const board = await page.locator('data-testid=board')
	expect(board.length).toBe(8);
  });

Then('the number of rows should be: {string}', async function (string) {
	const board = await page.locator('data-testid=board')
	expect(board.length).toBe(8);
  });