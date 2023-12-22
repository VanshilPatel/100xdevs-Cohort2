//  Write to a file
// Using the fs library again, try to write to the contents of a file.



const fs = require('fs')


const content =  "I am writing the content to file first time"


fs.writeFile("a.txt", content , function(err){
 if(err){
    console.log(err);
 }
})

