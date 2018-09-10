import express from 'express';
import {app} from './consts';
import iex from 'node-iex';


//here routes defined
import './routes';
import { resolve } from 'dns';
var Promise = require("bluebird");
let httpClient = iex.http;
var tickerSymbols;
var isResolved = false;

app.listen(3000, () => {
  console.log('ES6 application listening on port 3000!');

/* httpClient.reference.symbols().then(symbols => {
  Promise.delay(5000).then(function(){
      symbols.forEach(stockSymbol => {
        httpClient.stock(stockSymbol.symbol).price().then(function(stockPrice)
        {
          console.log(stockPrice);
        })
      })
    })
  }) */


/*    Promise.delay(500).then(function()
   {
    console.log("500 ms passed");
    return httpClient.reference.symbols();
   }).delay(1000).then(function(stockSymbols){
      for(var iterate in stockSymbols)
      {
          httpClient.stock(stockSymbols[0].symbol).price().then(function(stockPrice)
          {
            console.log(stockPrice);
          })
      }
   }) */
  //})
  Promise.delay(500).then(function() {
    console.log("500 ms passed");
    return httpClient.reference.symbols();
}).map(function(helloWorldString)
{
  //httpClient.stock(helloWorldString[1].symbol).price().then(function(stockPrice)
  //{
    //console.log(helloWorldString);
   // helloWorldString.forEach(stockSymbol => {
     // setTimeout(function(){
        //console.log(httpClient.stock(helloWorldString[0].symbol).price());
        //resolve();
     // },1000);
   // });
   //console.log(helloWorldString);
   //console.log(httpClient.stock(helloWorldString.symbol).price());
   //setTimeout(function()
   //{
      return helloWorldString.symbol;
   //},10000)
    
  //})
}).then(function(test)
{
    isResolved = true;
    //console.log(test);
}).then(function(ticker)
{
  
    //console.log(httpClient.stock(ticker).price())
   //return httpClient.stock(ticker).price();
});

let jsonTicker = 0;

function getSymbols(time)
{
  return function(value)
  {
    return new Promise(function(resolve, reject)
    {
      setTimeout(function(){
        httpClient.reference.symbols().then(function(data)
        {
          jsonTicker = data;
          //console.log(data.length);
        })
        //console.log(httpClient.reference.symbols(), time)
        resolve(time);
      },time)
    })
  }
}


function test(time) {
  return function(value) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            //console.log(jsonTicker.length);
           
            var delays = [jsonTicker.length, 1000, 2000, 3000, 4000];
            var currentPromise = Promise.resolve();
            
            for (let i = 0; i < jsonTicker.length; i++) {
              // let makes i block scope .. var would not have done that
              currentPromise = currentPromise.then(function() {
                return launchChain(8, i, jsonTicker);
              });
            }





            //console.log('time', time);
            resolve(time);
        }, time);
    });
  };
}

let arrayResolve = [getSymbols(3000), test(3000)];

Promise.resolve(arrayResolve)
     .mapSeries(function(asyncMethodPassed) {
  return asyncMethodPassed();
}).then(function(results) {
  //console.log('result', results);
});





function launchChain(delay, i, tickerSym) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      
      //console.log(delay);
      httpClient.stock(tickerSym[i].symbol).quote(false).then(function(stockPrice)
      {
        console.log(tickerSym[i].symbol +" : " + stockPrice.week52Low);
      }).catch(function(errorCode)
      {
          console.log(errorCode.code);
      })
      resolve();
    }, delay);
  });
}




/* for (let i = 0, p = Promise.resolve(); i < 10; i++) {
  p = p.then(_ => new Promise(resolve =>
      setTimeout(function () {
          console.log(i);
          resolve();
      }, Math.random() * 1000)
  ));
}

let promiseSymbols =  httpClient.reference.symbols();

promiseSymbols.then(function(printValue)
{
  return printValue;
}).then(function(printValueTest)
{
  console.log(httpClient.stock(printValueTest[0].symbol).price());
},{concurrency: 1})
 */
/*     function(stockSymbols)
    {
           console.log("600 ms passed");
           httpClient.stock(stockSymbols[1].symbol).price().then(function(stockPrice)
           {
             console.log(stockPrice);
           } */

  // httpClient.reference.symbols().then(symbols => {
  //   console.log(symbols);
  // })
  

  //console.log(tickerSymbols);
  //for(var symbolsValsTicker in tickerSymbols)
  //{
    //httpClient.stock(data[symbolsValsTicker].symbol).price().then(console.log(tickerSymbols[symbolsValsTicker].symbol+" : " + data))
  //}
  //httpClient.stock('aapl').chart('5y').then( data => console.log(data) )
  //httpClient.stock('aapl').earnings(false).then( data => console.log( data) )

});
