/* eslint-disable */
import * as path from 'path';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer';

const startStorybook = () => new Promise((resolve, reject) => {
  const workingDir = path.resolve(__dirname, '..');
  const cmd = path.resolve(workingDir, 'node_modules', '.bin', 'start-storybook');

  const p = spawn(cmd, [
    '-p 9001',
    `-c ${workingDir}/.storybook`,
  ], {
  });

  resolve(p);
});

(async () => {
  try {
    console.log('[START]');
    const foo = await startStorybook();

    foo.stdout.on('data', (data) => {
      console.log('===========', data.toString());
    });

    foo.stderr.on('data', (data) => {
      console.log('===========', data.toString());
    });

    foo.on('error', (err) => {
      console.log('ERROR: ', err);
    });

    foo.on('close', () => {
      console.log('CLOSE');
    });

    foo.on('exit', () => {
      process.exit(0);
    });

    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto('http://localhost:9001');
    // await page.screenshot({ path: 'example.png' });
    //
    // browser.close();
    // foo.kill();

    // console.log('[END]');
  } catch (e) {
    console.log(e);
  }
})();
