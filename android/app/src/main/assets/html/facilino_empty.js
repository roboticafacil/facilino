/*All rights reserved Robótica Fácil*/

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
    } else {
        factory(_, window.Blockly, window.Blocks);
    }
}(function(_, Blockly, Blocks) {
    var load = function(options) {
		
		Facilino.getHelpUrl = function (block) {
			return '<script>$(function(){var file = "doc/"+roboblocksLanguage+"/'+block+'.html"; $.ajax({url:file,async:false,type:"HEAD",error: function(){file="doc/en-GB/'+block+'.html";},success: function(){}}); $("#doc").load(file);});</script>';
		}
		
        Facilino.locales = {
            defaultLanguage: {},
            languages: []
        };
        Facilino.locales.getLang = function() {
            return this.defaultLanguage.lngCode;
        };
        Facilino.locales.getKey = function(key) {
            return this.defaultLanguage[key];
        };
        Facilino.locales.setDefaultLang = function(langCode) {
            for (var i in this.languages) {
                if (this.languages[i].langCode === langCode) {
                    this.defaultLanguage = this.languages[i].values;
                    this.defaultLanguage.lngCode = langCode;
                }
            }
        };
        Facilino.locales.add = function(langCode, values) {
            if (!langCode) {
                return this.defaultLanguage;
            }
            if (langCode && !values) {
                if (!this.languages[langCode]) {
                    throw new Error('Unknown language : ' + langCode);
                }
                //this.defaultLanguage = langCode;
            }
            if (values || !this.languages[langCode]) {
                this.languages.push({
                    langCode: langCode,
                    values: values
                });
            }
            return this;
        };
        Facilino.locales.initialize = function() {
            var lang = options.lang || window.roboblocksLanguage || 'en-GB';
            this.setDefaultLang(lang);
            return this;
        };

        // Source: lang/ca-ES.js
        (function() {
            var language = {
                LANG_CATEGORY_BLOCKS: 'Bloqs'
            };
            // Node
            if (typeof module !== 'undefined' && module.exports) {
                module.exports = language;
            }
            // Browser
            // if (typeof window !== 'undefined' && this.Facilino && this.Facilino.locales.add) {
            //     this.Facilino.locales.add('es', language);
            if (typeof window !== 'undefined' && Facilino && Facilino.locales.add) {
                Facilino.locales.add('ca-ES', language);
            }
        }());

        // Source: lang/en-GB.js
        (function() {
            var language = {
                LANG_CATEGORY_BLOCKS: 'Blocks',
				LANG_CATEGORY_DISTANCE: 'Distance',
				LANG_CATEGORY_SOUND: 'Sound',
				LANG_CATEGORY_MOVEMENT: 'Movement',
				LANG_CATEGORY_SCREEN: 'Screen',
				LANG_CATEGORY_CONTROL: 'Control',
				LANG_CATEGORY_LOGIC: 'Logic',
				LANG_CATEGORY_MATH: 'Math',
				LANG_CATEGORY_TEXT: 'Text',
				LANG_CATEGORY_COMMUNICATION: 'Communication',
				LANG_CATEGORY_ADVANCED: 'Advanced',
				LANG_CATEGORY_VARIABLES: 'Variables',
				LANG_CATEGORY_PROCEDURES: 'Procedures',
				LANG_CATEGORY_LIGHT: 'Light',
				LANG_CATEGORY_AMBIENT: 'Ambient',
				LANG_CATEGORY_HTML: 'HTML',
				LANG_CATEGORY_OTHER: 'Other',
				LANG_COLOUR_BLOCKS: '#FF00FF',
				LANG_COLOUR_DISTANCE: '#D04141',
				LANG_COLOUR_SOUND: '#CC7B44',
				LANG_COLOUR_MOVEMENT: '#CECE42',
				LANG_COLOUR_SCREEN: '#ACCE42',
				LANG_COLOUR_CONTROL: '#44CC44',
				LANG_COLOUR_LOGIC: '#42CE91',
				LANG_COLOUR_MATH: '#42CBCE',
				LANG_COLOUR_TEXT: '#42A3CE',
				LANG_COLOUR_COMMUNICATION: '#4263CE',
				LANG_COLOUR_ADVANCED: '#9142CE',
				LANG_COLOUR_VARIABLES: '#B244CC',
				LANG_COLOUR_PROCEDURES: '#CE42B3',
				LANG_COLOUR_LIGHT: '#FF8A00',
				LANG_COLOUR_AMBIENT: '#99CCFF',
				LANG_COLOUR_HTML: '#BDBDBD',
				LANG_COLOUR_OTHER: '#000000'
            };
            // Node
            if (typeof module !== 'undefined' && module.exports) {
                module.exports = language;
            }
            // Browser
            // if (typeof window !== 'undefined' && this.Facilino && this.Facilino.locales.add) {
            //     this.Facilino.locales.add('en', language);
            if (typeof window !== 'undefined' && Facilino && Facilino.locales.add) {
                Facilino.locales.add('en-GB', language);
            }
        }());

        // Source: lang/es-ES.js
        (function() {
            var language = {
                LANG_CATEGORY_BLOCKS: 'Blocks'
            };
            // Node
            if (typeof module !== 'undefined' && module.exports) {
                module.exports = language;
            }
            // Browser
            // if (typeof window !== 'undefined' && this.Facilino && this.Facilino.locales.add) {
            //     this.Facilino.locales.add('es', language);
            if (typeof window !== 'undefined' && Facilino && Facilino.locales.add) {
                Facilino.locales.add('es-ES', language);
            }
        }());
            

        // Source: src/constants.js
        /* global Facilino, Blockly*/
        Facilino.locales.initialize();
        Facilino.variables = {};
        Facilino.isVariable = function(varValue) {
            for (var i in Blockly.Variables.allUsedVariables) {
                if (Blockly.Variables.allUsedVariables[i] === varValue) {
                    return true;
                }
            }
            if (Facilino.variables[varValue] !== undefined) {
                return true;
            }
            if (varValue.search('digitalRead\\(') >= 0 || varValue.search('analogRead\\(') >= 0) {
                return true;
            }
            return false;
        };

            // RGB block colors
		Facilino.LANG_COLOUR_BLOCKS = '#FF00FF';
        Facilino.LANG_COLOUR_DISTANCE = '#D04141';
        Facilino.LANG_COLOUR_SOUND = '#CC7B44';
        Facilino.LANG_COLOUR_MOVEMENT = '#CECE42';
        Facilino.LANG_COLOUR_SCREEN = '#ACCE42';
        Facilino.LANG_COLOUR_CONTROL = '#44CC44';
        Facilino.LANG_COLOUR_LOGIC = '#42CE91';
        Facilino.LANG_COLOUR_MATH = '#42CBCE';
        Facilino.LANG_COLOUR_TEXT = '#42A3CE';
        Facilino.LANG_COLOUR_COMMUNICATION = '#4263CE';
        Facilino.LANG_COLOUR_ADVANCED = '#9142CE';
        Facilino.LANG_COLOUR_VARIABLES = '#B244CC';
        Facilino.LANG_COLOUR_PROCEDURES = '#CE42B3';
		//Facilino.LANG_COLOUR_COLOUR ='#9FD388';
		Facilino.LANG_COLOUR_LIGHT= '#FF8A00';
		Facilino.LANG_COLOUR_AMBIENT = '#99CCFF';
		Facilino.LANG_COLOUR_HTML = '#BDBDBD';
		Facilino.LANG_COLOUR_OTHER = '#000000';

        return Blockly.Blocks;
    }

var Facilino = {
        load: load
    };
    if (typeof define === 'function' && define.amd) {
        return Facilino;
    } else {
        window.Facilino = Facilino;
    }
}));