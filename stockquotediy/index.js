const got = require('got');
const readline = require('readline');
const eol = require('os').EOL;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const keyMap = new Map();
keyMap.set('a','AAPL');
keyMap.set('b', 'BA');
keyMap.set('c', 'CSCO');
keyMap.set('d', 'DD');
keyMap.set('e', 'XOM');
keyMap.set('f', 'FB');
keyMap.set('g', 'GOOGL');
keyMap.set('m', 'MSFT');

function listKey(){
  console.log(`${eol}Keys`);
  keyMap.forEach((value,key) =>{
    console.log(`${key} - ${value}`)
  });
}
function getStockInfo(schar){
  const url = `http://finance.google.com/finance/info?client=ig&q=${schar}`;
  got(url)
    .then(response =>{
        const stock = JSON.parse(response.body.substr(3));
        const quote = stock[0];
        console.log(`${quote.t} ${quote.l_cur} ${quote.c} (${quote.cp}%) as of ${quote.lt}`);
    })
    .catch (error =>{
      console.log(error.response.body);
    });
}
process.stdin.on('keypress',(str,key) =>{
  if(key.ctrl && key.name === 'c'){
    process.exit();
  }else if(keyMap.has(str)){
    getStockInfo(keyMap.get(str));
  }else{
    console.log(`Invalid entry of ${str}`);
  }
});

console.log('Pls enter the key');
listKey();
