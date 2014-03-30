Node-roast
================================

![Example Chart](http://i.imgur.com/eEtWTNm.png)

A basic sketch to read temperature data via Arduino, plot values on a time-series chart! We're using it with a thermocouple to look at our **home coffee roasting**.

Features I hope to add in the future: ability to adjust time scale and download collected data, simple relay + possibly PID control.

Instructions
------------
* Connect your themocouple, amplifier and Arduino.
* In the Arduino IDE, choose `Examples -> Firmata -> Firmata Standard` and upload to your board
* Download this repo and run `npm install` to grab dependencies.
* Run with `node main.js` to start logging. Visit http://localhost:8000 to view the chart 

Requirements
------------

**Software**

* [Firmata](http://firmata.org/wiki/Main_Page)
* [johnny-five](https://github.com/rwaldron/johnny-five) and [socket.io](http://socket.io/)
* [Rickshaw](http://code.shutterstock.com/rickshaw/) and [D3.js](http://d3js.org/)

**Hardware**

* Arduino (or compatible) board
* K-type thermocouple (Ebay, Adafruit, Sparkfun, etc)
* AD8495 thermocouple amplifier (breakout boards are available from [Geppetto Electronics](https://squareup.com/market/nick-sayer/ad-breakout-board) and Adafruit)

MIT License 
