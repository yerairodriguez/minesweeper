const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/';

Given('the user opens the app', async () => {
	await page.goto(url);
});

Then('the number of rows in the board should be: {string}', async (string) =>{
	const rows = await page.locator('.row')
	let numberOfRows = await rows.count();
	expect(numberOfRows.toString()).toBe(string);
})
Then('the number of columns in the board should be: {string}', async (string) =>{
	const cells = await page.locator('.cell')
	let numberOfColumns = await cells.count();
	expect(numberOfColumns.toString()).toBe(string);
})
//cambiar locators a datatest id, encontrar las 64 celdas