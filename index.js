const  express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const { google } = require('googleapis');
const PORT = 3000;
var fs = require('fs');
const { auth } = require('google-auth-library');
const app = express();


app.use('/', express.static(__dirname + '/index.html'));

app.use(fileUpload({}));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/',  async (req,res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",

  });

  let sampleFile = req.files.my_file;
  fs.readFile(__dirname + '/uploads' + `/${sampleFile.name}`,'utf-8',(err, data) => {
    if(err) console.log(err);
    try{
      let formatedData = data.toString().split(';');
      var surname = formatedData[0].split(':')[1];
      var name = formatedData[1].split(':')[1];
      var patronymic = formatedData[2].split(':')[1];
      var sex = formatedData[3].split(':')[1];
      var bd = formatedData[4].split(':')[1];
      var weigth = formatedData[5].split(':')[1];
      var heigth = formatedData[6].split(':')[1];
     
       res.send(`ФИО: ${surname} ${'\n'} ${name} ${'\n'} ${patronymic} ${'\n'} Пол: ${sex} ${'\n'} Дата рождения: ${bd} ${'\n'} Вес: ${weigth} ${'\n'} Рост: ${heigth}`);
    } catch (err){
      res.sendStatus(400);
    }
     googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Лист1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[surname,name,patronymic,sex,bd,weigth,heigth]],
      },
       
    });
    
   
  })


  //Create client instance for auth
  const client = await auth.getClient();

  //Instance of Google Sheets API
 const googleSheets = google.sheets({version: "v4", auth: client});

 //Get metadata about spreadsheet
 const spreadsheetId = '1ijVzwAsUpRGgJEo1IjqY0s85IEgx20C9bLe5Rjp958s';
 
 const metaData = await googleSheets.spreadsheets.get({
     auth,
     spreadsheetId,
 });


//Get data from table 

const getRows = await googleSheets.spreadsheets.values.get({
  auth,
  spreadsheetId,
  range: "Лист1!A:A",
  
});



 //res.send(getRows.data);
});






// app.get('/', function (req, res) {

//   var content = fs.readFileSync('list.json', 'utf8');
//   var files = JSON.parse(content);
//   res.send(files)
// })

// app.post('/', (req, res) => {
//     console.log(req.files.my_file);
//    let sampleFile = req.files.my_file;
//    let uploadPath = __dirname + '/uploads/' + sampleFile.name;
  

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(uploadPath, () =>{
//       if (!sampleFile)
//          res.sendStatus(400);
//          return;
  
//     })


//       var file = { name: sampleFile.name}

//       var data = fs.readFileSync('list.json', 'utf8')
//       var files = JSON.parse(data)
     
//       // находим максимальный id
//       var id = Math.max.apply(
//         Math,
//         files.map( (o) =>{
//           return o.id
//         })
//       )
//       // увеличиваем его на единицу
//       file.id = id + 1
//       // добавляем пользователя в массив
//       files.push(file)
//       var data = JSON.stringify(files)
//       // перезаписываем файл с новыми данными
//       fs.writeFileSync('list.json', data)
//       console.log(file);

// });




app.listen(PORT, () => {
  console.log("Server has been started at port: " + PORT);
});