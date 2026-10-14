import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {once} from 'node:events';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';
import {test} from 'node:test';

const require = createRequire(import.meta.url);
const postcss = require('postcss');
const bundlerRequire = createRequire(require.resolve('@docusaurus/bundler/package.json'));
const presetRequire = createRequire(bundlerRequire.resolve('@docusaurus/cssnano-preset/package.json'));
const advancedRequire = createRequire(presetRequire.resolve('cssnano-preset-advanced/package.json'));
const defaultRequire = createRequire(advancedRequire.resolve('cssnano-preset-default/package.json'));

const cssCases = [
  {
    name: 'postcss-calc', label: 'calculates expressions in selectors and declarations', options: {selectors: true},
    input: 'div:nth-child(calc(1 + 1)){width:calc(100px / 2)}',
    expected: 'div:nth-child(2){width:50px}',
  },
  {
    name: 'postcss-discard-unused', label: 'keeps the namespace used by an attribute selector',
    input: '@namespace svg "http://www.w3.org/2000/svg";@namespace unused "https://example.test";a[svg|lang=en]{fill:red}',
    expected: '@namespace svg "http://www.w3.org/2000/svg";a[svg|lang=en]{fill:red}',
  },
  {
    name: 'postcss-merge-rules', label: 'merges rules with equivalent declarations',
    input: '.a{color:red}.b{color:red}', expected: '.a,.b{color:red}',
  },
  {
    name: 'postcss-minify-selectors', label: 'rewrites multiple pseudo-classes while iterating',
    input: '.card:nth-child(1),.card:nth-of-type(2n+1),.card::before{color:red}',
    expected: '.card:before,.card:first-child,.card:nth-of-type(odd){color:red}',
  },
  {
    name: 'postcss-unique-selectors', label: 'sorts and removes duplicate selectors',
    input: '.b,.a,.a{color:red}', expected: '.a,.b{color:red}',
  },
  {
    name: 'stylehacks', label: 'removes obsolete IE selectors while retaining modern rules',
    input: '* html .card{color:red}.card{color:blue}', expected: '.card{color:blue}',
  },
];

for (const {name, label, options = {}, input, expected} of cssCases) {
  test(`${name}: ${label}`, async () => {
    const pluginRequire = name === 'postcss-discard-unused' ? advancedRequire : defaultRequire;
    const result = await postcss([pluginRequire(name)(options)]).process(input, {from: undefined});
    assert.equal(result.css, expected);
  });
}

test('SockJS creates unique v4 IDs and echoes WebSocket messages', {timeout: 10_000}, async t => {
  const sockjs = require('sockjs');
  const clientRequire = createRequire(require.resolve('webpack-dev-server/package.json'));
  const WebSocket = clientRequire('ws');
  const transport = sockjs.createServer({log() {}, disconnect_delay: 1});
  const connections = [];
  const clients = [];
  transport.on('connection', connection => {
    connections.push(connection);
    connection.on('data', message => connection.write(message));
  });
  const server = createServer();
  transport.installHandlers(server, {prefix: '/sockjs'});
  t.after(async () => {
    for (const client of clients) client.terminate();
    for (const connection of connections) connection.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `ws://127.0.0.1:${server.address().port}/sockjs/000`;
  for (let index = 0; index < 2; index++) {
    const client = new WebSocket(`${base}/${randomUUID()}/websocket`);
    clients.push(client);
    client.on('error', () => {});
    const [opened] = await once(client, 'message', {signal: AbortSignal.timeout(3000)});
    assert.equal(opened.toString(), 'o');
    const message = `fixture ${index}: café 🧪`;
    const echoed = once(client, 'message', {signal: AbortSignal.timeout(3000)});
    client.send(JSON.stringify([message]));
    const [frame] = await echoed;
    assert.equal(frame.toString()[0], 'a');
    assert.deepEqual(JSON.parse(frame.toString().slice(1)), [message]);
    const closed = once(client, 'close', {signal: AbortSignal.timeout(3000)});
    client.close();
    await closed;
  }
  assert.equal(connections.length, 2);
  const ids = connections.map(connection => connection.id);
  assert.equal(new Set(ids).size, 2);
  for (const id of ids) {
    assert.match(id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  }
});
