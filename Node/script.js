const express = require("express");
const fs = require("fs");
const path = require("path");


const outputfolder = './output';

// console.log("check whether the folder is exist or not");

if(!fs.existsSync(outputfolder)){
   fs.mkdirSync(outputfolder);
}

const app = express();
const PORT = 3000;

app.get("/createfile",(req,res) => {
    const currenttime = new Date();

    const year  = currenttime.getFullYear().toString();
    const month = (currenttime.getMonth() + 1).toString();
    const date  = currenttime.getDate().toString();
    const hours = currenttime.getHours().toString();
    const mins  = currenttime.getMinutes().toString();
    const secs  = currenttime.getSeconds().toString();

    const datetimeforfilename = `${year}-${month}-${date}-${hours}-${mins}-${secs}.txt`;

    const filepath = path.join(outputfolder,datetimeforfilename);

    console.log("filepath:",filepath);

    fs.writeFile(filepath,currenttime.toISOString(),(err)=>{
        if(err){
            res.status(500).send(`error in creating file:${err}`);
            return;
        }
            res.send(`file created successfully:${filepath}`);
    });
  });

app.get("/getfile",(req,res) => {
          fs.readdir(outputfolder,(err,files) => {
              if(err){
                res.status(500).send(`error in reading directory:${err}`);
                return;
              }

          const textfiles = files.filter((file)=>path.extname(file) === '.txt');

          res.json(textfiles);
          })
});


app.listen(PORT,() => {
  console.log("server is running on port ",PORT);
})
