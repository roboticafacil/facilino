/**
 * @license
 * Blockly Demos: Block Factory
 *
 * Copyright 2016 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Block Factory application through
 * which users can build blocks using a visual interface and dynamically
 * generate a preview block and starter code for the block (block definition and
 * generator stub. Uses the Block Factory namespace. Depends on the FactoryUtils
 * for its code generation functions.
 *
 * @author fraser@google.com (Neil Fraser), quachtina96 (Tina Quach)
 */
'use strict';

/**
 * Namespace for Block Factory.
 */
goog.provide('BlockFactory');

goog.require('FactoryUtils');
goog.require('StandardCategories');


/**
 * Workspace for user to build block.
 * @type {Blockly.Workspace}
 */
BlockFactory.mainWorkspace = null;

/**
 * Workspace for preview of block.
 * @type {Blockly.Workspace}
 */
BlockFactory.previewWorkspace = null;

/**
 * Name of block if not named.
 */
BlockFactory.UNNAMED = 'unnamed';

/**
 * Existing direction ('ltr' vs 'rtl') of preview.
 */
BlockFactory.oldDir = null;

BlockFactory.oldBBox = {height: 0, width: 0};

/*
 * The starting XML for the Block Factory main workspace. Contains the
 * unmovable, undeletable factory_base block.
 */
BlockFactory.STARTER_BLOCK_XML_TEXT = '<xml><block type="factory_base" ' +
    'deletable="false" movable="true">' +
    '<value name="TOOLTIP">' +
    '<block type="text" deletable="false" movable="false">' +
    '<field name="TEXT"></field></block></value>' +
    '</block><block type="code_base" ' +
    'deletable="false" movable="true" x="400" y="0">' +
    '</block><block type="doc_base" ' +
    'deletable="false" movable="true" x="0" y="400">' +
	'<value name="TITLE">' +
    '<block type="text" deletable="false" movable="false">' +
    '<field name="TEXT">Here goes the instruction title</field></block></value>' +
	'<value name="DESCRIPTION">' +
    '<block type="text" deletable="false" movable="false">' +
    '<field name="TEXT">Here goest the instruction description</field></block></value>' +
    '</block></xml>';


BlockFactory.History = {};
BlockFactory.History.stack = [];
BlockFactory.History.initialState ='';
BlockFactory.History.position=0;
BlockFactory.History.limit=200;
BlockFactory.History.updating=false;
BlockFactory.History.stack[0]=BlockFactory.STARTER_BLOCK_XML_TEXT;
	
/**
 * Change the language code format.
 */
/*BlockFactory.formatChange = function() {
  var mask = document.getElementById('blocklyMask');
  var languagePre = document.getElementById('languagePre');
  var languageTA = document.getElementById('languageTA');
  if (document.getElementById('format').value == 'Manual') {
    Blockly.hideChaff();
    mask.style.display = 'block';
    languagePre.style.display = 'none';
    languageTA.style.display = 'block';
    var code = languagePre.textContent.trim();
    languageTA.value = code;
    languageTA.focus();
    BlockFactory.updatePreview();
  } else {
    mask.style.display = 'none';
    languageTA.style.display = 'none';
    languagePre.style.display = 'block';
    BlockFactory.updateLanguage();
  }
  BlockFactory.disableEnableLink();
};*/

BlockFactory.undoRedo = function(){
		//Save History
	  var undo = document.getElementById('undo');
	  var redo = document.getElementById('redo');
	  if ((undo!==undefined)&&(redo!==undefined))
	  {
		var current = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(BlockFactory.mainWorkspace)).replace(' disabled="true"','');
		if ((current !== BlockFactory.History.stack[BlockFactory.History.position].replace(' disabled="true"',''))&&(current!==BlockFactory.History.initialState))
		{
			//console.log(current);
			//console.log(BlockFactory.History.stack[BlockFactory.History.position]);
			//console.log(BlockFactory.History.initialState);
			BlockFactory.History.updating=true;
		}
		//console.log(BlockFactory.History.updating);
		if (BlockFactory.History.updating)
		{
			while (BlockFactory.History.stack.length > BlockFactory.History.limit) {
				BlockFactory.History.stack.shift();
			}
			BlockFactory.History.position = Math.min(BlockFactory.History.position,BlockFactory.History.stack.length - 1);
			BlockFactory.History.stack = BlockFactory.History.stack.slice(0, BlockFactory.History.position + 1);
			BlockFactory.History.stack.push(current);
			BlockFactory.History.position++;
			if (BlockFactory.History.position > 0)
				$("#undo").show();
			else
				$("#undo").hide();
			if (BlockFactory.History.position<(BlockFactory.History.stack.length-1))
				$("#redo").show();
			else
				$("#redo").hide();
			//console.log('Saving position '+BlockFactory.History.position);
			BlockFactory.History.updating=false;
			//console.log(BlockFactory.History.updating);
		}
	  }
};

/**
 * Update the language code based on constructs made in Blockly.
 */
BlockFactory.updateLanguage = function() {
  var rootBlock = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
  if (!rootBlock) {
    return;
  }
  var blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase();
  if (!blockType) {
    blockType = BlockFactory.UNNAMED;
  }
  var format = 'JavaScript'; //document.getElementById('format').value;
  var code = FactoryUtils.getBlockDefinition(blockType, rootBlock, format,
      BlockFactory.mainWorkspace);
	//console.log(code);
  FactoryUtils.injectCode(code, 'languagePre');
  BlockFactory.updatePreview();
  //Webhelper
  try{
	 window.webHelper.sourceChanged();
   }
   catch(e) {}
};

/**
 * Update the generator code.
 * @param {!Blockly.Block} block Rendered block in preview workspace.
 */
BlockFactory.updateGenerator = function(block) {
  var language = 'Arduino'; //document.getElementById('language').value;
  var generatorStub = FactoryUtils.getGeneratorStub(block, language);
  FactoryUtils.injectCode(generatorStub, 'generatorPre');
};

BlockFactory.updateDoc = function(blockType) {
	var docDiv = document.getElementById('docDiv');
	if (docDiv!==null)
	{
		var doc = FactoryUtils.getDoc(blockType);
		if (doc!==null)
			docDiv.srcdoc=doc;
	}
};

/**
 * Update the preview display.
 */
BlockFactory.updatePreview = function() {
  // Toggle between LTR/RTL if needed (also used in first display).
  var newDir = 'LTR'; //document.getElementById('direction').value;
  if (BlockFactory.oldDir != newDir) {
    if (BlockFactory.previewWorkspace) {
      BlockFactory.previewWorkspace.dispose();
    }
    var rtl = newDir == 'rtl';
    BlockFactory.previewWorkspace = Blockly.inject('preview',{rtl: rtl,media: '../media/',scrollbars: false});
    BlockFactory.oldDir = newDir;
  }
  BlockFactory.previewWorkspace.clear();

  // Fetch the code and determine its format (JSON or JavaScript).
  var code = document.getElementById('languagePre').textContent;
  if (!code.trim()) {
    // Nothing to render.  Happens while cloud storage is loading.
    return;
  }

  // Backup Blockly.Blocks object so that main workspace and preview don't
  // collide if user creates a 'factory_base' block, for instance.
  var backupBlocks = Blockly.Blocks;
  try {
    // Make a shallow copy.
    Blockly.Blocks = Object.create(null);
    for (var prop in backupBlocks) {
      Blockly.Blocks[prop] = backupBlocks[prop];
    }
	eval(code);

    // Look for a block on Blockly.Blocks that does not match the backup.
    var blockType = null;
    for (var type in Blockly.Blocks) {
      if (typeof Blockly.Blocks[type].init == 'function' &&
          Blockly.Blocks[type] != backupBlocks[type]) {
        blockType = type;
        break;
      }
    }
    if (!blockType) {
      return;
    }

    // Create the preview block.
    var previewBlock = BlockFactory.previewWorkspace.newBlock(blockType);
    previewBlock.initSvg();
    previewBlock.render();
    previewBlock.setMovable(false);
    previewBlock.setDeletable(false);
    previewBlock.moveBy(15, 10);
	var instructionPreview = document.getElementById('preview');
	var bbox = previewBlock.getHeightWidth();
	//instructionPreview.style.height= bbox.height+20;
	//console.log(bbox);
	//console.log(BlockFactory.oldBBox);
	if ((bbox.height!==BlockFactory.oldBBox.height))// || (bbox.width!==BlockFactory.oldBBox.width))
	{
		window.dispatchEvent(new Event('resize'));
		BlockFactory.oldBBox.height=bbox.height;
		BlockFactory.oldBBox.width=bbox.width;
	}
    BlockFactory.previewWorkspace.clearUndo();
    BlockFactory.updateGenerator(previewBlock);
	BlockFactory.updateDoc(blockType);

    // Warn user only if their block type is already exists in Blockly's
    // standard library.
    var rootBlock = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
    /*if (StandardCategories.coreBlockTypes.indexOf(blockType) != -1) {
      rootBlock.setWarningText('A core Blockly block already exists ' +
          'under this name.');

    } else if (blockType == 'block_type') {
      // Warn user to let them know they can't save a block under the default
      // name 'block_type'
      rootBlock.setWarningText('You cannot save a block with the default ' +
          'name, "block_type"');

    } else {
      rootBlock.setWarningText(null);
    }*/

  } finally {
    Blockly.Blocks = backupBlocks;
  }
};

/**
 * Disable link and save buttons if the format is 'Manual', enable otherwise.
 */
BlockFactory.disableEnableLink = function() {
  var linkButton = document.getElementById('linkButton');
  var saveBlockButton = document.getElementById('localSaveButton');
  var saveToLibButton = document.getElementById('saveToBlockLibraryButton');
  var disabled = document.getElementById('format').value == 'Manual';
  linkButton.disabled = disabled;
  saveBlockButton.disabled = disabled;
  saveToLibButton.disabled = disabled;
};

/**
 * Render starter block (factory_base).
 */
BlockFactory.showStarterBlock = function() {
  BlockFactory.mainWorkspace.clear();
  var xml = Blockly.Xml.textToDom(BlockFactory.STARTER_BLOCK_XML_TEXT);
  Blockly.Xml.domToWorkspace(xml, BlockFactory.mainWorkspace);
};

/**
 * Returns whether or not the current block open is the starter block.
 */
BlockFactory.isStarterBlock = function() {
  var rootBlock = FactoryUtils.getRootBlock(BlockFactory.mainWorkspace);
  // The starter block does not have blocks nested into the factory_base block.
  return !(rootBlock.getChildren().length > 0 || rootBlock.getFieldValue('NAME') ||
      // The starter block's name is the default, 'block_type'.
      rootBlock.getFieldValue('NAME').trim().toLowerCase() != 'block_type' ||
      // The starter block has no connections.
      rootBlock.getFieldValue('CONNECTIONS') != 'NONE' ||
      // The starter block has automatic inputs.
      rootBlock.getFieldValue('INLINE') != 'AUTO');
};
