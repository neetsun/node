const got = require('got');
const eol = require('os').EOL; //\n line 
const readline = require('readline');

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

function listKeys(){
    console.log(`${eol}keys`);
    keyMap.forEach((value,key) => {
      console.log(`${key} - ${value}`);
    });
    console.log();
}

function getStockQuote(symbol){
  const url = `http://finance.google.com/finance/info?client=ig&q=${symbol}`
  got(url)
    .then(response => {
      //remove the first "//" chars in the json response
      const stock = JSON.parse(response.body.substr(3));
      const quote = stock[0];
      console.log(`${quote.t} ${quote.l_cur} ${quote.c} (${quote.cp}%) as of ${quote.lt}`);
    })
    .catch(error =>{
      console.log(error.response.body);
    })
}

process.stdin.on('keypress',(str,key) => {
  if(key.ctrl && key.name === 'c'){
    process.exit();
  }else if (key.name === 'l'){
    listKeys();
  }else{
    if(keyMap.has(str)){
      getStockQuote(keyMap.get(str));
    }else{
      console.log(`Unable to find stocks with entered ${str} key.`);
    }
  }
});

console.log("Press a key to retrieve stock price");
listKeys();
