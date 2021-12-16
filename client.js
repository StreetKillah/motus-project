window.onload = () => {
  const list = require('./list.json');
  // getList = () => {
  //     fetch('/').then(response => {
  //         return response.json();
  //       }).then(data => {
  //         // Work with JSON data here
  //         console.log("LIST:" + data);
  //       }).catch(err => {
  //         console.log(err);
  //       });
  // }
  var files = JSON.parse(list);
  
  
  
  getList = () => {
     files.map((file) => console.log(file.id));
     console.log("Client.js is working..")
  }
  
  
  getList();
}
