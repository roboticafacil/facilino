/*! roboblocks - v0.2.3 - 2016-02-02
 * https://github.com/bq/roboblocks
 * Copyright (c) 2016 bq; Licensed  */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
    } else {
        factory(_, window.Blockly, window.Blocks);
    }
}(function(_, Blockly, Blocks) {
    var load = function(options) {
        // Source: src/lang.js
        /* global RoboBlocks, options */
        /*RoboBlocks.locales = {
            defaultLanguage: {},
            languages: [],
			processor: ''
        };*/
		
		RoboBlocks.locales = {
            defaultLanguage: {},
			processor: ''
        };
		
		
        /*RoboBlocks.locales.getLang = function() {
            return this.defaultLanguage.lngCode;
        };*/
		
		RoboBlocks.locales.setLang = function(lang) {
			this.defaultLanguage = lang;
		}
        RoboBlocks.locales.getKey = function(key) {
            return this.defaultLanguage[key];
        };
		
		RoboBlocks.locales.setKey = function(key,value) {
            this.defaultLanguage[key]=value;
        };
		
		RoboBlocks.getHelpUrl = function (block) {
			return '<script>$(function(){var file = "doc/"+roboblocksLanguage+"/'+block+'.html"; $.ajax({url:file,async:false,type:"HEAD",error: function(){file="doc/en-GB/'+block+'.html";},success: function(){}}); $("#doc").load(file);});</script>';
		}
		
        RoboBlocks.locales.initialize = function() {
            /*var lang = options.lang || window.roboblocksLanguage || 'en-GB';
			var languages;
			var defaultLanguage;
			$.ajax({
				url: 'lang/facilino.json',
				dataType: "text",
				async: false,
				}).done(function(text) {
				languages = $.parseJSON(text);
				defaultLanguage = languages.langs[lang].keys;
                
				});
			this.languages=languages.langs;
			this.defaultLanguage=defaultLanguage;
			this.defaultLanguage.lngCode = lang;*/
			this.defaultLanguage = options.langKeys ||window.langKeys || {};
			this.processor = options.proc || window.FacilinoProcessor || 'ArduinoNano';
			return this;
        };
            

        // Source: src/constants.js
        /* global RoboBlocks, Blockly*/
        RoboBlocks.locales.initialize();
        RoboBlocks.variables = {};
        RoboBlocks.isVariable = function(varValue) {
            for (var i in Blockly.Variables.allUsedVariables) {
                if (Blockly.Variables.allUsedVariables[i] === varValue) {
                    return true;
                }
            }
            if (RoboBlocks.variables[varValue] !== undefined) {
                return true;
            }
            if (varValue.search('digitalRead\\(') >= 0 || varValue.search('analogRead\\(') >= 0) {
                return true;
            }
            return false;
        };

        RoboBlocks.findPinMode = function(dropdown_pin) {
            var code = '';
            dropdown_pin = dropdown_pin.split(';\n');
            for (var j in dropdown_pin) {
                if (dropdown_pin[j].search('pinMode') >= 0) {
                    code += dropdown_pin[j] + ';\n';
                } else {
                    dropdown_pin = dropdown_pin[j];
                }
            }
            return {
                'code': code,
                'pin': dropdown_pin
            };
        };

        // RGB block colors
		RoboBlocks.LANG_COLOUR_DISTANCE = '#D04141';
		RoboBlocks.LANG_COLOUR_DISTANCE_ULTRASOUND = '#D04141'; //BD3939, AB3131, 992929, 872121
        RoboBlocks.LANG_COLOUR_SOUND = '#CC7B44'; 
		RoboBlocks.LANG_COLOUR_SOUND_BUZZER = '#CC7B44';
		RoboBlocks.LANG_COLOUR_SOUND_VOICE = '#B46B3A';
		RoboBlocks.LANG_COLOUR_SOUND_MIC = '#9D5C30';
		RoboBlocks.LANG_COLOUR_SOUND_MUSIC = '#854C26';//6E3D1C
        RoboBlocks.LANG_COLOUR_MOVEMENT = '#CECE42';
		RoboBlocks.LANG_COLOUR_MOVEMENT_MOTORS = '#CECE42';
		RoboBlocks.LANG_COLOUR_MOVEMENT_ROBOTBASE = '#B8B838';
		RoboBlocks.LANG_COLOUR_MOVEMENT_ROBOTACC = '#A3A32F';
		RoboBlocks.LANG_COLOUR_MOVEMENT_WALK = '#8D8D25'; // 78781C
        RoboBlocks.LANG_COLOUR_SCREEN = '#ACCE42';
		RoboBlocks.LANG_COLOUR_SCREEN_LCD = '#ACCE42'; //8EAC32, 7F9B2A, 718B23
		RoboBlocks.LANG_COLOUR_SCREEN_LEDMATRIX = '#9DBD3A';
        RoboBlocks.LANG_COLOUR_CONTROL = '#44CC44';
		RoboBlocks.LANG_COLOUR_CONTROL_INTERRUPTS = '#3EB83E';
		RoboBlocks.LANG_COLOUR_CONTROL_STATEMACHINE = '#39A539';
		//RoboBlocks.LANG_COLOUR_CONTROL_TIME = '#339233';
        RoboBlocks.LANG_COLOUR_LOGIC = '#42CE91';
        RoboBlocks.LANG_COLOUR_MATH = '#42CBCE';
        RoboBlocks.LANG_COLOUR_TEXT = '#42A3CE';
        RoboBlocks.LANG_COLOUR_COMMUNICATION = '#4263CE';
		RoboBlocks.LANG_COLOUR_COMMUNICATION_USB = '#4263CE'; // #2E489B, #283F8A
		RoboBlocks.LANG_COLOUR_COMMUNICATION_BLUETOOTH = '#3B5ABD';
		RoboBlocks.LANG_COLOUR_COMMUNICATION_WIFI = '#3551AC';
		RoboBlocks.LANG_COLOUR_COMMUNICATION_IOT = '#2E489B';
        RoboBlocks.LANG_COLOUR_ADVANCED = '#9142CE'; //853BBE, 7A34AF, 6E2DA0, 632791
		RoboBlocks.LANG_COLOUR_ADVANCED_ANALOG = '#9142CE';
		RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL = '#853BBE';
		RoboBlocks.LANG_COLOUR_ADVANCED_OTHER = '#7A34AF';
        RoboBlocks.LANG_COLOUR_VARIABLES = '#B244CC';
        RoboBlocks.LANG_COLOUR_PROCEDURES = '#CE42B3';
		//RoboBlocks.LANG_COLOUR_COLOUR ='#9FD388';
		RoboBlocks.LANG_COLOUR_LIGHT= '#FF8A00';
		RoboBlocks.LANG_COLOUR_LIGHT_INFRARED= '#FF8A00'; //D27201, BB6602, A55B03
		RoboBlocks.LANG_COLOUR_LIGHT_COLOR= '#E87E00'; //D27201 , BB6602, A55B03
		RoboBlocks.LANG_COLOUR_AMBIENT = '#99CCFF';  //78BBFE, 58ABFD, 389AFC, 188AFB
		RoboBlocks.LANG_COLOUR_AMBIENT_TEMPERATURE = '#99CCFF';
		RoboBlocks.LANG_COLOUR_AMBIENT_HUMIDITY = '#78BBFE';
		RoboBlocks.LANG_COLOUR_AMBIENT_RAIN = '#58ABFD';
		RoboBlocks.LANG_COLOUR_AMBIENT_OTHER = '#389AFC'; //188AFB
		RoboBlocks.LANG_COLOUR_HTML = '#BDBDBD';
		RoboBlocks.LANG_COLOUR_BLOCKS = '#FF00FF';


        // Source: src/profiles.js
        /*
         * Arduino Board profiles
         */
		var profiles;
		$.ajax({
				url: 'profiles.json',
				dataType: "text",
				async: false,
				}).done(function(text) {
				profiles = $.parseJSON(text);
				if (RoboBlocks.locales.processor==='ArduinoNano')
					profiles['default'] = profiles.arduinoNano;
				else if (RoboBlocks.locales.processor==='ArduinoUno')
					profiles['default'] = profiles.arduinoUno;
				else if (RoboBlocks.locales.processor==='NodeMCU')
					profiles['default'] = profiles.nodeMCU;
				else if (RoboBlocks.locales.processor==='ESP32')
					profiles['default'] = profiles.esp32_R32;
				else 
					profiles['default'] = profiles.arduinoNano;
				});

        /**
         * Generates toolbox XML with all blocks defined in Blockly.Blocks
         * @return {String} Blockly toolbox XML
         */
        /*Blockly.createToolbox = function() {

            var blocks = {};

            for (var block in this.Blocks) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
                    var category = this.Blocks[block].category;
                    blocks[category] = blocks[category] || [];
                    blocks[category].push(block);
                }
            }

            var toolbox = '<xml id="toolbox" style="display: none">';

            var categoryItem = function(type) {
                toolbox += '<block type="' + type + '"></block>';
            };

            for (block in blocks) {

                if (blocks.hasOwnProperty(block)) {
                    toolbox += '<category id="' + block + '" name="' + block + '">';
                    blocks[block].forEach(categoryItem);
                    toolbox += '</category>';
                }

            }
            toolbox += '</xml>';

            return toolbox;
        };*/
		
		Blockly.getBlocks = function() {

            var blocks = { };

            for (var block in this.Blocks) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object) {
                    var category = this.Blocks[block].category;
					var subcategory = this.Blocks[block].subcategory;
					var colour = this.Blocks[block].category_colour;
					if (subcategory===undefined)
						subcategory='root';
                    blocks[category] = blocks[category] || { };
					blocks[category][subcategory] = blocks[category][subcategory] || [];
                    blocks[category][subcategory].push(block);
                }
            }
			return blocks;
		};
		
		Blockly.createToolbox = function() {

            var blocks = { };
			var colours = { };

            for (var block in this.Blocks) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
                    var category = this.Blocks[block].category;
					var subcategory = this.Blocks[block].subcategory;
					var colour = this.Blocks[block].category_colour;
					if (subcategory===undefined)
						subcategory='root';
                    blocks[category] = blocks[category] || { };
					colours[category] = colours[category] || colour;
					blocks[category][subcategory] = blocks[category][subcategory] || [];
                    blocks[category][subcategory].push(block);
                }
            }
			
			//console.log(blocks);
			//console.log(colours);

            var toolbox = '<xml id="toolbox" style="display: none">';

            var categoryItem = function(type) {
                toolbox += '<block type="' + type + '"></block>';
            };

			//console.log(blocks);
            for (category in blocks) {
                if (blocks.hasOwnProperty(category)) {
					toolbox += '<category id="' + category + '" name="' + category + '" colour="'+colours[category]+'">';
					for (subcategory in blocks[category]) {
						if (subcategory==='root')
							blocks[category]['root'].forEach(categoryItem);
						if (subcategory!=='root'){
							//console.log();
							toolbox += '<category id="' + subcategory + '" name="' + subcategory + '" colour="'+this.Blocks[blocks[category][subcategory][0]].colour+'">';
							blocks[category][subcategory].forEach(categoryItem);
							toolbox += '</category>';
						}
					}
					toolbox += '</category>';
                }

            }
            toolbox += '</xml>';

            return toolbox;
        };
		
		Blockly.createToolboxColours = function() {

            var blocks = {};

            for (var block in this.Blocks) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
                    var category = this.Blocks[block].category;
                    blocks[category] = blocks[category] || [];
					if (this.Blocks[block].colour !== undefined)
					{
						blocks[category].push(this.Blocks[block].colour);
					}
                }
            }

            return blocks[category];
        };
		
		Blockly.exportAllBlocks = function() {

            var blocks = {};
			var uncategorized_blocks = [];
			var examples = [];
			var flags = [];

            for (var block in this.Blocks) {
                // important check that this is objects own property 
                // not from prototype prop inherited
                if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
                    var category = this.Blocks[block].category;
                    blocks[category] = blocks[category] || [];
                    blocks[category].push(block);
					if (typeof this.Blocks[block] !== 'undefined' && typeof this.Blocks[block].examples !== 'undefined')
					{
					  for (example in this.Blocks[block].examples){
						  if (this.Blocks[block].examples[example]==='') continue;
						  if( flags[this.Blocks[block].examples[example]]) continue;
						  flags[this.Blocks[block].examples[example]] = true;
						  examples.push(this.Blocks[block].examples[example]);
					  }
					}
                }
				else if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object){
					//Mutators and anything else...
					uncategorized_blocks.push(block);
				}
            }
			//console.log(examples.length);

            var block_xml = '';
			var block_name;
			
			var textFile = 'file:///C:/Users/leoaran/Dropbox/DYOR/DYOR/Facilino/src/facilino/roboblocks/html/phantom_script.bat';
			makeTextFile = function (text) {
			var data = new Blob([text], {type: 'text/plain'});
			// If we are replacing a previously generated file we need to
			// manually revoke the object URL to avoid memory leaks.
			if (textFile !== null) {
			window.URL.revokeObjectURL(textFile);
			}
			textFile = window.URL.createObjectURL(data);
			return textFile;
			};
			
			var blockItem = function(type) {
				//try{
                block_xml = '<block type="' + type + '" deletable="true"></block>';
				block_name = type;
				console.log(type);
				document.getElementById('startBlocks').innerHTML = block_xml;
				Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),Blockly.getMainWorkspace());
				var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
				var width = bbox.width+20;
				var height = bbox.height+20;
				txt += "phantomjs rasterize.js file:///C:/Users/leoaran/Dropbox/DYOR/DYOR/Facilino/src/facilino/roboblocks/html/show_block.html?name="+block_name+" doc/"+roboblocksLanguage+"/img/"+block_name+".png "+width+" "+height+"\n";
				Blockly.getMainWorkspace().clear();
				//}
				//catch(err){ }
            };
			
			function openFunction(bly) {
			$.ajax({
				type: "GET" ,
				url: bly ,
				dataType: "xml" ,
				success: function(xml) {
					var xmlTxt = new XMLSerializer().serializeToString(xml);
					xmlTxt = xmlTxt.replace('<xml xmlns="http://www.w3.org/1999/xhtml">','');
					xmlTxt = xmlTxt.replace('</xml>','');
					document.getElementById('startBlocks').innerHTML = xmlTxt;
					Blockly.mainWorkspace.clear();
					Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),Blockly.getMainWorkspace());
					var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
					var width = bbox.width+20;
					var height = bbox.height+20;
					var bly1 = bly;
					bly1 = bly1.replace('bly','png');
					bly1 = bly1.replace('doc/examples/','');
					txt += "phantomjs rasterize.js file:///C:/Users/leoaran/Dropbox/DYOR/DYOR/Facilino/src/facilino/roboblocks/html/show_example.html?name="+bly+" doc/"+roboblocksLanguage+"/img/"+bly1+" "+width+" "+height+"\n";
				},
				async: false
			});
			}
			
			//var txt = new ActiveXObject("Scripting.FileSystemObject");
            //var s = txt.CreateTextFile("raster.txt", true);
			var txt = '';
			for (block in blocks) {
                if (blocks.hasOwnProperty(block)) {
                    blocks[block].forEach(blockItem);
                }
            }
			for (block in uncategorized_blocks) {
				try {
				blockItem(uncategorized_blocks[block]);
				}
				catch(err){}
				document.getElementById('startBlocks').innerHTML = '';
				Blockly.getMainWorkspace().clear();
			}
			for (example in examples)
				openFunction('doc/examples/'+examples[example]);
			
			window.open(makeTextFile(txt),"_blank");
			//s.Close();
			return block_xml;
        };								 	
        // Source: tmp/jst.js
        // Source: tmp/jst.js
        this["JST"] = this["JST"] || {};


        this["JST"]["advanced_conversion"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (value_num)) == null ? '' : __t) +
                    ',' +
                    ((__t = (convertion)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["advanced_map"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'map(' +
                    ((__t = (num)) == null ? '' : __t) +
                    ',' +
                    ((__t = (from_min)) == null ? '' : __t) +
                    ',' +
                    ((__t = (from_max)) == null ? '' : __t) +
                    ',' +
                    ((__t = (to_min)) == null ? '' : __t) +
                    ',' +
                    ((__t = (to_max)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["base_delay"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'delay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["base_map"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'map(' +
                    ((__t = (value_num)) == null ? '' : __t) +
                    ',0,1023,0,' +
                    ((__t = (value_dmax)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["base_millis"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'millis()\n';

            }
            return __p
        };

        this["JST"]["bq_bat"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Distance(' +
                    ((__t = (trigger_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (echo_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_bat_definitions_distance"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'long Distance(int trigger_pin, int echo_pin)\n{\n  long microseconds = TP_init(trigger_pin, echo_pin);\n  long distance;\n  distance = microseconds/29/2;\n  if (distance == 0){\n    distance = 999;\n  }\n  return distance;\n}\n';

            }
            return __p
        };

        this["JST"]["bq_bat_definitions_tp_init"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '//bqBAT\nlong TP_init(int trigger_pin, int echo_pin)\n{\n  digitalWrite(trigger_pin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigger_pin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigger_pin, LOW);\n  long microseconds = pulseIn(echo_pin ,HIGH);\n  return microseconds;\n}\n';

            }
            return __p
        };

        this["JST"]["bq_bat_setups_echo"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (echo_pin)) == null ? '' : __t) +
                    ' , INPUT );\n';

            }
            return __p
        };

        this["JST"]["bq_bat_setups_trigger"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (trigger_pin)) == null ? '' : __t) +
                    ' , OUTPUT );\n';

            }
            return __p
        };

        this["JST"]["bq_bluetooth_def_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <SoftwareSerial.h>';

            }
            return __p
        };

        this["JST"]["bq_bluetooth_def_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT);\n  pinMode(' +
                    ((__t = (NextPIN)) == null ? '' : __t) +
                    ', OUTPUT);\n  _blueToothSerial.begin(' +
                    ((__t = (baud_rate)) == null ? '' : __t) +
                    ');\n  _blueToothSerial.flush();\n';

            }
            return __p
        };

        this["JST"]["bq_button"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_button_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT_PULLUP);\n';

            }
            return __p
        };

        this["JST"]["bq_buttons"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '  adc_key_in =analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ');\n  key = get_key(adc_key_in);\n  if (key != oldkey)\n  {\n    delay(50);\n    adc_key_in = analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ');\n    key = get_key(adc_key_in);\n    if (key != oldkey)\n    {\n      oldkey = key;\n      if (key >=0){\n        switch(key)\n        {\n          case 0:\n           ' +
                    ((__t = (code_btn1)) == null ? '' : __t) +
                    '\n          break;\n          case 1:\n           ' +
                    ((__t = (code_btn2)) == null ? '' : __t) +
                    '\n          break;\n          case 2:\n           ' +
                    ((__t = (code_btn3)) == null ? '' : __t) +
                    '\n          break;\n          case 3:\n           ' +
                    ((__t = (code_btn4)) == null ? '' : __t) +
                    '\n          break;  \n          case 4:\n           ' +
                    ((__t = (code_btn5)) == null ? '' : __t) +
                    '\n          break;\n        }      \n      }\n    }\n  }\n';

            }
            return __p
        };

        this["JST"]["bq_buttons_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'int get_key(unsigned int input)\n  {\n    int k;\n    for (k = 0; k < NUM_KEYS; k++)\n    {\n      if (input < adc_key_val[k])\n      {\n        return k;\n      }\n    }\n    if (k >= NUM_KEYS)k = -1;\n      return k;\n}\n';

            }
            return __p
        };

        this["JST"]["bq_buttons_definitions_variables"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '//bqButtons\nint adc_key_val[5] ={20,50, 100, 200, 600 };\nint NUM_KEYS = 5;\nint adc_key_in;\nint key=-1;\nint oldkey=-1;\n';

            }
            return __p
        };

        this["JST"]["bq_infrared"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_infrared_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };

        this["JST"]["bq_joystick"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'readJoystick_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '()';

            }
            return __p
        };

        this["JST"]["bq_joystick_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'int * readJoystick_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '(){\n  _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '[0]=analogRead(' +
                    ((__t = (pinx)) == null ? '' : __t) +
                    ');\n  _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '[1]=analogRead(' +
                    ((__t = (piny)) == null ? '' : __t) +
                    ');\n  _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    '[2]=digitalRead(' +
                    ((__t = (pinbutton)) == null ? '' : __t) +
                    ');\n  return _internal_readJoystick_array_' +
                    ((__t = (name)) == null ? '' : __t) +
                    ';\n}';

            }
            return __p
        };

        this["JST"]["bq_joystick_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (pinbutton)) == null ? '' : __t) +
                    ',INPUT_PULLUP);\n';

            }
            return __p
        };

        this["JST"]["bq_led"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalWrite(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["bq_led_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["bq_photoresistor"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bq_piezo_buzzer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'tone(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ',' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["bq_piezo_buzzerav"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'tone(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (Buzztone)) == null ? '' : __t) +
                    ',' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n\n';

            }
            return __p
        };

        this["JST"]["bq_potentiometer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["bt_serial_available"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if (_blueToothSerial.available()>0){\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n}\n';

            }
            return __p
        };

        this["JST"]["controls_doWhile"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'do {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n} while (' +
                    ((__t = (argument0)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["controls_execute"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (content)) == null ? '' : __t) +
                    '\n';

            }
            return __p
        };

        this["JST"]["controls_else"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'else {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }';

            }
            return __p
        };

        this["JST"]["controls_elseif"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'else if (' +
                    ((__t = (argument)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }';

            }
            return __p
        };

        this["JST"]["controls_if"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if (' +
                    ((__t = (argument)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }';

            }
            return __p
        };

        this["JST"]["controls_setupLoop"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n';

            }
            return __p
        };

        this["JST"]["controls_whileUntil"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'while (' +
                    ((__t = (argument0)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }\n';

            }
            return __p
        };

        this["JST"]["inout_analog_read"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["inout_analog_read_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_analog_write"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogWrite(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (value_num)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["inout_analog_write_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_builtin_led"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
				if ((RoboBlocks.locales.processor==='ArduinoNano')||(RoboBlocks.locales.processor==='ArduinoUno'))
                  __p += 'digitalWrite(13,' +((__t = (dropdown_stat)) == null ? '' : __t) +');\n';
				else if ((RoboBlocks.locales.processor==='ESP32')||(RoboBlocks.locales.processor==='NodeMCU'))
				  __p += 'digitalWrite(2,' +((__t = (dropdown_stat)) == null ? '' : __t) +');\n';

            }
            return __p
        };

        this["JST"]["inout_builtin_led_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
				if ((RoboBlocks.locales.processor==='ArduinoNano')||(RoboBlocks.locales.processor==='ArduinoUno'))
                  __p += 'pinMode(13,OUTPUT);\n';
			    else if ((RoboBlocks.locales.processor==='ESP32')||(RoboBlocks.locales.processor==='NodeMCU'))
				  __p += 'pinMode(2,OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_digital_read"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["inout_digital_read_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',INPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_digital_write"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalWrite(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["inout_digital_write_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["inout_highlow"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (bool_value)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["lcd_clear"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.clear();\n';

            }
            return __p
        };

        this["JST"]["lcd_def_declare"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'LiquidCrystal lcd(' +
                    ((__t = (lcd_1)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_2)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_3)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_4)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_5)) == null ? '' : __t) +
                    ', ' +
                    ((__t = (lcd_6)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["lcd_def_definitions"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Wire.h>\n#include <LiquidCrystal.h>';

            }
            return __p
        };

        this["JST"]["lcd_def_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.begin(16, 2);\nlcd.clear();\n';

            }
            return __p
        };

        this["JST"]["lcd_print"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.print(' +
                    ((__t = (val)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["lcd_print_pos"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.setCursor(' +
                    ((__t = (ycoor)) == null ? '' : __t) +
                    ',' +
                    ((__t = (xcoor)) == null ? '' : __t) +
                    ');\nlcd.print(' +
                    ((__t = (val)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["lcd_setBacklight"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'lcd.setBacklight(' +
                    ((__t = (state)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["logic_compare"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (operator)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["logic_negate"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '!' +
                    ((__t = (argument0)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["logic_operation"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (operator)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["math_arithmetic"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    '' +
                    ((__t = (operator)) == null ? '' : __t) +
                    '' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["math_arithmetic_pow"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pow(' +
                    ((__t = (argument0)) == null ? '' : __t) +
                    ',' +
                    ((__t = (argument1)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["math_modulo"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    '%' +
                    ((__t = (argument1)) == null ? '' : __t);

            }
            return __p
        };
		this["JST"]["math_random_bitOut"] = function (obj) {
			obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'unsigned int bitOut(void)\n{\n  static unsigned long firstTime=1, prev=0;\n  unsigned long bit1=0, bit0=0, x=0, port=0, limit=99;\n  if (firstTime)\n  {\n    firstTime=0;\n    prev=analogRead(port);\n  }\n  while (limit--)\n  {\n    x=analogRead(port);\n    bit1=(prev!=x?1:0);\n    prev=x;\n    x=analogRead(port);\n    bit0=(prev!=x?1:0);\n    prev=x;\n    if (bit1!=bit0)\n      break;\n  }\n  return bit1;\n}\n';
            }
            return __p;
		}
		
		this["JST"]["math_random_seedOut"] = function (obj) {
			obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'unsigned long seedOut(unsigned int noOfBits)\n{\n  unsigned long seed=0;\n  for (int i=0;i<noOfBits;++i)\n    seed = (seed<<1) | bitOut();\n  return seed;\n}\n';
            }
            return __p;
        }
		this["JST"]["math_random"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'random(' +
                    ((__t = (value_num)) == null ? '' : __t) +
                    ',' +
                    ((__t = (value_dmax)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["procedures_callnoreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (funcName)) == null ? '' : __t) +
                    '(' +
                    ((__t = (funcArgs)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["procedures_callreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (funcName)) == null ? '' : __t) +
                    '(' +
                    ((__t = (funcArgs)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["procedures_defnoreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (returnType)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (funcName)) == null ? '' : __t) +
                    ' (' +
                    ((__t = (args)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    ' }\n';

            }
            return __p
        };

        this["JST"]["procedures_defreturn"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (returnType)) == null ? '' : __t) +
                    ' ' +
                    ((__t = (funcName)) == null ? '' : __t) +
                    ' (' +
                    ((__t = (args)) == null ? '' : __t) +
                    ') {\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n' +
                    ((__t = (returnValue)) == null ? '' : __t) +
                    ' }\n';

            }
            return __p
        };

        this["JST"]["serial_available"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if (Serial.available()>0){\n' +
                    ((__t = (branch)) == null ? '' : __t) +
                    '\n}\n';

            }
            return __p
        };

        this["JST"]["serial_parseint"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.parseInt()\n';

            }
            return __p
        };

        this["JST"]["serial_parseint_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_print"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.print(' +
                    ((__t = (content)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_print_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_println"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.println(' +
                    ((__t = (content)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_println_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_read"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.read()';

            }
            return __p
        };

        this["JST"]["serial_read_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_readstring"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.readString()';

            }
            return __p
        };

        this["JST"]["serial_readstring_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'Serial.begin(' +
                    ((__t = (bitrate)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["serial_special"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (char)) == null ? '' : __t);

            }
            return __p
        };

        this["JST"]["servo_move"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'servos[' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    '].write(' +
                    ((__t = (value_degree)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["servo_move_definitions_include"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += '#include <Servo.h>\n\nServo servos[13];';

            }
            return __p
        };

        this["JST"]["servo_move_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'servos[' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    '].attach(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ');';

            }
            return __p
        };


        this["JST"]["text_equalsIgnoreCase"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (string1)) == null ? '' : __t) +
                    '.equalsIgnoreCase(' +
                    ((__t = (string2)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["text_length"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (argument0)) == null ? '' : __t) +
                    '.length()';

            }
            return __p
        };

        this["JST"]["text_substring"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (string1)) == null ? '' : __t) +
                    '.substring(' +
                    ((__t = (from)) == null ? '' : __t) +
                    ',' +
                    ((__t = (to)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["variables_set"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p +=
                    ((__t = (varName)) == null ? '' : __t) +
                    '=' +
                    ((__t = (varValue)) == null ? '' : __t) +
                    ';\n';

            }
            return __p
        };

	this["JST"]["zum_button"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["zum_button_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) + 
                    ',' + ((__t = (pullup)) == null ? '' : __t)+');\n';

            }
            return __p
        };

        this["JST"]["zum_follower"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'if(digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')==HIGH)\n{\n  ' +
                    ((__t = (code_btn1)) == null ? '' : __t) +
                    '\n}\nif(digitalRead(' +
                    ((__t = (NextPIN)) == null ? '' : __t) +
                    ')==HIGH)\n{\n  ' +
                    ((__t = (code_btn2)) == null ? '' : __t) +
                    '\n}\n';

            }
            return __p
        };

        this["JST"]["zum_follower_setups_nextpin"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (NextPIN)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };

        this["JST"]["zum_follower_setups_pin"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };

        this["JST"]["zum_infrared"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["zum_infrared_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode( ' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ' , INPUT);\n';

            }
            return __p
        };

        this["JST"]["zum_led"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'digitalWrite(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["zum_led_setups"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'pinMode(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',OUTPUT);\n';

            }
            return __p
        };

        this["JST"]["zum_photoresistor"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        this["JST"]["zum_piezo_buzzer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'tone(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (dropdown_stat)) == null ? '' : __t) +
                    ',' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n';

            }
            return __p
        };

        this["JST"]["zum_piezo_buzzerav"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'tone(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ',' +
                    ((__t = (Buzztone)) == null ? '' : __t) +
                    ',' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\ndelay(' +
                    ((__t = (delay_time)) == null ? '' : __t) +
                    ');\n\n';

            }
            return __p
        };

        this["JST"]["zum_potentiometer"] = function(obj) {
            obj || (obj = {});
            var __t, __p = '',
                __e = _.escape;
            with(obj) {
                __p += 'analogRead(' +
                    ((__t = (dropdown_pin)) == null ? '' : __t) +
                    ')';

            }
            return __p
        };

        var JST = this.JST;


	// Source: src/blocks/procedures_callnoreturn/procedures_callnoreturn.js

        Blockly.Arduino.procedures_callnoreturn = function() {
            // Call a procedure with a return value.
            var funcName = this.getFieldValue('PROCEDURES');
            var args = [];
            var code = '';
            var a;
            try {
                for (var x = 0; x < this.getVariables(funcName).length; x++) {
                    args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || '';
                    a = RoboBlocks.findPinMode(args[x]);
                    code += a['code'];
                    args[x] = a['pin'];
                }
            } catch (e) {}
            var funcArgs = args.join(', ');
            code += JST['procedures_callnoreturn']({
                'funcName': funcName,
                'funcArgs': funcArgs
            });
            return code;
        };
        Blockly.Blocks.procedures_callnoreturn = {
            // Variable getter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('procedures_callnoreturn'),
			examples: ['procedures_callnoreturn_example.bly'],	
			category_colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_CALLNORETURN_TOOLTIP','LANG_PROCEDURES_DEFNORETURN_PROCEDURE','LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALLNORETURN_TOOLTIP'));
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.quarkConnections_ = null;
                this.quarkArguments_ = null;
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				this.setInputsInline(false);
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\?\?\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                }
                return name;
            },
            getProcedures: function() {
                var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                var procedures_dropdown = [];
                if (procedures[0].length > 0) {
                    for (var i in procedures[0]) {
                        var proc_name = procedures[0][i][0];
                        proc_name = this.validName(proc_name);
                        procedures_dropdown.push([proc_name, proc_name]);
                    }
                } else {
                    procedures_dropdown.push([RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE')]);
                }
                return procedures_dropdown;
            },
            maxVariableNumber: function() {
                var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                var procedures_dropdown = [];
                var max_num = 0;
                if (procedures[0].length > 0 || procedures[1].length > 0) {
                    for (var i in procedures[0]) {
                        if (procedures[0][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                            max_num = procedures[0][i][1].length;
                        }
                    }
                    return max_num;
                } else {
                    procedures_dropdown.push(['', '']);
                }
            },
            getVariables: function(funcName) {
                try {
                    var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                    var procedures_dropdown = [];
                    if (procedures[0].length > 0) {
                        for (var i in procedures[0]) {
                            if (procedures[0][i][0] === funcName) {
                                return procedures[0][i][1];
                            }
                        }
                    } else {
                        procedures_dropdown.push(['', '']);
                    }
                } catch (e) {}
            },
            exists: function() {
                var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                if (procedures[0].length > 0) {
                    for (var i in procedures[0]) {
                        if (procedures[0][i][0] === this.getFieldValue('PROCEDURES')) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
				//console.log('Hello');
                if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                    this.changeVariables();
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                    this.addVariables();
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                }
                if (!this.exists()) {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            },
            addVariables: function() {
				//console.log(this.getFieldValue('PROCEDURES'));
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				//console.log(func_variables);
                var var_num = 0;
                if (func_variables && this.getFieldValue('PROCEDURES')!=='') {
					if (!this.last_variables) {
                        this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    }
                    if (func_variables.length >= this.last_variables.length) {
                        var_num = func_variables.length;
                    } else if (this.last_variables) {
                        try {
                            var_num = this.last_variables.length;
                        } catch (e) {}
                    }
					for (var x = 0; x < var_num; x++) {
                        if (this.getInput('ARG' + x) === null) {
                            this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                        } else {
                            if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                                this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                            } else {
                                this.removeInput('ARG' + x);
                            }
                        }
                    }
                    this.arguments_ = func_variables;
                }
            },
            renameProcedure: function(oldName, newName) {
                if (this.last_procedure) {
					//console.log("Hello, I'm here");
                    var procedures = this.getProcedures();
                    for (var i in procedures) {
                        if (Blockly.Names.equals(oldName, procedures[i][0])) {
							//console.log("Hello, I'm here");
							this.setFieldValue(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                            //this.removeInput('DUMMY');
                            //this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
							this.addVariables();
                        }
                    }
                    if (this.last_procedure === oldName) {
                        this.last_procedure = newName;
                    }
                    try {
                        this.setFieldValue(this.last_procedure, 'PROCEDURES');
                    } catch (e) {}
                }
            },
            changeVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
                //console.log(this.getFieldValue('PROCEDURES'));
				//console.log(func_variables);
				for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                    if (this.getInput('ARG' + i) === null) {
                        break;
                    }
                    this.removeInput('ARG' + i);
                }
                for (var variable in func_variables) {
                    this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
                }
                this.arguments_ = func_variables;
            },
            mutationToDom: function() {
                // Save the name and arguments (none of which are editable).
                var container = document.createElement('mutation');
                container.setAttribute('name', this.getFieldValue('PROCEDURES'));
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = [];
                }
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.xmlElement = xmlElement;
                // Restore the name and parameters.
                var name = xmlElement.getAttribute('name');
                this.last_procedure = name;
                this.setFieldValue(name, 'PROCEDURES');
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
		
        // Source: src/blocks/procedures_callreturn/procedures_callreturn.js
        Blockly.Arduino.procedures_callreturn = function() {
            // Call a procedure with a return value.
            var funcName = this.getFieldValue('PROCEDURES');
            var args = [];
            var a;
            var code = '';
            for (var x = 0; x < this.getVariables(funcName).length; x++) {
                args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || 'null';

                a = RoboBlocks.findPinMode(args[x]);
                code += a['code'];
                args[x] = a['pin'];
            }
            var funcArgs = args.join(', ');
            code += JST['procedures_callreturn']({
                'funcName': funcName,
                'funcArgs': funcArgs
            });
            //funcName + '(' + args.join(', ') + ')';
            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        };
        Blockly.Blocks.procedures_callreturn = {
            // Variable getter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('procedures_callreturn'),
			examples: ['procedures_callreturn_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_CALLRETURN_TOOLTIP','LANG_PROCEDURES_DEFRETURN_PROCEDURE','LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALLRETURN_TOOLTIP'));
                this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                this.quarkConnections_ = null;
                this.quarkArguments_ = null;
                this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\?\?\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText('Reserved word');
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            getProcedures: function() {
                var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                var procedures_dropdown = [];
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        var proc_name = procedures[1][i][0];
                        proc_name = this.validName(proc_name);
                        procedures_dropdown.push([proc_name, proc_name]);
                    }
                } else {
                    procedures_dropdown.push([RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE')]);
                }
                return procedures_dropdown;
            },
            maxVariableNumber: function() {
                var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                var procedures_dropdown = [];
                var max_num = 0;
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        if (procedures[1][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
                            max_num = procedures[1][i][1].length;
                        }
                    }
                    return max_num;
                } else {
                    procedures_dropdown.push(['', '']);
                }
            },
            getVariables: function(funcName) {
                try {
                    var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                    var procedures_dropdown = [];
                    if (procedures[1].length > 0) {
                        for (var i in procedures[1]) {
                            if (procedures[1][i][0] === funcName) {
                                return procedures[1][i][1];
                            }
                        }
                    } else {
                        procedures_dropdown.push(['', '']);
                    }
                } catch (e) {}
            },
            exists: function() {
                var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
                if (procedures[1].length > 0) {
                    for (var i in procedures[1]) {
                        if (procedures[1][i][0] === this.getFieldValue('PROCEDURES')) {
                            return true;
                        }
                    }
                } else {
                    return false;
                }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
                    this.changeVariables();
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                } else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
                    this.addVariables();
                    this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    this.last_procedure = this.getFieldValue('PROCEDURES');
                }
                if (!this.exists()) {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
                    } catch (e) {}
                } else {
                    try {
                        this.setWarningText(null);
                    } catch (e) {}
                }
            },
            addVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                var var_num = 0;
                if (func_variables && this.getFieldValue('PROCEDURES')!=='') {
                    if (!this.last_variables) {
                        this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
                    }
                    if (func_variables.length >= this.last_variables.length) {
                        var_num = func_variables.length;
                    } else if (this.last_variables) {
                        try {
                            var_num = this.last_variables.length;
                        } catch (e) {}
                    }
                    for (var x = 0; x < var_num; x++) {
                        if (this.getInput('ARG' + x) === null) {
                            this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                        } else {
                            if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
                                this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
                            } else {
                                this.removeInput('ARG' + x);
                            }
                        }
                    }
                    this.arguments_ = func_variables;
                }
            },
            renameProcedure: function(oldName, newName) {
                if (this.last_procedure) {
                    var procedures = this.getProcedures();
                    for (var i in procedures) {
                        if (Blockly.Names.equals(oldName, procedures[i][0])) {
                            //this.removeInput('DUMMY');
                            //this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
							this.setFieldValue(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
                        }
                    }
                    if (this.last_procedure === oldName) {
                        this.last_procedure = newName;
                    }
                    try {
                        this.setFieldValue(this.last_procedure, 'PROCEDURES');
                    } catch (e) {}
                }
            },
            changeVariables: function() {
                var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
                for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
                    if (this.getInput('ARG' + i) === null) {
                        break;
                    }
                    this.removeInput('ARG' + i);
                }
                for (var variable in func_variables) {
                    this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT);
                }
                this.arguments_ = func_variables;
            },
            mutationToDom: function() {
                // Save the name and arguments (none of which are editable).
                var container = document.createElement('mutation');
                container.setAttribute('name', this.getFieldValue('PROCEDURES'));
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
                }
                if (typeof this.arguments_ === 'undefined') {
                    this.arguments_ = [];
                }
                for (var x = 0; x < this.arguments_.length; x++) {
                    var parameter = document.createElement('arg');
                    parameter.setAttribute('name', this.arguments_[x]);
                    container.appendChild(parameter);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.xmlElement = xmlElement;
                // Restore the name and parameters.
                var name = xmlElement.getAttribute('name');
                this.last_procedure = name;
                this.setFieldValue(name, 'PROCEDURES');
                for (var x = 0; x < xmlElement.childNodes.length; x++) {
                    this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
        // Source: src/blocks/procedures_defnoreturn/procedures_defnoreturn.js
        // Defining a procedure without a return value uses the same generator as
        // a procedure with a return value.
        Blockly.Arduino.procedures_defnoreturn = function() {
            // Define a procedure with a return value.
            var funcName = this.getFieldValue('NAME');
            var branch = Blockly.Arduino.statementToCode(this, 'STACK');
            branch = branch.replace(/&quot;/g, '"');
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }
            // branch=branch.replace(/&amp;/g, '');

            var returnType = 'void';
            var args = this.paramString;
            var code = JST['procedures_defnoreturn']({
                'returnType': returnType,
                'funcName': funcName,
                'args': args,
                'branch': branch
            });
            // code=code.replace(/&amp;/g, '');

            code = Blockly.Arduino.scrub_(this, code);
            Blockly.Arduino.definitions_[funcName] = code;
            return null;
        };
		
	Blockly.Blocks.procedures_defnoreturn = {
		category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
		helpUrl: RoboBlocks.getHelpUrl('procedures_defnoreturn'),
		examples: ['procedures_callnoreturn_example.bly'],
		category_colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
		colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
		keys: ['LANG_PROCEDURES_DEFNORETURN_PROCEDURE','LANG_PROCEDURES_DEFNORETURN_TOOLTIP','LANG_PROCEDURES_DEFNORETURN_DO'],
		init: function() {    	
		this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
		var name = new Blockly.FieldTextInput('',Blockly.Procedures.rename);
		name.setSpellcheck(false);
        this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE')).appendField(name,'NAME').appendField('', 'PARAMS');
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
		if ((this.workspace.options.comments || (this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
			this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
		}
        this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_TOOLTIP'));
        this.arguments_ = [];
        this.type_arguments_ = [];
		this.setStatements_(true);
		this.setInputsInline(false);
  },
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFNORETURN_DO')).setCheck(['code','function']);
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  updateParams_: function() {
    // Check for duplicated arguments.
    var badArg = false;
    var hash = {};
    for (var i = 0; i < this.arguments_.length; i++) {
      if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[i].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText('Duplicate argument');
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var params = [];
    for (var i in this.arguments_) {
		try{
		params.push(this.type_arguments_[i] + ' ' + this.arguments_[i]);
		}
		catch(e)
		{
		}
    }
    this.paramString = params.join(', ');
    // The params field is deterministic based on the mutation,
    // no need to fire a change event.
    Blockly.Events.disable();
    try {
      this.setFieldValue(this.paramString, 'PARAMS');
    } finally {
      Blockly.Events.enable();
    }
  },  
  mutationToDom: function(opt_paramIds) {
    var container = document.createElement('mutation');
    if (opt_paramIds) {
      container.setAttribute('name', this.getFieldValue('NAME'));
    }
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg_name');
      parameter.setAttribute('name', this.arguments_[i]);
      if (opt_paramIds && this.paramIds_) {
        parameter.setAttribute('paramId', this.paramIds_[i]);
      }
      container.appendChild(parameter);
	  
	  parameter = document.createElement('arg_type');
	  try{
	  parameter.setAttribute('name', this.type_arguments_[i]);
	  if (opt_paramIds && this.paramIds_) {
        parameter.setAttribute('paramId', this.paramIds_[i]);
      }
	  }
	  catch(e)
	  {
	  }
	  container.appendChild(parameter);
    }

    // Save whether the statement input is visible.
    if (!this.hasStatements_) {
      container.setAttribute('statements', 'false');
    }
    return container;
  },  
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
	  if (childNode.nodeName.toLowerCase() === 'arg_name') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
      if (childNode.nodeName.toLowerCase() === 'arg_type') {
		  try{
        this.type_arguments_.push(childNode.getAttribute('name'));
		  }
		  catch(e)
		  {
		  }
      }
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show or hide the statement input.
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },  
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('procedures_mutatorcontainer');
    containerBlock.initSvg();

    // Check/uncheck the allow statement box.
    if (this.getInput('RETURN')) {
      containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
                                   'STATEMENTS');
    } else {
      containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
    }

    // Parameter list.
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.arguments_.length; i++) {
      var paramBlock = workspace.newBlock('procedures_mutatorarg');
      paramBlock.initSvg();
	  paramBlock.setFieldValue(this.type_arguments_[i], 'TYPE');
      paramBlock.setFieldValue(this.arguments_[i], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = i;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this);
	//Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, null);
    //Blockly.Procedures.mutateCallers(this.getFieldValue('TYPE'), this.workspace, this.type_arguments_, null);
    return containerBlock;
  },    
  compose: function(containerBlock) {
    // Parameter list.
    this.arguments_ = [];
	this.type_arguments_ = [];
    this.paramIds_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getFieldValue('NAME'));
	  this.type_arguments_.push(paramBlock.getFieldValue('TYPE'));
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show/hide the statement input.
    var hasStatements = containerBlock.getFieldValue('STATEMENTS');
    if (hasStatements !== null) {
      hasStatements = hasStatements == 'TRUE';
      if (this.hasStatements_ != hasStatements) {
        if (hasStatements) {
          this.setStatements_(true);
          // Restore the stack, if one was saved.
          Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
          this.statementConnection_ = null;
        } else {
          // Save the stack, then disconnect it.
          var stackConnection = this.getInput('STACK').connection;
          this.statementConnection_ = stackConnection.targetConnection;
          if (this.statementConnection_) {
            var stackBlock = stackConnection.targetBlock();
            stackBlock.unplug();
            stackBlock.bumpNeighbours_();
          }
          this.setStatements_(false);
        }
      }
    }
  },
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, false];
  },
  getVars: function() {
    return this.arguments_;
  },
  renameVar: function(oldName, newName) {
    var change = false;
    for (var i = 0; i < this.arguments_.length; i++) {
      if (Blockly.Names.equals(oldName, this.arguments_[i])) {
        this.arguments_[i] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator.isVisible()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var i = 0, block; block = blocks[i]; i++) {
          if (block.type == 'procedures_mutatorarg' &&
              Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
            block.setFieldValue(newName, 'NAME');
          }
        }
      }
    }
  },
  validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\?\?\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        this.reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === this.reserved_words[j]) {
                            this.setWarningText('Reserved word');
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },  
  customContextMenu: function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
    var xmlMutation = goog.dom.createDom('mutation');
    xmlMutation.setAttribute('name', name);
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = goog.dom.createDom('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
    xmlBlock.setAttribute('type', this.callType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var option = {enabled: true};
        var name = this.arguments_[i];
        option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
        var xmlField = goog.dom.createDom('field', null, name);
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = goog.dom.createDom('block', null, xmlField);
        xmlBlock.setAttribute('type', 'variables_get');
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
      }
    }
  },
  callType_: 'procedures_callnoreturn',
  onchange: function() {
                if (this.last_procedure !== this.getFieldValue('NAME')) {
                    var name = this.getFieldValue('NAME');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'NAME');
                    } catch (e) {}
                    this.last_procedure = name;
                }
            }
};
		
		Blockly.Blocks['procedures_mutatorcontainer'] = {
		colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
		keys: ['LANG_PROCEDURES_MUTATORCONTAINER_Field'],
		init: function() {
    this.appendDummyInput()
        .appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORCONTAINER_Field'));
		this.appendStatementInput('STACK').setCheck(['code','function']);
    this.appendDummyInput('STATEMENT_INPUT')
        .appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
    this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
    this.setTooltip('');
    this.contextMenu = false;
  }
};
	
		Blockly.Blocks['procedures_mutatorarg'] = {
			colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_MUTATORARG_Field'],
  init: function() {
    var field = new Blockly.FieldTextInput('x', this.validator_);
    this.appendDummyInput()
        .appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_MUTATORARG_Field')).appendField(new Blockly.FieldDropdown([
                    ['int', 'int'],
                    ['String', 'String']
                ]), 'TYPE').appendField(field, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
    this.setTooltip('');
    this.contextMenu = false;

    // Create the default variable when we drag the block in from the flyout.
    // Have to do this after installing the field on the block.
    field.onFinishEditing_ = this.createNewVar_;
    field.onFinishEditing_('x');
  },
  onchange: function() {
	if (this.last_variable !== this.getFieldValue('NAME')) {
		var name = this.getFieldValue('NAME');
        name = this.validName(name);
        try {
			this.setFieldValue(name, 'NAME');
        } catch (e) {}
        this.last_variable = name;
    }
  },
  validName: Blockly.Blocks.procedures_defnoreturn.validName,
  validator_: function(newVar) {
    newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
    return newVar || null;
  },
  createNewVar_: function(newText) {
    var source = this.sourceBlock_;
    if (source && source.workspace && source.workspace.options &&
        source.workspace.options.parentWorkspace) {
      source.workspace.options.parentWorkspace.createVariable(newText);
    }
  }
};
		
        // Source: src/blocks/procedures_defreturn/procedures_defreturn.js
        Blockly.Arduino.procedures_defreturn = function() {
            // Define a procedure with a return value.
            var funcName = this.getFieldValue('NAME');
            var branch = Blockly.Arduino.statementToCode(this, 'STACK');
            branch = branch.replace(/&quot;/g, '"');

            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }
            var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
            var code = '';

            returnValue = returnValue.replace(/&quot;/g, '"');
            var returnType = this.getReturnType();
            if (returnValue) {
                var a = RoboBlocks.findPinMode(returnValue);
                returnValue = a['code'];
                returnValue += '  return ' + a['pin'] + ';\n';
            }
            var args = this.paramString;
            code += JST['procedures_defreturn']({
                'returnType': returnType,
                'funcName': funcName,
                'args': args,
                'branch': branch,
                'returnValue': returnValue
            });
            // code=code.replace(/&amp;/g, '');

            code = Blockly.Arduino.scrub_(this, code);
            Blockly.Arduino.definitions_[funcName] = code;
            return null;
        };
		
		Blockly.Blocks.procedures_defreturn = {
		category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Procedures are handled specially.
        helpUrl: RoboBlocks.getHelpUrl('procedures_defreturn'),
		examples: ['procedures_callreturn_example.bly'],
		category_colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
		colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
		keys: ['LANG_PROCEDURES_DEFRETURN_PROCEDURE','LANG_PROCEDURES_DEFRETURN_RETURN','LANG_PROCEDURES_DEFRETURN_TOOLTIP'],
		init: function() {
			var nameField = new Blockly.FieldTextInput('',
				Blockly.Procedures.rename);
			nameField.setSpellcheck(false);
			this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE')).appendField(nameField, 'NAME').appendField('', 'PARAMS');
			//this.appendStatementInput('STACK').appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_DO'));
			this.appendValueInput('RETURN').setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
			this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
			if ((this.workspace.options.comments ||(this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
			  this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
			}
			this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
			this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_TOOLTIP'));
			this.arguments_ = [];
			this.setStatements_(true);
			this.statementConnection_ = null;
  },
  isVariable: function(varValue) {
                for (var i in Blockly.Variables.allUsedVariables) {
                    if (Blockly.Variables.allUsedVariables[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
  getReturnType: function() {
                var returnType;
                var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
                var a = RoboBlocks.findPinMode(returnValue);
                // code+=a['code'];
                returnValue = a['pin'];

                var isFunction = false;

                for (var i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(returnValue + ' \\(') >= 0) {
                        isFunction = true;
                        break;
                    }
                }
                if (!returnValue) {
                    returnType = 'void';
                }
                if (returnValue.search('"') >= 0) {
                    returnType = 'String';
                } else if (isFunction) { //returnValue.search('\\(') >= 0 && returnValue.search('\\)') >= 0) {
                    for (i in Blockly.Arduino.definitions_) {
                        if (Blockly.Arduino.definitions_[i].search(returnValue) >= 0) {
                            if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                                if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                    returnType = 'int *';
                                } else {
                                    returnType = 'int';
                                }
                            } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                                returnType = 'String';
                            } else {
                                returnType = '';
                            }
                        }
                    }
                } else if (this.isVariable(returnValue)) {
                    returnType = RoboBlocks.variables[returnValue][0];
                } else if ((returnValue.search('analogRead') >= 0) || (returnValue.search('digitalRead') >= 0) || (returnValue.search('Distanc') >= 0) || (!isNaN(parseFloat(returnValue)) || (returnValue.search('random') >= 0)) || (returnValue.search('map') >= 0) || returnValue.search('\\[') >= 0 || (returnValue.search('abs') >= 0) || (returnValue.search('sqrt') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('log') >= 0) || (returnValue.search('exp') >= 0) || (returnValue.search('pow') >= 0)) {
                    returnType = 'int';
                } else if (returnValue.search('readJoystick') >= 0 || returnValue[0] === '{') {
                    returnType = 'int *';
                } else {
                    returnType = 'void';
                }
                return returnType;
            },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  callType_: 'procedures_callreturn'
};
		

        // Source: src/blocks/procedures_ifreturn/procedures_ifreturn.js
        Blockly.Arduino.procedures_ifreturn = function() {
            // Conditionally return value from a procedure.
            var condition = Blockly.Arduino.valueToCode(this, 'CONDITION',
                Blockly.Arduino.ORDER_NONE) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(condition);
            code += a['code'];
            condition = a['pin'];

            code += 'if (' + condition + ') {\n';
            // if (this.hasReturnValue_) {
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            a = RoboBlocks.findPinMode(value);
            code += a['code'];
            code += '  return (' + value + ');\n';
            // } else {
            //     code += '  return;\n';
            // }
            code += '}\n';
            return code;
        };



        Blockly.Blocks.procedures_ifreturn = {
            // Conditionally return value from a procedure.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: RoboBlocks.getHelpUrl('procedures_ifreturn'),
			examples: ['procedures_ifreturn_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_CONTROLS_IF_MSG_IF','LANG_PROCEDURES_DEFRETURN_RETURN','LANG_PROCEDURES_IFRETURN_TOOLTIP','LANG_PROCEDURES_IFRETURN_WARNING'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendValueInput('CONDITION').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
                this.appendValueInput('VALUE');
                this.setInputsInline(true,'function');
                this.setPreviousStatement(true,'function');
                this.setNextStatement(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_TOOLTIP'));
                this.hasReturnValue_ = true;
            },
            mutationToDom: function() {
                // Save whether this block has a return value.
                var container = document.createElement('mutation');
                container.setAttribute('value', Number(this.hasReturnValue_));
                return container;
            },
            domToMutation: function(xmlElement) {
                // Restore whether this block has a return value.
                var value = xmlElement.getAttribute('value');
                this.hasReturnValue_ = (value === 1);
                // if (!this.hasReturnValue_) {
                //     this.removeInput('VALUE');
                // }
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a procedure?
                var block = this;
                do {
                    if (block.type === 'procedures_defreturn') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    // If needed, toggle whether this block has a return value.
                    // if (block.type === 'procedures_defnoreturn' && this.hasReturnValue_) {
                    //     this.removeInput('VALUE');
                    //     this.hasReturnValue_ = false;
                    // } else if (block.type === 'procedures_defreturn' && !this.hasReturnValue_) {
                    //     this.appendValueInput('VALUE');
                    //     this.hasReturnValue_ = true;
                    // }
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        // Source: src/blocks/procedures_return/procedures_return.js
        Blockly.Arduino.procedures_return = function() {
            // Conditionally return value from a procedure.
            var code = '';
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
            var a = RoboBlocks.findPinMode(value);
            code += a['code'];
            code += '  return (' + value + ');\n';
            return code;
        };



        Blockly.Blocks.procedures_return = {
            // Conditionally return value from a procedure.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_PROCEDURES'),
            helpUrl: RoboBlocks.getHelpUrl('procedures_return'),
			examples: ['procedures_return_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			colour: RoboBlocks.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_RETURN','LANG_PROCEDURES_RETURN_TOOLTIP','LANG_PROCEDURES_IFRETURN_WARNING'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_PROCEDURES);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_PROCEDURES_RETURN'));
                this.appendValueInput('VALUE');
                this.setInputsInline(true);
                this.setPreviousStatement(true,'function');
                this.setNextStatement(true,'function');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_PROCEDURES_RETURN_TOOLTIP'));
                this.hasReturnValue_ = true;
            },
            mutationToDom: function() {
                // Save whether this block has a return value.
                var container = document.createElement('mutation');
                container.setAttribute('value', Number(this.hasReturnValue_));
                return container;
            },
            domToMutation: function(xmlElement) {
                // Restore whether this block has a return value.
                var value = xmlElement.getAttribute('value');
                this.hasReturnValue_ = (value === 1);
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a procedure?
                var block = this;
                do {
                    if (block.type === 'procedures_defreturn') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };
		
		        // Source: src/blocks/controls_setupLoop/controls_setupLoop.js

        Blockly.Arduino.controls_setupLoop = function() {
            // Add statements to setup.
            var branch = Blockly.Arduino.statementToCode(this, 'SETUP');
            branch = branch.replace(/&quot;/g, '"');

	    if (Blockly.Arduino.setups_['setup_int0_']) {
              branch += Blockly.Arduino.setups_['setup_int0_']
            }	    

            Blockly.Arduino.setups_['X_SETUP'] = JST['controls_setupLoop']({
                'branch': branch
            });

            var content = Blockly.Arduino.statementToCode(this, 'LOOP');
            content = content.replace(/&quot;/g, '"');
            content = JST['controls_setupLoop']({
                'branch': content
            });
            return content;
        };
        Blockly.Blocks.controls_setupLoop = {
            // Setup statements.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_setupLoop'),
			examples: ['controls_setupLoop_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE','LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE','LANG_CONTROLS_SETUP_LOOP_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendStatementInput('SETUP').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE')).setCheck('code');
                this.appendStatementInput('LOOP').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE')).setCheck('code');
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_SETUP_LOOP_TOOLTIP'));
            }
        };
		
		// Source: src/blocks/bt_serial_available/bt_serial_available.js
        Blockly.Arduino.controls_doWhile = function() {
            // Do while/until loop.
            var argument0 = Blockly.Arduino.valueToCode(this, 'WHILE', Blockly.Arduino.ORDER_NONE) || '';
            argument0 = argument0.replace(/&quot;/g, '"');
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');
            var code = '';
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
                // branch = branch.substring(0, branch.length - 2);
            }
            // branch=branch.replace(/&amp;/g, '');
            if (this.getFieldValue('MODE') === 'UNTIL') {
                if (!argument0.match(/^\w+$/)) {
                    argument0 = '(' + argument0 + ')';
                }
                argument0 = '!' + argument0;
            }
            code += JST['controls_doWhile']({
                'argument0': argument0,
                'branch': branch
            });
            return code;
        };
        Blockly.Blocks.controls_doWhile = {
            // Do/while loop.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_doWhile'),
			examples: ['controls_doWhile_example1.bly','controls_doWhile_example2.bly'],	
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_DOWHILE_OPERATOR_DO','LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE','LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL','LANG_CONTROLS_DOWHILE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO')).setCheck('code');
                this.appendValueInput('WHILE').setCheck(Boolean).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
                ]), 'MODE');
                // this.appendValueInput('WHILE').setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_WHILE'));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_TOOLTIP'));
            }
        };
		
        // Source: src/blocks/base_delay/base_delay.js
        // global Blockly, JST, RoboBlocks

        //register with blockly arduino
        Blockly.Arduino.base_delay = function() {
            var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(delay_time);
            code += a['code'];
            delay_time = a['pin'];

            code += JST['base_delay']({
                'delay_time': delay_time
            });
            return code;
        };

        Blockly.Blocks.base_delay = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('base_delay'),
			examples: ['base_delay_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_BASE_DELAY_WAIT','LANG_CONTROLS_BASE_DELAY_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('DELAY_TIME', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT'))
                    .setCheck(Number);
                this.setInputsInline(true);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_DELAY_TOOLTIP'));
            }
        };

	// Source: src/blocks/advanced_map/advanced_map.js
        // global Blockly, JST, RoboBlocks 
        // jshint sub:true 

        Blockly.Arduino.advanced_map = function() {
            var num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var from_min = Blockly.Arduino.valueToCode(this, 'FROM_MIN', Blockly.Arduino.ORDER_NONE);
            var from_max = Blockly.Arduino.valueToCode(this, 'FROM_MAX', Blockly.Arduino.ORDER_NONE);
            var to_min = Blockly.Arduino.valueToCode(this, 'TO_MIN', Blockly.Arduino.ORDER_NONE);
            var to_max = Blockly.Arduino.valueToCode(this, 'TO_MAX', Blockly.Arduino.ORDER_NONE);

            var code = '';
            var a = RoboBlocks.findPinMode(num);
            code += a['code'];
            num = a['pin'];

            a = RoboBlocks.findPinMode(from_min);
            code += a['code'];
            from_min = a['pin'];

            a = RoboBlocks.findPinMode(from_max);
            code += a['code'];
            from_max = a['pin'];

            a = RoboBlocks.findPinMode(to_min);
            code += a['code'];
            to_min = a['pin'];

            a = RoboBlocks.findPinMode(to_max);
            code += a['code'];
            to_max = a['pin'];


            code += JST['advanced_map']({
                'num': num,
                'from_min': from_min,
                'from_max': from_max,
                'to_min': to_min,
                'to_max': to_max
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.advanced_map = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.getHelpUrl('advanced_map'),
			examples: ['advanced_map_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_ADVANCED_MAP_MAP','LANG_MATH_ADVANCED_MAP_FROM','LANG_MATH_ADVANCED_MAP_HYPHEN','LANG_MATH_ADVANCED_MAP_BRACKET','LANG_MATH_ADVANCED_MAP_TO','LANG_MATH_ADVANCED_MAP_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_MAP'))
                    .setCheck(Number);
                this.appendValueInput('FROM_MIN', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_FROM'))
                    .setCheck(Number);
                this.appendValueInput('FROM_MAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
                this.appendValueInput('TO_MIN', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_TO'))
                    .setCheck(Number);
                this.appendValueInput('TO_MAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_ADVANCED_MAP_TOOLTIP'));
            }
        };

        // Source: src/blocks/base_map/base_map.js
        Blockly.Arduino.base_map = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = RoboBlocks.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];

            a = RoboBlocks.findPinMode(value_dmax);
            code += a['code'];
            value_dmax = a['pin'];

            code += JST['base_map']({
                'value_num': value_num,
                'value_dmax': value_dmax
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.base_map = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.getHelpUrl('base_map'),
			examples: ['base_map_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_BASE_MAP','LANG_MATH_BASE_MAP_VALUE_TO','LANG_MATH_BASE_MAP_BRACKET','LANG_MATH_BASE_MAP_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP'))
                    .setCheck(Number);
                this.appendValueInput('DMAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_VALUE_TO'))
                    .setCheck(Number);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_BRACKET'));
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_BASE_MAP_TOOLTIP'));
            }
        };

	Blockly.Arduino.base_us = function() {
            var code = 'micros()';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.base_us = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('base_us'),
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			examples: ['base_us_example.bly'],
			keys: ['LANG_CONTROLS_BASE_US','LANG_CONTROLS_BASE_US_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_US'));
                this.setOutput(true,Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_BASE_US_TOOLTIP'));
            }
        };

        // Source: src/blocks/controls_flow_statements/controls_flow_statements.js
        Blockly.Arduino.controls_flow_statements = function() {
            // Flow statements: continue, break.
            switch (this.getFieldValue('FLOW')) {
                case 'BREAK':
                    return 'break;\n';
                case 'CONTINUE':
                    return 'continue;\n';
            }
            throw 'Unknown flow statement.';
        };

        Blockly.Blocks.controls_flow_statements = {
            // Flow statements: continue, break.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_flow_statements'),
			examples: ['controls_flow_statements_example1.bly','controls_flow_statements_example2.bly'],		
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK','LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE','LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP','LANG_CONTROLS_FLOW_STATEMENTS_WARNING','LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK','LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                var dropdown = new Blockly.FieldDropdown(
                    [
                        [RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK') || 'BREAK', 'BREAK'],
                        [RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE') || 'CONTINUE', 'CONTINUE']
                    ]);
                this.appendDummyInput()
                    .appendField(dropdown, 'FLOW')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP'));
                this.setPreviousStatement(true,'code');
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('FLOW');
                    return Blockly.Blocks.controls_flow_statements.TOOLTIPS[op];
                });
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
                var legal = false;
                // Is the block nested in a control statement?
                var block = this;
                do {
                    if (block.type === 'controls_repeat' ||
                        block.type === 'controls_forEach' ||
                        block.type === 'controls_for' ||
                        block.type === 'controls_whileUntil') {
                        legal = true;
                        break;
                    }
                    block = block.getSurroundParent();
                } while (block);
                if (legal) {
                    this.setWarningText(null);
                } else {
                    try {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_WARNING'));
                    } catch (err) {
                        console.log('Captured error: ', err);
                    }
                }
            }
        };

        Blockly.Blocks.controls_flow_statements.TOOLTIPS = {
            BREAK: RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK'),
            CONTINUE: RoboBlocks.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE')
        };

        // Source: src/blocks/controls_for/controls_for.js
        Blockly.Arduino.controls_for = function() {
            var variable0 = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
            var argument0 = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
            }

            var code = '';
            var a = RoboBlocks.findPinMode(variable0);
            code += a['code'];
            variable0 = a['pin'];

            a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

			var from_input=this.getInputTargetBlock('FROM');
			var to_input=this.getInputTargetBlock('TO');
			if (from_input&&to_input)
			{
				var from_type=this.getInputTargetBlock('FROM').type;
				var to_type=this.getInputTargetBlock('TO').type;
				//console.log(from_type);
				//console.log(to_type);
				if ((from_type=='variables_get')&&(to_type=='math_number'))
					var up = false;  //We assume that the from input is bigger than the to input
				else if ((from_type=='math_number')&&(to_type=='variables_get'))
					var up = true;  //We assume that the from input is smaller than the from input
				else if ((from_type=='math_number')&&(to_type=='math_number'))
					var up = parseFloat(argument0) <= parseFloat(argument1);
				else
					var up = parseFloat(argument0) <= parseFloat(argument1);
				code += 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0 + (up ? '++' : '--') + ') {\n' + branch + '}\n';
            }
			return code;
        };
        Blockly.Blocks.controls_for = {
            // For loop.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_for'),
			examples: ['controls_for_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_FOR_INPUT_WITH','LANG_CONTROLS_FOR_INPUT_FROM','LANG_CONTROLS_FOR_INPUT_TO','LANG_CONTROLS_FOR_INPUT_DO'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('VAR').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH'));
                // .appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.appendValueInput('FROM').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
                this.appendValueInput('TO').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
                this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO')).setCheck('code');
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    return RoboBlocks.LANG_CONTROLS_FOR_TOOLTIP.replace('%1', thisBlock.getFieldValue('VAR'));
                });
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            getVariables: function() {
                var variables = Blockly.Variables.allUsedVariables;
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allUsedVariables) {
                    if (Blockly.Variables.allUsedVariables[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            onchange: function() {
                /*try {
                    if (this.isVariable(Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ATOMIC))) {
                        this.setWarningText('FROM input is not a variable');
                    } else if (this.isVariable(Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ATOMIC))) {
                        this.setWarningText(RoboBlocks.locales.getKey('TO input is not a variable'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}*/
				var from_input=this.getInputTargetBlock('FROM');
				var to_input=this.getInputTargetBlock('TO');
				if (from_input&&to_input)
				{
					var from_type=from_input.type;
					var to_type=to_input.type;
					if ((from_type=='variables_get')&&(to_type=='math_number'))
						this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING1'));
					else if ((from_type=='math_number')&&(to_type=='variables_get'))
						this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING2'));
					else if ((from_type=='math_number')&&(to_type=='math_number'))
						this.setWarningText(null);
					else
						this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING3'));
				}
				else
					this.setWarningText(RoboBlocks.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING4'));
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
        };
        // Source: src/blocks/controls_if/controls_if.js
        Blockly.Arduino.controls_if = function() {
            // If/elseif/else condition.
            var n = 0;
            var argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
            argument = argument.replace(/&quot;/g, '"');

            var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);

            var code = '';
            var a = RoboBlocks.findPinMode(argument);
            code += a['code'];
            argument = a['pin'];

            code += JST['controls_if']({
                'argument': argument,
                'branch': branch
            });


            for (n = 1; n <= this.elseifCount_; n++) {
                argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
                branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
                // branch=branch.replace(/&amp;/g, '');

                code += JST['controls_elseif']({
                    'argument': argument,
                    'branch': branch
                });
            }
            if (this.elseCount_) {
                branch = Blockly.Arduino.statementToCode(this, 'ELSE');
                // branch=branch.replace(/&amp;/g, '');

                code += JST['controls_else']({
                    'argument': argument,
                    'branch': branch
                });
            }
            branch = branch.replace(/&quot;/g, '"');
            code = code.replace(/&quot;/g, '"');

            return code + '\n';
        };

        Blockly.Blocks.controls_if = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_if'),
			examples: ['controls_if_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_MSG_IF','LANG_CONTROLS_IF_MSG_THEN','LANG_CONTROLS_IF_TOOLTIP_1','LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF','LANG_CONTROLS_IF_MSG_THEN','LANG_CONTROLS_IF_ELSE_Field_ELSE'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('IF0')
                    .setCheck(Boolean)
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
                this.appendStatementInput('DO0').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setMutator(new Blockly.Mutator(['controls_if_elseif',
                    'controls_if_else'
                ]));
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    if (!thisBlock.elseifCount_ && !thisBlock.elseCount_)
                        return RoboBlocks.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_1');
                    return '';
                });
                this.elseifCount_ = 0;
                this.elseCount_ = 0;
            },
            mutationToDom: function() {
                if (!this.elseifCount_ && !this.elseCount_) {
                    return null;
                }
                var container = document.createElement('mutation');
                if (this.elseifCount_) {
                    container.setAttribute('elseif', this.elseifCount_);
                }
                if (this.elseCount_) {
                    container.setAttribute('else', 1);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
                this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
                for (var x = 1; x <= this.elseifCount_; x++) {
                    this.appendValueInput('IF' + x).setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'));
                    this.appendStatementInput('DO' + x).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
                }
                if (this.elseCount_) {
					this.appendDummyInput('ELSE_LABEL').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'));
                    this.appendStatementInput('ELSE').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
                }
            },
            decompose: function(workspace) {
                var containerBlock = workspace.newBlock('controls_if_if');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 1; x <= this.elseifCount_; x++) {
                    var elseifBlock = workspace.newBlock('controls_if_elseif');
                    elseifBlock.initSvg();
                    connection.connect(elseifBlock.previousConnection);
                    connection = elseifBlock.nextConnection;
                }
                if (this.elseCount_) {
                    var elseBlock = workspace.newBlock('controls_if_else');
                    elseBlock.initSvg();
                    connection.connect(elseBlock.previousConnection);
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect the else input blocks and remove the inputs.
                if (this.elseCount_) {
					this.removeInput('ELSE_LABEL');
                    this.removeInput('ELSE');
                }
                this.elseCount_ = 0;
                // Disconnect all the elseif input blocks and remove the inputs.
                for (var x = this.elseifCount_; x > 0; x--) {
                    this.removeInput('IF' + x);
                    this.removeInput('DO' + x);
                }
                this.elseifCount_ = 0;
                // Rebuild the block's optional inputs.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_if_elseif':
                            this.elseifCount_++;
                            var ifInput = this.appendValueInput('IF' + this.elseifCount_).setCheck(Boolean).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'));
                            var doInput = this.appendStatementInput('DO' + this.elseifCount_).setCheck('code');
                            doInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.valueConnection_) {
                                ifInput.connection.connect(clauseBlock.valueConnection_);
                            }
                            if (clauseBlock.statementConnection_) {
                                doInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        case 'controls_if_else':
                            this.elseCount_++;
							this.appendDummyInput('ELSE_LABEL').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'));
                            var elseInput = this.appendStatementInput('ELSE').setCheck('code');
                            elseInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.statementConnection_) {
                                elseInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 1;
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_if_elseif':
                            var inputIf = this.getInput('IF' + x);
                            var inputDo = this.getInput('DO' + x);
                            clauseBlock.valueConnection_ =
                                inputIf && inputIf.connection.targetConnection;
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            x++;
                            break;
                        case 'controls_if_else':
                            inputDo = this.getInput('ELSE');
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection &&
                        clauseBlock.nextConnection.targetBlock();
                }
            }
        };

        Blockly.Blocks.controls_if_if = {
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_IF_Field_IF','LANG_CONTROLS_IF_IF_TOOLTIP'],
            // If condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_IF_Field_IF'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendStatementInput('STACK').setCheck('if');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_IF_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_if_elseif = {
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF','LANG_CONTROLS_IF_ELSEIF_TOOLTIP'],
            // Else-If condition.
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true,'if');
                this.setNextStatement(true,'if');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSEIF_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_if_else = {
            // Else condition.
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_ELSE_Field_ELSE','LANG_CONTROLS_IF_ELSE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true,'if');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_ELSE_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        // Source: src/blocks/controls_switch/controls_switch.js
        var indentSentences = function(sentences) {
            var splitted_sentences = sentences.split('\n');
            var final_sentences = '';
            for (var i in splitted_sentences) {
                final_sentences += '  ' + splitted_sentences[i] + '\n';
            }
            return final_sentences;
        };

        Blockly.Arduino.controls_switch = function() {
            // switch condition.
            var n = 0;
            var argument = Blockly.Arduino.valueToCode(this, 'IF0',
                Blockly.Arduino.ORDER_NONE) || '';
            var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
            branch = indentSentences(branch);
            // branch=branch.replace(/&amp;/g, '');

            var code = '';
            var a = RoboBlocks.findPinMode(argument);
            code += a['code'];
            argument = a['pin'];

            code += 'switch (' + argument + ')\n{';
            for (n = 1; n <= this.switchCount_; n++) {
                argument = Blockly.Arduino.valueToCode(this, 'SWITCH' + n, Blockly.Arduino.ORDER_NONE) || '';
                branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
                branch = indentSentences(branch);
                branch = branch.substring(0, branch.length - 1);
                // branch=branch.replace(/&amp;/g, '');

                code += ' \n  case ' + argument + ': \n  {\n' + branch + '  break;\n  }';
            }
            if (this.defaultCount_) {
                branch = Blockly.Arduino.statementToCode(this, 'DEFAULT');
                branch = indentSentences(branch);
                branch = branch.substring(0, branch.length - 1);
                // branch=branch.replace(/&amp;/g, '');

                code += '  \n  default:\n  {\n' + branch + '}';
            }
            return code + '\n}\n';
        };


        Blockly.Blocks.controls_switch = {
            // switch condition.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_switch'),
			examples: ['controls_switch_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH','LANG_CONTROLS_SWITCH_CASE','LANG_CONTROLS_IF_MSG_THEN','LANG_CONTROLS_SWITCH_DEFAULT'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('IF0').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH')).setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setMutator(new Blockly.Mutator(['controls_switch_case', 'controls_switch_default']));
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    return '';
                });
                this.defaultCount_ = 0;
            },
            mutationToDom: function() {
                if (!this.switchCount_ && !this.defaultCount_) {
                    return null;
                }
                var container = document.createElement('mutation');
                if (this.switchCount_) {
                    container.setAttribute('case', this.switchCount_);
                }
                if (this.defaultCount_) {
                    container.setAttribute('default', 1);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.switchCount_ = window.parseInt(xmlElement.getAttribute('case'), 10);
                this.defaultCount_ = window.parseInt(xmlElement.getAttribute('default'), 10);
                for (var x = 1; x <= this.switchCount_; x++) {
                    this.appendValueInput('SWITCH' + x).setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE')).setAlign(Blockly.ALIGN_RIGHT);
                    this.setInputsInline(true);
                    this.appendStatementInput('DO' + x).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
                }
                if (this.defaultCount_) {
                    this.appendStatementInput('DEFAULT').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
                }
            },
            decompose: function(workspace) {
                var containerBlock = workspace.newBlock('controls_switch_switch');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 1; x <= this.switchCount_; x++) {
                    var switchBlock = workspace.newBlock('controls_switch_case');
                    switchBlock.initSvg();
                    connection.connect(switchBlock.previousConnection);
                    connection = switchBlock.nextConnection;
                }
                if (this.defaultCount_) {
                    var defaultBlock = workspace.newBlock('controls_switch_default');
                    defaultBlock.initSvg();
                    connection.connect(defaultBlock.previousConnection);
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect the switch blocks and remove the inputs.
                if (this.defaultCount_) {
                    this.removeInput('DEFAULT');
                }
                this.defaultCount_ = 0;
                // Disconnect all the switch input blocks and remove the inputs.
                for (var x = this.switchCount_; x > 0; x--) {
                    this.removeInput('SWITCH' + x);
                    this.removeInput('DO' + x);
                }
                this.switchCount_ = 0;
                // Rebuild the block's optional inputs.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_switch_case':
                            this.switchCount_++;
                            var case_lang;
                            case_lang = RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE');
                            var switchInput = this.appendValueInput('SWITCH' + this.switchCount_).setCheck(Number).appendField(case_lang).setAlign(Blockly.ALIGN_RIGHT);
                            this.setInputsInline(true);

                            var doInput = this.appendStatementInput('DO' + this.switchCount_).setCheck('code');
                            doInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.valueConnection_) {
                                switchInput.connection.connect(clauseBlock.valueConnection_);
                            }
                            if (clauseBlock.statementConnection_) {
                                doInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        case 'controls_switch_default':
                            this.defaultCount_++;
                            var defaultInput = this.appendStatementInput('DEFAULT').setCheck('code');
                            defaultInput.appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                                .setAlign(Blockly.ALIGN_RIGHT);
                            // Reconnect any child blocks.
                            if (clauseBlock.statementConnection_) {
                                defaultInput.connection.connect(clauseBlock.statementConnection_);
                            }
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var clauseBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 1;
                while (clauseBlock) {
                    switch (clauseBlock.type) {
                        case 'controls_switch_case':
                            var inputSwitch = this.getInput('SWITCH' + x);
                            var inputDo = this.getInput('DO' + x);
                            clauseBlock.valueConnection_ =
                                inputSwitch && inputSwitch.connection.targetConnection;
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            x++;
                            break;
                        case 'controls_switch_default':
                            inputDo = this.getInput('DEFAULT');
                            clauseBlock.statementConnection_ =
                                inputDo && inputDo.connection.targetConnection;
                            break;
                        default:
                            throw 'Unknown block type.';
                    }
                    clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
                }
            }
        };


        Blockly.Blocks.controls_switch_switch = {
            // If condition.
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendStatementInput('STACK').setCheck('switch');
                this.setTooltip('Switch');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_switch_case = {
            // case condition.
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH_CASE'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true,'switch');
                this.setNextStatement(true,'switch');
                this.setTooltip('Switch case');
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.controls_switch_default = {
            // default condition.
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH_DEFAULT'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true,'switch');
                this.setTooltip('Switch default');
                this.contextMenu = false;
            }
        };
        // Source: src/blocks/controls_whileUntil/controls_whileUntil.js
        Blockly.Arduino.controls_whileUntil = function() {
            // Do while/until loop.
            var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_NONE) || '';
            argument0 = argument0.replace(/&quot;/g, '"');
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');

            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
                branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
                // branch = branch.substring(0, branch.length - 2);
            }
            // branch=branch.replace(/&amp;/g, '');

            if (this.getFieldValue('MODE') === 'UNTIL') {
                if (!argument0.match(/^\w+$/)) {
                    argument0 = '(' + argument0 + ')';
                }
                argument0 = '!' + argument0;
            }
            code += JST['controls_whileUntil']({
                'argument0': argument0,
                'branch': branch
            });
            return code;
        };
        Blockly.Blocks.controls_whileUntil = {
            // Do while/until loop.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_whileUntil'),
			examples: ['controls_whileUntil_example.bly','controls_whileUntil1_example.bly'],	
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE','LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL','LANG_CONTROLS_DOWHILE_OPERATOR_DO','LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE','LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('BOOL').setCheck(Boolean).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
                    [RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
                ]), 'MODE');
                this.appendStatementInput('DO').appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO'));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('MODE');
                    return Blockly.Blocks.controls_whileUntil.TOOLTIPS[op];
                });
            }
        };
        Blockly.Blocks.controls_whileUntil.TOOLTIPS = {
            WHILE: RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE'),
            UNTIL: RoboBlocks.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL')
        };
        // Source: src/blocks/inout_analog_read/inout_analog_read.js
        Blockly.Arduino.inout_analog_read = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';

            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_analog_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_green_analog_read' + dropdown_pin] = JST['inout_analog_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['inout_analog_read']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.inout_analog_read = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_ANALOG'),
            helpUrl: RoboBlocks.getHelpUrl('inout_analog_read'),
			examples: ['inout_analog_read_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_ANALOG,
			keys: ['LANG_ADVANCED_INOUT_ANALOG_READ','LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_ANALOG);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",24*options.zoom, 24*options.zoom));
                this.setOutput(true, Number);
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_analog_write/inout_analog_write.js
        Blockly.Arduino.inout_analog_write = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            var b = RoboBlocks.findPinMode(value_num);
            code += b['code'];
            value_num = b['pin'];


            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_analog_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'value_num': value_num
                });
            } else {
                Blockly.Arduino.setups_['setup_analog_write' + dropdown_pin] = JST['inout_analog_write_setups']({
                    'dropdown_pin': dropdown_pin,
                    'value_num': value_num
                });
            }

            code += JST['inout_analog_write']({
                'dropdown_pin': dropdown_pin,
                'value_num': value_num
            });
            return code;
        };
        Blockly.Blocks.inout_analog_write = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_ANALOG'),
            helpUrl: RoboBlocks.getHelpUrl('inout_analog_write'),
            examples: ['inout_analog_write_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_ANALOG,
			keys: ['LANG_ADVANCED_INOUT_ANALOG_WRITE','LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE','LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_ANALOG);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE')).appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",24*options.zoom, 24*options.zoom));
                this.appendValueInput('NUM', Number).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",24*options.zoom, 24*options.zoom)).setCheck(Number);
                this.setInputsInline(true);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_builtin_led/inout_builtin_led.js
        Blockly.Arduino.inout_builtin_led = function() {
            var dropdown_stat = this.getFieldValue('STAT');
			var code = '';
            Blockly.Arduino.setups_['setup_green_led_13'] = JST['inout_builtin_led_setups']({});
			if (dropdown_stat==='TOGGLE')
			{
				code +='digitalWrite(13,!digitalRead(13));\n';
			}
			else
			{
              code = JST['inout_builtin_led']({
                'dropdown_stat': dropdown_stat
              });
			}

            return code;
        };
        Blockly.Blocks.inout_builtin_led = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
            helpUrl: RoboBlocks.getHelpUrl('inout_builtin_led'),
            examples: ['inout_builtin_led_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_BUILTIN_LED','LANG_ADVANCED_BUILTIN_LED_ON','LANG_ADVANCED_BUILTIN_LED_OFF','LANG_ADVANCED_BUILTIN_LED_TOGGLE','LANG_ADVANCED_BUILTIN_LED_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED'))
                    .appendField(new Blockly.FieldImage("img/blocks/diode.png",24*options.zoom, 24*options.zoom)).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_STATE'))
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_ON') || 'ON', 'HIGH'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_OFF') || 'OFF', 'LOW'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_TOGGLE') || 'TOGGLE', 'TOGGLE']																											 
                    ]), 'STAT');
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_BUILTIN_LED_TOOLTIP'));
            }
        };

        // Source: src/blocks/inout_digital_read/inout_digital_read.js
        Blockly.Arduino.inout_digital_read = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_digital_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            } else {
                Blockly.Arduino.setups_['setup_green_digital_read' + dropdown_pin] = JST['inout_digital_read_setups']({
                    'dropdown_pin': dropdown_pin,
                });
            }
            code += JST['inout_digital_read']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.inout_digital_read = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
            helpUrl: RoboBlocks.getHelpUrl('inout_digital_read'),
			examples: ['inout_digital_read_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_INOUT_DIGITAL_READ','LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.png",24*options.zoom, 24*options.zoom));
                this.setOutput(true, Boolean);
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_digital_write/inout_digital_write.js

        Blockly.Arduino.inout_digital_write = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var dropdown_stat = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin
                });
            } else {
                Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin
                });
            }
            code += JST['inout_digital_write']({
                'dropdown_pin': dropdown_pin,
                'dropdown_stat': dropdown_stat
            });
            return code;
        };

        Blockly.Blocks.inout_digital_write = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
            helpUrl: RoboBlocks.getHelpUrl('inout_digital_write'),
            examples: ['inout_digital_read_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_INOUT_DIGITAL_WRITE','LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN','LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE','LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE')).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.png",24*options.zoom, 24*options.zoom));
                this.appendValueInput('STAT').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE')).setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true,'code');
                this.setInputsInline(true);
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
            }
        };
		
		Blockly.Arduino.inout_digital_mode = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var dropdown_mode = this.getFieldValue('MODE');
            var code = '';
			code = 'pinMode('+dropdown_pin+','+dropdown_mode+');';
            return code;
        };

        Blockly.Blocks.inout_digital_mode = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
            helpUrl: RoboBlocks.getHelpUrl('inout_digital_mode'),
            examples: ['inout_digital_mode_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_INOUT_DIGITAL_MODE','LANG_ADVANCED_INOUT_DIGITAL_MODE_PIN','LANG_ADVANCED_INOUT_DIGITAL_MODE_MODE','LANG_ADVANCED_INOUT_DIGITAL_MODE_OUTPUT','LANG_ADVANCED_INOUT_DIGITAL_MODE_INPUT','LANG_ADVANCED_INOUT_DIGITAL_MODE_PULLUP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE')).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.png",24*options.zoom, 24*options.zoom));
                this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_MODE')).appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_OUTPUT') || 'OUTPUT', 'OUTPUT'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_INPUT') || 'INPUT', 'INPUT'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_PULLUP') || 'PULLUP', 'INPUT_PULLUP']
                    ]), 'MODE').setAlign(Blockly.ALIGN_RIGHT);
                this.setPreviousStatement(true,'code');
                this.setInputsInline(true);
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_TOOLTIP'));
            }
        };
        // Source: src/blocks/inout_highlow/inout_highlow.js

        Blockly.Arduino.inout_highlow = function() {
            var bool_value = this.getFieldValue('BOOL');

            var code = JST['inout_highlow']({
                'bool_value': bool_value,
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.inout_highlow = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
            helpUrl: RoboBlocks.getHelpUrl('inout_highlow'),
			tags: ['input','output'],
			examples: ['inout_highlow_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_HIGHLOW_HIGH','LANG_ADVANCED_HIGHLOW_LOW','LANG_ADVANCED_HIGHLOW_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL);
                this.appendDummyInput('')
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_HIGH') || 'HIGH', 'HIGH'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_LOW') || 'LOW', 'LOW']
                    ]), 'BOOL');
                this.setOutput(true, Boolean);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_HIGHLOW_TOOLTIP'));
            }
        };

		// Source: src/blocks/lcd_clear/lcd_clear.js


        Blockly.Arduino.lcd_clear = function() {
            var code = JST['lcd_clear']({});
            return code;
        };

        Blockly.Blocks.lcd_clear = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_LCD'),
            tags: ['lcd','screen'],
            helpUrl: RoboBlocks.getHelpUrl('lcd_clear'),
            examples: ['lcd_clear_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_SCREEN,
			colour: RoboBlocks.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_CLEAR','LANG_LCD_CLEAR_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_SCREEN_LCD);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_LCD_CLEAR')).appendField(new Blockly.FieldImage('img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 52*options.zoom, 20*options.zoom));
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_CLEAR_TOOLTIP'));
            }
        };

        // Source: src/blocks/lcd_def/lcd_def.js

        Blockly.Arduino.lcd_def = function() {
            var lcd_pins = {};
            lcd_pins['lcd_1'] = this.getFieldValue('LCD_1');
            lcd_pins['lcd_2'] = this.getFieldValue('LCD_2');
            lcd_pins['lcd_3'] = this.getFieldValue('LCD_3');
            lcd_pins['lcd_4'] = this.getFieldValue('LCD_4');
            lcd_pins['lcd_5'] = this.getFieldValue('LCD_5');
            lcd_pins['lcd_6'] = this.getFieldValue('LCD_6');
            Blockly.Arduino.definitions_['define_lcd'] = JST['lcd_def_definitions']({});
            Blockly.Arduino.definitions_['declare_var_LCD'] = JST['lcd_def_declare'](lcd_pins);
            Blockly.Arduino.setups_['setup_lcd_'] = JST['lcd_def_setups']({});
            return '';
        };

        Blockly.Blocks.lcd_def = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_LCD'),
            tags: ['lcd','screen'],
            helpUrl: RoboBlocks.getHelpUrl('lcd_def'),
            examples: ['lcd_def_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_SCREEN,
			colour: RoboBlocks.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_DEF','LANG_LCD_PINS','LANG_LCD_DEF_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_SCREEN_LCD);
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_LCD_DEF')).appendField(new Blockly.FieldImage('img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_LCD_PINS'))
                    .appendField(new Blockly.FieldTextInput('11'), 'LCD_1')
                    .appendField(new Blockly.FieldTextInput('12'), 'LCD_2')
                    .appendField(new Blockly.FieldTextInput('3'), 'LCD_3')
                    .appendField(new Blockly.FieldTextInput('4'), 'LCD_4')
                    .appendField(new Blockly.FieldTextInput('5'), 'LCD_5')
                    .appendField(new Blockly.FieldTextInput('6'), 'LCD_6');
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_DEF_TOOLTIP'));
            }
        };

        // Source: src/blocks/lcd_print/lcd_print.js
        Blockly.Arduino.lcd_print = function() {
            var val = Blockly.Arduino.valueToCode(this, 'VAL', Blockly.Arduino.ORDER_ATOMIC);
            var xcoor = Blockly.Arduino.valueToCode(this, 'XCOOR', Blockly.Arduino.ORDER_ATOMIC);
            var ycoor = Blockly.Arduino.valueToCode(this, 'YCOOR', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';

            var a = RoboBlocks.findPinMode(xcoor);
            code += a['code'];
            xcoor = a['pin'];

            a = RoboBlocks.findPinMode(ycoor);
            code += a['code'];
            ycoor = a['pin'];

            a = RoboBlocks.findPinMode(val);
            code += a['code'];
            val = a['pin'];

            if (this.getFieldValue('POS') === 'TRUE') {
                code += JST['lcd_print_pos']({
                    'val': val,
                    'xcoor': xcoor,
                    'ycoor': ycoor
                });
            } else {
                code += JST['lcd_print']({
                    'val': val
                });
            }
            code = code.replace(/&quot;/g, '"');
            return code;
        };

        Blockly.Blocks.lcd_print = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_LCD'),
            tags: ['lcd','screen'],
            helpUrl: RoboBlocks.getHelpUrl('lcd_print'),
            examples: ['lcd_print_example1.bly','lcd_print_example2.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_SCREEN,
			colour: RoboBlocks.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_PRINT','LANG_LCD_PRINT_POSITION','LANG_LCD_PRINT_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_SCREEN_LCD);
                this.appendValueInput('VAL').appendField(RoboBlocks.locales.getKey('LANG_LCD_PRINT')).appendField(new Blockly.FieldImage('img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 52*options.zoom, 20*options.zoom));
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_LCD_PRINT_POSITION')).appendField(new Blockly.FieldCheckbox('FALSE'), 'POS').setAlign(Blockly.ALIGN_RIGHT);
                this.last_pos = this.getFieldValue('POS');
                this.getPosition();
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_PRINT_TOOLTIP'));
            },
            getPosition: function() {
                try {
                    this.removeInput('XCOOR');
                    this.removeInput('YCOOR');
                } catch (e) {}
                if (this.getFieldValue('POS') === 'TRUE') {
                    this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
                    this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
                }
            },
            onchange: function() {
                if (this.getFieldValue('POS') !== this.last_pos) {
                    this.getPosition();
                    this.last_pos = this.getFieldValue('POS');
                }
            },
            mutationToDom: function() {
                var container = document.createElement('mutation');
                if (this.getFieldValue('POS') === 'TRUE') {
                    container.setAttribute('fixed', true);
                } else if (this.getFieldValue('POS') === 'FALSE') {
                    container.setAttribute('fixed', false);
                }
                return container;
            },
            domToMutation: function(xmlElement) {
                this.setFieldValue(xmlElement.getAttribute('fixed'), 'POS');
                if (this.getFieldValue('POS') === 'TRUE') {
                    this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
                    this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
                }
            }
        };
        // Source: src/blocks/lcd_setBacklight/lcd_setBacklight.js


        Blockly.Arduino.lcd_setBacklight = function() {
            var state = this.getFieldValue('STATE');
            var code = JST['lcd_setBacklight']({
                'state': state
            });
            return code;
        };

        Blockly.Blocks.lcd_setBacklight = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_LCD'),
            helpUrl: RoboBlocks.getHelpUrl('lcd_setBacklight'),
            tags: ['lcd','screen'],
            examples: ['lcd_setBacklight_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_SCREEN,
			colour: RoboBlocks.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_SETBACKLIGHT','LANG_LCD_SETBACKLIGHT_CLOSE','LANG_LCD_SETBACKLIGHT_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_SCREEN_LCD);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT'))
                    .appendField(new Blockly.FieldDropdown([
                        ['LOW', 'LOW'],
                        ['HIGH', 'HIGH']
                    ]), 'STATE')
                    .appendField(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT_CLOSE')).appendField(new Blockly.FieldImage('img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
                // .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 52*options.zoom, 20*options.zoom));
                this.setInputsInline(false);

                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LCD_SETBACKLIGHT_TOOLTIP'));
            }
        };

        // Source: src/blocks/logic_boolean/logic_boolean.js
        Blockly.Arduino.logic_boolean = function() {
            // Boolean values true and false.
            var code = (this.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.logic_boolean = {
            // Boolean data type: true and false.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.getHelpUrl('logic_boolean'),
			examples: ['logic_boolean_example.bly'],
			tags: ['logic'],					
			category_colour: RoboBlocks.LANG_COLOUR_LOGIC,	
			colour: RoboBlocks.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_BOOLEAN_TRUE','LANG_LOGIC_BOOLEAN_FALSE'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE'), 'TRUE'],
                        [RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_FALSE'), 'FALSE']
                    ]), 'BOOL');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LOGIC_BOOLEAN_TOOLTIP'));
            }
        };
        // Source: src/blocks/logic_compare/logic_compare.js


        Blockly.Arduino.logic_compare = function() {
            // Comparison operator.
            var mode = this.getFieldValue('OP');
            var operator = Blockly.Arduino.logic_compare.OPERATORS[mode];
            var order = (operator === '==' || operator === '!=') ?
                Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';

            var code = '';

            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

            code += JST['logic_compare']({
                'argument0': argument0,
                'argument1': argument1,
                'operator': operator
            });

            return [code, order];
        };

        Blockly.Arduino.logic_compare.OPERATORS = {
            EQ: '==',
            NEQ: '!=',
            LT: '<',
            LTE: '<=',
            GT: '>',
            GTE: '>='
        };


        Blockly.Blocks.logic_compare = {
            // Comparison operator.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.getHelpUrl('logic_compare'),
			examples: ['logic_compare_example.bly'],
			tags: ['logic'],						
			category_colour: RoboBlocks.LANG_COLOUR_LOGIC,		
			colour: RoboBlocks.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_COMPARE_TOOLTIP_EQ','LANG_LOGIC_COMPARE_TOOLTIP_NEQ','LANG_LOGIC_COMPARE_TOOLTIP_LT','LANG_LOGIC_COMPARE_TOOLTIP_LTE','LANG_LOGIC_COMPARE_TOOLTIP_GT','LANG_LOGIC_COMPARE_TOOLTIP_GTE'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('A');
                this.appendValueInput('B')
                    .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.logic_compare.TOOLTIPS[op];
                });
            }
        };

        Blockly.Blocks.logic_compare.OPERATORS = [
            ['=', 'EQ'],
            ['\u2260', 'NEQ'],
            ['<', 'LT'],
            ['\u2264', 'LTE'],
            ['>', 'GT'],
            ['\u2265', 'GTE']
        ];

        Blockly.Blocks.logic_compare.TOOLTIPS = {
            EQ: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_EQ'),
            NEQ: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_NEQ'),
            LT: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LT'),
            LTE: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_LTE'),
            GT: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GT'),
            GTE: RoboBlocks.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP_GTE')
        };

        Blockly.Arduino.logic_operation = function() {
		    var code = '';
            // Operations 'and', 'or', 'xor'.
            var operator = (this.getFieldValue('OP') === 'AND') ? '&&' : (this.getFieldValue('OP') === 'OR') ? '||' : '';
            var order = (operator === '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND : (operator === '||') ? Blockly.Arduino.ORDER_LOGICAL_OR : Blockly.Arduino.ORDER_NONE;
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
            // var code = JST['logic_operation']({
            //     'operator': operator,
            //     'argument0': argument0,
            //     'argument1': argument1
            // });
						  
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];
            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];

			if (this.getFieldValue('OP') === 'XOR')
			{
				code += '((!('+argument0+'))&&('+argument1+')||((!('+argument1+'))&&('+argument0+')))';
			}
			else if (this.getFieldValue('OP') === 'XNOR')
			{
				code += '(('+argument0+')&&('+argument1+')||((!('+argument1+'))&&(!('+argument0+'))))';
			}
			else if (this.getFieldValue('OP') === 'IMPLIES')
			{
				code += '((!('+argument0+'))||('+argument1+'))';
			}
			else
			{
				code += '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';
			}
            return [code, order];
        };
		
        Blockly.Blocks.logic_operation = {
            // Logical operations: 'and', 'or'.
			category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.getHelpUrl('logic_operation'),
			examples: ['logic_operation_example.bly'],
			tags: ['logic'],	
			category_colour: RoboBlocks.LANG_COLOUR_LOGIC,				
			colour: RoboBlocks.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_OPERATION_AND','LANG_LOGIC_OPERATION_OR','LANG_LOGIC_OPERATION_XOR','LANG_LOGIC_OPERATION_XNOR','LANG_LOGIC_OPERATION_IMPLIES','LANG_LOGIC_OPERATION_TOOLTIP_AND','LANG_LOGIC_OPERATION_TOOLTIP_OR','LANG_LOGIC_OPERATION_TOOLTIP_XOR','LANG_LOGIC_OPERATION_TOOLTIP_XNOR','LANG_LOGIC_OPERATION_TOOLTIP_IMPLIES'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('A').setCheck(Boolean);
                this.appendValueInput('B').setCheck(Boolean).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_AND') || 'AND', 'AND'],
                    [RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_OR') || 'OR', 'OR'],
					[RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_XOR') || 'XOR', 'XOR'],
					[RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_XNOR') || 'XNOR', 'XNOR'],
					[RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_IMPLIES') || 'IMPLIES', 'IMPLIES']
                ]), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var op = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.logic_operation.TOOLTIPS[op];
                });
            }
        };
        Blockly.Blocks.logic_operation.TOOLTIPS = {
            AND: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_AND'),
            OR: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_OR'),
			XOR: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_XOR'),
            XNOR: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_XNOR'),
			IMPLIES: RoboBlocks.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP_IMPLIES')											  
        };
		
		
        Blockly.Arduino.logic_negate = function() {
            // Negation.
            var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
            var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', order) || 'false';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += JST['logic_negate']({
                'argument0': argument0
            });

            //'!' + argument0;
            return [code, order];
        };


        Blockly.Blocks.logic_negate = {
            // Negation.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_LOGIC'),
            helpUrl: RoboBlocks.getHelpUrl('logic_negate'),
			examples: ['logic_negate_example.bly'],
			tags: ['logic'],							
			category_colour: RoboBlocks.LANG_COLOUR_LOGIC,	
			colour: RoboBlocks.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_NEGATE_INPUT_NOT','LANG_LOGIC_NEGATE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_LOGIC);
                this.setOutput(true, Boolean);
                this.appendValueInput('BOOL')
                    .setCheck(Boolean)
                    .appendField(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_INPUT_NOT'));
                this.setTooltip(RoboBlocks.locales.getKey('LANG_LOGIC_NEGATE_TOOLTIP'));
            }
        };

        Blockly.Arduino.math_arithmetic = function() {
            // Basic arithmetic operators, and power.
            var mode = this.getFieldValue('OP');
            var tuple = Blockly.Arduino.math_arithmetic.OPERATORS[mode];
            var operator = tuple[0];
            var order = tuple[1];
            var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];
            if (!operator) {
                code = JST['math_arithmetic_pow']({
                    'argument0': argument0,
                    'argument1': argument1
                });
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }
            code += JST['math_arithmetic']({
                'argument0': argument0,
                'argument1': argument1,
                'operator': operator
            });
            return [code, order];
        };

        Blockly.Arduino.math_arithmetic.OPERATORS = {
            ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
            MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
            MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
            DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
            POWER: [null, Blockly.Arduino.ORDER_NONE]
        };




        Blockly.Blocks.math_arithmetic = {
            // Basic arithmetic operator.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.getHelpUrl('math_arithmetic'),
			examples: ['math_arithmetic_example.bly'],
			tags: ['math'],		
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_ARITHMETIC_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_MATH);
                this.setOutput(true, Number);
                this.appendValueInput('A')
                    .setCheck(Number);
                this.appendValueInput('B')
                    .setCheck(Number)
                    .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
                this.setInputsInline(true);
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP'));
            }
        };

        Blockly.Blocks.math_arithmetic.OPERATORS = [
            ['+', 'ADD'],
            ['-', 'MINUS'],
            ['\u00D7', 'MULTIPLY'],
            ['\u00F7', 'DIVIDE'],
            ['^', 'POWER']
        ];

        Blockly.Blocks.math_arithmetic.TOOLTIPS = {
            ADD: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_ADD'),
            MINUS: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MINUS'),
            MULTIPLY: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_MULTIPLY'),
            DIVIDE: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_DIVIDE'),
            POWER: RoboBlocks.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP_POWER')
        };

        // Source: src/blocks/math_array/math_array.js

        // Source: src/blocks/math_modulo/math_modulo.js

        Blockly.Arduino.math_modulo = function() {
            // Remainder computation.
            var argument0 = Blockly.Arduino.valueToCode(this, 'DIVIDEND',
                Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
            var argument1 = Blockly.Arduino.valueToCode(this, 'DIVISOR',
                Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];
            a = RoboBlocks.findPinMode(argument1);
            code += a['code'];
            argument1 = a['pin'];
            code += JST['math_modulo']({
                'argument0': argument0,
                'argument1': argument1
            });

            //argument0 + ' % ' + argument1;
            return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
        };

        Blockly.Blocks.math_modulo = {
            // Remainder of a division.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.getHelpUrl('math_modulo'),
			examples: ['math_arithmetic_example.bly'],
			tags: ['math'],								
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_MODULO_TOOLTIP'],
            init: function() {
                this.setColour(this.colour);
                this.setOutput(true, Number);
                this.appendValueInput('DIVIDEND')
                    .setCheck(Number);
                this.appendValueInput('DIVISOR')
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField('%');
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_MODULO_TOOLTIP'));
            }
        };

        // Source: src/blocks/math_number/math_number.js

        Blockly.Arduino.math_number = function() {
            // Numeric value.
            var code = window.parseFloat(this.getFieldValue('NUM'));
            // -4.abs() returns -4 in Dart due to strange order of operation choices.
            // -4 is actually an operator and a number.  Reflect this in the order.
            var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
            return [code, order];
        };

        Blockly.Blocks.math_number = {
            // Numeric value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('math_number'),
			examples: ['math_number_example.bly'],
			tags: ['math'],					
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_NUMBER_TOOLTIP'],
            init: function() {
                this.setColour(this.colour);
                this.appendDummyInput()
                    .appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM');
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
            }
        };

        Blockly.Blocks.math_number.validator = function(text) {
            // Ensure that only a number may be entered.
            // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
            var n = window.parseFloat(text || 0);
            return window.isNaN(n) ? null : String(n);
        };

        // Source: src/blocks/math_random/math_random.js
        Blockly.Arduino.math_random = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];

            a = RoboBlocks.findPinMode(value_dmax);
            code += a['code'];
            value_dmax = a['pin'];
			
			Blockly.Arduino.definitions_['define_random_bitOut'] = JST['math_random_bitOut']({});
			Blockly.Arduino.definitions_['define_random_seedOut'] = JST['math_random_seedOut']({});
			
			Blockly.Arduino.setups_['setup_randomseed'] = 'unsigned long seed =seedOut(31);\n  randomSeed(seed);\n';
			
            code += JST['math_random']({
                'value_num': value_num,
                'value_dmax': value_dmax
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.math_random = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.getHelpUrl('math_random'),
			examples: ['math_random_example.bly'],
			tags: ['math'],							
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_ADVANCED_MATH_RANDOM','LANG_ADVANCED_MATH_RANDOM_AND','LANG_ADVANCED_MATH_RANDOM_TOOLTIP'],
            init: function() {
                this.setColour(this.colour);
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM'))
                    .setCheck(Number);
                this.appendValueInput('DMAX', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM_AND'))
                    .setCheck(Number);
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_RANDOM_TOOLTIP'));
            }
        };

	Blockly.Arduino.math_to_number = function() {
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
	    var dropdown_cast = this.getFieldValue('CAST') || '';
            var code = '';
	    code +='('+dropdown_cast+')('+value+')';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.math_to_number = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
			tags: ['math'],
            helpUrl: RoboBlocks.getHelpUrl('math_to_number'),
			examples: ['math_to_number_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_ADVANCED_MATH_CAST','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_FLOAT'],
            init: function() {
                this.setColour(this.colour);
                this.appendValueInput('VALUE')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_CAST')).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "CAST");
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_CAST_TOOLTIP'));
            }
        };

        // Source: src/blocks/math_single/math_single.js		 
		Blockly.Arduino.math_sinusoid = function() {
            var amplitude = Blockly.Arduino.valueToCode(this, 'AMPLITUDE', Blockly.Arduino.ORDER_NONE);
			var freq= Blockly.Arduino.valueToCode(this, 'FREQ', Blockly.Arduino.ORDER_NONE);
			var phase = Blockly.Arduino.valueToCode(this, 'PHASE', Blockly.Arduino.ORDER_NONE);
			var offset = Blockly.Arduino.valueToCode(this, 'OFFSET', Blockly.Arduino.ORDER_NONE);
			var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_NONE);
			var code='('+amplitude+')*sin((6.28318530717959e-06)*(('+freq+')*('+time+'))+0.017453292519943*('+phase+'))+'+'('+offset+')';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.math_sinusoid = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
			tags: ['math'],
            helpUrl: RoboBlocks.getHelpUrl('math_sinusoid'),
			examples: ['math_sinusoid_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_ADVANCED_MATH_SINUSOID','LANG_ADVANCED_MATH_SINUSOID_AMPLITUDE','LANG_ADVANCED_MATH_SINUSOID_FREQ','LANG_ADVANCED_MATH_SINUSOID_PHASE','LANG_ADVANCED_MATH_SINUSOID_OFFSET','LANG_ADVANCED_MATH_SINUSOID_TIME','LANG_ADVANCED_MATH_SINUSOID_TOOLTIP'],
            init: function() {
                this.setColour(this.colour);
                this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_SINUSOID')).setAlign(Blockly.Blocks.ALIGN_RIGHT);
				this.appendValueInput('AMPLITUDE').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_AMPLITUDE')).setAlign(Blockly.Blocks.ALIGN_RIGHT);
				this.appendValueInput('FREQ').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_FREQ')).setAlign(Blockly.Blocks.ALIGN_RIGHT);
				this.appendValueInput('PHASE').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_PHASE')).setAlign(Blockly.Blocks.ALIGN_RIGHT);
				this.appendValueInput('OFFSET').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_OFFSET')).setAlign(Blockly.Blocks.ALIGN_RIGHT);
				this.appendValueInput('TIME').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_TIME')).setAlign(Blockly.Blocks.ALIGN_RIGHT);
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_TOOLTIP'));
            }
        };

        Blockly.Arduino.math_single = function() {
            // Math operators with single operand.
            var operator = this.getFieldValue('OP');
            var arg;
            var code = '';
            var a;

            if (operator === 'NEG') {
                // Negation is a special case given its different operator precedents.
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '';
                a = RoboBlocks.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
                if (arg[0] === '-') {
                    // --3 is not legal in Dart.
                    arg = ' ' + arg;
                }
                code += '-' + arg;
                return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
            } else if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
                a = RoboBlocks.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
            } else if (operator === 'LOG10') {
                code = '';
            } else {
                arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
                a = RoboBlocks.findPinMode(arg);
                code += a['code'];
                arg = a['pin'];
            }
            var PI = 3.14159;
            // First, handle cases which generate values that don't need parentheses.
            switch (operator) {
                case 'ABS':
                    code += 'abs(' + arg + ')';
                    break;
                case 'ROOT':
                    code += 'sqrt(' + arg + ')';
                    break;
                case 'LN':
                    code += 'log(' + arg + ')';
                    break;
                case 'EXP':
                    code += 'exp(' + arg + ')';
                    break;
                case 'POW10':
                    code += 'pow(10,' + arg + ')';
                    break;
                case 'SIN':
                    code += 'sin(' + arg + ' / 180 * ' + PI + ')';
                    break;
                case 'COS':
                    code += 'cos(' + arg + ' / 180 * ' + PI + ')';
                    break;
                case 'TAN':
                    code += 'tan(' + arg + ' / 180 * ' + PI + ')';
                    break;
            }
            if (code) {
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }

            // Second, handle cases which generate values that may need parentheses.
            switch (operator) {
                case 'LOG10':
                    arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
                    a = RoboBlocks.findPinMode(arg);
                    code += a['code'];
                    arg = a['pin'];
                    code += 'log(' + arg + ') / log(10)';
                    break;
                case 'ASIN':
                    code += 'asin(' + arg + ') / ' + PI + ' * 180';
                    break;
                case 'ACOS':
                    code += 'acos(' + arg + ') / ' + PI + ' * 180';
                    break;
                case 'ATAN':
                    code += 'atan(' + arg + ') / ' + PI + ' * 180';
                    break;
                default:
                    throw 'Unknown math operator: ' + operator;
            }
            return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
        };


        Blockly.Blocks.math_single = {
            // Advanced math operators with single operand.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_MATH'),
            helpUrl: RoboBlocks.getHelpUrl('math_single'),
			examples: ['math_single_example.bly'],
			tags: ['math'],
			category_colour: RoboBlocks.LANG_COLOUR_MATH,
			colour: RoboBlocks.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_SINGLE_OP_ROOT','LANG_MATH_SINGLE_OP_ABSOLUTE','LANG_MATH_SINGLE_TOOLTIP_ROOT','LANG_MATH_SINGLE_TOOLTIP_ABS','LANG_MATH_SINGLE_TOOLTIP_NEG','LANG_MATH_SINGLE_TOOLTIP_LN','LANG_MATH_SINGLE_TOOLTIP_LOG10','LANG_MATH_SINGLE_TOOLTIP_EXP','LANG_MATH_SINGLE_TOOLTIP_POW10'],
            init: function() {
                this.setColour(this.colour);
                this.setOutput(true, Number);
                this.appendValueInput('NUM')
                    .setCheck(Number)
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_MATH_SINGLE_OP_ROOT') || 'SQR ROOT', 'ROOT'],
                        [RoboBlocks.locales.getKey('LANG_MATH_SINGLE_OP_ABSOLUTE') || 'ABS', 'ABS'],
                        ['-', 'NEG'],
                        ['ln', 'LN'],
                        ['log10', 'LOG10'],
                        ['e^', 'EXP'],
                        ['10^', 'POW10']
                    ]), 'OP');
                // Assign 'this' to a variable for use in the tooltip closure below.
                var thisBlock = this;
                this.setTooltip(function() {
                    var mode = thisBlock.getFieldValue('OP');
                    return Blockly.Blocks.math_single.TOOLTIPS[mode];
                });
            }
        };

        Blockly.Blocks.math_single.TOOLTIPS = {
            ROOT: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ROOT'),
            ABS: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_ABS'),
            NEG: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_NEG'),
            LN: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LN'),
            LOG10: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_LOG10'),
            EXP: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_EXP'),
            POW10: RoboBlocks.locales.getKey('LANG_MATH_SINGLE_TOOLTIP_POW10')
        };

        // Source: src/blocks/pin_analog/pin_analog.js
        Blockly.Arduino.pin_analog = function() {
            var pin = this.getFieldValue('PIN') || '';
            return [pin, Blockly.Arduino.ORDER_NONE];
        };

        Blockly.Blocks.pin_analog = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_ANALOG'),
            helpUrl: RoboBlocks.getHelpUrl('pin_analog'),
			examples: ['inout_analog_read_example.bly'],
			tags: ['input','output'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			keys: ['LANG_VARIABLES_PIN_ANALOG','LANG_VARIABLES_PIN_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
                this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",24*options.zoom, 24*options.zoom))
                    .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_ANALOG'))
                    .appendField(new Blockly.FieldDropdown(profiles.default.analog), 'PIN');

                this.setInputsInline(true);
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
            }
        };

        // Source: src/blocks/pin_digital/pin_digital.js
        Blockly.Arduino.pin_digital = function() {
            var pin = this.getFieldValue('PIN') || '';
            return [pin, Blockly.Arduino.ORDER_NONE];
        };

        Blockly.Blocks.pin_digital = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
            helpUrl: RoboBlocks.getHelpUrl('pin_digital'),
			examples: ['inout_digital_read_example.bly'],
			tags: ['input','output'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_VARIABLES_PIN_DIGITAL','LANG_VARIABLES_PIN_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL);
                this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/digital_signal.png",24*options.zoom, 24*options.zoom))
                    .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_DIGITAL'))
                    .appendField(new Blockly.FieldDropdown(profiles.default.digital), 'PIN');

                this.setInputsInline(true);
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
            }
        };

        Blockly.Arduino.pin_pwm = function() {
            var pin = this.getFieldValue('PIN') || '';
            return [pin, Blockly.Arduino.ORDER_NONE];
        };

        Blockly.Blocks.pin_pwm = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
            helpUrl: RoboBlocks.getHelpUrl('pin_pwm'),
			examples: ['inout_analog_write_example.bly'],
			tags: ['input','output'],			 
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_VARIABLES_PIN_PWM','LANG_VARIABLES_PIN_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_DIGITAL);
                this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",24*options.zoom, 24*options.zoom))
                    .appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_PWM'))
                    .appendField(new Blockly.FieldDropdown(profiles.default.pwm), 'PIN');

                this.setInputsInline(true);
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_available/serial_available.js
        Blockly.Arduino.serial_available = function() {
            var branch = Blockly.Arduino.statementToCode(this, 'DO');
            branch = branch.replace(/&quot;/g, '"');
            // branch=branch.replace(/&amp;/g, '');
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_parseint_setups']({
                'bitrate': profiles.default.serial
            });
            var code = JST['serial_available']({
                'branch': branch
            });
            return code;
        };

        Blockly.Blocks.serial_available = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
            helpUrl: RoboBlocks.getHelpUrl('serial_available'),
            tags: ['serial','communication'],
            examples: ['serial_available_example.bly'],  
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_AVAILABLE','LANG_CONTROLS_REPEAT_INPUT_DO','LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE')).appendField(new Blockly.FieldImage('img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
                this.appendStatementInput('DO')
                    .appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_parseint/serial_parseint.js

        Blockly.Arduino.serial_parseint = function() {
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_parseint_setups']({
                'bitrate': profiles.default.serial
            });
            var code = 'Serial.parseInt()'; // JST['serial_parseint']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.serial_parseint = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
            helpUrl: RoboBlocks.getHelpUrl('serial_parseint'),
            tags: ['serial','communication'],
            examples: ['logic_operation_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PARSEINT','LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT')).appendField(new Blockly.FieldImage('img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_print/serial_print.js
        Blockly.Arduino.serial_print = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(content);
            code += a['code'];
            content = a['pin'];
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_print_setups']({
                'bitrate': profiles.
                default.serial
            });
            code += JST['serial_print']({
                'content': content
            });
            return code;
        };

        Blockly.Blocks.serial_print = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
            helpUrl: RoboBlocks.getHelpUrl('serial_print'),
            tags: ['serial','communication'],
            examples: ['serial_print_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PRINT','LANG_ADVANCED_SERIAL_PRINT_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINT')).appendField(new Blockly.FieldImage('img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINT_TOOLTIP'));
            }
        };
        // Source: src/blocks/serial_println/serial_println.js
        Blockly.Arduino.serial_println = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(content);
            code += a['code'];
            content = a['pin'];
            Blockly.Arduino.setups_['setup_serial'] = JST['serial_println_setups']({
                'bitrate': profiles.
                default.serial
            });
            code += JST['serial_println']({
                'content': content
            });
            return code;
        };

        Blockly.Blocks.serial_println = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
            helpUrl: RoboBlocks.getHelpUrl('serial_println'),
            tags: ['serial','communication'],
            examples: ['serial_print_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PRINTLN','LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN')).appendField(new Blockly.FieldImage('img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP'));
            }
        };
        // Source: src/blocks/serial_read/serial_read.js

        Blockly.Arduino.serial_read = function() {

            Blockly.Arduino.setups_['setup_serial'] = JST['serial_read_setups']({
                'bitrate': profiles.default.serial
            });
            var code = JST['serial_read']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.serial_read = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
            helpUrl: RoboBlocks.getHelpUrl('serial_read'),
			examples: ['serial_read_example.bly'],
            tags: ['serial','communication'],
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_READ','LANG_ADVANCED_SERIAL_READ_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READ')).appendField(new Blockly.FieldImage('img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READ_TOOLTIP'));
            }
        };

        // Source: src/blocks/serial_readstring/serial_readstring.js

        Blockly.Arduino.serial_readstring = function() {

            Blockly.Arduino.setups_['setup_serial'] = JST['serial_readstring_setups']({
                'bitrate': profiles.default.serial
            });
            var code = JST['serial_readstring']({});

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.serial_readstring = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
            tags: ['serial','communication'],
            helpUrl: RoboBlocks.getHelpUrl('serial_readstring'),
            examples: ['serial_readstring_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_READSTRING','LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING')).appendField(new Blockly.FieldImage('img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'));
            }
        };

	// Source: src/blocks/advanced_conversion/advanced_conversion.js

        Blockly.Arduino.advanced_conversion = function() {
            var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
            var code = '';
            var a = RoboBlocks.findPinMode(value_num);
            code += a['code'];
            value_num = a['pin'];


            var convertion = this.getFieldValue('CONV');
            code += JST['advanced_conversion']({
                'value_num': value_num,
                'convertion': convertion
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.advanced_conversion = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
            tags: ['serial','communication'],
            helpUrl: RoboBlocks.getHelpUrl('advanced_conversion'),
            examples: ['advanced_conversion_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_CONVERSION_CONVERT','LANG_ADVANCED_CONVERSION_DECIMAL','LANG_ADVANCED_CONVERSION_HEXADECIMAL','LANG_ADVANCED_CONVERSION_OCTAL','LANG_ADVANCED_CONVERSION_BINARY','LANG_ADVANCED_CONVERSION_VALUE','LANG_ADVANCED_CONVERSION_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_CONVERT'))
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_DECIMAL') || 'DEC', 'DEC'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_HEXADECIMAL') || 'HEX', 'HEX'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_OCTAL') || 'OCT', 'OCT'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_BINARY') || 'BIN', 'BIN']
                    ]), 'CONV');
                this.appendValueInput('NUM', Number)
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_VALUE'))
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .setCheck(Number);
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_CONVERSION_TOOLTIP'));
            }
        };
		Blockly.Arduino.serial_timeout = function() {
            var timeout = Blockly.Arduino.valueToCode(this, 'TIMEOUT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            Blockly.Arduino.setups_['setup_serial_timeout'] = 'Serial.setTimeout('+timeout+');\n';
            return code;
        };

        Blockly.Blocks.serial_timeout = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_USB'),
			tags: ['serial','communication'],
            helpUrl: RoboBlocks.getHelpUrl('serial_timeout'),
			category_colour: RoboBlocks.LANG_COLOUR_COMMUNICATION,
			colour: RoboBlocks.LANG_COLOUR_COMMUNICATION_USB,
            tags: ['serial'],
            examples: ['serial_read_example.bly'],
			keys: ['LANG_ADVANCED_SERIAL_TIMEOUT','LANG_ADVANCED_SERIAL_TIMEOUT_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_COMMUNICATION_USB);
                this.appendValueInput('TIMEOUT', Number).appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_TIMEOUT')).appendField(new Blockly.FieldImage('img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_TIMEOUT_TOOLTIP'));
            }
        };
        // Source: src/blocks/serial_special/serial_special.js

        Blockly.Arduino.serial_special = function() {
            var code = '\''+this.getFieldValue('CHAR')+'\'';
											  
							
			   
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.serial_special = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('serial_special'),
            tags: ['serial'],
			examples: ['serial_special_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,
			keys: ['LANG_ADVANCED_SERIAL_SPECIAL','LANG_ADVANCED_SERIAL_SPECIAL_TAB','LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN','LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED','LANG_ADVANCED_SERIAL_SPECIAL_QUOTE','LANG_ADVANCED_SERIAL_SPECIAL_DOUBLE_QUOTE','LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput('')
                    .appendField(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL'))
                    .appendField(new Blockly.FieldDropdown([
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TAB') || 'TAB', '\\t'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN') || 'CARRIAGE RETURN', '\\r'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED') || 'LINE FEED', '\\n'],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_QUOTE') || 'QUOTE', "\\'"],
                        [RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_DOUBLE_QUOTE') || 'DOUBLE_QUOTE', '\\"']
                    ]), 'CHAR');
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP'));
            }
        };


        Blockly.Arduino.text = function() {
            // Text value.
            var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text = {
            // Text value.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text'),
			examples: ['controls_setupLoop_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,		
			keys: ['LANG_TEXT_TEXT_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField('"')
                    .appendField(new Blockly.FieldTextInput(''), 'TEXT')
                    .appendField('"');
                this.setOutput(true, String);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_TEXT_TOOLTIP'));
            }
        };

        // Source: src/blocks/text_append/text_append.js

        Blockly.Arduino.text_append = function() {
            // Append to a variable in place.
            var varName = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
            var argument0 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';

            var code = '';

            var a = RoboBlocks.findPinMode(varName);
            code += a['code'];
            varName = a['pin'];
            a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += varName + ' += String(' + argument0 + ');\n';
            return code;
        };
        Blockly.Blocks.text_append = {
            // Append to a variable in place.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text_append'),
			examples: ['text_append_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,	
			keys: ['LANG_TEXT_APPEND_TO','LANG_TEXT_APPEND_APPENDTEXT','LANG_TEXT_APPEND_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('VAR')
                    // .appendField(new Blockly.FieldVariable(' '), 'VAR')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TO'));
                this.appendValueInput('TEXT').appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setInputsInline(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            getVariables: function() {
                var variables = Blockly.Variables.allUsedVariables;
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                // if (!this.last_variables){
                //     this.last_variables=Blockly.Variables.allUsedVariables;
                // }
                // var variables=Blockly.Variables.allUsedVariables;
                // for (var i in variables){
                //     if (Blockly.Variables.allUsedVariables[i]!==this.last_variables[i]){
                //         try{
                //             this.removeInput('TEXT');
                //             this.appendValueInput('TEXT')
                //                 .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_TO'))
                //                 .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                //                 .appendField(RoboBlocks.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT'));
                //             this.setInputsInline(true);
                //         }catch(e){}
                //         this.last_variables=Blockly.Variables.allUsedVariables;
                //     }
                // }
            }
        };
        // Source: src/blocks/text_equalsIgnoreCase/text_equalsIgnoreCase.js

        Blockly.Arduino.text_equalsIgnoreCase = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
            string1 = string1.replace(/&quot;/g, '"');
            var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
            string2 = string2.replace(/&quot;/g, '"');

            var code = '';

            var a = RoboBlocks.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];

            a = RoboBlocks.findPinMode(string2);
            code += a['code'];
            string2 = a['pin'];

            code += JST['text_equalsIgnoreCase']({
                'string1': string1,
                'string2': string2
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_equalsIgnoreCase = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text_equalsIgnoreCase'),
			examples: ['text_equalsIgnoreCase_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,	
			keys: ['LANG_TEXT_EQUALSIGNORECASE_EQUAL','LANG_TEXT_EQUALSIGNORECASE_QUESTION','LANG_TEXT_EQUALSIGNORECASE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING1');
                this.appendValueInput('STRING2')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_EQUAL'))
                    .setAlign(Blockly.ALIGN_RIGHT);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_QUESTION'));

                this.setInputsInline(true);

                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_TOOLTIP'));
            }
        };
        // Source: src/blocks/text_join/text_join.js

        Blockly.Arduino.text_join = function() {
            // Create a string made up of any number of elements of any type.
            var code = '';
            var a;
            //console.log('this.itemCount_', this.itemCount_);
            if (this.itemCount_ === 0) {
                return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
            } else if (this.itemCount_ === 1) {
                var argument0 = Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
                a = RoboBlocks.findPinMode(argument0);
                code += a['code'];
                argument0 = a['pin'];

                code += 'String(' + argument0 + ')';
                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            } else {
                var i = (Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE) || '');
                //console.log('Blockly.Arduino.valueToCode(this, ADD0, Blockly.Arduino.ORDER_NONE)', Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE));
                a = RoboBlocks.findPinMode(i);
                code = a['code'];
                i = a['pin'];

                var final_line = 'String(' + i;
                //console.log('iteration 0', '\ncode: ', code, '\nfinal_line: ', final_line, '\nb', i);

                for (var n = 1; n < this.itemCount_; n++) {
                    i = (Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE) || '');
                    //console.log('Blockly.Arduino.valueToCode(this, ADDn, Blockly.Arduino.ORDER_NONE)', Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE));
                    a = RoboBlocks.findPinMode(i);
                    code += a['code'];
                    i = a['pin'];
                    final_line += ') + String(' + i;
                    //console.log('iteration', n, '\ncode: ', code, '\nfinal_line: ', final_line, '\nb', i);
                }


                code += final_line + ')';

                return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
            }
        };

        Blockly.Blocks.text_join = {
            // Create a string made up of any number of elements of any type.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
			helpUrl: RoboBlocks.getHelpUrl('text_join'),
			examples: ['text_join_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,	
			keys: ['LANG_TEXT_JOIN_Field_CREATEWITH','LANG_TEXT_JOIN_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('ADD0')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                this.appendValueInput('ADD1');
                this.setOutput(true, String);
                this.setMutator(new Blockly.Mutator(['text_create_join_item']));
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_TOOLTIP'));
                this.itemCount_ = 2;
            },
            mutationToDom: function() {
                var container = document.createElement('mutation');
                container.setAttribute('items', this.itemCount_);
                return container;
            },
            domToMutation: function(xmlElement) {
                for (var x = 0; x < this.itemCount_; x++) {
                    this.removeInput('ADD' + x);
                }
                this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
                for (x = 0; x < this.itemCount_; x++) {
                    var input = this.appendValueInput('ADD' + x);
                    if (x === 0) {
                        input.appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                    }
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote0.png', 12, 12))
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote1.png', 12, 12));
                }
            },
            decompose: function(workspace) {
                var containerBlock = workspace.newBlock('text_create_join_container');
                containerBlock.initSvg();
                var connection = containerBlock.getInput('STACK').connection;
                for (var x = 0; x < this.itemCount_; x++) {
                    var itemBlock = workspace.newBlock('text_create_join_item');
                    itemBlock.initSvg();
                    connection.connect(itemBlock.previousConnection);
                    connection = itemBlock.nextConnection;
                }
                return containerBlock;
            },
            compose: function(containerBlock) {
                // Disconnect all input blocks and remove all inputs.
                if (this.itemCount_ === 0) {
                    this.removeInput('EMPTY');
                } else {
                    for (var x = this.itemCount_ - 1; x >= 0; x--) {
                        this.removeInput('ADD' + x);
                    }
                }
                this.itemCount_ = 0;
                // Rebuild the block's inputs.
                var itemBlock = containerBlock.getInputTargetBlock('STACK');
                while (itemBlock) {
                    var input = this.appendValueInput('ADD' + this.itemCount_);
                    if (this.itemCount_ === 0) {
                        input.appendField(RoboBlocks.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
                    }
                    // Reconnect any child blocks.
                    if (itemBlock.valueConnection_) {
                        input.connection.connect(itemBlock.valueConnection_);
                    }
                    this.itemCount_++;
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
                if (this.itemCount_ === 0) {
                    this.appendDummyInput('EMPTY')
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote0.png', 12, 12))
                        .appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
                            'media/quote1.png', 12, 12));
                }
            },
            saveConnections: function(containerBlock) {
                // Store a pointer to any connected child blocks.
                var itemBlock = containerBlock.getInputTargetBlock('STACK');
                var x = 0;
                while (itemBlock) {
                    var input = this.getInput('ADD' + x);
                    itemBlock.valueConnection_ = input && input.connection.targetConnection;
                    x++;
                    itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
                }
            }
        };

        Blockly.Blocks.text_create_join_container = {
            // Container.
			colour: RoboBlocks.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CREATE_JOIN_TITLE_JOIN','LANG_TEXT_CREATE_JOIN_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TITLE_JOIN'));
                this.appendStatementInput('STACK').setCheck('text_join');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
                this.contextMenu = false;
            }
        };

        Blockly.Blocks.text_create_join_item = {
            // Add items.
			colour: RoboBlocks.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM','LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendDummyInput()
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM'));
                this.setPreviousStatement(true,'text_join');
                this.setNextStatement(true,'text_join');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
                this.contextMenu = false;
            }
        };



        // Source: src/blocks/text_length/text_length.js

        Blockly.Arduino.text_length = function() {
            // String length.
            var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
            var code = '';
            var a = RoboBlocks.findPinMode(argument0);
            code += a['code'];
            argument0 = a['pin'];

            code += JST['text_length']({
                'argument0': argument0
            });

            return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
        };

        Blockly.Blocks.text_length = {
            // String length.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text_length'),
			examples: ['text_length_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_LENGTH_INPUT_LENGTH','LANG_TEXT_LENGTH_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('VALUE')
                    .setCheck([String, Array])
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_LENGTH_INPUT_LENGTH'));
                this.setOutput(true, Number);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_LENGTH_TOOLTIP'));
            }
        };
        // Source: src/blocks/text_substring/text_substring.js
        Blockly.Arduino.text_substring = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
            var from = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_NONE);
            var to = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_NONE);
            var code = '';
            var a = RoboBlocks.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];

            a = RoboBlocks.findPinMode(from);
            code += a['code'];
            from = a['pin'];

            a = RoboBlocks.findPinMode(to);
            code += a['code'];
            to = a['pin'];

            code += JST['text_substring']({
                'string1': string1,
                'from': from,
                'to': to
            });

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_substring = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
            tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text_substring'),
			examples: ['text_substring_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,	
			keys: ['LANG_TEXT_SUBSTRING','LANG_TEXT_SUBSTRING_FROM','LANG_TEXT_SUBSTRING_TO','LANG_TEXT_SUBSTRING_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING1')
                    // .setCheck(String)
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING'));

                this.appendValueInput('FROM')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_FROM'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);

                this.appendValueInput('TO')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_TO'))
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT);
                // this.appendDummyInput()
                //     .appendField(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_QUESTION'));

                this.setInputsInline(true);

                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_TOOLTIP'));
            }
        };

			Blockly.Arduino.text_search = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
			var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
            var position = this.getFieldValue('POSITION');
            var code = '';
            var a = RoboBlocks.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];
			
			a = RoboBlocks.findPinMode(string2);
            code += a['code'];
            string2 = a['pin'];
			
			if (position==='FIRST')
			{
				code = string2+'.indexOf('+string1+')';
			}
			else
			{
				code = string2+'.lastIndexOf('+string1+')';
			}

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_search = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text_search'),
			examples: ['text_search_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,	
			keys: ['LANG_TEXT_SEARCH','LANG_TEXT_IN','LANG_TEXT_FIRST','LANG_TEXT_LAST','LANG_TEXT_SEARCH_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING1').appendField(RoboBlocks.locales.getKey('LANG_TEXT_SEARCH'));
                this.appendValueInput('STRING2').appendField(RoboBlocks.locales.getKey('LANG_TEXT_IN'));
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[RoboBlocks.locales.getKey('LANG_TEXT_FIRST'),'FIRST'],[RoboBlocks.locales.getKey('LANG_TEXT_LAST'),'LAST']]),'POSITION');
                this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_SEARCH_TOOLTIP'));
            }
        };
		
		Blockly.Arduino.text_contains = function() {
            var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
			var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
            var code = '';
            var a = RoboBlocks.findPinMode(string1);
            code += a['code'];
            string1 = a['pin'];
			
			a = RoboBlocks.findPinMode(string2);
            code += a['code'];
            string2 = a['pin'];
			
			code = '('+string2+'.indexOf('+string1+')>0)';

            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_contains = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text_contains'),
			examples: ['text_contains_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,	
			keys: ['LANG_TEXT_CONTAINS','LANG_TEXT_EXPRESSION','LANG_TEXT_CONTAINS_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('STRING2').appendField(RoboBlocks.locales.getKey('LANG_TEXT_CONTAINS'));
                this.appendValueInput('STRING1').appendField(RoboBlocks.locales.getKey('LANG_TEXT_EXPRESSION'));
				this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_CONTAINS_TOOLTIP'));
            }
        };
		
	Blockly.Arduino.text_to_text = function() {
            var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
	    var dropdown_cast = this.getFieldValue('CAST') || '';
            var code = '';
            if (dropdown_cast=='char')
	      code +='('+dropdown_cast+')('+value+')';
            else
              code +='String('+value+')';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.text_to_text = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
            helpUrl: RoboBlocks.getHelpUrl('text_to_text'),
			examples: ['text_to_text_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_TEXT,
			colour: RoboBlocks.LANG_COLOUR_TEXT,	
			keys: ['LANG_TEXT_CAST','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_CHAR'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_TEXT);
                this.appendValueInput('VALUE')
                    .appendField(RoboBlocks.locales.getKey('LANG_TEXT_CAST')).appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_CHAR'),'char']
                ]), "CAST");
                //this.setInputsInline(true);
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_TEXT_SUBSTRING_TOOLTIP'));
            }
        };

        // Source: src/blocks/variables_get/variables_get.js

        Blockly.Arduino.variables_get = function() {
            // Variable setter.
            var varName = this.getFieldValue('VAR') || '';
            if (RoboBlocks.variables[this.getFieldValue('VAR')] !== undefined) {
                this.var_type = RoboBlocks.variables[this.getFieldValue('VAR')][0];
            }
            return [varName, Blockly.Arduino.ORDER_ATOMIC];
        };
        Blockly.Blocks.variables_get = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('variables_get'),
			tags: ['variables'],
			examples: ['variables_example.bly'],							  
			category_colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			colour: RoboBlocks.LANG_COLOUR_VARIABLES,	
			keys: ['LANG_VARIABLES_GET','LANG_VARIABLES_GET_TOOLTIP','LANG_VARIABLES_CALL_WITHOUT_DEFINITION'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendDummyInput('DUMMY').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GET'))
					.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                    //.appendField(new Blockly.FieldVariable(' '), 'VAR');
                this.setOutput(true);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                 if (!this.workspace) {
                     // Block has been deleted.
                     return;
                 }
				 
                 this.last_variable=this.getFieldValue('VAR');
                 if (!this.last_variables){
                     this.last_variables=Blockly.Variables.allVariables();
                 }
                 var variables=Blockly.Variables.allVariables();
                 for (var i in variables){
                     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
						 this.getInput('DUMMY').removeField('VAR');
						 this.getInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
                         this.setFieldValue(this.last_variable, 'VAR');
                         this.last_variables=Blockly.Variables.allVariables();
                     }
                 }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };
		
		Blockly.Arduino.variables_set = function() {
            // Variable setter.
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];


            code += JST['variables_set']({
                'varName': varName,
                'varValue': varValue
            });
            return code;
        };
        Blockly.Blocks.variables_set = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('variables_set'),
			tags: ['variables'],
			examples: ['variables_example.bly'],	
			category_colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			colour: RoboBlocks.LANG_COLOUR_VARIABLES,		
			keys: ['LANG_VARIABLES_SET','LANG_VARIABLES_SET_AS','LANG_VARIABLES_SET_TOOLTIP','LANG_VARIABLES_CALL_WITHOUT_DEFINITION'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_SET'))
                    // .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR')
                    .appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_SET_AS')).setAlign(Blockly.ALIGN_RIGHT);
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_SET_TOOLTIP'));
            },
            getVariables: function() {
                var variables = Blockly.Variables.allVariables();
                var dropdown = [];
                if (variables.length > 0) {
                    for (var i in variables) {
                        dropdown.push([variables[i], variables[i]]);
                    }
                } else {
                    dropdown.push(['', '']);
                }
                return dropdown;
            },
            onchange: function() {
                if (!this.workspace) {
                    // Block has been deleted.
                    return;
                }
				this.last_field_value=this.getFieldValue('VAR');
                if (!this.last_variables){
                    this.last_variables=Blockly.Variables.allVariables();
                }
                var variables=Blockly.Variables.allVariables();
                for (var i in variables){
                     if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
						 this.getInput('VALUE').removeField('VAR');
						 this.new_field=new Blockly.FieldDropdown(this.getVariables());
						 this.new_field.setValue(this.last_field_value);
						 this.getInput('VALUE').insertFieldAt(1,this.new_field,'VAR');
						 //this.getInput('VALUE').insertFieldAt(1,this.last_field,'VAR');
                         this.last_variables=Blockly.Variables.allVariables();
                     }
                 }
                try {
                    if (!this.exists()) {
                        this.setWarningText(RoboBlocks.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
                    } else {
                        this.setWarningText(null);
                    }
                } catch (e) {}
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setTitleValue(newName, 'VAR');
                }
            },
            exists: function() {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
                        return true;
                    }
                }
                return false;
            }
        };
        
        // Source: src/blocks/variables_local/variables_local.js
        Blockly.Arduino.variables_local = function() {
            // Variable setter.
            var varType;
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var sufix = '';
            var code = '';
            var isFunction = false;


            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];


            for (var i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                    isFunction = true;
                    break;
                }
            }
            if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
                varType = 'String';
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            } else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
                for (i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                        if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                            if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                varType = 'int *';
                            } else {
                                varType = 'int';
                            }
                        } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                            varType = 'String';
                        } else {
																																										
															
									
														  
							 
						  
	  
			
                            varType = '';
                        }
                        code += varType + ' ' + varName + '=' + varValue + ';\n';
                    }
                }
            } else if (varValue[0] === '{') {
                varType = 'int *';
                varValue = varValue.replace('{', '');
                varValue = varValue.replace('}', '');
                varValue = varValue.split(',');
                code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                // code += varType + varName + ';\n';
                code += varName + '[0]=' + varValue[0] + ';\n' + varName + '[1]=' + varValue[1] + ';\n' + varName + '[2]=' + varValue[2] + ';\n';
            } else if (this.isVariable(varValue)) {
                varType = RoboBlocks.variables[varValue][0];
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            } else if (varValue.search('readJoystick') >= 0) {
                varType = 'int *';
                code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                code += varName + '=' + varValue + ';\n';
            } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue))) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                varType = 'int';
                code += varType + ' ' + varName + sufix + '=' + varValue + ';\n';
            } else {
                varType = 'unknown';
                code += varType + ' ' + varName + '=' + varValue + ';\n';
            }

            RoboBlocks.variables[varName] = [varType, 'local'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'local'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

            return code;
        };
        Blockly.Blocks.variables_local = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('variables_local'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			colour: RoboBlocks.LANG_COLOUR_VARIABLES,	
			keys: ['LANG_VARIABLES_LOCAL','LANG_VARIABLES_LOCAL_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: function(varValue) {
                for (var i in Blockly.Variables.allVariables()) {
                    if (Blockly.Variables.allVariables()[i] === varValue) {
                        return true;
                    }
                }
                return false;
            },
            validName: function(name) {
                if (name && name.length > 0) {
                    var i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    name = name.replace(/([ ])/g, '_');
                    name = name.replace(/([áàâä])/g, 'a');
                    name = name.replace(/([éèêë])/g, 'e');
                    name = name.replace(/([íìîï])/g, 'i');
                    name = name.replace(/([óòôö])/g, 'o');
                    name = name.replace(/([úùûü])/g, 'u');
                    name = name.replace(/([ñ])/g, 'n');
                    name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
                    i = 0;
                    while (i < name.length) {
                        if (!isNaN(parseFloat(name[i]))) {
                            name = name.substring(1, name.length);
                        } else {
                            break;
                        }
                    }
                    for (var j in Blockly.Arduino.RESERVED_WORDS_) {
                        var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
                        if (name === reserved_words[j]) {
                            this.setWarningText('Reserved word');
                            name = '';
                            break;
                        } else {
                            this.setWarningText(null);
                        }
                    }
                }
                return name;
            },
            onchange: function() {
                if (this.last_variable !== this.getFieldValue('VAR')) {
                    var name = this.getFieldValue('VAR');
                    name = this.validName(name);
                    try {
                        this.setFieldValue(name, 'VAR');
                    } catch (e) {}
                    this.last_variable = name;
                }
            }
        };
        // Source: src/blocks/variables_local_type/variables_local_type.js
        Blockly.Arduino.variables_local_type = function() {
            // Variable setter.
            var varType = this.getFieldValue('VAR_TYPE');
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];

            code += varType + ' ' + varName + '=' + varValue + ';\n';

            RoboBlocks.variables[varName] = [varType, 'local'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'local'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'local'];

            return code;
        };
        Blockly.Blocks.variables_local_type = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('variables_local_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			colour: RoboBlocks.LANG_COLOUR_VARIABLES,	
			keys: ['LANG_VARIABLES_LOCAL','LANG_VARIABLES_LOCAL_TYPE','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_LOCAL_TOOLTIP2'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP2'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: Blockly.Blocks.variables_local.isVariable,
            validName: Blockly.Blocks.variables_local.validName,
			onchange: Blockly.Blocks.variables_local.onchange
        };
		
		// Source: src/blocks/variables_global/variables_global.js
        Blockly.Arduino.variables_global = function() {
            // Variable setter.
            var varType;
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var isFunction = false;

            var a = RoboBlocks.findPinMode(varValue);
            Blockly.Arduino.setups_['pinMode' + varValue] = a['code'];
            varValue = a['pin'];

            for (var i in Blockly.Arduino.definitions_) {
                if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
                    isFunction = true;
                    break;
                }
            }
            if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
                varType = 'String';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';';
            } else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
                for (i in Blockly.Arduino.definitions_) {
                    if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
                        if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
                            if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
                                varType = 'int *';
                            } else {
                                varType = 'int';
                            }
                        } else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
                            varType = 'String';
                        } else {
                            varType = '';
                        }
                        Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                        Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
                        break;
                    }
                }
            } else if (varValue[0] === '{') {
                varType = 'int *';
                varValue = varValue.replace('{', '');
                varValue = varValue.replace('}', '');
                varValue = varValue.split(',');
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                // Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '[0]=' + varValue[0] + ';\n  ' + varName + '[1]=' + varValue[1] + ';\n  ' + varName + '[2]=' + varValue[2] + ';\n';
            } else if (this.isVariable(varValue)) {
                varType = RoboBlocks.variables[varValue][0];
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            } else if (varValue.search('readJoystick') >= 0) {
                varType = 'int *';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue)) || (varValue.search('random') >= 0)) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                varType = 'int';
                if (!isNaN(parseFloat(varValue))) {
                    Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';\n';
                } else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
                    Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                    Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
                }
            } else {
                varType = 'unknown';
                Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
                Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
            }
            RoboBlocks.variables[varName] = [varType, 'global'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'global'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

            return '';
        };
        Blockly.Blocks.variables_global = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('variables_global'),
			tags: ['variables'],
			examples: ['variables_example.bly'],	
			category_colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			colour: RoboBlocks.LANG_COLOUR_VARIABLES,	
			keys: ['LANG_VARIABLES_GLOBAL','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_GLOBAL_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
			isVariable: Blockly.Blocks.variables_local.isVariable,
            validName: Blockly.Blocks.variables_local.validName,
            onchange: Blockly.Blocks.variables_local.onchange
        };
        // Source: src/blocks/variables_global_type/variables_global_type.js
        Blockly.Arduino.variables_global_type = function() {
            // Variable setter.
            var varType = this.getFieldValue('VAR_TYPE');
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var isFunction = false;

            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];

            Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';

            RoboBlocks.variables[varName] = [varType, 'global'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'global'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

            return '';
        };

        Blockly.Blocks.variables_global_type = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('variables_global_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			colour: RoboBlocks.LANG_COLOUR_VARIABLES,	
			keys: ['LANG_VARIABLES_GLOBAL','LANG_VARIABLES_GLOBAL_TYPE','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_GLOBAL_TOOLTIP2'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP2'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: Blockly.Blocks.variables_local.isVariable,
            onchange: Blockly.Blocks.variables_local.onchange,
			validName: Blockly.Blocks.variables_local.validName
        };
		
        
		Blockly.Arduino.variables_global_volatile_type = function() {
            // Variable setter.
            var varType = this.getFieldValue('VAR_TYPE');
            var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
            var varName = this.getFieldValue('VAR') || '';
            var isFunction = false;

            var varName = this.getFieldValue('VAR') || '';
            var code = '';

            var a = RoboBlocks.findPinMode(varValue);
            code += a['code'];
            varValue = a['pin'];

            Blockly.Arduino.definitions_['declare_var' + varName] = 'volatile ' + varType + ' ' + varName + ';\n';
            Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';

            RoboBlocks.variables[varName] = ['volatile ' + varType, 'global'];
            RoboBlocks.variables['analogRead(' + varName + ')'] = [varType, 'global'];
            RoboBlocks.variables['digitalRead(' + varName + ')'] = [varType, 'global'];

            return '';
        };

        Blockly.Blocks.variables_global_volatile_type = {
            // Variable setter.
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
            helpUrl: RoboBlocks.getHelpUrl('variables_global_volatile_type'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			colour: RoboBlocks.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_GLOBAL_VOLATILE','LANG_VARIABLES_GLOBAL_TYPE','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_GLOBAL_VOLATILE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_VARIABLES);
                this.appendValueInput('VALUE').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_VOLATILE')).
                appendField(new Blockly.FieldTextInput(''), 'VAR').
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
                appendField(new Blockly.FieldDropdown([
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
                    [RoboBlocks.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
                ]), "VAR_TYPE").
                appendField(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS'));
                this.setInputsInline(false);
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_VARIABLES_GLOBAL_VOLATILE_TOOLTIP'));
            },
            getVars: function() {
                return [this.getFieldValue('VAR')];
            },
            renameVar: function(oldName, newName) {
                if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
                    this.setFieldValue(newName, 'VAR');
                }
            },
            isVariable: Blockly.Blocks.variables_local.isVariable,
            onchange: Blockly.Blocks.variables_local.onchange,
			validName: Blockly.Blocks.variables_local.validName
        };		

		// Source: src/blocks/controls_execute/controls_execute.js
        Blockly.Arduino.controls_execute = function() {
            var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            content = content.replace(/^"/, '');
            content = content.replace(/"$/g, '');
            if (content.match(/^#include /)) {
                var include_code = JST['controls_execute']({
                    'content': content
                });
                if ('define_include' in Blockly.Arduino.definitions_) {
                    Blockly.Arduino.definitions_['define_include'] += include_code;
                } else {
                    Blockly.Arduino.definitions_['define_include'] = include_code;
                }
            } else {
                code += JST['controls_execute']({
                    'content': content
                });
            }
            return code;
        };

        Blockly.Blocks.controls_execute = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
            helpUrl: RoboBlocks.getHelpUrl('controls_execute'),
			examples: ['controls_execute_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_CONTROL,
			colour: RoboBlocks.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_EXECUTE','LANG_CONTROLS_EXECUTE_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_CONTROL);
                this.appendValueInput('CONTENT', String).appendField(RoboBlocks.locales.getKey('LANG_CONTROLS_EXECUTE'));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_CONTROLS_EXECUTE_TOOLTIP'));
            }
        };
		
		Blockly.Arduino.inout_spi_begin = function() {
            var baudrate = Blockly.Arduino.valueToCode(this, 'BAUDRATE', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>\n';
            var code = 'SPI.beginTransaction(SPISettings('+baudrate+','+this.getFieldValue('ORDER')+','+ this.getFieldValue('MODE')+'));\n'
            return code;
        };

        Blockly.Blocks.inout_spi_begin = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','spi'],
            helpUrl: RoboBlocks.getHelpUrl('inout_spi_begin'),
			examples: ['inout_spi_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_SPI_BEGIN','LANG_SPI_BAUDRATE','LANG_SPI_BEGIN_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendValueInput('BAUDRATE').appendField(RoboBlocks.locales.getKey('LANG_SPI_BEGIN')).appendField(RoboBlocks.locales.getKey('LANG_SPI_BAUDRATE')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([['MSB','MSBFIRST'],['LSB','LSBFIRST']]),'ORDER').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([['MODE0','SPI_MODE0'],['MODE1','SPI_MODE1'],['MODE2','SPI_MODE2'],['MODE3','SPI_MODE3']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(false, null);
				this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_SPI_BEGIN_TOOLTIP'));
            }
        };
		
		Blockly.Arduino.inout_spi_transfer = function() {
			var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
			var mode = this.getFieldValue('MODE');
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>\n';
			var code ='';
			if (mode==='1')
				code += 'SPI.transfer('+data+');\n';
			else if (mode==='2')
				code += 'SPI.transfer16('+data+');\n';
            return code;
        };

        Blockly.Blocks.inout_spi_transfer = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','spi'],
            helpUrl: RoboBlocks.getHelpUrl('inout_spi_transfer'),
			examples: ['inout_spi_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_SPI_TRANSFER','LANG_SPI_TRANSFER_ONE_BYTE','LANG_SPI_TRANSFER_TWO_BYTES','LANG_SPI_TRANSFER_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendValueInput('DATA').appendField(RoboBlocks.locales.getKey('LANG_SPI_TRANSFER')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				//this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2'],[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_BUFFER'),'3']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(false,null);
				this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
				this.setInputsInline(false);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_TOOLTIP'));
            }
        };

		Blockly.Arduino.inout_spi_transfer_recv = function() {
			var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
			var mode = this.getFieldValue('MODE');
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>\n';
			var code ='';
			if (mode==='1')
				code += 'SPI.transfer('+data+')';
			else if (mode==='2')
				code += 'SPI.transfer16('+data+')';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.inout_spi_transfer_recv = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','spi'],
            helpUrl: RoboBlocks.getHelpUrl('inout_spi_transfer_recv'),
			examples: ['inout_spi_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,	
			keys: ['LANG_SPI_TRANSFER','LANG_SPI_TRANSFER_ONE_BYTE','LANG_SPI_TRANSFER_TWO_BYTES','LANG_SPI_TRANSFER_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendValueInput('DATA').appendField(RoboBlocks.locales.getKey('LANG_SPI_TRANSFER')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				//this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2'],[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_BUFFER'),'3']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setPreviousStatement(false,'code');
                this.setNextStatement(false,'code');
				this.setInputsInline(false);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_SPI_TRANSFER_TOOLTIP'));
            }
        };
		
		Blockly.Arduino.inout_spi_end = function() {
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>\n';
            var code = 'SPI.endTransaction();\n';
            return code;
        };

        Blockly.Blocks.inout_spi_end = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','spi'],
            helpUrl: RoboBlocks.getHelpUrl('inout_spi_end'),
			examples: ['inout_spi_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,	
			keys: ['LANG_SPI_END','LANG_SPI_END_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_SPI_END'));
				this.setOutput(false, null);
				this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_SPI_END_TOOLTIP'));
            }
        };
		
		
		
		/*Blockly.Arduino.inout_spi_interrupt = function() {
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>\n';
            var code = 'SPI.usingInterrupt('+this.getFieldValue('INTERRUPT')+');\n';
            return code;
        };

        Blockly.Blocks.inout_spi_interrupt = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','spi'],
            helpUrl: RoboBlocks.getHelpUrl('inout_spi_interrupt'),
			examples: [],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,	
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendDummyInput('').appendField(RoboBlocks.locales.getKey('LANG_SPI_INTERRUPT')).appendField(new Blockly.FieldDropdown([['2','2'],['3','3']]),'INTERRUPT');
				this.setOutput(false, null);
				this.setPreviousStatement(true,'code');
                this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_SPI_INTERRUPT_TOOLTIP'));
            }
        };*/
		
        Blockly.Arduino.button = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
		    'pullup': 'INPUT'
                });
            } else {
                Blockly.Arduino.setups_['setup_button_' + dropdown_pin] = JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
		    'pullup': 'INPUT'
                });
            }
            code += JST['bq_button']({
                'dropdown_pin': dropdown_pin,
            });
            // console.log('code',code);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.button = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','button'],
            helpUrl: RoboBlocks.getHelpUrl('button'),
			examples: ['button_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_BQ_BUTTON','LANG_BQ_BUTTON_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_BQ_BUTTON')).appendField(new Blockly.FieldImage('img/blocks/pushbutton.png', 52*options.zoom, 24*options.zoom)).setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BUTTON_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.png', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
                this.setOutput(true, Boolean);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BUTTON_TOOLTIP'));
            }
        };

        Blockly.Arduino.button_case = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

	    if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
		    'pullup': 'INPUT'
                });
            } else {
                Blockly.Arduino.setups_['setup_button_' + dropdown_pin] = JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
		    'pullup': 'INPUT'
                });
            }

	    var code_pressed = '';
	    var code_not_pressed = '';
	    code_pressed += Blockly.Arduino.statementToCode(this, 'PRESSED');
            code_not_pressed += Blockly.Arduino.statementToCode(this, 'NOT_PRESSED');

	    code_pressed = code_pressed.replace(/&quot;/g, '"');
            code_not_pressed = code_not_pressed.replace(/&quot;/g, '"');

            code += 'if ('+JST['bq_button']({
                'dropdown_pin': dropdown_pin,
            })+'==LOW){\n'+code_pressed+'\n}\nelse{\n'+code_not_pressed+'\n}\n';
            // console.log('code',code);
            return code;
        };
        Blockly.Blocks.button_case = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','button'],
            helpUrl: RoboBlocks.getHelpUrl('button_case'),
			examples: ['button_case_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_BQ_BUTTON','LANG_BQ_BUTTON_PIN','LANG_BUTTON_PRESSED','LANG_BUTTON_NOT_PRESSED','LANG_BQ_BUTTON_TOOLTIP'],
            //bq_button initialization
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_BQ_BUTTON')).appendField(new Blockly.FieldImage('img/blocks/pushbutton.png', 52*options.zoom, 24*options.zoom)).setCheck(Number).appendField(RoboBlocks.locales.getKey('LANG_BQ_BUTTON_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.png', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
                this.setOutput(false, null);
		this.appendStatementInput('PRESSED')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(RoboBlocks.locales.getKey('LANG_BUTTON_PRESSED'));
                this.appendStatementInput('NOT_PRESSED')
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(RoboBlocks.locales.getKey('LANG_BUTTON_NOT_PRESSED'));
                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_BUTTON_TOOLTIP'));
            }
        };

        Blockly.Arduino.zum_button = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
				
													   
			pullup='INPUT_PULLUP';
		 
									
            if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
					'pullup': pullup
                });
            } else {
                Blockly.Arduino.setups_['setup_button_' + dropdown_pin] = JST['zum_button_setups']({
                    'dropdown_pin': dropdown_pin,
		    'pullup': pullup
                });
			}
            code += JST['zum_button']({
                'dropdown_pin': dropdown_pin,
            });
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.zum_button = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','button'],
            helpUrl: RoboBlocks.getHelpUrl('zum_button'),
            examples: ['zum_button_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_ZUM_BUTTON','LANG_ZUM_BUTTON_PIN','LANG_ZUM_BUTTON_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_ZUM_BUTTON')).appendField(RoboBlocks.locales.getKey('LANG_ZUM_BUTTON_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.png', 24*options.zoom, 24*options.zoom));
		this.appendDummyInput().appendField('pull-up?').appendField(new Blockly.FieldCheckbox('FALSE'), 'PULLUP').setAlign(Blockly.ALIGN_RIGHT);
                this.setOutput(true, Boolean);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ZUM_BUTTON_TOOLTIP'));
				this.setInputsInline(false);
            }
        };

		Blockly.Arduino.joystick_dir = function() {
            var pinx = Blockly.Arduino.valueToCode(this, 'PINX', Blockly.Arduino.ORDER_ATOMIC);
            var piny = Blockly.Arduino.valueToCode(this, 'PINY', Blockly.Arduino.ORDER_ATOMIC);
																										 
            var code = '';

            var a = RoboBlocks.findPinMode(pinx);
            code += a['code'];
            pinx = a['pin'];

            a = RoboBlocks.findPinMode(piny);
            code += a['code'];
            piny = a['pin'];
            code = '57.295779513082320876798154814105*atan2((float)(analogRead('+pinx+')-512),(float)(analogRead('+piny+')-512))';
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.joystick_dir = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['joystick'],
            helpUrl: RoboBlocks.getHelpUrl('joystick_dir'),
            examples: ['joystick_dir_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_BQ_JOYSTICK_DIR','LANG_BQ_JOYSTICK_PIN_X','LANG_BQ_JOYSTICK_PIN_Y','LANG_BQ_JOYSTICK_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_DIR')).appendField(new Blockly.FieldImage('img/blocks/joystick.png', 52*options.zoom, 24*options.zoom));										 
                this.appendValueInput('PINX').appendField(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_PIN_X')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);
                this.appendValueInput('PINY').appendField(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_PIN_Y')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);
                this.setOutput(true, Number);
                // this.setPreviousStatement(true, null);
                // this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_TOOLTIP'));
            }
        };
		
		Blockly.Arduino.joystick_mag = function() {
            var pinx = Blockly.Arduino.valueToCode(this, 'PINX', Blockly.Arduino.ORDER_ATOMIC);
            var piny = Blockly.Arduino.valueToCode(this, 'PINY', Blockly.Arduino.ORDER_ATOMIC);
            var code = '';
            var a = RoboBlocks.findPinMode(pinx);
            code += a['code'];
            pinx = a['pin'];

            a = RoboBlocks.findPinMode(piny);
            code += a['code'];
            piny = a['pin'];
            code = 'min(100,0.1953125*sqrt(pow((float)(analogRead('+pinx+')-512),2)+pow((float)(analogRead('+piny+')-512),2)))';  
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.joystick_mag = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['joystick'],
            helpUrl: RoboBlocks.getHelpUrl('joystick_mag'),
            examples: ['joystick_dir_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_BQ_JOYSTICK_MAG','LANG_BQ_JOYSTICK_PIN_X','LANG_BQ_JOYSTICK_PIN_Y','LANG_BQ_JOYSTICK_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendDummyInput().appendField(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_MAG')).appendField(new Blockly.FieldImage('img/blocks/joystick.png', 52*options.zoom, 24*options.zoom));
                this.appendValueInput('PINX').appendField(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_PIN_X')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);
                this.appendValueInput('PINY').appendField(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_PIN_Y')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);																		   
                this.setOutput(true, Number);
                // this.setPreviousStatement(true, null);
                // this.setNextStatement(true, null);
                this.setTooltip(RoboBlocks.locales.getKey('LANG_BQ_JOYSTICK_TOOLTIP'));
            }
        };
        // Source: src/blocks/zum_piezo_buzzerav/zum_piezo_buzzerav.js

        Blockly.Arduino.zum_piezo_buzzerav = function() {
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
            var Buzztone = Blockly.Arduino.valueToCode(this, 'TONE', Blockly.Arduino.ORDER_ATOMIC);
            var delay_time = Blockly.Arduino.valueToCode(this, 'DURA', Blockly.Arduino.ORDER_ATOMIC);

            var code = '';
            var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];

            a = RoboBlocks.findPinMode(Buzztone);
            code += a['code'];
            Buzztone = a['pin'];

            a = RoboBlocks.findPinMode(delay_time);
            code += a['code'];
            delay_time = a['pin'];

            code += JST['zum_piezo_buzzerav']({
                'dropdown_pin': dropdown_pin,
                'Buzztone': Buzztone,
                'delay_time': delay_time
            });

            return code;
        };

        Blockly.Blocks.zum_piezo_buzzerav = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_BUZZER'),
            tags: ['buzzer'],
            helpUrl: RoboBlocks.getHelpUrl('zum_piezo_buzzerav'),
			examples: ['zum_piezo_buzzerav_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_SOUND,
			colour: RoboBlocks.LANG_COLOUR_SOUND_BUZZER,
			keys: ['LANG_ZUM_PIEZO_BUZZERAV','LANG_ZUM_PIEZO_BUZZERAV_PIN','LANG_ZUM_PIEZO_BUZZERAV_TONE','LANG_ZUM_PIEZO_BUZZERAV_DURATION','LANG_ZUM_PIEZO_BUZZERAV_TOOLTIP'],
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_SOUND_BUZZER);
                this.appendValueInput('PIN')
                    .appendField(RoboBlocks.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV'))
                    .appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom))
                    .appendField(RoboBlocks.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_PIN'));
                this.appendValueInput('TONE', Number)
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(RoboBlocks.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_TONE'));

                this.appendValueInput('DURA', Number)
                    .setCheck(Number)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(RoboBlocks.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_DURATION'));

                this.setPreviousStatement(true,'code');
                this.setNextStatement(true,'code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_TOOLTIP'));
            }
        };

	Blockly.Arduino.dyor_31_in_1_rele = function() {
            var code = '';
            var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
	    var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
	    var a = RoboBlocks.findPinMode(dropdown_pin);
            code += a['code'];
            dropdown_pin = a['pin'];
			
			if (RoboBlocks.isVariable(dropdown_pin)) {
                code += JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin
                });
			} else {
				Blockly.Arduino.setups_['setup_green_digital_write_' + dropdown_pin] = JST['inout_digital_write_setups']({
                    'dropdown_pin': dropdown_pin
                });
			}

            code += JST['inout_digital_write']({
                'dropdown_pin': dropdown_pin,
		'dropdown_stat': value
            });

            //  code=code.substring(0,code.length-1);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
        };

        Blockly.Blocks.dyor_31_in_1_rele = {
            category: RoboBlocks.locales.getKey('LANG_CATEGORY_ADVANCED'),	
			subcategory: RoboBlocks.locales.getKey('LANG_SUBCATEGORY_OTHER'),
            tags: ['input','output','rele'],
            helpUrl: RoboBlocks.getHelpUrl('dyor_31_in_1_rele'),
			examples: ['dyor_31_in_1_relay_example.bly'],
			category_colour: RoboBlocks.LANG_COLOUR_ADVANCED,
			colour: RoboBlocks.LANG_COLOUR_ADVANCED_OTHER,
			keys: ['LANG_RELE','LANG_RELE_VALUE','LANG_RELE_TOOLTIP'],
            //rele initialization
            init: function() {
                this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED_OTHER);
                this.appendValueInput('PIN').appendField(RoboBlocks.locales.getKey('LANG_RELE')).appendField(new Blockly.FieldImage('img/blocks/relays.png', 52*options.zoom, 24*options.zoom)).appendField(RoboBlocks.locales.getKey('LANG_RELE_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.png",24*options.zoom,24*options.zoom)).setCheck(Number);
		this.appendValueInput('VALUE', Boolean).setCheck(Boolean).setAlign(Blockly.ALIGN_RIGHT).appendField(RoboBlocks.locales.getKey('LANG_RELE_VALUE'));
                this.setPreviousStatement('code');
                this.setNextStatement('code');
                this.setTooltip(RoboBlocks.locales.getKey('LANG_RELE_TOOLTIP'));
            }
        };
        return Blockly.Blocks;
    }
    var RoboBlocks = {
        load: load
    };
    if (typeof define === 'function' && define.amd) {
        return RoboBlocks;
    } else {
        window.RoboBlocks = RoboBlocks;
    }
}));
