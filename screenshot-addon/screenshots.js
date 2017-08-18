import puppeteer from 'puppeteer';
import * as storybook from '@storybook/react';
import config from '../.storybook/config';

console.log(config);

// (async () => {
//
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({path: 'example.png'});
//
//   browser.close();
// })();
