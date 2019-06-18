function openFunction(bly) {
    $.ajax({
        type: "GET" ,
        url: bly ,
        dataType: "xml" , async: false,
        success: function(xml) {
			var txt = new XMLSerializer().serializeToString(xml);
			Blockly.mainWorkspace.clear();
			var xmlDOM = Blockly.Xml.textToDom(txt);
			Blockly.Xml.domToWorkspace(xmlDOM,Blockly.getMainWorkspace());
        }
    });
}
function injectInstruction(block,blockDiv) {
	var instructionPreview = document.getElementById(blockDiv);
	var mainWorkspace = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
	mainWorkspace.clear();
	var block = mainWorkspace.newBlock(block);
	block.initSvg();
	block.render();
	block.setMovable(false);
	block.setDeletable(false);
	block.moveBy(15, 10);
	var bbox = block.getHeightWidth();
	instructionPreview.style.height = (bbox.height+50)+ 'px';
	instructionPreview.style.width = (bbox.width+50) + 'px';
	window.dispatchEvent(new Event('resize'));
}
function injectExample(example,exampleDiv) {
    var instructionPreview = document.getElementById(exampleDiv);
	var mainWorkspace = Blockly.inject(exampleDiv, {readOnly:true, collapse: false});
	openFunction('doc/examples/'+example);
	var bbox = mainWorkspace.svgBlockCanvas_.getBBox();
	instructionPreview.style.height = (bbox.height+25)+ 'px';
	instructionPreview.style.width = (bbox.width+25) + 'px';
	window.dispatchEvent(new Event('resize'));
}

function getCategoryList() {
	var blocks = { };
	var colours = { };

	for (var block in this.Blocks) {
		// important check that this is objects own property 
		// not from prototype prop inherited
		if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
			var category = this.Blocks[block].category;
			var subcategory = this.Blocks[block].subcategory;
			var colour = this.Blocks[block].category_colour;
			var subsubcategory = this.Blocks[block].subsubcategory;
			var found = false;
			if (subcategory===undefined)
			{
				subcategory='root';
				subsubcategory='root';
			}
			else
			{
				if (subsubcategory===undefined)
				{
					subsubcategory='root';
				}
			}
			blocks[category] = blocks[category] || { };
			colours[category] = colours[category] || colour;
			blocks[category][subcategory] = blocks[category][subcategory] || [];
			blocks[category][subcategory][subsubcategory] = blocks[category][subcategory][subsubcategory] || [];
			blocks[category][subcategory][subsubcategory].push(block);
		}
	}

	var instruction_list = '<ul class="instruction">';

	var categoryItem = function(type) {
		instruction_list += '<li>'+type+'</li>';
	};

	for (category in blocks) {
		if (blocks.hasOwnProperty(category)) {
			instruction_list += '<li id="'+category+'">'+category+'<ul>';
			for (subcategory in blocks[category]) {
				if (subcategory!=='root'){
					instruction_list += '<li id="'+subcategory+'">'+subcategory+'<ul>';
					
					instruction_list += '</li></ul>';
				}
			}
			instruction_list += '</li></ul>';
		}
	}
	instruction_list += '</ul>';

	return instruction_list;
};