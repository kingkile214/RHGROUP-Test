const fs = require('fs');
const path = require('path');
const util = require('util');


function findFile(filePath,ext){   // function to recursively look for files in a path with a given extension
    try {
        // check if path exists
        if (!fs.existsSync(filePath)){ 
            console.log("no folder found",filePath);
            return;
        }
        
        // read the files in the directory specified by the path
        var files = fs.readdirSync(filePath);
        resArr = [];

        // loop to get all the files in the directory
        for (i=0;i<files.length;i++){
            filename = path.join(filePath,files[i]);
            stat = fs.lstatSync(filename);
            if (stat.isDirectory()){
                findFile(filename,ext);
            }
            else if (filename.indexOf(ext)>=0) {  
                file = "./".concat(filename);         
                func = require(file);                  
                result = func.my_function("-- ", "");   // execute function in the current js file in the loop
                resArr.push(result)                     // store result in an array

            };
        };

        return resArr;

      } catch (error) {
        console.log('Error:', error.message);
      }
};

// async/await
var run = async () => {
    const [folder1, folder2, folder3] = 
    await Promise.all([
        findFile('./folder_name1','.js'),
        findFile('./folder_name2','.js'),
        findFile('./folder_name3','.js'),
        
    ])
    console.log("Folder 1: " + folder1.toString()); // display contents of folder 1
    console.log("Folder 2: " + folder2.toString()); // display contents of folder 2
    console.log("Folder 3: " + folder3.toString()); // display contents of folder 3
};

run();
