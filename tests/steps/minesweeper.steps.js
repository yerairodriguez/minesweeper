const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/';

async function revealCell(cell) {
	await page.click(`[data-testid="${cell}"]`, { force: true });	
}

async function tagCell(cell) {
	await page.click(`[data-testid="${cell}"]`, { button: 'right'});
}

async function tagQuestionCell(cell) {
	await page.click(`[data-testid="${cell}"]`, { button: 'right', clickCount: 1});
}

async function untagCell(cell) {
	await page.click(`[data-testid="${cell}"]`, { button: 'right'});
}

async function checkCell(cellValue) {
	const splittedCell = cellValue.split('-');
	let splittedCellList = [];
	for (let i = 0; i < splittedCell.length; i++) {
		switch (splittedCell[i]) {
			case 'O': splittedCellList.push(''); break;
			case 'X': splittedCellList.push('💣'); break;
			case ',': splittedCellList.push(''); break;
			case '!': splittedCellList.push('🚩'); break;
			case '?': splittedCellList.push('❓'); break;
			case '1': splittedCellList.push('1'); break;
			case '2': splittedCellList.push('2'); break;
			case '3': splittedCellList.push('3'); break;
			case '4': splittedCellList.push('4'); break;
			case '5': splittedCellList.push('5'); break;
			case '6': splittedCellList.push('6'); break;
			case '7': splittedCellList.push('7'); break;
			case '8': splittedCellList.push('8'); break;
		}
	}
	for (let i = 0; i < splittedCellList.length; i++) {
		const cell = await page.$(`[data-testid="${i}"]`);
		const cellText = await cell.innerText();
		expect(cellText).toEqual(splittedCellList[i]);
	}
}

Given('the user opens the app', async () => {
	await page.goto(url);
});
Given('the user loads the following data: {string}', async (param) => {
	await page.goto(url + "?mockdata=" + param)
});
Given('the user loads the following data:', async (param) => {
	await page.goto(url + "?mockdata=" + param.replaceAll("\n", "-"));
});
Given('the user reveals cell {string}', async (string) => {
	await revealCell(string);
});
Given('the user tags the cell {string}', async (string) => {
	await tagCell(string);
});
Given('the user tags as questionable on {string}', async (string) => {
	await tagCell(string);
	await tagQuestionCell(string);
});
Given('the user resets the game', async () => {
	await page.click(`[data-testid="resetButton"]`, { force: true });
});
When('the user removes tags cell {string}', async (string) => {
	await tagCell(string);
	await untagCell(string);
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
Then('cell {string} should not be revealed with mine', async (string) =>{
	const cell = await page.locator(`[data-testid="${string}"]`).innerText();
	expect(cell).not.toBe("💣");
});
Then('cell {string} should be unrevealed', async (string) =>{
	const cell = await page.locator(`[data-testid="${string}"]`).innerText();
	expect(cell).toBe("");
});
Then('cell {string} should show the following value: {string}', async (string, string2) =>{
	const cell = await page.locator(`[data-testid="${string}"]`).innerText();
	expect(cell).toBe(string2);
});
Then('cell {string} should be empty', async (string) =>{
	const cell = await page.locator(`[data-testid="${string}"]`).innerText();
	expect(cell).toBe("");
});
Then('the mockData should have the following data:', async (cellValue) =>{
	await checkCell(cellValue.replaceAll("\n", "-"));
});
Then('game should be over', async () =>{
	const gameResult = await page.locator('data-testid=gameResult').innerText();
	expect(gameResult).toBe("😭");
})
Then('game should be won', async () =>{
	const gameResult = await page.locator('data-testid=gameResult').innerText();
	expect(gameResult).toBe("😎");
})
Then('game should not be over', async () =>{
	const gameResult = await page.locator('data-testid=gameResult').innerText();
	expect(gameResult).toBe("😐");
})
