// var cppSource = "\
// #include <iostream>\n\
// using namespace std;\n\
// int main() {\n\
//     cout << \"hello, world\" << endl;\n\
//     return 0;\n\
// }\n\
// ";

// $('#run').click(function(){
//   // axios = require('axios');
//   var data = JSON.stringify({
//             "code":cppSource,
//             "language":"cpp",
//             "input":""
//             });

//   var config = {
//     method: 'post',
//     url: 'https://sweet-code.herokuapp.com/https://codexweb.netlify.app/.netlify/functions/enforceCode',
//     headers: { 
//       // 'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': 'https://axios.nikraj.repl.co',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Accept': 'application/json'
//     },
//     data : data
//   };

//   axios(config)
//   .then(function (response) {
//      console.log(response);
//     //editor3.setValue(response);
//     // document.getElementById("editor3").innerHTML=response.data.output;
//   })
//   .catch(function (error) {
//     console.log(error);
//     //editor4.setValue(error);
//     // document.getElementById("editor4").innerHTML=error;
//   });
// });