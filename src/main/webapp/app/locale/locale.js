/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var lang = localStorage ? (localStorage.getItem('user-lang') || 'pt_BR') : 'pt_BR';
var file = '/app/locale/' + lang + '.js';
document.write('<script type="text/javascript" src="' + file + '"></script>');

var extjsFile = '/resources/extjs/locale/ext-lang-' + lang + '.js';
document.write('<script type="text/javascript" src="' + extjsFile + '"></script>');