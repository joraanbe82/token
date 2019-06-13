// cargamos el modulo de File System 
let fs = require('fs'); 
// cargamos el modulo de path 
let path = require('path');

let files = fs.readdirSync(__dirname);
// devolvera la matriz del nombre de archivo
//pero detendra cualquier ejecucion adicional de su codigo

files.forEach(function(file){
    let fileName = path.basename(file, '.js');
    console.log(fileName)
    if(fileName !== 'index'){
         exports[fileName] = require('./'+ fileName); 
    }
    console.log([fileName]);
});
