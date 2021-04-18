var config = {
	settings:{
        hasHeaders: true,
        showPopoutIcon: false,
       
    },
    dimensions:{
        headerHeight:40,
        borderWidth: 5,
    },
	content: [{
		type: 'row',
		content: [{
			type: 'component',
			componentName: 'gridComponent',
			title: 'code.cpp',
			componentState: {
				html: getContent('#goldenify-a'),
			}
		}, {
			type: 'column',
			content: [{
				type: 'component',
				componentName: 'gridComponent',
				title: 'input.txt',
				componentState: {
					html: getContent('#goldenify-b')
				}
			}, {
				type: 'component',
				componentName: 'gridComponent',
                title: 'output.txt',
				componentState: {
					html: getContent('#goldenify-c')
				}
			}]
		}]
	}]
};

var myLayout = new GoldenLayout(config);

myLayout.registerComponent('gridComponent', function(container, componentState) {
	container.getElement().html(componentState.html);
});

myLayout.init();

function getContent(selector) {
	var $el = $(selector);
	var html = $el.html();

	$el.remove();

	return html;
}