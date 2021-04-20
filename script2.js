require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.14.3/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.14.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.14.3/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

require(["vs/editor/editor.main"], function () {
	let editor1 = monaco.editor.create(document.getElementById('editor1'), {
		value: [
			'function x() {',
			'\tconsole.log("Hello world!");',
			'}'
		].join('\n'),
		language: 'cpp',
		theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
        fontSize: 20,
        scrollbar: {
		useShadows: true,
		vertical: "visible",
		horizontal: "visible",
		verticalScrollbarSize: 10,
		horizontalScrollbarSize: 10,
	},
	});

    let editor2=monaco.editor.create(document.getElementById('editor2'), {
		src: 'code.cpp',
		theme: 'vs-dark',
        language: "text/plain",
	    fontFamily: "Arial",
        minimap: {
            enabled: false,
        },
        fontSize: 18,
        scrollbar: {
		useShadows: true,
		vertical: "visible",
		horizontal: "visible",
		verticalScrollbarSize: 9,
		horizontalScrollbarSize: 9,
	},
	});

    let editor3=monaco.editor.create(document.getElementById('editor3'), {
		value: [
			'function x() {',
			'\tconsole.log("Hello world!");',
			'}'
		].join('\n'),
		language: 'javascript',
		theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
        fontSize: 18,
        language: "text/plain",
	    fontFamily: "Arial",
        scrollbar: {
		useShadows: true,
		vertical: "visible",
		horizontal: "visible",
		verticalScrollbarSize: 9,
		horizontalScrollbarSize: 9,
	},
	});
    let editor4=monaco.editor.create(document.getElementById('editor4'), {
		value: [
			'function x() {',
			'\tconsole.log("Hello world!");',
			'}'
		].join('\n'),
		language: 'text/plain',
		theme: 'vs-dark',
        minimap: {
            enabled: false,
        },
        fontSize: 18,
        language: "text/plain",
	    fontFamily: "Arial",
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
    }
});
 monaco.editor.defineTheme('myTheme2', {
"base": "vs-dark",
  "inherit": true,
  "rules": [
    { "token": "comment", "foreground": "ffa500", "background": "303030", "fontStyle": "italic underline" },
    { "token": "comment.js", "foreground": "008800", "fontStyle": "bold" },
    { "token": "comment.css", "foreground": "0000ff", "fontStyle": "bold", "inherit": false, "background": "808080" }
  ]});
monaco.editor.setTheme('myTheme');
  
});

