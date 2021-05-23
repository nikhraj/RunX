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

var titles = {"c":"code.h","cpp":"code.cpp","java":"code.java","py":"code.py"};

var monacolang = {"c":"c","cpp":"cpp","java":"java","py":"python"};

	let editor1 = monaco.editor.create(document.getElementById('editor1'), {
        automaticLayout: true,
        scrollBeyondLastLine: true,
		value: cppSource,
		language: "cpp",
		theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
        fontSize: fontSize,
        scrollbar: {
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
    //console.log(value);
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
    sources[lan]=editor1.getValue();
    lan = $('#lang').dropdown('get value');
   // editor1.updateOptions({language: monacolang[lan]});
    monaco.editor.setModelLanguage(editor1.getModel(), monacolang[lan]);
    editor1.setValue(sources[lan]);
    $(".lm_title")[0].innerText = titles[lan];

});

function editorsUpdateFontSize(fontSize) {
    editor1.updateOptions({fontSize: fontSize});
    editor2.updateOptions({fontSize: fontSize});
    editor3.updateOptions({fontSize: fontSize});
    editor4.updateOptions({fontSize: fontSize});
}

var out_audio = new Audio('https://cdn.jsdelivr.net/gh/nikhraj/CodeForces-Code-Editor/outputaudio.mp3');
var run_audio = new Audio('https://cdn.jsdelivr.net/gh/nikhraj/CodeForces-Code-Editor/runaudio.wav');
//var btn_audio = new Audio('buttonaudio.mp3');

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
        } else if (event.ctrlKey && keyCode == 109) { // Ctrl--
            e.preventDefault();
            fontSize -= 1;
            editorsUpdateFontSize(fontSize);
        }
    });


$("#setbk").click(function set_bookmark(){
        myStorage = window.localStorage;
        var filename = "code.cpp"; 
        var json_str = localStorage.getItem('mycodes');
        if(!json_str){
           json_str = "";
           localStorage.setItem('mycodes', json_str);
        }
        if(json_str.length > 0)
           var mainObj = JSON.parse(json_str);
        else
           var mainObj = [];
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var n = new Date().toLocaleDateString("en-IN", options);

        var f = 1;
        for(var i=0;i<mainObj.length;i++)
        {
            if(mainObj[i].filename==filename)
            {
                f=0;
                mainObj[i].code = editor1.getValue();
                mainObj[i].input = editor2.getValue();
                break;
            }
        }
        if(f)
        {
            mainObj.push({filename:"code.cpp",code:editor1.getValue(),input:editor2.getValue(),date:n});
        }

        var json_str = JSON.stringify(mainObj);
        localStorage.setItem('mycodes', json_str);
        console.log(json_str);
});

$("#getbk").click(function get_bookmark(){
    myStorage = window.localStorage;
    var filename = "code.cpp";
    var json_str = localStorage.getItem('mycodes');
   //console.log(json_str);
    var mainObj = JSON.parse(json_str);
   //console.log(mainObj);
   for(var i=0;i<mainObj.length;i++)
   {
       if(mainObj[i].filename==filename)
       {
        var code = mainObj[i].code;
        var input = mainObj[i].input;   
        editor1.setValue(code);
        editor2.setValue(input);
       }
   }
   // console.log(filename);
    //console.log(code);
   
    
        
});
//console.log(editor1.getValue());

//console.log(editor2.getValue());
  
$("#run").click(function run(){
    run_audio.play();
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
    url: 'https://sweet-code.herokuapp.com/https://codexweb.netlify.app/.netlify/functions/enforceCode',
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
    run_audio.pause();
    out_audio.play();
     $('#navbar')
      .toast({
        message: 'Execution Complete,Please Check Output!',
        class : 'olive',
        className: {
        toast: 'ui message'
    }
      })
     console.log(response);
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