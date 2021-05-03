require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.14.3/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.14.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.14.3/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

var fontSize = 20;

require(["vs/editor/editor.main"], function () {

var cSource = "\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf(\"hello, world\\n\");\n\
    return 0;\n\
}\n\
";

var cppSource = "\
#include <iostream>\n\
using namespace std;\n\
int main() {\n\
    cout << \"hello, world\" << endl;\n\
    return 0;\n\
}\n\
";

var javaSource = "\
public class Main {\n\
    public static void main(String[] args) {\n\
        System.out.println(\"hello, world\");\n\
    }\n\
}\n\
";

var pythonSource = "print(\"hello, world\")";

var sources = {"c":cSource,"cpp":cppSource,"java":javaSource,"py":pythonSource};

var titles = {"c":"code.h","cpp":"code.cpp","java":"code.java","py":"code.py"}

	let editor1 = monaco.editor.create(document.getElementById('editor1'), {
        automaticLayout: true,
        scrollBeyondLastLine: false,
		value: cppSource,
		language: 'cpp',
		theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
        fontSize: fontSize,
        scrollbar: {
		useShadows: true,
		vertical: "visible",
		horizontal: "visible",
		verticalScrollbarSize: 10,
		horizontalScrollbarSize: 10,
	},
	});

    let editor2=monaco.editor.create(document.getElementById('editor2'), {
        automaticLayout: true,
        scrollBeyondLastLine: false,
        value:['Enter input here, remove this line and give input if any !'].join('\n'),
		src: 'code.cpp',
		theme: 'vs-dark',
        language: "text/plain",
	    
        minimap: {
            enabled: false,
        },
        fontSize: fontSize,
        scrollbar: {
		useShadows: true,
		vertical: "visible",
		horizontal: "visible",
		verticalScrollbarSize: 9,
		horizontalScrollbarSize: 9,
	},
	});

    let editor3=monaco.editor.create(document.getElementById('editor3'), {
        automaticLayout: true,
        scrollBeyondLastLine: false,
		value: [
			'Your output will be displayed here !',
			'Tip : Use ctrl +/- to change fontsize',			
		].join('\n'),
		language: 'javascript',
		theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
        fontSize: fontSize,
        language: "text/plain",
	    
        scrollbar: {
		useShadows: true,
		vertical: "visible",
		horizontal: "visible",
		verticalScrollbarSize: 9,
		horizontalScrollbarSize: 9,
	},
	});
    let editor4=monaco.editor.create(document.getElementById('editor4'), {
        automaticLayout: true,
		value: [
			'Coming Soon ....',
		].join('\n'),
        scrollBeyondLastLine: false,
		language: 'text/plain',
		theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
        fontSize: fontSize,
        language: "text/plain",
        scrollbar: {
		useShadows: true,
		vertical: "visible",
		horizontal: "visible",
		verticalScrollbarSize: 9,
		horizontalScrollbarSize: 9,
	},
	});

    monaco.editor.defineTheme('myTheme', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '#1d2333' }],
    colors: {
        'editor.background': '#1d2333',
    }});

 monaco.editor.defineTheme('myTheme2', {
"base": "vs-dark",
  "inherit": true,
  "rules": [
      
    { "background":'#282923',"token": "comment", "foreground": "ffa500", "background": "303030", "fontStyle": "italic underline" },
    { "token": "comment.js", "foreground": "008800", "fontStyle": "bold" },
    { "token": "comment.css", "foreground": "0000ff", "fontStyle": "bold", "inherit": false, "background": "808080" }
  ],
   "colors": {
        'editor.background': '#282923',
    }
  });
monaco.editor.defineTheme('myTheme3', {
    base: 'vs',
    inherit: true,
    rules: [{"background":'#fffffe' }],
    colors: {
       'editor.background': '#fffffe', 
    }});
$(".lm_tab").css("background", "#1d2333");
$(".lm_header").css("background","#0d101e");
monaco.editor.setTheme('myTheme');
$('#theme').dropdown('setting', 'onChange', function(){
    value = $('#theme').dropdown('get value');
    console.log(value);
    if(value=='dark')
    {
        $("#navbar").css("background", "#282923");
        $(".lm_root").css("background", "black");
        $(".lm_header").css("background","#181915");
        $(".lm_tab").css("background", "#282923");
        monaco.editor.setTheme('myTheme2');
    }
    else if(value=='light')
    {
        $(".lm_title").css("color","black");
       // $(".lm_close_tab").css("background","black");
       // $(".lm_maximise").css("background","black");
       // $(".lm_close").css("background","black");
        $("#navbar").css("background", "#fffffe");
        $(".lm_root").css("background", "#ededed");
        $(".lm_header").css("background","#ededed");
        $(".lm_tab").css("background", "#fffffe");
        monaco.editor.setTheme('myTheme3');
    }
    else
    {
        $("#navbar").css("background", "#1d2333");
        $(".lm_root").css("background", "#0d101e");
        $(".lm_header").css("background","#0d101e");
        $(".lm_tab").css("background", "#1d2333");
        monaco.editor.setTheme('myTheme');
    }
});
var lan="cpp";
$('#lang').dropdown('setting', 'onChange', function(){
    lan = $('#lang').dropdown('get value');
    editor1.setValue(sources[lan]);
    $(".lm_title")[0].innerText = titles[lan];

});

function editorsUpdateFontSize(fontSize) {
    editor1.updateOptions({fontSize: fontSize});
    editor2.updateOptions({fontSize: fontSize});
    editor3.updateOptions({fontSize: fontSize});
    editor4.updateOptions({fontSize: fontSize});
}

$("body").keydown(function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 120) { // F9
            e.preventDefault();
            $("#run").trigger("click");
           // run();
        }  else if (event.ctrlKey && keyCode == 107) { // Ctrl++
            e.preventDefault();
            fontSize += 1;
            editorsUpdateFontSize(fontSize);
        } else if (event.ctrlKey && keyCode == 109) { // Ctrl+-
            e.preventDefault();
            fontSize -= 1;
            editorsUpdateFontSize(fontSize);
        }
    });


//console.log(editor1.getValue());

//console.log(editor2.getValue());
  
$("#run").click(function run(){
    $('#navbar').removeClass('navbar').addClass('navbar2');

    $('#load').removeClass('play').addClass('circle').removeClass('icon').addClass('icon').addClass('notch').addClass('loading');
  editor3.setValue("Running....");
  var data = JSON.stringify({
            "code":editor1.getValue(),
            "language":lan,
            "input":editor2.getValue()
            });

  var config = {
    method: 'post',
    url: 'your link...',
    headers: { 
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://axios.nikraj.repl.co',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
     //console.log(response);
     $('#load').removeClass();
      $('#navbar').removeClass('navbar2').addClass('navbar');
       $('#load').addClass('play').addClass('icon');
    editor3.setValue(response.data.output);
   
    // document.getElementById("editor3").innerHTML=response.data.output;
  })
  .catch(function (error) {
   // console.log(error);
    editor4.setValue(error);
    // document.getElementById("editor4").innerHTML=error;
  });
});


});
