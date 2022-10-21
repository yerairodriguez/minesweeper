const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/';

async function revealCell(cell) {
	await page.click(`[data-testid="${cell}"]`, { force: true });	
}

async function tagCell(cell) {
	await page.click(`[data-testid="${cell}"]`, { button: 'right'});
}

Given('the user opens the app', async () => {
	await page.goto(url);
});
Given('the user loads the following data: {string}', async (param) => {
	await page.goto(url + "?mockdata=" + param)
});
Given('the user reveals cell {string}', async (string) => {
	await revealCell(string);
});
Given('the user tags the cell {string}', async (string) => {
	await tagCell(string);
});
Given('the user resets the game', async () => {
	await page.click(`[data-testid="resetButton"]`, { force: true });
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
Then('the left mines counter should be: {string}', async (string) =>{
	const minesCounter = await page.locator('data-testid=minesCounter').innerText();
	expect(minesCounter).toBe(string);
});
Then('timeCounter display should show the following value: {string}', async (string) =>{
	const timer = await page.locator('data-testid=timer').innerText();
	expect(timer).toBe(string);
});
Then('cell {string} should be revealed with mine', async (string) =>{
	const cell = await page.locator(`[data-testid="${string}"]`).innerText();
	expect(cell).toBe("💣");
});
Then('cell {string} should be disabled', async (string) =>{
	const cell = await page.locator(`[data-testid="${string}"]`)
	expect(cell).toBeDisabled();
});