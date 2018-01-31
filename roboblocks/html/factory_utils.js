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
 * @fileoverview FactoryUtils is a namespace that holds block starter code
 * generation functions shared by the Block Factory, Workspace Factory, and
 * Exporter applications within Blockly Factory. Holds functions to generate
 * block definitions and generator stubs and to create and download files.
 *
 * @author fraser@google.com (Neil Fraser), quachtina96 (Tina Quach)
 */
 'use strict';

/**
 * Namespace for FactoryUtils.
 */
goog.provide('FactoryUtils');

//goog.require('jszip');
/**
 * Get block definition code for the current block.
 * @param {string} blockType Type of block.
 * @param {!Blockly.Block} rootBlock RootBlock from main workspace in which
 *    user uses Block Factory Blocks to create a custom block.
 * @param {string} format 'JSON' or 'JavaScript'.
 * @param {!Blockly.Workspace} workspace Where the root block lives.
 * @return {string} Block definition.
 */
FactoryUtils.getBlockDefinition = function(blockType, rootBlock, format, workspace) {
  blockType = FactoryUtils.cleanBlockType(blockType);
  switch (format) {
    case 'JSON':
      var code = FactoryUtils.formatJson_(blockType, rootBlock);
      break;
    case 'JavaScript':
      var code = FactoryUtils.formatJavaScript_(blockType, rootBlock, workspace);
      break;
  }
  return code;
};

/**
 * Convert invalid block name to a valid one. Replaces whitespace
 * and prepend names that start with a digit with an '_'.
 * @param {string} blockType Type of block.
 * @return {string} Cleaned up block type.
 */
FactoryUtils.cleanBlockType = function(blockType) {
  if (!blockType) {
    return '';
  }
  return blockType.replace(/\W/g, '_').replace(/^(\d)/, '_$1');
};

/**
 * Get the generator code for a given block.
 * @param {!Blockly.Block} block Rendered block in preview workspace.
 * @param {string} generatorLanguage 'JavaScript', 'Python', 'PHP', 'Lua',
 *   'Dart'.
 * @return {string} Generator code for multiple blocks.
 */
FactoryUtils.getGeneratorStub = function(block, generatorLanguage) {
  function makeVar(root, name) {
    name = name.toLowerCase().replace(/\W/g, '_');
    return '  var ' + root + '_' + name;
  }
  // The makevar function lives in the original update generator.
  var language = generatorLanguage;
  var code = [];
  var codeBlock = FactoryUtils.getCodeBlock(BlockFactory.mainWorkspace)
  //console.log(block);
  code.push("Blockly." + language + "['" + block.type +
            "'] = function(block) {");
  // Generate getters for any fields or inputs.
  for (var i = 0, input; input = block.inputList[i]; i++) {
    for (var j = 0, field; field = input.fieldRow[j]; j++) {
      var name = field.name;
      if (!name) {
        continue;
      }
      if (field instanceof Blockly.FieldVariable) {
        // Subclass of Blockly.FieldDropdown, must test first.
        code.push(makeVar('field', name) +
                  " = Blockly." + language +
                  ".variableDB_.getName(block.getFieldValue('" + name +
                  "'), Blockly.Variables.NAME_TYPE);");
      } else if (field instanceof Blockly.FieldAngle) {
        // Subclass of Blockly.FieldTextInput, must test first.
        code.push(makeVar('field', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (Blockly.FieldDate && field instanceof Blockly.FieldDate) {
        // Blockly.FieldDate may not be compiled into Blockly.
        code.push(makeVar('field', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldColour) {
        code.push(makeVar('field', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldCheckbox) {
        code.push(makeVar('field', name) +
                  " = block.getFieldValue('" + name + "') == 'TRUE';");
      } else if (field instanceof Blockly.FieldDropdown) {
        code.push(makeVar('field', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldNumber) {
        code.push(makeVar('field', name) +
                  " = block.getFieldValue('" + name + "');");
      } else if (field instanceof Blockly.FieldTextInput) {
        code.push(makeVar('field', name) +
                  " = block.getFieldValue('" + name + "');");
      }
    }
    var name = input.name;
    if (name) {
      if (input.type == Blockly.INPUT_VALUE) {
        code.push(makeVar('input', name) +
                  " = Blockly." + language + ".valueToCode(block, '" + name +
                  "', Blockly." + language + ".ORDER_ATOMIC);");
      } else if (input.type == Blockly.NEXT_STATEMENT) {
        code.push(makeVar('statements', name) +
                  " = Blockly." + language + ".statementToCode(block, '" +
                  name + "');");
      }
    }
  }
  // Most languages end lines with a semicolon.  Python does not.
  var lineEnd = {
    'Arduino': ';'
  };
  //console.log(setup_code);
  var includesBlock = codeBlock.getInputTargetBlock('INCLUDE_CODE');
  while (includesBlock) {
      if (!includesBlock.disabled && !includesBlock.getInheritedDisabled()) {
        if (includesBlock.type === 'code_header') {
          code.push("  Blockly.Arduino.definitions_['define_"+includesBlock.getFieldValue('TEXT').replace(".","_").toLowerCase()+"']='#include &lt;"+includesBlock.getFieldValue('TEXT')+"&gt;';"); 
        }
      }
      includesBlock = includesBlock.nextConnection && includesBlock.nextConnection.targetBlock();
  }
  var variablesBlock = codeBlock.getInputTargetBlock('VARIABLES_CODE');
  while (variablesBlock) {
      if (!variablesBlock.disabled && !variablesBlock.getInheritedDisabled()) {
        if (variablesBlock.type === 'code_variable') {
			if (variablesBlock.getFieldValue('TYPE')=='char')
				code.push("  Blockly.Arduino.definitions_['declare_var_define_"+variablesBlock.getFieldValue('NAME')+"']=\""+variablesBlock.getFieldValue('TYPE')+" "+variablesBlock.getFieldValue('NAME')+"='"+variablesBlock.getFieldValue('INIT')+";'\";");
			else if (variablesBlock.getFieldValue('TYPE')=='String')
				code.push("  Blockly.Arduino.definitions_['declare_var_define_"+variablesBlock.getFieldValue('NAME')+"']='"+variablesBlock.getFieldValue('TYPE')+" "+variablesBlock.getFieldValue('NAME')+"=\""+variablesBlock.getFieldValue('INIT')+"\";';");
			else
			  code.push("  Blockly.Arduino.definitions_['declare_var_define_"+variablesBlock.getFieldValue('NAME')+"']='"+variablesBlock.getFieldValue('TYPE')+" "+variablesBlock.getFieldValue('NAME')+"="+variablesBlock.getFieldValue('INIT')+";';");
        }
		else if (variablesBlock.type === 'code_generic_variable')
		{
			code.push("  Blockly.Arduino.definitions_['declare_var_define_"+variablesBlock.getFieldValue('NAME')+"']='"+variablesBlock.getFieldValue('TYPE')+" "+variablesBlock.getFieldValue('NAME')+"="+variablesBlock.getFieldValue('INIT')+";';");
		}
		/*else
		{
			var _code = FactoryUtils.getCodeFromCodeBlock(variablesBlock);
			code.push("  Blockly.Arduino.setups_['setup_"+setupBlock.getFieldValue('NAME')+"']='"+_code+"';");
		}*/
      }
      variablesBlock = variablesBlock.nextConnection && variablesBlock.nextConnection.targetBlock();
  }
  var functionsBlock = codeBlock.getInputTargetBlock('FUNCTIONS_CODE');
  while (functionsBlock) {
      if (!functionsBlock.disabled && !functionsBlock.getInheritedDisabled()) {
		  var functionCodeBlock = functionsBlock.getInputTargetBlock('CODE');
		  var _code = FactoryUtils.getCodeFromCodeBlock(functionCodeBlock);
		  var args = '';
		  if (functionsBlock.variableCount_>0)
		  {
			  args+=''+functionsBlock.variableType_[0]+' '+functionsBlock.variableName_[0];
			  for (var i=1;i<functionsBlock.variableCount_;i++)
			  {
				  args+=','+functionsBlock.variableType_[i]+' '+functionsBlock.variableName_[i];
			  }
		  }
          if (functionsBlock.type === 'code_function') {
			var functions_code = 'void '+functionsBlock.getFieldValue('NAME')+'('+args+') {\\n '+_code+'\\n }\\n ';
			code.push("  Blockly.Arduino.definitions_['define_"+functionsBlock.getFieldValue('NAME')+"']='"+functions_code+"';"); 
		  }
		  else if (functionsBlock.type==='code_function_return'){
			var returnCodeBlock = functionsBlock.getInputTargetBlock('RETURN_CODE');
			var _return_code = FactoryUtils.getStreamCodeFromBlock(returnCodeBlock);
			if (!_return_code.includes(';'))
				_return_code+=';';
			if (_return_code===';')
				_return_code='0;';
			var functions_code = functionsBlock.getFieldValue('RETURN')+' '+functionsBlock.getFieldValue('NAME')+'('+args+') {\\n '+_code+'\\n return '+_return_code+'\\n }\\n ';
			code.push("  Blockly.Arduino.definitions_['define_"+functionsBlock.getFieldValue('NAME')+"']='"+functions_code+"';"); 
		  }
		  else if (functionsBlock.type==='code_function_generic_return'){
			var returnCodeBlock = functionsBlock.getInputTargetBlock('RETURN_CODE');
			var _return_code = FactoryUtils.getStreamCodeFromBlock(returnCodeBlock);
			if (!_return_code.includes(';'))
				_return_code+=';';
			if (_return_code===';')
				_return_code='0;';
			var functions_code = functionsBlock.getFieldValue('RETURN')+' '+functionsBlock.getFieldValue('NAME')+'('+args+') {\\n '+_code+'\\n return '+_return_code+'\\n }\\n ';
			code.push("  Blockly.Arduino.definitions_['define_"+functionsBlock.getFieldValue('NAME')+"']='"+functions_code+"';"); 
		  }
		  else if(functionsBlock.type==='code_function_ext') {
			  var func_name = functionsBlock.getInputTargetBlock('NAME');
			  if (func_name && func_name.type==='code_func_arg'){
				var functions_code = 'void \'+'+functionsBlock.getInputTargetBlock('NAME').getFieldValue('INPUT')+'+\'('+args+') {\\n '+_code+'\\n }\\n ';
				code.push("  Blockly.Arduino.definitions_['define_"+functionsBlock.getInputTargetBlock('NAME').getFieldValue('INPUT')+"']='"+functions_code+"';"); 
			  }
		  }
		  else if (functionsBlock.type==='code_function_ext_return'){
			  
			var returnCodeBlock = functionsBlock.getInputTargetBlock('RETURN_CODE');
			var _return_code = FactoryUtils.getStreamCodeFromBlock(returnCodeBlock);
			if (!_return_code.includes(';'))
				_return_code+=';';
			if (_return_code===';')
				_return_code='0;';
			var func_name = functionsBlock.getInputTargetBlock('NAME');
			if (func_name && func_name.type==='code_func_arg'){
				var functions_code = functionsBlock.getFieldValue('RETURN')+' \'+'+functionsBlock.getInputTargetBlock('NAME').getFieldValue('INPUT')+'+\'('+args+') {\\n '+_code+'\\n return '+_return_code+'\\n }\\n ';
				code.push("  Blockly.Arduino.definitions_['define_"+functionsBlock.getInputTargetBlock('NAME').getFieldValue('INPUT')+"']='"+functions_code+"';"); 
			}
		  }
		  else if (functionsBlock.type==='code_function_ext_generic_return'){
			  
			var returnCodeBlock = functionsBlock.getInputTargetBlock('RETURN_CODE');
			var _return_code = FactoryUtils.getStreamCodeFromBlock(returnCodeBlock);
			if (!_return_code.includes(';'))
				_return_code+=';';
			if (_return_code===';')
				_return_code='0;';
			var func_name = functionsBlock.getInputTargetBlock('NAME');
			if (func_name && func_name.type==='code_func_arg'){
				var functions_code = functionsBlock.getFieldValue('RETURN')+' \'+'+functionsBlock.getInputTargetBlock('NAME').getFieldValue('INPUT')+'+\'('+args+') {\\n '+_code+'\\n return '+_return_code+'\\n }\\n ';
				code.push("  Blockly.Arduino.definitions_['define_"+functionsBlock.getInputTargetBlock('NAME').getFieldValue('INPUT')+"']='"+functions_code+"';"); 
			}
		  }
      }
      functionsBlock = functionsBlock.nextConnection && functionsBlock.nextConnection.targetBlock();
  }
  var setupBlock = codeBlock.getInputTargetBlock('SETUP_CODE');
  while (setupBlock) {
      if (!setupBlock.disabled && !setupBlock.getInheritedDisabled()) {
		  var setupCodeBlock = setupBlock.getInputTargetBlock('CODE');
		  var _code = FactoryUtils.getCodeFromCodeBlock(setupCodeBlock);
		  code.push("  Blockly.Arduino.setups_['setup_"+setupBlock.getFieldValue('NAME')+"']='"+_code+"';");
      }
      setupBlock = setupBlock.nextConnection && setupBlock.nextConnection.targetBlock();
  }
  var inlineBlock = codeBlock.getInputTargetBlock('INLINE_CODE');
  code.push("  var code='';");
  while (inlineBlock) {
      if (!inlineBlock.disabled && !inlineBlock.getInheritedDisabled()) {
		var _code = FactoryUtils.getCodeFromCodeBlock(inlineBlock);
		code.push("  code+='"+_code+"';");
      }
      inlineBlock = inlineBlock.nextConnection && inlineBlock.nextConnection.targetBlock();
  }
  if (block.outputConnection){
	  code.push("  return [code, Blockly." + language + ".ORDER_NONE];");
  }
  else{
	  code.push("  code+= '\\n';");
	  code.push("  return code;");
  }
  code.push("};");

  return code.join('\n');
};

FactoryUtils.pushDocExample = function(code,div,blockType)
{
	code.push("<script>");
  code.push("var instructionPreview = document.getElementById(\""+div+"\");");
  code.push("var mainWorkspace = Blockly.inject('"+div+"', {readOnly:true, collapse: false});");
  code.push("mainWorkspace.clear();");
  code.push("var block = mainWorkspace.newBlock('"+blockType+"');");
  code.push("block.initSvg();");
  code.push("block.render();");
  code.push("block.setMovable(false);");
  code.push("block.setDeletable(false);");
  code.push("block.moveBy(15, 10);");
  code.push("var bbox = block.getHeightWidth();");
  code.push("instructionPreview.style.height = (bbox.height+50)+ 'px';");
  code.push("instructionPreview.style.width = (bbox.width+50) + 'px';");
  code.push("window.dispatchEvent(new Event('resize'));");
  code.push("</script>");
  return code;
}

FactoryUtils.getDoc = function(blockType) {
  var code = [];
  var docBlock = FactoryUtils.getDocBlock(BlockFactory.mainWorkspace)
  //document.getElementById('instruction_title').innerHTML = FactoryUtils.getInputFromRootBlock_(docBlock,'TITLE');
  code.push("<!DOCTYPE html>");
  code.push("<html>");
  code.push("<head>");
  code.push("<meta charset='utf-8'>");
  //code.push("<meta name='viewport' content='target-densitydpi=device-dpi, height=660, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>");
  code.push("<script src='../../javascript/blockly-bq/blockly_compressed.js'></script>");
  code.push("<script src='../../javascript/blockly-bq/arduino_compressed.js'></script>");
  code.push("<script src='../../javascript/jquery/dist/jquery.min.js'></script>");
  code.push("<script src='../../lang/en.js'></script>");
  code.push("<script src='../../javascript/blockly-bq/blocks_compressed.js'></script>");
  //code.push("<script src='closure-library/closure/goog/base.js'></script>");
  code.push("<script src='../../blocks.js'></script>");
  code.push("<style>.button_wrapper {");
  code.push("text-align: center;");
  code.push("color: red;");
  code.push("}");
  code.push(".button {");
  code.push("background-color: #2e2efe;");
  code.push("border: none;");
  code.push("color: white;");
  code.push("padding: 15px 32px;");
  code.push("text-align: center;");
  code.push("text-decoration: none;");
  code.push("display: inline-block;");
  code.push("font-size: 16px;");
  code.push("}");
  code.push("</style>");
  code.push("<script>");
  code.push("function openFunction(bly) { $.ajax({type: \"GET\" , url: bly , dataType: \"xml\" , success: function(xml) { var txt = new XMLSerializer().serializeToString(xml); Blockly.mainWorkspace.clear(); var xmlDOM = Blockly.Xml.textToDom(txt); Blockly.Xml.domToWorkspace(xmlDOM,Blockly.getMainWorkspace()); } }); }");
  code.push("</script>");
  code.push("</head>");
  code.push("<body>");
  code.push("<h3 id='up'>"+FactoryUtils.getInputFromRootBlock_(docBlock,'TITLE')+"</h3>");
  code.push("<h4>Instruction</h4>");
  code.push("<div id='blocklyInstruction'>Block instruction will be rendered here</div>");
  code.push("<script>");
  code.push("var instructionPreview = document.getElementById(\"blocklyInstruction\");");
  code.push("var mainWorkspace = Blockly.inject('blocklyInstruction', {readOnly:true, collapse: false});");
  code.push("mainWorkspace.clear();");
  code.push("var block = mainWorkspace.newBlock('"+blockType+"');");
  code.push("block.initSvg();");
  code.push("block.render();");
  code.push("block.setMovable(false);");
  code.push("block.setDeletable(false);");
  code.push("block.moveBy(15, 10);");
  code.push("var bbox = block.getHeightWidth();");
  code.push("instructionPreview.style.height = (bbox.height+50)+ 'px';");
  code.push("instructionPreview.style.width = (bbox.width+50) + 'px';");
  code.push("window.dispatchEvent(new Event('resize'));");
  code.push("</script>");
  code.push("<h4>Description</h4>");
  code.push("<p>"+FactoryUtils.getInputFromRootBlock_(docBlock,'DESCRIPTION')+"</p>");
  var inputsBlock = docBlock.getInputTargetBlock('INPUTS');
  var hasInputs = false;
  if (inputsBlock) {
	  if (inputsBlock.nextConnection)
	    hasInputs = true;
  }
  if (hasInputs){
	  code.push("<h4>Inputs</h4>");
	  code.push("<ul>");
  }
  while (inputsBlock) {
      if (!inputsBlock.disabled && !inputsBlock.getInheritedDisabled()) {
        if (inputsBlock.type == 'doc_input') {
          code.push("<li>"+inputsBlock.getFieldValue('TEXT')+": "+inputsBlock.getInputTargetBlock('DOC').getFieldValue('TEXT')+"</li>");
        }
      }
      inputsBlock = inputsBlock.nextConnection &&
        inputsBlock.nextConnection.targetBlock();
  }
  if (hasInputs)
	  code.push("</ul>");
  var statementsBlock = docBlock.getInputTargetBlock('STATEMENTS');
  var hasStatements = false;
  if (statementsBlock) {
	  if (statementsBlock.nextConnection)
	    hasStatements = true;
  }
  if (hasStatements){
	  code.push("<h4>Statement Instructions</h4>");
	  code.push("<ul>");
  }
  while (statementsBlock) {
      if (!statementsBlock.disabled && !statementsBlock.getInheritedDisabled()) {
        if (statementsBlock.type == 'doc_statement') {
          code.push("<li>"+statementsBlock.getFieldValue('TEXT')+": "+statementsBlock.getInputTargetBlock('DOC').getFieldValue('TEXT')+"</li>");
        }
      }
      statementsBlock = statementsBlock.nextConnection &&
        statementsBlock.nextConnection.targetBlock();
  }
  if (hasStatements)
	  code.push("</ul>");
  var fieldsBlock = docBlock.getInputTargetBlock('FIELDS');
  var hasFields = false;
  if (fieldsBlock) {
	  if (fieldsBlock.nextConnection)
	    hasFields = true;
  }
  if (hasFields){
	  code.push("<h4>Fields</h4>");
	  code.push("<ul>");
  }
  while (fieldsBlock) {
      if (!fieldsBlock.disabled && !fieldsBlock.getInheritedDisabled()) {
        if (fieldsBlock.type == 'doc_fields') {
          code.push("<li>"+fieldsBlock.getFieldValue('TEXT')+": "+fieldsBlock.getInputTargetBlock('DOC').getFieldValue('TEXT')+"</li>");
        }
      }
      fieldsBlock = fieldsBlock.nextConnection && fieldsBlock.nextConnection.targetBlock();
  }
  if (hasFields)
	  code.push("</ul>");
  var examplesBlock = docBlock.getInputTargetBlock('EXAMPLES');
  var examplesCount = 0;
  while (examplesBlock) {
	 if (!examplesBlock.disabled && !examplesBlock.getInheritedDisabled())
	  {
	    if (examplesBlock.type == 'doc_examples') {
		  examplesCount++;
		  code.push("<h4>Example "+examplesCount+"</h4>");
		  code.push(examplesBlock.getInputTargetBlock('DESCRIPTION').getFieldValue('TEXT'));
		  code.push("<div class=\"button_wrapper\">");
		  code.push("<p><button align=\"center\" class=\"button\" style=\"cursor: pointer;\" onClick=\"openFunction('doc/examples/"+examplesBlock.getFieldValue('FIELD')+".bly')\">Open</button></p>");
		  code.push("All changes will be lost!");
		  code.push("</div>");
		  code.push("<h5>Circuit</h5>");
		  code.push("<image src=\"doc/circuits/"+examplesBlock.getInputTargetBlock('CIRCUIT').getFieldValue('TEXT')+"\" title=\""+examplesBlock.getInputTargetBlock('CIRCUIT').getFieldValue('TEXT')+"\" alt=\""+examplesBlock.getInputTargetBlock('CIRCUIT').getFieldValue('TEXT')+"\"></image>");
		  code.push("<h5>Facilino Code</h5>");
		  code.push("<div id='blocklyExample"+examplesCount+"'>Example code will be rendered here</div>");
		  code.push("<script>");
		  code.push("var instructionPreview = document.getElementById(\"blocklyExample"+examplesCount+"\");");
		  code.push("var mainWorkspace = Blockly.inject('blocklyExample"+examplesCount+"', {readOnly:true, collapse: false});");
		  code.push("openFunction('doc/examples/"+examplesBlock.getFieldValue('FIELD')+".bly');");
		  code.push("$('.blocklySvg, #blocklyExample"+examplesCount+"').height('100%');");
		  code.push("$('.blocklySvg').width('100%');");
		  code.push("window.dispatchEvent(new Event('resize'));");
		  code.push("</script>");
        }
	  }
	  examplesBlock = examplesBlock.nextConnection && examplesBlock.nextConnection.targetBlock();
  }
  code.push("<p><image src=\"doc/common/home.png\" title=\"home\" alt=\"home\" style=\"cursor: pointer;\" onClick=\"$(function(){$('#doc').load('doc/en-GB/index.html');});\"></image> | <a href=\"#up\"><image src=\"doc/common/up.png\" title=\"up\" alt=\"up\"></image></a> | <image src=\"doc/common/category.png\" title=\"category\" alt=\"category\" style=\"cursor: pointer;\" onClick=\"$(function(){$('#doc').load('doc/en-GB/categories.html');});\"></image> | <image src=\"doc/common/language.png\" title=\"language\" alt=\"language\" style=\"cursor: pointer;\" onClick=\"alert('Do you want to colaborate in translating Facilino to your language? Please, contact with soporte@roboticafacil.es')\"></image> | <image src=\"doc/common/bug-fixing.png\" title=\"bug-fixing\" alt=\"bug-fixing\" style=\"cursor: pointer;\" onClick=\"alert('Have you found a bug? Please, contact with soporte@roboticafacil.es')\"></image></p>");
  code.push("</body>");
  code.push("</html>");
  return code.join('\n');
};

/**
 * Update the language code as JSON.
 * @param {string} blockType Name of block.
 * @param {!Blockly.Block} rootBlock Factory_base block.
 * @return {string} Generanted language code.
 * @private
 */
FactoryUtils.formatJson_ = function(blockType, rootBlock) {
  var JS = {};
  // Type is not used by Blockly, but may be used by a loader.
  JS.type = blockType;
  // Generate inputs.
  var message = [];
  var args = [];
  var contentsBlock = rootBlock.getInputTargetBlock('INPUTS');
  var lastInput = null;
  while (contentsBlock) {
    if (!contentsBlock.disabled && !contentsBlock.getInheritedDisabled()) {
      var fields = FactoryUtils.getFieldsJson_(
          contentsBlock.getInputTargetBlock('FIELDS'));
      for (var i = 0; i < fields.length; i++) {
        if (typeof fields[i] == 'string') {
          message.push(fields[i].replace(/%/g, '%%'));
        } else {
          args.push(fields[i]);
          message.push('%' + args.length);
        }
      }

      var input = {type: contentsBlock.type};
      // Dummy inputs don't have names.  Other inputs do.
      if (contentsBlock.type != 'input_dummy') {
        input.name = contentsBlock.getFieldValue('INPUTNAME');
      }
      var check = JSON.parse(
          FactoryUtils.getOptTypesFrom(contentsBlock, 'TYPE') || 'null');
      if (check) {
        input.check = check;
      }
      var align = contentsBlock.getFieldValue('ALIGN');
      if (align != 'LEFT') {
        input.align = align;
      }
      args.push(input);
      message.push('%' + args.length);
      lastInput = contentsBlock;
    }
    contentsBlock = contentsBlock.nextConnection &&
        contentsBlock.nextConnection.targetBlock();
  }
  // Remove last input if dummy and not empty.
  if (lastInput && lastInput.type == 'input_dummy') {
    var fields = lastInput.getInputTargetBlock('FIELDS');
    if (fields && FactoryUtils.getFieldsJson_(fields).join('').trim() != '') {
      var align = lastInput.getFieldValue('ALIGN');
      if (align != 'LEFT') {
        JS.lastDummyAlign0 = align;
      }
      args.pop();
      message.pop();
    }
  }
  JS.message0 = message.join(' ');
  if (args.length) {
    JS.args0 = args;
  }
  // Generate inline/external switch.
  if (rootBlock.getFieldValue('INLINE') == 'EXT') {
    JS.inputsInline = false;
  } else if (rootBlock.getFieldValue('INLINE') == 'INT') {
    JS.inputsInline = true;
  }
  // Generate output, or next/previous connections.
  switch (rootBlock.getFieldValue('CONNECTIONS')) {
    case 'LEFT':
      JS.output =
          JSON.parse(
              FactoryUtils.getOptTypesFrom(rootBlock, 'OUTPUTTYPE') || 'null');
      break;
    case 'BOTH':
      JS.previousStatement =
          JSON.parse(
              FactoryUtils.getOptTypesFrom(rootBlock, 'TOPTYPE') || 'null');
      JS.nextStatement =
          JSON.parse(
              FactoryUtils.getOptTypesFrom(rootBlock, 'BOTTOMTYPE') || 'null');
      break;
    case 'TOP':
      JS.previousStatement =
          JSON.parse(
              FactoryUtils.getOptTypesFrom(rootBlock, 'TOPTYPE') || 'null');
      break;
    case 'BOTTOM':
      JS.nextStatement =
          JSON.parse(
              FactoryUtils.getOptTypesFrom(rootBlock, 'BOTTOMTYPE') || 'null');
      break;
  }
  // Generate colour.
  /*var colourBlock = rootBlock.getInputTargetBlock('COLOUR');
  if (colourBlock && !colourBlock.disabled) {
    var hue = parseInt(colourBlock.getFieldValue('HUE'), 10);
    JS.colour = hue;
  }*/

  JS.tooltip = FactoryUtils.getInputFromRootBlock_(rootBlock,'TOOLTIP');
  //JS.helpUrl = FactoryUtils.getInputFromRootBlock_(rootBlock,'HELPURL');

  return JSON.stringify(JS, null, '  ');
};

/**
 * Update the language code as JavaScript.
 * @param {string} blockType Name of block.
 * @param {!Blockly.Block} rootBlock Factory_base block.
 * @param {!Blockly.Workspace} workspace Where the root block lives.
 * @return {string} Generated language code.
 * @private
 */
FactoryUtils.formatJavaScript_ = function(blockType, rootBlock, workspace) {
  var code = [];
  code.push("Blockly.Blocks['" + blockType + "'] = {");
  if (rootBlock.getFieldValue('CATEGORY')==='OTHER')
	code.push("  category: '"+(rootBlock.getFieldValue('OTHER_CATEGORY') || 'Category')+"',");
  else
    code.push("  category: Facilino.locales.getKey('LANG_CATEGORY_"+rootBlock.getFieldValue('CATEGORY')+"'),");
  if (rootBlock.getFieldValue('CATEGORY')==='OTHER')
	  code.push("  category_colour: '"+(rootBlock.getFieldValue('COLOUR') || '#000000')+"',");
  else
	  code.push("  category_colour: Facilino.LANG_COLOUR_"+rootBlock.getFieldValue('CATEGORY')+",");
  if (rootBlock.getFieldValue('CATEGORY')==='OTHER')
	  code.push("  colour: '"+(rootBlock.getFieldValue('COLOUR') || '#000000')+"',");
  else
	  code.push("  colour: Facilino.LANG_COLOUR_"+rootBlock.getFieldValue('CATEGORY')+",");
  //var tag = FactoryUtils.getInputFromRootBlock_(rootBlock,'TAG');
  //code.push("  tags: ['"+tag+"'],");
  code.push("  helpUrl: Facilino.getHelpUrl('"+blockType+"'),");
  //code.push("  examples: ['"+blockType+"_example.bly'],");
  //var title = FactoryUtils.getInputFromRootBlock_(rootBlock,'TITLE');
  //code.push("  title: '"+title+"',");
  var contentsBlock = rootBlock.getInputTargetBlock('TAGS');
  var str = "  tags: [";
  while (contentsBlock) {
    if (!contentsBlock.disabled && !contentsBlock.getInheritedDisabled()) {
      str+="'"+contentsBlock.getFieldValue('TEXT')+"'";
	}
	contentsBlock = contentsBlock.nextConnection && contentsBlock.nextConnection.targetBlock();
	if (contentsBlock)
		str+=",";
  }
  str+="],";
  code.push(str);
  contentsBlock = rootBlock.getInputTargetBlock('EXAMPLES');
  str = "  examples: [";
  while (contentsBlock) {
    if (!contentsBlock.disabled && !contentsBlock.getInheritedDisabled()) {
      str+="'"+contentsBlock.getFieldValue('TEXT')+".bly'";
	}
	contentsBlock = contentsBlock.nextConnection && contentsBlock.nextConnection.targetBlock();
	if (contentsBlock)
		str+=",";
  }
  str+="],";
  code.push(str);
  code.push("  init: function() {");
  // Generate inputs.
  var TYPES = {'input_value': 'appendValueInput',
               'input_statement': 'appendStatementInput',
               'input_dummy': 'appendDummyInput'};
  contentsBlock = rootBlock.getInputTargetBlock('INPUTS');
  while (contentsBlock) {
    if (!contentsBlock.disabled && !contentsBlock.getInheritedDisabled()) {
      var name = '';
      // Dummy inputs don't have names.  Other inputs do.
      if (contentsBlock.type !== 'input_dummy') {
        name =
            JSON.stringify(contentsBlock.getFieldValue('INPUTNAME'));
      }
      code.push('    this.' + TYPES[contentsBlock.type] + '(' + name + ')');
      var check = FactoryUtils.getOptTypesFrom(contentsBlock, 'TYPE');
      if (check) {
        code.push('        .setCheck(' + check + ')');
      }
      var align = contentsBlock.getFieldValue('ALIGN');
      if (align != 'LEFT') {
        code.push('        .setAlign(Blockly.ALIGN_' + align + ')');
      }
      var fields = FactoryUtils.getFieldsJs_(
          contentsBlock.getInputTargetBlock('FIELDS'));
      for (var i = 0; i < fields.length; i++) {
        code.push('        .appendField(' + fields[i] + ')');
      }
      // Add semicolon to last line to finish the statement.
      code[code.length - 1] += ';';
    }
    contentsBlock = contentsBlock.nextConnection &&
        contentsBlock.nextConnection.targetBlock();
  }
  // Generate inline/external switch.
  if (rootBlock.getFieldValue('INLINE') == 'EXT') {
    code.push('    this.setInputsInline(false);');
  } else if (rootBlock.getFieldValue('INLINE') == 'INT') {
    code.push('    this.setInputsInline(true);');
  }
  // Generate output, or next/previous connections.
  switch (rootBlock.getFieldValue('CONNECTIONS')) {
    case 'LEFT':
      code.push(FactoryUtils.connectionLineJs_('setOutput', 'OUTPUTTYPE', workspace));
      break;
    case 'BOTH':
      code.push(
          FactoryUtils.connectionLineJs_('setPreviousStatement', 'TOPTYPE', workspace));
      code.push(
          FactoryUtils.connectionLineJs_('setNextStatement', 'BOTTOMTYPE', workspace));
      break;
    case 'TOP':
      code.push(
          FactoryUtils.connectionLineJs_('setPreviousStatement', 'TOPTYPE', workspace));
      break;
    case 'BOTTOM':
      code.push(
          FactoryUtils.connectionLineJs_('setNextStatement', 'BOTTOMTYPE', workspace));
      break;
  }
  // Generate colour.
  //code.push('    this.setColour("#FF00FF");');
  if (rootBlock.getFieldValue('CATEGORY')==='OTHER')
	  code.push('    this.setColour("'+(rootBlock.getFieldValue('COLOUR')||'#000000')+'");');
  else
    code.push('    this.setColour("'+Facilino.locales.getKey('LANG_COLOUR_'+rootBlock.getFieldValue('CATEGORY'))+'");');

  var tooltip = FactoryUtils.getInputFromRootBlock_(rootBlock,'TOOLTIP');
  
  code.push('    this.setTooltip(' + JSON.stringify(tooltip) + ');');
  code.push('  }');
  code.push('};');
  return code.join('\n');
};

/**
 * Create JS code required to create a top, bottom, or value connection.
 * @param {string} functionName JavaScript function name.
 * @param {string} typeName Name of type input.
 * @param {!Blockly.Workspace} workspace Where the root block lives.
 * @return {string} Line of JavaScript code to create connection.
 * @private
 */
FactoryUtils.connectionLineJs_ = function(functionName, typeName, workspace) {
  var type = FactoryUtils.getOptTypesFrom(
      FactoryUtils.getRootBlock(workspace), typeName);
  if (type) {
    type = ', ' + type;
  } else {
    type = '';
  }
  return '    this.' + functionName + '(true' + type + ');';
};

/**
 * Returns field strings and any config.
 * @param {!Blockly.Block} block Input block.
 * @return {!Array.<string>} Field strings.
 * @private
 */
FactoryUtils.getFieldsJs_ = function(block) {
  var fields = [];
  while (block) {
    if (!block.disabled && !block.getInheritedDisabled()) {
      switch (block.type) {
        case 'field_static':
          // Result: 'hello'
          fields.push(JSON.stringify(block.getFieldValue('TEXT')));
          break;
        case 'field_input':
          // Result: new Blockly.FieldTextInput('Hello'), 'GREET'
          fields.push('new Blockly.FieldTextInput(' +
              JSON.stringify(block.getFieldValue('TEXT')) + '), ' +
              JSON.stringify(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_number':
          // Result: new Blockly.FieldNumber(10, 0, 100, 1), 'NUMBER'
          var args = [
            Number(block.getFieldValue('VALUE')),
            Number(block.getFieldValue('MIN')),
            Number(block.getFieldValue('MAX')),
            Number(block.getFieldValue('PRECISION'))
          ];
          // Remove any trailing arguments that aren't needed.
          if (args[3] == 0) {
            args.pop();
            if (args[2] == Infinity) {
              args.pop();
              if (args[1] == -Infinity) {
                args.pop();
              }
            }
          }
          fields.push('new Blockly.FieldNumber(' + args.join(', ') + '), ' +
              JSON.stringify(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_angle':
          // Result: new Blockly.FieldAngle(90), 'ANGLE'
          fields.push('new Blockly.FieldAngle(' +
              parseFloat(block.getFieldValue('ANGLE')) + '), ' +
              JSON.stringify(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_checkbox':
          // Result: new Blockly.FieldCheckbox('TRUE'), 'CHECK'
          fields.push('new Blockly.FieldCheckbox(' +
              JSON.stringify(block.getFieldValue('CHECKED')) +
               '), ' +
              JSON.stringify(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_colour':
          // Result: new Blockly.FieldColour('#ff0000'), 'COLOUR'
          fields.push('new Blockly.FieldColour(' +
              JSON.stringify(block.getFieldValue('COLOUR')) +
              '), ' +
              JSON.stringify(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_date':
          // Result: new Blockly.FieldDate('2015-02-04'), 'DATE'
          fields.push('new Blockly.FieldDate(' +
              JSON.stringify(block.getFieldValue('DATE')) + '), ' +
              JSON.stringify(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_variable':
          // Result: new Blockly.FieldVariable('item'), 'VAR'
          var varname
              = JSON.stringify(block.getFieldValue('TEXT') || null);
          fields.push('new Blockly.FieldVariable(' + varname + '), ' +
              JSON.stringify(block.getFieldValue('FIELDNAME')));
          break;
        case 'field_dropdown':
          // Result:
          // new Blockly.FieldDropdown([['yes', '1'], ['no', '0']]), 'TOGGLE'
          var options = [];
          for (var i = 0; i < block.optionList_.length; i++) {
            options[i] = JSON.stringify([block.getUserData(i),
                                         block.getFieldValue('CPU' + i)]);
          }
          if (options.length) {
            fields.push('new Blockly.FieldDropdown([' +
                options.join(', ') + ']), ' +
                JSON.stringify(block.getFieldValue('FIELDNAME')));
          }
          break;
        case 'field_image':
          // Result: new Blockly.FieldImage('http://...', 80, 60, '*')
          var src = JSON.stringify(block.getFieldValue('SRC'));
          var width = Number(block.getFieldValue('WIDTH'));
          var height = Number(block.getFieldValue('HEIGHT'));
          var alt = JSON.stringify(block.getFieldValue('ALT'));
          fields.push('new Blockly.FieldImage(' +
              src + ', ' + width + ', ' + height + ', ' + alt + ')');
          break;
      }
    }
    block = block.nextConnection && block.nextConnection.targetBlock();
  }
  return fields;
};

/**
 * Returns field strings and any config.
 * @param {!Blockly.Block} block Input block.
 * @return {!Array.<string|!Object>} Array of static text and field configs.
 * @private
 */
FactoryUtils.getFieldsJson_ = function(block) {
  var fields = [];
  while (block) {
    if (!block.disabled && !block.getInheritedDisabled()) {
      switch (block.type) {
        case 'field_static':
          // Result: 'hello'
          fields.push(block.getFieldValue('TEXT'));
          break;
        case 'field_input':
          fields.push({
            type: block.type,
            name: block.getFieldValue('FIELDNAME'),
            text: block.getFieldValue('TEXT')
          });
          break;
        case 'field_number':
          var obj = {
            type: block.type,
            name: block.getFieldValue('FIELDNAME'),
            value: parseFloat(block.getFieldValue('VALUE'))
          };
          var min = parseFloat(block.getFieldValue('MIN'));
          if (min > -Infinity) {
            obj.min = min;
          }
          var max = parseFloat(block.getFieldValue('MAX'));
          if (max < Infinity) {
            obj.max = max;
          }
          var precision = parseFloat(block.getFieldValue('PRECISION'));
          if (precision) {
            obj.precision = precision;
          }
          fields.push(obj);
          break;
        case 'field_angle':
          fields.push({
            type: block.type,
            name: block.getFieldValue('FIELDNAME'),
            angle: Number(block.getFieldValue('ANGLE'))
          });
          break;
        case 'field_checkbox':
          fields.push({
            type: block.type,
            name: block.getFieldValue('FIELDNAME'),
            checked: block.getFieldValue('CHECKED') == 'TRUE'
          });
          break;
        case 'field_colour':
          fields.push({
            type: block.type,
            name: block.getFieldValue('FIELDNAME'),
            colour: block.getFieldValue('COLOUR')
          });
          break;
        case 'field_date':
          fields.push({
            type: block.type,
            name: block.getFieldValue('FIELDNAME'),
            date: block.getFieldValue('DATE')
          });
          break;
        case 'field_variable':
          fields.push({
            type: block.type,
            name: block.getFieldValue('FIELDNAME'),
            variable: block.getFieldValue('TEXT') || null
          });
          break;
        case 'field_dropdown':
          var options = [];
          for (var i = 0; i < block.optionList_.length; i++) {
            options[i] = [block.getUserData(i),
                block.getFieldValue('CPU' + i)];
          }
          if (options.length) {
            fields.push({
              type: block.type,
              name: block.getFieldValue('FIELDNAME'),
              options: options
            });
          }
          break;
        case 'field_image':
          fields.push({
            type: block.type,
            src: block.getFieldValue('SRC'),
            width: Number(block.getFieldValue('WIDTH')),
            height: Number(block.getFieldValue('HEIGHT')),
            alt: block.getFieldValue('ALT')
          });
          break;
      }
    }
    block = block.nextConnection && block.nextConnection.targetBlock();
  }
  return fields;
};

/**
 * Fetch the type(s) defined in the given input.
 * Format as a string for appending to the generated code.
 * @param {!Blockly.Block} block Block with input.
 * @param {string} name Name of the input.
 * @return {?string} String defining the types.
 */
FactoryUtils.getOptTypesFrom = function(block, name) {
  var types = FactoryUtils.getTypesFrom_(block, name);
  if (types.length == 0) {
    return undefined;
  } else if (types.indexOf('null') != -1) {
    return 'null';
  } else if (types.length == 1) {
    return types[0];
  } else {
    return '[' + types.join(', ') + ']';
  }
};


/**
 * Fetch the type(s) defined in the given input.
 * @param {!Blockly.Block} block Block with input.
 * @param {string} name Name of the input.
 * @return {!Array.<string>} List of types.
 * @private
 */
FactoryUtils.getTypesFrom_ = function(block, name) {
  var typeBlock = block.getInputTargetBlock(name);
  var types;
  if (!typeBlock || typeBlock.disabled) {
    types = [];
  } else if (typeBlock.type === 'type_other') {
    types = [JSON.stringify(typeBlock.getFieldValue('TYPE'))];
  } else if (typeBlock.type === 'type_group') {
    types = [];
    for (var n = 0; n < typeBlock.typeCount_; n++) {
      types = types.concat(FactoryUtils.getTypesFrom_(typeBlock, 'TYPE' + n));
    }
    // Remove duplicates.
    var hash = Object.create(null);
    for (var n = types.length - 1; n >= 0; n--) {
      if (hash[types[n]]) {
        types.splice(n, 1);
      }
      hash[types[n]] = true;
    }
  } else {
    types = [JSON.stringify(typeBlock.valueType)];
  }
  return types;
};

/**
 * Return the uneditable container block that everything else attaches to in
 * given workspace.
 * @param {!Blockly.Workspace} workspace Where the root block lives.
 * @return {Blockly.Block} Root block.
 */
FactoryUtils.getRootBlock = function(workspace) {
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0, block; block = blocks[i]; i++) {
    if (block.type === 'factory_base') {
      return block;
    }
  }
  return null;
};

FactoryUtils.getCodeBlock = function(workspace) {
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0, block; block = blocks[i]; i++) {
    if (block.type === 'code_base') {
      return block;
    }
  }
  return null;
};

FactoryUtils.getDocBlock = function(workspace) {
  var blocks = workspace.getTopBlocks(false);
  for (var i = 0, block; block = blocks[i]; i++) {
    if (block.type === 'doc_base') {
      return block;
    }
  }
  return null;
};

// TODO(quachtina96): Move hide, show, makeInvisible, and makeVisible to a new
// AppView namespace.

/**
 * Hides element so that it's invisible and doesn't take up space.
 * @param {string} elementID ID of element to hide.
 */
FactoryUtils.hide = function(elementID) {
  document.getElementById(elementID).style.display = 'none';
};

/**
 * Un-hides an element.
 * @param {string} elementID ID of element to hide.
 */
FactoryUtils.show = function(elementID) {
  document.getElementById(elementID).style.display = 'block';
};

/**
 * Hides element so that it's invisible but still takes up space.
 * @param {string} elementID ID of element to hide.
 */
FactoryUtils.makeInvisible = function(elementID) {
  document.getElementById(elementID).visibility = 'hidden';
};

/**
 * Makes element visible.
 * @param {string} elementID ID of element to hide.
 */
FactoryUtils.makeVisible = function(elementID) {
  document.getElementById(elementID).visibility = 'visible';
};

/**
 * Create a file with the given attributes and download it.
 * @param {string} contents The contents of the file.
 * @param {string} filename The name of the file to save to.
 * @param {string} fileType The type of the file to save.
 */
FactoryUtils.createAndDownloadFile = function(contents, filename, fileType) {
  //var zip = new JSZip();
  console.log(filename);
  var filename_bls = filename;
  if (!filename_bls.includes('.bls'))
	  filename_bls=filename_bls.concat('.bls');
  var data = new Blob([contents], {type: 'text/' + fileType});
  zip.createWriter(new zip.BlobWriter("application/zip"), function(writer) {
    // use a BlobReader object to read the data stored into blob variable
    writer.add(filename_bls, new zip.BlobReader(data), function() {
      // close the writer and calls callback function
      writer.close(function(blob){
		  //console.log('Done!');
		  //console.log(blob);
		  var a = document.createElement('a');
		  a.href = window.URL.createObjectURL(blob);
		  a.download = filename +'.zip';
		  a.textContent = 'Download file!';
		  a.dispatchEvent(clickEvent);
		  });
    }
	);
  }, function(){console.log('ERROR');});
  var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
  });  
};

/**
 * Create a file with the given attributes and download it.
 * @param {string} contents The contents of the file.
 * @param {string} filename The name of the file to save to.
 * @param {string} fileType The type of the file to save.
 */
/*FactoryUtils.createAndDownloadFile = function(contents, filename, fileType) {
  var data = new Blob([contents], {type: 'text/' + fileType});
  var clickEvent = new MouseEvent("click", {
    "view": window,
    "bubbles": true,
    "cancelable": false
  });

  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(data);
  a.download = filename;
  a.textContent = 'Download file!';
  a.dispatchEvent(clickEvent);
};*/

/**
 * Get Blockly Block by rendering pre-defined block in workspace.
 * @param {!Element} blockType Type of block that has already been defined.
 * @param {!Blockly.Workspace} workspace Workspace on which to render
 *    the block.
 * @return {!Blockly.Block} The Blockly.Block of desired type.
 */
FactoryUtils.getDefinedBlock = function(blockType, workspace) {
  workspace.clear();
  return workspace.newBlock(blockType);
};

/**
 * Parses a block definition get the type of the block it defines.
 * @param {string} blockDef A single block definition.
 * @return {string} Type of block defined by the given definition.
 */
FactoryUtils.getBlockTypeFromJsDefinition = function(blockDef) {
  var indexOfStartBracket = blockDef.indexOf('[\'');
  var indexOfEndBracket = blockDef.indexOf('\']');
  if (indexOfStartBracket != -1 && indexOfEndBracket != -1) {
    return blockDef.substring(indexOfStartBracket + 2, indexOfEndBracket);
  } else {
    throw new Error ('Could not parse block type out of JavaScript block ' +
        'definition. Brackets normally enclosing block type not found.');
  }
};

/**
 * Generates a category containing blocks of the specified block types.
 * @param {!Array.<!Blockly.Block>} blocks Blocks to include in the category.
 * @param {string} categoryName Name to use for the generated category.
 * @return {!Element} Category XML containing the given block types.
 */
FactoryUtils.generateCategoryXml = function(blocks, categoryName) {
  // Create category DOM element.
  var categoryElement = goog.dom.createDom('category');
  categoryElement.setAttribute('name', categoryName);

  // For each block, add block element to category.
  for (var i = 0, block; block = blocks[i]; i++) {

    // Get preview block XML.
    var blockXml = Blockly.Xml.blockToDom(block);
    blockXml.removeAttribute('id');

    // Add block to category and category to XML.
    categoryElement.appendChild(blockXml);
  }
  return categoryElement;
};

/**
 * Parses a string containing JavaScript block definition(s) to create an array
 * in which each element is a single block definition.
 * @param {string} blockDefsString JavaScript block definition(s).
 * @return {!Array.<string>} Array of block definitions.
 */
FactoryUtils.parseJsBlockDefinitions = function(blockDefsString) {
  var blockDefArray = [];
  var defStart = blockDefsString.indexOf('Blockly.Blocks');

  while (blockDefsString.indexOf('Blockly.Blocks', defStart) != -1) {
    var nextStart = blockDefsString.indexOf('Blockly.Blocks', defStart + 1);
    if (nextStart == -1) {
      // This is the last block definition.
      nextStart = blockDefsString.length;
    }
    var blockDef = blockDefsString.substring(defStart, nextStart);
    blockDefArray.push(blockDef);
    defStart = nextStart;
  }
  return blockDefArray;
};

/**
 * Parses a string containing JSON block definition(s) to create an array
 * in which each element is a single block definition. Expected input is
 * one or more block definitions in the form of concatenated, stringified
 * JSON objects.
 * @param {string} blockDefsString String containing JSON block
 *    definition(s).
 * @return {!Array.<string>} Array of block definitions.
 */
FactoryUtils.parseJsonBlockDefinitions = function(blockDefsString) {
  var blockDefArray = [];
  var unbalancedBracketCount = 0;
  var defStart = 0;
  // Iterate through the blockDefs string. Keep track of whether brackets
  // are balanced.
  for (var i = 0; i < blockDefsString.length; i++) {
    var currentChar = blockDefsString[i];
    if (currentChar == '{') {
      unbalancedBracketCount++;
    }
    else if (currentChar == '}') {
      unbalancedBracketCount--;
      if (unbalancedBracketCount == 0 && i > 0) {
        // The brackets are balanced. We've got a complete block defintion.
        var blockDef = blockDefsString.substring(defStart, i + 1);
        blockDefArray.push(blockDef);
        defStart = i + 1;
      }
    }
  }
  return blockDefArray;
};

/**
 * Define blocks from imported block definitions.
 * @param {string} blockDefsString Block definition(s).
 * @param {string} format Block definition format ('JSON' or 'JavaScript').
 * @return {!Array.<!Element>} Array of block types defined.
 */
FactoryUtils.defineAndGetBlockTypes = function(blockDefsString, format) {
  var blockTypes = [];

  // Define blocks and get block types.
  if (format == 'JSON') {
    var blockDefArray = FactoryUtils.parseJsonBlockDefinitions(blockDefsString);

    // Populate array of blocktypes and define each block.
    for (var i = 0, blockDef; blockDef = blockDefArray[i]; i++) {
      var json = JSON.parse(blockDef);
      blockTypes.push(json.type);

      // Define the block.
		Blockly.Blocks[json.type] = {
        init: function() {
          this.jsonInit(json);
        }
      };
    }
  } else if (format == 'JavaScript') {
    var blockDefArray = FactoryUtils.parseJsBlockDefinitions(blockDefsString);

    // Populate array of block types.
    for (var i = 0, blockDef; blockDef = blockDefArray[i]; i++) {
      var blockType = FactoryUtils.getBlockTypeFromJsDefinition(blockDef);
      blockTypes.push(blockType);
    }

    // Define all blocks.
    eval(blockDefsString);
  }

  return blockTypes;
};

/**
 * Inject code into a pre tag, with syntax highlighting.
 * Safe from HTML/script injection.
 * @param {string} code Lines of code.
 * @param {string} id ID of <pre> element to inject into.
 */
FactoryUtils.injectCode = function(code, id) {
  var pre = document.getElementById(id);
  if (pre!==null)
  {
	  pre.textContent = code;
	  code = pre.textContent;
	  //console.log(code);
	  code = PR.prettyPrintOne(code, 'js');
	  //console.log(code);
	  
	  //code = code.replace(/<script>/g, "&lt;script&gt;");
	  //code = code.replace(/<\/script>/g, "&lt;/script&gt;");
	  //code = code.replace('/#include <', "#include &lt;");
	  //code = code.replace(/.h>/g, "&gt;");
	  //console.log(code);
	  pre.innerHTML = code;
  }
};

/**
 * Returns whether or not two blocks are the same based on their XML. Expects
 * XML with a single child node that is a factory_base block, the XML found on
 * Block Factory's main workspace.
 * @param {!Element} blockXml1 An XML element with a single child node that
 *    is a factory_base block.
 * @param {!Element} blockXml2 An XML element with a single child node that
 *    is a factory_base block.
 * @return {boolean} Whether or not two blocks are the same based on their XML.
 */
FactoryUtils.sameBlockXml = function(blockXml1, blockXml2) {
  // Each XML element should contain a single child element with a 'block' tag
  if (blockXml1.tagName.toLowerCase() != 'xml' ||
      blockXml2.tagName.toLowerCase() != 'xml') {
    throw new Error('Expected two XML elements, recieved elements with tag ' +
        'names: ' + blockXml1.tagName + ' and ' + blockXml2.tagName + '.');
  }

  // Compare the block elements directly. The XML tags may include other meta
  // information we want to igrore.
  var blockElement1 = blockXml1.getElementsByTagName('block')[0];
  var blockElement2 = blockXml2.getElementsByTagName('block')[0];

  if (!(blockElement1 && blockElement2)) {
    throw new Error('Could not get find block element in XML.');
  }

  var blockXmlText1 = Blockly.Xml.domToText(blockElement1);
  var blockXmlText2 = Blockly.Xml.domToText(blockElement2);

  // Strip white space.
  blockXmlText1 = blockXmlText1.replace(/\s+/g, '');
  blockXmlText2 = blockXmlText2.replace(/\s+/g, '');

  // Return whether or not changes have been saved.
  return blockXmlText1 == blockXmlText2;
};

/*
 * Checks if a block has a variable field. Blocks with variable fields cannot
 * be shadow blocks.
 * @param {Blockly.Block} block The block to check if a variable field exists.
 * @return {boolean} True if the block has a variable field, false otherwise.
 */
FactoryUtils.hasVariableField = function(block) {
  if (!block) {
    return false;
  }
  return block.getVars().length > 0;
};

/**
 * Checks if a block is a procedures block. If procedures block names are
 * ever updated or expanded, this function should be updated as well (no
 * other known markers for procedure blocks beyond name).
 * @param {Blockly.Block} block The block to check.
 * @return {boolean} True if the block is a procedure block, false otherwise.
 */
FactoryUtils.isProcedureBlock = function(block) {
  return block &&
      (block.type == 'procedures_defnoreturn' ||
      block.type == 'procedures_defreturn' ||
      block.type == 'procedures_callnoreturn' ||
      block.type == 'procedures_callreturn' ||
      block.type == 'procedures_ifreturn');
};

/**
 * Returns whether or not a modified block's changes has been saved to the
 * Block Library.
 * TODO(quachtina96): move into the Block Factory Controller once made.
 * @param {!BlockLibraryController} blockLibraryController Block Library
 *    Controller storing custom blocks.
 * @return {boolean} True if all changes made to the block have been saved to
 *    the given Block Library.
 */
FactoryUtils.savedBlockChanges = function(blockLibraryController) {
  if (BlockFactory.isStarterBlock()) {
    return true;
  }
  var blockType = blockLibraryController.getCurrentBlockType();
  var currentXml = Blockly.Xml.workspaceToDom(BlockFactory.mainWorkspace);

  if (blockLibraryController.has(blockType)) {
    // Block is saved in block library.
    var savedXml = blockLibraryController.getBlockXml(blockType);
    return FactoryUtils.sameBlockXml(savedXml, currentXml);
  }
  return false;
};

/**
 * Given the root block of the factory, return the tooltip specified by the user
 * or the empty string if no tooltip is found.
 * @param {!Blockly.Block} rootBlock Factory_base block.
 * @return {string} The tooltip for the generated block, or the empty string.
 */
/*FactoryUtils.getTooltipFromRootBlock_ = function(rootBlock) {
  var tooltipBlock = rootBlock.getInputTargetBlock('TOOLTIP');
  if (tooltipBlock && !tooltipBlock.disabled) {
    return tooltipBlock.getFieldValue('TEXT');
  }
  return '';
};*/

/**
 * Given the root block of the factory, return the help url specified by the
 * user or the empty string if no tooltip is found.
 * @param {!Blockly.Block} rootBlock Factory_base block.
 * @return {string} The help url for the generated block, or the empty string.
 */
 FactoryUtils.getInputFromRootBlock_ = function(rootBlock,input) {
  var block = rootBlock.getInputTargetBlock(input);
  if (block && !block.disabled) {
    return block.getFieldValue('TEXT');
  }
  return '';
};

FactoryUtils.getStreamCodeFromBlock = function(block){
	var code='';
	while(block)
	{
		if (block.type === 'code_more'){
			code+=block.getFieldValue('TEXT');
			block = block.getInputTargetBlock('CODE');
		}
		else if (block.type === 'code_func_arg'){
			code+=block.getFieldValue('INPUT');
			block = block.getInputTargetBlock('CODE');
		}
		else if (block.type === 'code_variables'){
			if (block.last_variable.includes("input_") || block.last_variable.includes("statements_") || block.last_variable.includes("field_"))
			  code+="'+"+block.getFieldValue('INPUT').toLowerCase()+"+'";
		    else
			  code+=block.getFieldValue('INPUT');
			block = block.getInputTargetBlock('CODE');
		}
		else if (block.type === 'code_end'){
			block = null;
		}
		else if (block.type === 'code_semicolon_end'){
			code+=';\\n ';
			block = null;
		}
	}
	return code;
}

FactoryUtils.getCodeFromCodeBlock = function(codeBlock){
	var code = '';
	var _code = '';
	while(codeBlock){
	  if (codeBlock.type === 'code'){
		code+=codeBlock.getFieldValue('TEXT')+';\\n ';
	  }
	  else if (codeBlock.type === 'code_join'){
		var input = codeBlock.getInputTargetBlock('CODE');
		_code = FactoryUtils.getStreamCodeFromBlock(input);
		if (!_code.includes(';'))
				_code+=';';
		code+= _code;
	  }
	  else if (codeBlock.type === 'code_set_variables'){
		var input = codeBlock.getInputTargetBlock('CODE');
		code+= codeBlock.getFieldValue('INPUT')+'=';
		_code = FactoryUtils.getStreamCodeFromBlock(input);
		if (!_code.includes(';'))
				_code+=';';
		code+= _code;
	  }
	  else if (codeBlock.type === 'code_variable') {
		  code+=codeBlock.getFieldValue('TYPE')+' '+codeBlock.getFieldValue('NAME')+"="+codeBlock.getFieldValue('INIT')+';\\n ';
	  }
	  else if (codeBlock.type === 'code_for') {
		  var for0 = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('FOR0'));
		  var for1 = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('FOR1'));
		  var for2 = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('FOR2'));
		  var statementCodeBlock = codeBlock.getInputTargetBlock('CODE');
		  code+='for ('+for0+';'+for1+';'+for2+'){\\n ';
		  if (statementCodeBlock)
		    code+=FactoryUtils.getCodeFromCodeBlock(statementCodeBlock);
		  code+='}\\n';
	  }
	  else if (codeBlock.type === 'code_while') {
		  var cond = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('COND'));
		  var statementCodeBlock = codeBlock.getInputTargetBlock('CODE');
		  code+='while ('+cond+'){\\n ';
		  if (statementCodeBlock)
		    code+=FactoryUtils.getCodeFromCodeBlock(statementCodeBlock);
		  code+='}\\n';
	  }
	  else if (codeBlock.type === 'code_if') {
		  var cond = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('COND0'));
		  var statementCodeBlock = codeBlock.getInputTargetBlock('CODE0');
		  code+='if ('+cond+'){';
		  code+=FactoryUtils.getCodeFromCodeBlock(statementCodeBlock);
		  code+='}\\n';
		  for (var x=1;x<=codeBlock.elseifCount_;x++){
			  cond = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('COND'+x));
			  statementCodeBlock = codeBlock.getInputTargetBlock('CODE'+x);
		      code+='elseif ('+cond+'){\\n';
		      code+=FactoryUtils.getCodeFromCodeBlock(statementCodeBlock);
		      code+='}\\n';
		  }
		  if (codeBlock.elseCount_)
		  {
			  statementCodeBlock = codeBlock.getInputTargetBlock('ELSE');
		      code+='else {\\n';
		      code+=FactoryUtils.getCodeFromCodeBlock(statementCodeBlock);
		      code+='}\\n';
		  }
	  }
	  else if (codeBlock.type === 'code_switch') {
		  var cond = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('COND0'));
		  var statementCodeBlock = codeBlock.getInputTargetBlock('CODE0');
		  code+='switch ('+cond+'){\\n';		  
		  for (var x=0;x<codeBlock.switchCount_;x++){
			  cond = FactoryUtils.getStreamCodeFromBlock(codeBlock.getInputTargetBlock('CASE'+x));
			  statementCodeBlock = codeBlock.getInputTargetBlock('CODE'+x);
		      code+='case '+cond+':{\\n';
		      code+=FactoryUtils.getCodeFromCodeBlock(statementCodeBlock);
		      code+='}\\n';
		  }
		  if (codeBlock.defaultCount_)
		  {
			  statementCodeBlock = codeBlock.getInputTargetBlock('DEFAULT');
		      code+='default: {\\n';
		      code+=FactoryUtils.getCodeFromCodeBlock(statementCodeBlock);
		      code+='}\\n';
		  }
		  code+='}\\n';
	  }
	  if (codeBlock.type === 'code_flow_statements'){
		code+=codeBlock.getFieldValue('FLOW')+';\\n ';
	  }
	  codeBlock = codeBlock.nextConnection && codeBlock.nextConnection.targetBlock();
	}
	return code;
}