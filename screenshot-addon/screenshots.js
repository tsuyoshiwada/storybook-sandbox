/* eslint-disable */
import * as path from 'path';
import { execSync, spawn } from 'child_process';
import mkdirp from 'mkdirp';
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

  const bin = execSync('echo $(npm bin)', { encoding: 'utf-8' }).trim();

  const server = spawn(`${bin}/start-storybook`, [
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

const options = {
  port: 9001,
  configDir: '.storybook',
  staticDir: null,
  screenshotsDir: path.resolve(__dirname, '__screenshots__'),
  viewport: {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false,
  },
};


(async () => {
  mkdirp(options.screenshotsDir);

  const [server, browser] = await Promise.all([
    startStorybookServer({
      port: options.port,
      configDir: options.configDir,
    }),
    puppeteer.launch(),
  ]);

  const page = await browser.newPage();

  page.on('console', (...args) => console.log('[Browser]', ...args));

  page.setViewport(options.viewport);

  await page.exposeFunction('captureComponent', async (name) => {
    const filename = path.resolve(options.screenshotsDir, `${name}.png`);
    await page.screenshot({ path: filename });
    console.log('[Node]', 'Save to ', filename);
    return filename;
  });

  await page.exposeFunction('puppeteerDone', async (code = 0) => {
    browser.close();
    server.kill();
    process.exit(code);
  });

  await page.goto(`${server.getURL()}?full=1`);
})();
