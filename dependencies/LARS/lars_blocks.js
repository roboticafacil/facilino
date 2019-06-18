Facilino.LANG_COLOUR_MOVEMENT = '#CECE42';
Facilino.LANG_COLOUR_MOVEMENT_WALK = '#8D8D25';

Blockly.Blocks['LARS_init'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WALK'),
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: Facilino.LANG_COLOUR_MOVEMENT_WALK,
				helpUrl: Facilino.getHelpUrl('LARS_init'),
				tags: [],
				examples: [],
				init: function () {
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/LARS.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_ROBOT'));
					this.appendValueInput('FRH').appendField(new Blockly.FieldImage('img/blocks/LARS_FRH.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FRH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('BRH').appendField(new Blockly.FieldImage('img/blocks/LARS_BRH.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BRH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('BLH').appendField(new Blockly.FieldImage('img/blocks/LARS_BLH.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BLH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('FLH').appendField(new Blockly.FieldImage('img/blocks/LARS_FLH.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FLH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('FRL').appendField(new Blockly.FieldImage('img/blocks/LARS_FRL.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FRL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('BRL').appendField(new Blockly.FieldImage('img/blocks/LARS_BRL.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BRL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('BLL').appendField(new Blockly.FieldImage('img/blocks/LARS_BLL.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BLL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('FLL').appendField(new Blockly.FieldImage('img/blocks/LARS_FLL.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FLL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setColour(Facilino.LANG_COLOUR_MOVEMENT_WALK);
					this.setTooltip(Facilino.locales.getKey('LANG_LARS_INIT_TOOLTIP'));
				}
			};

Blockly.Arduino['LARS_init'] = function(block) {
			  var code='';
			  var input_FRH = Blockly.Arduino.valueToCode(this,'FRH',Blockly.Arduino.ORDER_ATOMIC) || '26';
			  var input_FLH = Blockly.Arduino.valueToCode(this,'FLH',Blockly.Arduino.ORDER_ATOMIC) || '25';
			  var input_BRH = Blockly.Arduino.valueToCode(this,'BRH',Blockly.Arduino.ORDER_ATOMIC) || '17';
			  var input_BLH = Blockly.Arduino.valueToCode(this,'BLH',Blockly.Arduino.ORDER_ATOMIC) || '16';
			  var input_FRL = Blockly.Arduino.valueToCode(this,'FRL',Blockly.Arduino.ORDER_ATOMIC) || '27';
			  var input_FLL = Blockly.Arduino.valueToCode(this,'FLL',Blockly.Arduino.ORDER_ATOMIC) || '5';
			  var input_BRL = Blockly.Arduino.valueToCode(this,'BRL',Blockly.Arduino.ORDER_ATOMIC) || '23';
			  var input_BLL = Blockly.Arduino.valueToCode(this,'BLL',Blockly.Arduino.ORDER_ATOMIC) || '13';
			  Blockly.Arduino.definitions_['define_lars_h'] = '#include <LARS.h>';
			  Blockly.Arduino.definitions_['declare_var_define_lars']='LARS lars;\n';
			  Blockly.Arduino.setups_['setup_lars_init'] = 'lars.init('+input_FRH+','+input_FLH+','+input_BRH+','+input_BLH+','+input_FRL+','+input_FLL+','+input_BRL+','+input_BLL+');\n';
			  return code;
			};

Blockly.Arduino['LARS_movement'] = function() {
				var code='';
				var movement = this.getFieldValue('MOVEMENT');
				if (movement==='0')
					code+='lars.home();\n';
				else if (movement==='1')
					code+='lars.hello();\n';
				else if (movement==='2')
					code+='lars.wave('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+');\n';
				else if (movement==='3')
					code+='lars.turnL('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='4')
					code+='lars.turnR('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='5')
					code+='lars.moonwalk('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '5000')+');\n';
				else if (movement==='6')
					code+='lars.dance('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='7')
					code+='lars.upDown('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '5000')+');\n';
				else if (movement==='8')
					code+='lars.pushUp('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='9')
					code+='lars.walk('+this.getFieldValue('FIELD3')+','+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '800')+');\n';
				else if (movement==='10')
					code+='lars.omniWalk('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '800')+','+this.getFieldValue('FIELD3')+','+(Blockly.Arduino.valueToCode(this, 'INP4', Blockly.Arduino.ORDER_ATOMIC) || '0')+');\n';
				return code;
			}

			Blockly.Blocks['LARS_movement'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WALK'),
				tags: [],
				helpUrl: Facilino.getHelpUrl('LARS_movement'),
				examples: [],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: Facilino.LANG_COLOUR_MOVEMENT_WALK,
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_MOVEMENT_WALK);
					var movement = new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_HOME'),'0'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_HELLO'),'1'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_WAVE'),'2'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_LEFT'),'3'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_RIGHT'),'4'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_MOONWALK'),'5'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_DANCE'),'6'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_UPDOWN'),'7'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_PUSHUP'),'8'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_WALK'),'9'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_OMNIWALK'),'10']
					]);
				this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/LARS.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT'));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_MOVEMENT')).appendField(movement,'MOVEMENT').setAlign(Blockly.ALIGN_RIGHT);
				this.last_movement = -1;
				this._inp1_removed = true;
				this._inp2_removed = true;
				this._inp3_removed = true;
				this._inp4_removed = true;
				this.checkMovement();
				this.last_movement = this.getFieldValue('MOVEMENT');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
				this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_LARS_MOVEMENT_TOOLTIP'));
				},
				checkMovement: function() {
				var _movement = this.getFieldValue('MOVEMENT');
					try {
							if (_movement<10)
							{
								this._inp4_removed=true;
								this.removeInput('INP4');
							}
					} catch (e) {}
					try {
							if (_movement<9)
							{
								this._inp3_removed=true;
								this.removeInput('INP3');
							}
					} catch (e) {}
					try {
							if (_movement<3)
							{
								this._inp2_removed=true;
								this.removeInput('INP2');
							}
					} catch (e) {}
					try {
						if (_movement<2)
							{
								this._inp1_removed=true;
								this.removeInput('INP1');
							}
					} catch (e) {}	
					if ( _movement === '2') {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_LEG_NUMBER'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_LEG_NUMBER'),'TEXT1');}catch (e) {}	
					} else if (( _movement >= '3')&&( _movement <= '8')) {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1');}catch (e) {}	
						if (this._inp2_removed)
						{
							this.appendValueInput('INP2').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD','TEXT2')).setAlign(Blockly.ALIGN_RIGHT);
							this._inp2_removed=false;
						}
						else 
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2');}catch (e) {}	
					} else if ( _movement === '9') {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1');}catch (e) {}
						if (this._inp2_removed)
						{
							this.appendValueInput('INP2').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2').setAlign(Blockly.ALIGN_RIGHT);
							this._inp2_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2');}catch (e) {}	
						if (this._inp3_removed)
						{
							this.appendDummyInput('INP3').appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_DIR'),'TEXT3').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_LARS_MOVEMENT_FORWARD'),'0'],[Facilino.locales.getKey('LANG_LARS_MOVEMENT_BACKWARD'),'1']]),'FIELD3').setAlign(Blockly.ALIGN_RIGHT);
							this._inp3_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_DIR'),'TEXT3'); this.getInput('INP3').removeField('FIELD3'); this.getInput('INP3').appendField(new Blockly.FieldDropdown([['Forward','0'],['Backward','1']]),'FIELD3');}catch (e) {}	
					}
					else if ( _movement === '10') {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1');}catch (e) {}
						if (this._inp2_removed)
						{
							this.appendValueInput('INP2').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2').setAlign(Blockly.ALIGN_RIGHT);
							this._inp2_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2');}catch (e) {}
						if (this._inp3_removed)
						{
							this.appendDummyInput('INP3').appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_DIR'),'TEXT3').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_LARS_MOVEMENT_YES'),'true'],[Facilino.locales.getKey('LANG_LARS_MOVEMENT_NO'),'false']]),'FIELD3').setAlign(Blockly.ALIGN_RIGHT);
							this._inp3_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_SIDE'),'TEXT3'); this.getInput('INP3').removeField('FIELD3'); this.getInput('INP3').appendField(new Blockly.FieldDropdown([['Yes','true'],['No','false']]),'FIELD3');}catch (e) {}
						if (this._inp4_removed)
						{
							this.appendValueInput('INP4').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_FACTOR'),'TEXT4').setAlign(Blockly.ALIGN_RIGHT);
							this._inp4_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_FACTOR'),'TEXT4');}catch (e) {}
						
					}
				},
				onchange: function() {
					if (this.getFieldValue('MOVEMENT') !== this.last_movement) {
						this.checkMovement();
						this.last_movement = this.getFieldValue('MOVEMENT');
					}
				}
			};