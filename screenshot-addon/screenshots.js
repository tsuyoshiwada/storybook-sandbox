/* eslint-disable */
import * as path from 'path';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer';


class StorybookServer {
  constructor(server, url) {
    this._server = server;
    this._url = url;
  }

  getURL() {
    return this._url;
  }

  kill() {
    this._server.kill();
  }
}

const startStorybookServer = (options) => new Promise((resolve, reject) => {
  const {
    port,
    configDir,
  } = options;

  const server = spawn(`${path.resolve(__dirname, '..')}/node_modules/.bin/start-storybook`, [
    '-p', port,
    '-c', configDir,
  ], {
    cwd: path.resolve(__dirname, '..'),
  });

  server.stdout.on('data', (out) => {
    const str = out.toString().trim();
    const m = str.match(/^Storybook started on => (https?:\/\/.+)$/);

    if (m) {
      const s = new StorybookServer(server, m[1]);
      resolve(s);
    }
  });

  server.stderr.on('data', (out) => {
    // console.log('STDERR: ', out.toString());
  });

  server.on('error', (err) => {
    console.log('ERROR: ', err);
    reject(err.toString());
  });

  server.on('exit', () => {
    console.log('EXIT');
  });
});


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


(async () => {
  const [server, browser] = await Promise.all([
    startStorybookServer({
      port: 9001,
      configDir: '.storybook',
    }),
    puppeteer.launch(),
  ]);

  const page = await browser.newPage();

  page.on('console', (...args) => console.log.apply(console, ['[Browser]', ...args]));

  await page.exposeFunction('captureComponent', (name) => {
    const filename = path.resolve(__dirname, `${name}.png`);
    console.log('[Node]', 'Save to ', filename);
    return page.screenshot({ path: filename });
  });

  await page.exposeFunction('puppeteerDone', async (code = 0) => {
    browser.close();
    server.kill();
    process.exit(code);
  });

  await page.goto(server.getURL());
})();
