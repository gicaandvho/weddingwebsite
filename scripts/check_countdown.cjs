const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname,'../js/countdown.js'),'utf8');
function at(now) {
  const cells = ['days','hours','minutes','seconds'].map(key => ({textContent:'',getAttribute:() => key}));
  const root = {dataset:{}};
  class Clock extends Date { static now() { return new Date(now).getTime(); } }
  vm.runInNewContext(source,{Date:Clock,document:{documentElement:root,querySelectorAll:() => cells},setInterval:() => {}});
  return cells.map(cell => cell.textContent);
}
assert.deepEqual(at('2027-02-06T10:00:00+08:00'),['01','00','00','00']);
assert.deepEqual(at('2027-02-07T09:59:59+08:00'),['00','00','00','01']);
assert.deepEqual(at('2027-02-07T10:00:00+08:00'),['00','00','00','00']);
assert.deepEqual(at('2027-02-08T10:00:00+08:00'),['00','00','00','00']);
console.log('PASS: countdown targets 10 AM Philippine time, ticks down to one second, and stays at zero after the ceremony.');
