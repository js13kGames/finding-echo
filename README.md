# echo-location

[![CircleCI](https://circleci.com/gh/msecret/echo-location.svg?style=svg)](https://circleci.com/gh/msecret/echo-location)

A small, quick game for [js13k competition](http://2017.js13kgames.com/).

The theme of the competition is **lost**. This game is about a dolphin finding his lost dolphin friend in a dark ocean cave, with only echo location. To make this process a little easier for humans, the speed of sound is slowed down, so you can tell how close your are to a wall by the amount of time that passes by before the echo sound returns.

### Controls

- [w] to move forward, [s] to move back,
- [a] and [d] rotate you,
- [space] to make an echo sound. use this to find walls, which will hurt your health if you run into them,
- [f] to call out to your dolphin friend, who will respond to help you.

### Technology

Uses es6 code compiled to chrome and firefox with [babel](https://babeljs.io/), modular JS code with [webpack](https://webpack.github.io/), JS code minified with [uglifyes](https://www.npmjs.com/package/uglify-es), CSS code minified with [uglifycss](https://www.npmjs.com/package/uglifycss), and HTML compiled with [html-minifier](https://kangax.github.io/html-minifier/).

### Screenshot

![screenshot](https://github.com/msecret/finding-echo/blob/master/resources/screenshots/dolphin.png)
