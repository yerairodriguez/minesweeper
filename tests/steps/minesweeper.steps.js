const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const url = 'http://127.0.0.1:5500/';

Given('the user opens the app', async () => {
	await page.goto(url);
});