var resemble = require('resemblejs')

var file = './a.png'
var file2 = './b.png'


var diff = resemble(file)
    .compareTo(file2)
    .ignoreColors(true)
    .onComplete(function (data) {
        console.log(data);
        console.log(data.misMatchPercentage + '% difference');
    });