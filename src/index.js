var str = require('./component');
require('./less/index');
require('bootstrap/dist/css/bootstrap.css');
var img = document.createElement('img');
img.className = 'img-cricle';
img.src = require('./images/1.jpg');
document.body.appendChild(img);
import $ from 'jquery';
var write = s =>{
    $('#app').html(str);
};
write(str);