const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/';


Given('the user opens the app', async () => {
	await page.goto(url);
});
Given('the user loads the following data:', async (param) => {
	await page.goto(url + "?mockdata=" + param)
});
Then('the number of rows in the board should be: {string}', async (string) => {
	const rows = await page.locator('data-testid=row')
	let numberOfRows = await rows.count();
	expect(numberOfRows.toString()).toBe(string);
});
Then('the number of cells in the board should be: {string}', async (string) => {
	const cells = await page.locator('.cell')
	let numberOfColumns = await cells.count();
	expect(numberOfColumns.toString()).toBe(string);
});
Then('cells are all unreveled', async () =>{
	const cells = await page.locator('data-testid=cell')
	let numberOfcells = await cells.count();
	for (let i = 0; i < numberOfcells; i++){
		let singleCell = await cells.nth(i).isDisabled();
		expect(singleCell).toBe(false);
	}	
});

