function openFunction(bly) {
    $.ajax({type: "GET",url: bly,dataType: "xml" , async: false,success: function(xml) {
			var txt = new XMLSerializer().serializeToString(xml);
			Blockly.mainWorkspace.clear();
			var xmlDOM = Blockly.Xml.textToDom(txt);
			Blockly.Xml.domToWorkspace(xmlDOM,Blockly.getMainWorkspace());
        }
    });
}

function getCircuitHTML(name)
{
	var html_code='';
	if (name===undefined)
	{	html_code='<div class="not_circuit">No valid circuit was found for the current selected processor.</div>';
		return html_code;
	}
	if (name.components.length>0)
	{
		html_code+='<h5>Components</h5>';
		html_code+='<ul>';
		name.components.forEach(function (item,index){
			if (item.url!==undefined)
				html_code+='<li class="components"><a href="'+item.url+'" target="_blank">'+item.name+'</a></li>';
			else
				html_code+='<li class="components">'+item.name+'</li>';
		});
		html_code+='</ul>';
	}
	html_code+='<h5>Breadboard circuit</h5>';
	html_code+='<image src="doc/circuits/'+name.image+'" width="100%"></image>';
	if (name.connections.length>0)
	{
		html_code+='<h5>Connections</h5>';
		html_code+='<ul>';
		name.connections.forEach(function (item,index){
			html_code+='<li class="connections">'+item+'</li>';
		});
		html_code+='</ul>';
	}
	return html_code;
}

function getExampleHTML(name)
{
	var html_code='';
	html_code+='<p class=\'components\'>'+examples[name].desc+'</p>';
	if (examples[name].circuit[RoboBlocks.profiles['processor']].code_modifier)
	{
		html_code+='<div class="button_wrapper"><p class="warning">Click first on the workspace area to get the focus.</p><p><button align="center" class="button" style="cursor: pointer;" onClick="openFunction(\'doc/examples/'+name+'_'+examples[name].circuit[RoboBlocks.profiles['processor']].code_modifier+'.bly\')">Open</button></p><p class=\'components\'>Be careful, all changes will be lost!</p></div>';
	}
	else
	{
		html_code+='<div class="button_wrapper"><p class="warning">Click first on the workspace area to get the focus.</p><p><button align="center" class="button" style="cursor: pointer;" onClick="openFunction(\'doc/examples/'+name+'.bly\')">Open</button></p><p class=\'components\'>Be careful, all changes will be lost!</p></div>';
	}
	return html_code;
}

function showExample(num,total)
{
	var i=1;
	for (i=1;i<=total;i++)
	{
		if (i===num)
			document.getElementById('example'+i).style.display='block';
		else
			document.getElementById('example'+i).style.display='none';
	}
}

function createExamples(names)
{
	/*var ref = document.getElementById('examples');
	var myExampleList=document.createElement('div');
	ref.appendChild(myExampleList);
	if (names.length>1)
	{
	var html_code='';
	html_code+='<h4>Examples</h4><ol class="examples">';
	names.forEach(function(name,num){
		html_code+='<li><button onclick=\'showExample('+(num+1)+','+names.length+');\'>Show</button></li>';
	});
	html_code+='</ol>';
	myExampleList.innerHTML=html_code;
	}*/
	names.forEach(function(name,num){
		createExample(name,num+1,names.length);
	});
	//showExample(1,names.length);
}

function createExample(name,num,total)
{
	var myExample=document.createElement('div');
	var ref = document.getElementById('examples');
	if (total>1)
	{
		myExample.innerHTML='<h4>Example '+num+': '+examples[name].title+'</h4>';
		myExample.id='example'+num;
	}
	else
		myExample.innerHTML='<h4>Example: '+examples[name].title+'</h4>';
	ref.appendChild(myExample);
	var myExampleDesc=document.createElement('div');
	myExampleDesc.innerHTML=getExampleHTML(name);
	myExample.appendChild(myExampleDesc);
	if (examples[name].grafcet)
	{
		var myExampleGrafcet=document.createElement('div');
		var myExampleGrafcetHeader=document.createElement('h5');
		myExampleGrafcetHeader.innerHTML='Grafcet';
		myExampleGrafcet.appendChild(myExampleGrafcetHeader);
		var myExampleGrafcetImg=document.createElement('img');
		myExampleGrafcetImg.src='doc/common/'+examples[name].grafcet;
		myExampleGrafcetImg.title=examples[name].grafcet;
		myExampleGrafcetImg.alt=examples[name].grafcet;
		myExampleGrafcet.appendChild(myExampleGrafcetImg);
		myExample.appendChild(myExampleGrafcet);
	}

	var myExampleCircuit=document.createElement('div');
	myExampleCircuit.innerHTML=getCircuitHTML(examples[name].circuit[RoboBlocks.profiles['processor']]);
	myExample.appendChild(myExampleCircuit);
	var myExampleFacilino=document.createElement('div');
	var myExampleCodeHeader=document.createElement('h5');
	myExampleCodeHeader.innerHTML='Facilino';
	myExampleFacilino.appendChild(myExampleCodeHeader);
	var myExampleCode=document.createElement('div');
	myExampleFacilino.appendChild(myExampleCode);
	myExample.appendChild(myExampleFacilino);

	if (examples[name].circuit[RoboBlocks.profiles['processor']].code_modifier)
	{
		var mainWorkspace = Blockly.inject(myExampleCode, {readOnly:true, collapse: false});
    //console.log('doc/examples/'+name+'_'+examples[name].circuit[RoboBlocks.profiles['processor']].code_modifier+'.bly');
    openFunction('doc/examples/'+name+'_'+examples[name].circuit[RoboBlocks.profiles['processor']].code_modifier+'.bly');
	}
	else
	{
		var mainWorkspace = Blockly.inject(myExampleCode, {readOnly:true, collapse: false});
		openFunction('doc/examples/'+name+'.bly');
	}
	var bbox = mainWorkspace.svgBlockCanvas_.getBBox();
	myExampleCode.style.height = (bbox.height+25)+ 'px';
	myExampleCode.style.width = (bbox.width+25)+ 'px';
	window.dispatchEvent(new Event('resize'));
	/*var myExampleList=document.createElement('div');
	var html_code='';
	var i=1;
	for (i=1;i<=total;i++)
	{
		if (i!==num)
			html_code+='<button class="button_wrapper" onclick=\'showExample('+i+','+total+');\'>Example '+i+'</button>';
	};
	html_code+='';
	myExampleList.innerHTML=html_code;
	myExample.appendChild(myExampleList);*/
}

var components={};
components['ArduinoNano']={};
components['ArduinoNano'].name='Arduino Nano v3.0';
components['ArduinoNano'].url='https://roboticafacil.es/prod/arduino-nano3/';

components['ArduinoNanoShield']={};
components['ArduinoNanoShield'].name='Arduino Nano expansion shield';
components['ArduinoNanoShield'].url='https://roboticafacil.es/prod/arduino-nano-io-extension-shield/';

components['NodeMCU']={};
components['NodeMCU'].name='NodeMCU';
components['NodeMCU'].url='https://roboticafacil.es/prod/nodemcu-v3-esp8266-wifi/';

components['NodeMCUShield']={};
components['NodeMCUShield'].name='NodeMCU shield';
components['NodeMCUShield'].url='https://roboticafacil.es/prod/shield-nodemcu-v3/';

components['WemosD1R32']={};
components['WemosD1R32'].name='Wemos D1 R32';
components['WemosD1R32'].url='https://roboticafacil.es/prod/wemos-esp32/';

components['ArduinoSensorShield']={};
components['ArduinoSensorShield'].name='Arduino sensor shield v5';
components['ArduinoSensorShield'].url='https://roboticafacil.es/prod/i-o-extension-shield-para-arduino-uno-wemos-esp32/';

components['ArduinoLeonardo']={};
components['ArduinoLeonardo'].name='Arduino Leonardo';
//components['ArduinoLeonardo'].url='';

components['fan']={};
components['fan'].name='5V fan';
components['fan'].url='https://roboticafacil.es/prod/mini-ventilador-5v/';

components['semaphore']={};
components['semaphore'].name='GYR Traffic light';
components['semaphore'].url='https://roboticafacil.es/prod/semaforo-led-modulo/';

components['bluetooth_sppc']={};
components['bluetooth_sppc'].name='SPP-C bluetooth module';
components['bluetooth_sppc'].url='https://roboticafacil.es/prod/spp-c-bluetooth/';

components['dupont_cables_FF']={};
components['dupont_cables_FF'].name='DuPont cables F-F';
components['dupont_cables_FF'].url='https://roboticafacil.es/prod/10-cables-dupont-20cm/';

components['switch']={};
components['switch'].name='KY-004 switch module';
components['switch'].url='https://roboticafacil.es/prod/pulsador-ky-004/';

components['guva_s12sd']={};
components['guva_s12sd'].name='GUVA-S12SD UV sensor';
components['guva_s12sd'].url='https://roboticafacil.es/prod/sensor-uv-guva-s12sd/';

components['mq3']={};
components['mq3'].name='MQ3 Gas sensor';
components['mq3'].url='https://roboticafacil.es/prod/sensor-gas-alcohol-mq3/';

components['relay']={};
components['relay'].name='KY-019 Relay module';
components['relay'].url='https://roboticafacil.es/prod/modulo-rele-ky-019/';

components['smartcar_motor']={};
components['smartcar_motor'].name='Smart car DC motor';
components['smartcar_motor'].url='https://roboticafacil.es/prod/motorrueda-smart-car/';

components['lcd_i2c']={};
components['lcd_i2c'].name='LCD I2C Screen';
components['lcd_i2c'].url='https://roboticafacil.es/prod/pantalla-lcd-i2c/';

components['rgb_leds7']={};
components['rgb_leds7'].name='RGB LED (round) with 7 LEDs';
components['rgb_leds7'].url='https://roboticafacil.es/prod/anillo-ws2812/';

components['rgb_leds3']={};
components['rgb_leds3'].name='RGB LED strip';
components['rgb_leds3'].url='https://roboticafacil.es/prod/tira-de-3-rgb-leds/';


var circuits={};
circuits['Simple']={};
circuits['Simple'].ATmega328={};
circuits['Simple'].ATmega328.image='nano_board.png';
circuits['Simple'].ATmega328.components=[components['ArduinoNano']];
circuits['Simple'].ATmega328.connections=[];
circuits['Simple'].ATmega32U4={};
circuits['Simple'].ATmega32U4.image='leonardo_board.png';
circuits['Simple'].ATmega32U4.components=[components['ArduinoLeonardo']];
circuits['Simple'].ATmega32U4.connections=[];
circuits['Simple'].ESP8266={};
circuits['Simple'].ESP8266.image='nodemcu_board.png';
circuits['Simple'].ESP8266.components=[components['NodeMCU']];
circuits['Simple'].ESP8266.connections=[];
circuits['Simple'].ESP32={};
circuits['Simple'].ESP32.image='wemosD1R32_board.png';
circuits['Simple'].ESP32.components=[components['WemosD1R32']];
circuits['Simple'].ESP32.connections=[];

/*circuits['Simple']={};
circuits['Simple'].ATmega328={};
circuits['Simple'].ATmega328.image='nano.png';
circuits['Simple'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield']];
circuits['Simple'].ATmega328.connections=[];
circuits['Simple'].ATmega32U4={};
circuits['Simple'].ATmega32U4.image='leonardo.png';
circuits['Simple'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield']];
circuits['Simple'].ATmega32U4.connections=[];
circuits['Simple'].ESP8266={};
circuits['Simple'].ESP8266.image='nodemcu.png';
circuits['Simple'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield']];
circuits['Simple'].ESP8266.connections=[];
circuits['Simple'].ESP32={};
circuits['Simple'].ESP32.image='wemosD1R32.png';
circuits['Simple'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield']];
circuits['Simple'].ESP32.connections=[];*/

circuits['Relay_buttons']={};
circuits['Relay_buttons'].ATmega328={};
circuits['Relay_buttons'].ATmega328.image='relay_buttons_nano.png';
circuits['Relay_buttons'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ATmega328.connections=['BUT2 connected to D2','BUT3 connected to D3','Relay connected to D4'];
circuits['Relay_buttons'].ATmega32U4={};
circuits['Relay_buttons'].ATmega32U4.image='relay_buttons_leonardo.png';
circuits['Relay_buttons'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ATmega32U4.connections=['BUT2 connected to D2','BUT3 connected to D3','Relay connected to D4'];
circuits['Relay_buttons'].ESP8266={};
circuits['Relay_buttons'].ESP8266.image='relay_buttons_nodemcu.png';
circuits['Relay_buttons'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ESP8266.connections=['BUT2 connected to D5 (GPIO14)','BUT3 connected to D6 (GPIO12)','Relay connected to D2 (GPIO4)'];
circuits['Relay_buttons'].ESP8266.code_modifier='nodemcu';
circuits['Relay_buttons'].ESP32={};
circuits['Relay_buttons'].ESP32.image='relay_buttons_wemosD1R32.png';
circuits['Relay_buttons'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ESP32.connections=['BUT2 connected to D2 (GPIO26)','BUT3 connected to D3 (GPIO25)','Relay connected to D7 (GPIO14)'];
circuits['Relay_buttons'].ESP32.code_modifier='wemosD1R32';

circuits['Relay_buttons3']={};
circuits['Relay_buttons3'].ATmega328={};
circuits['Relay_buttons3'].ATmega328.image='relay_buttons3_nano.png';
circuits['Relay_buttons3'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['fan']];
circuits['Relay_buttons3'].ATmega328.connections=['BUT2 connected to D2','BUT3 connected to D3','BUT4 connected to D4','Relay connected to D5','Light connected to D6'];
circuits['Relay_buttons3'].ATmega32U4={};
circuits['Relay_buttons3'].ATmega32U4.image='relay_buttons3_leonardo.png';
circuits['Relay_buttons3'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['fan']];
circuits['Relay_buttons3'].ATmega32U4.connections=['BUT2 connected to D2','BUT3 connected to D3','BUT4 connected to D4','Relay connected to D5','Light connected to D6'];
circuits['Relay_buttons3'].ESP8266={};
circuits['Relay_buttons3'].ESP8266.image='relay_buttons3_nodemcu.png';
circuits['Relay_buttons3'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['fan']];
circuits['Relay_buttons3'].ESP8266.connections=['BUT2 connected to D5 (GPIO14)','BUT3 connected to D6 (GPIO12)','BUT4 connected to D7 (GPIO13)','Relay connected to D2 (GPIO4)','Light connected to D1 (GPIO5)'];
circuits['Relay_buttons3'].ESP8266.code_modifier='nodemcu';
circuits['Relay_buttons3'].ESP32={};
circuits['Relay_buttons3'].ESP32.image='relay_buttons3_wemosD1R32.png';
circuits['Relay_buttons3'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['fan']];
circuits['Relay_buttons3'].ESP32.connections=['BUT2 connected to D2 (GPIO26)','BUT3 connected to D3 (GPIO25)','BUT4 connected to D4 (GPIO17)','Relay connected to D5 (GPIO16)','Light connected to D6 (GPIO27)'];
circuits['Relay_buttons3'].ESP32.code_modifier='wemosD1R32';


circuits['Bluetooth_leds']={};
circuits['Bluetooth_leds'].ATmega328={};
circuits['Bluetooth_leds'].ATmega328.image='bluetooth_leds_nano.png';
circuits['Bluetooth_leds'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['bluetooth_sppc'],components['semaphore']];
circuits['Bluetooth_leds'].ATmega328.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7','Bluetooth TX connected to D2','Bluetooth RX connected to D4'];
circuits['Bluetooth_leds'].ATmega32U4={};
circuits['Bluetooth_leds'].ATmega32U4.image='bluetooth_leds_leonardo.png';
circuits['Bluetooth_leds'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['bluetooth_sppc'],components['semaphore']];
circuits['Bluetooth_leds'].ATmega32U4.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7','Bluetooth TX connected to D2','Bluetooth RX connected to D4'];
circuits['Bluetooth_leds'].ESP8266={};
circuits['Bluetooth_leds'].ESP8266.image='bluetooth_leds_nodemcu.png';
circuits['Bluetooth_leds'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['semaphore']];
circuits['Bluetooth_leds'].ESP8266.connections=['Green LED connected to D5 (GPIO14)','Ambar LED connected to D6 (GPIO12)','Red LED connected to D7 (GPIO13)'];
circuits['Bluetooth_leds'].ESP8266.code_modifier='nodemcu';
circuits['Bluetooth_leds'].ESP32={};
circuits['Bluetooth_leds'].ESP32.image='bluetooth_leds_wemosD1R32.png';
circuits['Bluetooth_leds'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['semaphore']];
circuits['Bluetooth_leds'].ESP32.connections=['Green LED connected to D5 (GPIO14)','Ambar LED connected to D6 (GPIO12)','Red LED connected to D7 (GPIO13)'];
circuits['Bluetooth_leds'].ESP32.code_modifier='wemosD1R32';


circuits['Switch']={};
circuits['Switch'].ATmega328={};
circuits['Switch'].ATmega328.image='switch_nano.png';
circuits['Switch'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['switch']];
circuits['Switch'].ATmega328.connections=['Switch connected to D2'];
circuits['Switch'].ATmega32U4={};
circuits['Switch'].ATmega32U4.image='switch_leonardo.png';
circuits['Switch'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['switch']];
circuits['Switch'].ATmega32U4.connections=['Switch connected to D2'];
circuits['Switch'].ESP8266={};
circuits['Switch'].ESP8266.image='switch_nodemcu.png';
circuits['Switch'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['switch']];
circuits['Switch'].ESP8266.connections=['Switch connected to D2 (GPIO4)'];
circuits['Switch'].ESP8266.code_modifier='nodemcu';
circuits['Switch'].ESP32={};
circuits['Switch'].ESP32.image='switch_wemosD1R32.png';
circuits['Switch'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['switch']];
circuits['Switch'].ESP32.connections=['Switch connected to D2 (GPIO26)'];
circuits['Switch'].ESP32.code_modifier='wemosD1R32';

circuits['Switches']={};
circuits['Switches'].ATmega328={};
circuits['Switches'].ATmega328.image='switches_example_nano.png';
circuits['Switches'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['switch']];
circuits['Switches'].ATmega328.connections=['Switch 1 connected to D2','Switch 2 connected to D3'];
circuits['Switches'].ATmega32U4={};
circuits['Switches'].ATmega32U4.image='switches_example_leonardo.png';
circuits['Switches'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['switch']];
circuits['Switches'].ATmega32U4.connections=['Switch 1 connected to D2','Switch 2 connected to D3'];
circuits['Switches'].ESP8266={};
circuits['Switches'].ESP8266.image='switches_example_nodemcu.png';
circuits['Switches'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['switch']];
circuits['Switches'].ESP8266.connections=['Switch 1 connected to D2 (GPIO4)','Switch 2 connected to D3 (GPIO0)'];
circuits['Switches'].ESP8266.code_modifier='nodemcu';
circuits['Switches'].ESP32={};
circuits['Switches'].ESP32.image='switches_example_wemosD1R32.png';
circuits['Switches'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['switch']];
circuits['Switches'].ESP32.connections=['Switch 1 connected to D2 (GPIO26)','Switch 2 connected to D3 (GPIO25)'];
circuits['Switches'].ESP32.code_modifier='wemosD1R32';


circuits['GUVA_S12SD']={};
circuits['GUVA_S12SD'].ATmega328={};
circuits['GUVA_S12SD'].ATmega328.image='s12sd_example_nano.png';
circuits['GUVA_S12SD'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ATmega328.connections=['GUVA-S12SD connected to A0'];
circuits['GUVA_S12SD'].ATmega32U4={};
circuits['GUVA_S12SD'].ATmega32U4.image='s12sd_example_leonardo.png';
circuits['GUVA_S12SD'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ATmega32U4.connections=['GUVA-S12SD connected to A0'];
circuits['GUVA_S12SD'].ESP8266={};
circuits['GUVA_S12SD'].ESP8266.image='s12sd_example_nodemcu.png';
circuits['GUVA_S12SD'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ESP8266.connections=['GUVA-S12SD connected to A0'];
circuits['GUVA_S12SD'].ESP32={};
circuits['GUVA_S12SD'].ESP32.image='s12sd_example_wemosD1R32.png';
circuits['GUVA_S12SD'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ESP32.connections=['GUVA-S12SD connected to A0 (GPIO2)'];

circuits['gas_mq3']={};
circuits['gas_mq3'].ATmega328={};
circuits['gas_mq3'].ATmega328.image='gas_mq3_nano.png';
circuits['gas_mq3'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['mq3']];
circuits['gas_mq3'].ATmega328.connections=['MQ3 digital output connected to D12','MQ3 analog output connected to A0'];
circuits['gas_mq3'].ATmega32U4={};
circuits['gas_mq3'].ATmega32U4.image='gas_mq3_leonardo.png';
circuits['gas_mq3'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['mq3']];
circuits['gas_mq3'].ATmega32U4.connections=['MQ3 digital output connected to D12','MQ3 analog output connected to A0'];
circuits['gas_mq3'].ESP8266={};
circuits['gas_mq3'].ESP8266.image='gas_mq3_nodemcu.png';
circuits['gas_mq3'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['mq3']];
circuits['gas_mq3'].ESP8266.connections=['MQ3 digital output connected to D2 (GPIO4)','MQ3 analog output connected to A0'];
circuits['gas_mq3'].ESP8266.code_modifier='nodemcu';
circuits['gas_mq3'].ESP32={};
circuits['gas_mq3'].ESP32.image='gas_mq3_wemosD1R32.png';
circuits['gas_mq3'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['mq3']];
circuits['gas_mq3'].ESP32.connections=['MQ3 digital output connected to D12 (GPIO19)','MQ3 analog output connected to A0 (GPIO2)'];
circuits['gas_mq3'].ESP32.code_modifier='wemosD1R32';

circuits['gas_mq3_calibrated']={};
circuits['gas_mq3_calibrated'].ATmega328={};
circuits['gas_mq3_calibrated'].ATmega328.image='gas_mq3_calibrated_nano.png';
circuits['gas_mq3_calibrated'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ATmega328.connections=['Switch connected to D3','MQ3 analog output connected to A0'];
circuits['gas_mq3_calibrated'].ATmega32U4={};
circuits['gas_mq3_calibrated'].ATmega32U4.image='gas_mq3_calibrated_leonardo.png';
circuits['gas_mq3_calibrated'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ATmega32U4.connections=['Switch connected to D3','MQ3 analog output connected to A0'];
circuits['gas_mq3_calibrated'].ESP8266={};
circuits['gas_mq3_calibrated'].ESP8266.image='gas_mq3_calibrated_nodemcu.png';
circuits['gas_mq3_calibrated'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ESP8266.connections=['Switch connected to D3 (GPIO0)','MQ3 analog output connected to A0'];
circuits['gas_mq3_calibrated'].ESP8266.code_modifier='nodemcu';
circuits['gas_mq3_calibrated'].ESP32={};
circuits['gas_mq3_calibrated'].ESP32.image='gas_mq3_calibrated_wemosD1R32.png';
circuits['gas_mq3_calibrated'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ESP32.connections=['Switch connected to D3 (GPIO25)','MQ3 analog output connected to A0 (GPIO2)'];
circuits['gas_mq3_calibrated'].ESP32.code_modifier='wemosD1R32';

circuits['Relay_switch']={};
circuits['Relay_switch'].ATmega328={};
circuits['Relay_switch'].ATmega328.image='relay_example_nano.png';
circuits['Relay_switch'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ATmega328.connections=['Switch connected to D2','Relay connected to D3'];
circuits['Relay_switch'].ATmega32U4={};
circuits['Relay_switch'].ATmega32U4.image='relay_example_leonardo.png';
circuits['Relay_switch'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ATmega32U4.connections=['Switch connected to D2','Relay connected to D3'];
circuits['Relay_switch'].ESP8266={};
circuits['Relay_switch'].ESP8266.image='relay_example_nodemcu.png';
circuits['Relay_switch'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ESP8266.connections=['Switch connected to D2 (GPIO4)','Relay connected to D3 (GPIO0)'];
circuits['Relay_switch'].ESP8266.code_modifier='nodemcu';
circuits['Relay_switch'].ESP32={};
circuits['Relay_switch'].ESP32.image='relay_example_wemosD1R32.png';
circuits['Relay_switch'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ESP32.connections=['Switch connected to D2 (GPIO26)','Relay connected to D3 (GPIO25)'];
circuits['Relay_switch'].ESP32.code_modifier='wemosD1R32';


circuits['semaphore_leds']={};
circuits['semaphore_leds'].ATmega328={};
circuits['semaphore_leds'].ATmega328.image='semaphore_leds_nano.png';
circuits['semaphore_leds'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['semaphore']];
circuits['semaphore_leds'].ATmega328.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7'];
circuits['semaphore_leds'].ATmega32U4={};
circuits['semaphore_leds'].ATmega32U4.image='semaphore_leds_leonardo.png';
circuits['semaphore_leds'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['semaphore']];
circuits['semaphore_leds'].ATmega32U4.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7'];
circuits['semaphore_leds'].ESP8266={};
circuits['semaphore_leds'].ESP8266.image='semaphore_leds_nodemcu.png';
circuits['semaphore_leds'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['semaphore']];
circuits['semaphore_leds'].ESP8266.connections=['Green LED connected to D5 (GPIO14)','Ambar LED connected to D6 (GPIO12)','Red LED connected to D7 (GPIO13)'];
circuits['semaphore_leds'].ESP8266.code_modifier='nodemcu';
circuits['semaphore_leds'].ESP32={};
circuits['semaphore_leds'].ESP32.image='semaphore_leds_wemosD1R32.png';
circuits['semaphore_leds'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['semaphore']];
circuits['semaphore_leds'].ESP32.connections=['Green LED connected to D5 (GPIO14)','Ambar LED connected to D6 (GPIO12)','Red LED connected to D7 (GPIO13)'];
circuits['semaphore_leds'].ESP32.code_modifier='wemosD1R32';

circuits['lcd_i2c']={};
circuits['lcd_i2c'].ATmega328={};
circuits['lcd_i2c'].ATmega328.image='lcd_i2c_nano.png';
circuits['lcd_i2c'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['lcd_i2c']];
circuits['lcd_i2c'].ATmega328.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ATmega32U4={};
circuits['lcd_i2c'].ATmega32U4.image='lcd_i2c_leonardo.png';
circuits['lcd_i2c'].ATmega32U4.components=[components['ArduinoLeonardo'],components['lcd_i2c']];
circuits['lcd_i2c'].ATmega32U4.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ESP8266={};
circuits['lcd_i2c'].ESP8266.image='lcd_i2c_nodemcu.png';
circuits['lcd_i2c'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['lcd_i2c']];
circuits['lcd_i2c'].ESP8266.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ESP8266.code_modifier='nodemcu';
circuits['lcd_i2c'].ESP32={};
circuits['lcd_i2c'].ESP32.image='lcd_i2c_wemosD1R32.png';
circuits['lcd_i2c'].ESP32.components=[components['WemosD1R32'],components['lcd_i2c']];
circuits['lcd_i2c'].ESP32.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ESP32.code_modifier='wemosD1R32';

circuits['ws2812']={};
circuits['ws2812'].ATmega328={};
circuits['ws2812'].ATmega328.image='ws2812_nano.png';
circuits['ws2812'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['rgb_leds7']];
circuits['ws2812'].ATmega328.connections=['RGB LEDs connected to D2'];
circuits['ws2812'].ATmega32U4={};
circuits['ws2812'].ATmega32U4.image='ws2812_leonardo.png';
circuits['ws2812'].ATmega32U4.components=[components['ArduinoLeonardo'],components['rgb_leds7']];
circuits['ws2812'].ATmega32U4.connections=['RGB LEDs connected to D2'];
circuits['ws2812'].ESP8266={};
circuits['ws2812'].ESP8266.image='ws2812_nodemcu.png';
circuits['ws2812'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['rgb_leds7']];
circuits['ws2812'].ESP8266.connections=['RGB LEDs connected to D2'];
circuits['ws2812'].ESP8266.code_modifier='nodemcu';
circuits['ws2812'].ESP32={};
circuits['ws2812'].ESP32.image='ws2812_wemosD1R32.png';
circuits['ws2812'].ESP32.components=[components['WemosD1R32'],components['rgb_leds7']];
circuits['ws2812'].ESP32.connections=['RGB LEDs connected to IO26 (D2)'];
circuits['ws2812'].ESP32.code_modifier='wemosD1R32';

circuits['ws2812_3leds']={};
circuits['ws2812_3leds'].ATmega328={};
circuits['ws2812_3leds'].ATmega328.image='ws2812_3leds_nano.png';
circuits['ws2812_3leds'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['rgb_leds3']];
circuits['ws2812_3leds'].ATmega328.connections=['RGB LEDs connected to D2'];
circuits['ws2812_3leds'].ATmega32U4={};
circuits['ws2812_3leds'].ATmega32U4.image='ws2812_3leds_leonardo.png';
circuits['ws2812_3leds'].ATmega32U4.components=[components['ArduinoLeonardo'],components['rgb_leds3']];
circuits['ws2812_3leds'].ATmega32U4.connections=['RGB LEDs connected to D2'];
circuits['ws2812_3leds'].ESP8266={};
circuits['ws2812_3leds'].ESP8266.image='ws2812_3leds_nodemcu.png';
circuits['ws2812_3leds'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['rgb_leds3']];
circuits['ws2812_3leds'].ESP8266.connections=['RGB LEDs connected to D2'];
circuits['ws2812_3leds'].ESP8266.code_modifier='nodemcu';
circuits['ws2812_3leds'].ESP32={};
circuits['ws2812_3leds'].ESP32.image='ws2812_3leds_wemosD1R32.png';
circuits['ws2812_3leds'].ESP32.components=[components['WemosD1R32'],components['rgb_leds3']];
circuits['ws2812_3leds'].ESP32.connections=['RGB LEDs connected to IO26 (D2)'];
circuits['ws2812_3leds'].ESP32.code_modifier='wemosD1R32';

var examples={};

examples['controls_setupLoop_example']={};
examples['controls_setupLoop_example'].title='Message print setup/loop';
examples['controls_setupLoop_example'].desc='This example shows a message at startup and one at the main loop.';
examples['controls_setupLoop_example'].circuit=circuits['Simple'];

examples['serial_read_example']={};
examples['serial_read_example'].title='Reading the USB serial port';
examples['serial_read_example'].desc='This example waits for the letter \'s\' to begin with the rest of the program. In the ASCII table, the letter \'s\' corresponds to the value 115.';
examples['serial_read_example'].circuit=circuits['Simple'];

examples['controls_statemachine_example1']={};
examples['controls_statemachine_example1'].title='State machine START/STOP';
examples['controls_statemachine_example1'].desc='This example controls the activation or deactivation of a fan motor with a simple two-state START / STOP machine. In state 0 (initially active) the motor will be deactivated, while in state 1, the motor will be activated. The transition conditions from one state to another are defined by the transition instructions. Specifically, to move from state 0 to state 1, we must press the button 2 (BUT2), while to move from state 1 to 0, we will press the button 3 (BUT3).';
examples['controls_statemachine_example1'].circuit=circuits['Relay_buttons'];
examples['controls_statemachine_example1'].grafcet='controls_statemachine_grafcet1.png';

examples['controls_statemachine_example2']={};
examples['controls_statemachine_example2'].title='State machine AND divergence/convergence';
examples['controls_statemachine_example2'].desc='This example controls the activation or deactivation of a fan motor and an LED with a single four state state machine using an AND divergence and AND convergence. In state 0 (initially active) the motor will be deactivated and the LED will be off, while in state 1, the motor will be activated. On the other hand, in state 2 the LED will be on, while in state 3 the LED will be off. The transition conditions from one state to another are defined by the transition instructions. Specifically, to switch from state 0 to state 1, we must press the button 2 (BUT2) connected to pin 2, which will also activate state 2. To switch to state 3 from state 2, we must press the button 3 (BUT3). The transition with states 1 and 3 activated to state 0 is immediate, since it uses a "1" (always true).';
examples['controls_statemachine_example2'].circuit=circuits['Relay_buttons'];
examples['controls_statemachine_example2'].grafcet='controls_statemachine_grafcet2.png';

examples['controls_statemachine_example3']={};
examples['controls_statemachine_example3'].title='State machine OR divergence/convergence';
examples['controls_statemachine_example3'].desc='This example controls the activation or deactivation of a fan and a light with a single three-state state machine using an OR divergence and OR convergence, so that only one of the two can be active. In state 0 (initially active) the fan an the light will be deactivated, while in state 1, the fan will be activated (and light will be deactivated) and in state 2, the light will be activated (and the fan will be deactivated). The transition conditions from one state to another are defined by the transition instructions. Specifically, to go from state 0 to state 1, we must press the button 2 (BUT2). To go to state 2 we must press the button 3 (BUT3). The button 4 (BUT4)  will disable either of the two previous states, that is state 1 or 2.';
examples['controls_statemachine_example3'].circuit=circuits['Relay_buttons3'];
examples['controls_statemachine_example3'].grafcet='controls_statemachine_grafcet3.png';

examples['controls_statemachine_example4']={};
examples['controls_statemachine_example4'].title='Two state machines';
examples['controls_statemachine_example4'].desc='This example controls the activation or deactivation of a fan and a light with a single four state machine, but with two independent state machines. In state 0 (initially active), fan will be deactivated, and activated while in state 1. On the other hand, in state 2 (initially active) the light will be deactivated, and active while in state 3. The transition conditions from one state to another are defined by the transition instructions. Specifically, to go from state 0 to state 1, we must press the button BUT2. To go to state 3 we must press the button BUT3. The button BUT4 will disable any of the two active states, either state 1 or 3.';
examples['controls_statemachine_example4'].circuit=circuits['Relay_buttons3'];
examples['controls_statemachine_example4'].grafcet='controls_statemachine_grafcet4.png';


examples['controls_switch_example']={};
examples['controls_switch_example'].title='Semaphore control through bluetooth';
examples['controls_switch_example'].desc='In this example ASCII characters are read through bluetooth. If the user sends a \'0\' (30 in ASCII), the green LED lights up. If the user sends a \'1\' (31 to ASCII), the ambar LED lights up, whereas if a \'2\' (32 in ASCII) is sent, the red LED lights up. Any other data received will turn off all the LEDs.';
examples['controls_switch_example'].circuit=circuits['Bluetooth_leds'];

examples['controls_whileUntil_example']={};
examples['controls_whileUntil_example'].title='Wait until high state condition';
examples['controls_whileUntil_example'].desc='In this example, the program waits meanwhile the user does not press the button (high state).';
examples['controls_whileUntil_example'].circuit=circuits['Switch'];

examples['controls_whileUntil1_example']={};
examples['controls_whileUntil1_example'].title='Wait until low state condition';
examples['controls_whileUntil1_example'].desc='In this example, the program holds until the user presses the button (low state).';
examples['controls_whileUntil1_example'].circuit=circuits['Switch'];

examples['ambient_guva_s12sd_example']={};
examples['ambient_guva_s12sd_example'].title='Ambient sensor GUVA-S12SD';
examples['ambient_guva_s12sd_example'].desc='In this example, the values of radiation and the UV-index with GUVA S12SD sensor are displayed on the console.';
examples['ambient_guva_s12sd_example'].circuit=circuits['GUVA_S12SD'];

examples['gas_mq3_example']={};
examples['gas_mq3_example'].title='Gas sensor reading';
examples['gas_mq3_example'].desc='This example shows how to measure both analog and digital values of a gas sensor. The result of both measurements is shown through the console.';
examples['gas_mq3_example'].circuit=circuits['gas_mq3'];

examples['gas_mq3_calibrated_example']={};
examples['gas_mq3_calibrated_example'].title='Calibrated gas sensor reading';
examples['gas_mq3_calibrated_example'].desc='In this example we show how to calibrate a gas sensor. First, the program waits until you press a button so that pre-heating time has been accomplished. After that, calibrates the sensor and displays on the console the value of the resistance. Once calibrated, the sensor measurements can be obtained in ppm by selecting the appropriate gas type.';
examples['gas_mq3_calibrated_example'].circuit=circuits['gas_mq3_calibrated'];

examples['array_example1']={};
examples['array_example1'].title='Using array variables';
examples['array_example1'].desc='This example shows how to use array variables and constructor. First, it declares a global and local array and then it creates a copy of the local array. The elements of the new created array are then modified with values of the global array. The resulting operation is shown on the console.';
examples['array_example1'].circuit=circuits['Simple'];

examples['array_example2']={};
examples['array_example2'].title='Using constant array variables';
examples['array_example2'].desc='This example shows how to use constant array variables. First, it declares a global and local array and then it creates another local array. The elements of the new created array are assigned with values of the global and local arrays. The resulting values are shown on the console.';
examples['array_example2'].circuit=circuits['Simple'];

examples['array_example3']={};
examples['array_example3'].title='Using array variables with type for encoding and decoding';
examples['array_example3'].desc='This example shows how to use array variables with type. The example generates three random numbers with different ranges and encodes the numbers into an array. It accumulates the numbers using a for loop and a global array variable and then it decodes the resulting operation and prints the values.';
examples['array_example3'].circuit=circuits['Simple'];

examples['variables_example']={};
examples['variables_example'].title='Using local and global variables';
examples['variables_example'].desc='This example shows the use of local and global variables.';
examples['variables_example'].circuit=circuits['Simple'];



examples['inout_digital_read_example']={};
examples['inout_digital_read_example'].title='AND example with two buttons and a LED';
examples['inout_digital_read_example'].desc='In this example, the built-in LED (GPIO'+RoboBlocks.profiles['default'].builtin+') lights up if the buttons are pressed at the same time, otherwise the LED turns off.';
examples['inout_digital_read_example'].circuit=circuits['Switches'];

examples['inout_highlow_example']={};
examples['inout_highlow_example'].title='Button status';
examples['inout_highlow_example'].desc='In this example, it shows the value of the button status (HIGH or LOW).';
examples['inout_highlow_example'].circuit=circuits['Switch'];

examples['variables_global_volatile_type_example']={};
examples['variables_global_volatile_type_example'].title='Shared variables';
examples['variables_global_volatile_type_example'].desc='This example shows the use of a shared variable.';
examples['variables_global_volatile_type_example'].circuit=circuits['Switch'];

examples['dyor_31_in_1_relay_example']={};
examples['dyor_31_in_1_relay_example'].title='Relay control by interrupt';
examples['dyor_31_in_1_relay_example'].desc='In this example the current of an motor is cut off if an intruder invades a safety area (represented by the pushbutton). As this is a security issue, the code has been included within an interrupt.';
examples['dyor_31_in_1_relay_example'].circuit=circuits['Relay_switch'];

examples['task_shared_var_example']={};
examples['task_shared_var_example'].title='Timed task with a shared variable';
examples['task_shared_var_example'].desc='This example shows how to use a timed-task interrupt with a shared global variable.';
examples['task_shared_var_example'].circuit=circuits['Simple'];

examples['dyor_task_example']={};
examples['dyor_task_example'].title='Timed task with a shared variable';
examples['dyor_task_example'].desc='This example shows how to use a timed-task interrupt with a shared global variable.';
examples['dyor_task_example'].circuit=circuits['Simple'];

examples['semaphore_task_example']={};
examples['semaphore_task_example'].title='Task example with a traffic light';
examples['semaphore_task_example'].desc='This example shows how turn ON and OFF the lights of a traffic light periodically with a timed task interrupt.';
examples['semaphore_task_example'].circuit=circuits['semaphore_leds'];

examples['buttons_ui']={};
examples['buttons_ui'].title='UI with two buttons';
examples['buttons_ui'].desc='In this example, we implement a basic UI with two buttons. There\'s a general UI view that will be displayed when no button is pressed or the refreshed time has elapsed. There are three menus: "Menu0", "Menu1" and "Menu2". Depending on the selected menu, we can access to different options and distinguish between the option is highlighted (it means that the name of the option will be shown on the display) or selected (it means that the option has been actively selected and the corresponding action for that option will be executed).';
examples['buttons_ui'].circuit=circuits['Switches'];

examples['lower_upper_case_example']={};
examples['lower_upper_case_example'].title='Lower and Upper case';
examples['lower_upper_case_example'].desc='This example shows on the console the lower and upper case versions of the text \'HeLLo\'.';
examples['lower_upper_case_example'].circuit=circuits['Simple'];

examples['text_to_text_example']={};
examples['text_to_text_example'].title='Convert to text';
examples['text_to_text_example'].desc='In this example the number 12345 is converted to a String to determine the number of digits. On the other hand, the number 113 that corresponds to the letter \'q\' in ASCII is converted.';
examples['text_to_text_example'].circuit=circuits['Simple'];

examples['toNumber_example']={};
examples['toNumber_example'].title='Convert text to number';
examples['toNumber_example'].desc='This example shows two text to number convertions. The first one is an integer, while the second one is a float (real number). The sum of the numbers is displayed on the console.';
examples['toNumber_example'].circuit=circuits['Simple'];

examples['text_substring_example']={};
examples['text_substring_example'].title='Text substring';
examples['text_substring_example'].desc='In this example the phrase "Hello world!" is cut out, showing only "llo w".';
examples['text_substring_example'].circuit=circuits['Simple'];

examples['text_search_example']={};
examples['text_search_example'].title='Text search';
examples['text_search_example'].desc='In this example the letter "o" is searched for in the phrase "Hello world!". The first instance is in position 4 and the last instance in position 7.';
examples['text_search_example'].circuit=circuits['Simple'];

examples['text_length_example']={};
examples['text_length_example'].title='Text length';
examples['text_length_example'].desc='This example counts the number of characters entered through the console.';
examples['text_length_example'].circuit=circuits['Simple'];

examples['text_join_example']={};
examples['text_join_example'].title='Text concatenation';
examples['text_join_example'].desc='This example shows how you can concatenate a single text string with a number.';
examples['text_join_example'].circuit=circuits['Simple'];

examples['text_equalsIgnoreCase_example']={};
examples['text_equalsIgnoreCase_example'].title='Text is equal?';
examples['text_equalsIgnoreCase_example'].desc='This example shows how "hello" can be compared to "HELLO" (the built-in LED on the board should flash).';
examples['text_equalsIgnoreCase_example'].circuit=circuits['Simple'];

examples['text_contains_example']={};
examples['text_contains_example'].title='Contains text?';
examples['text_contains_example'].desc='This example looks for the expression "wo" in the phrase "Hello world!". If it is found, the integrated LED on the board will turn on, otherwise it will turn it off.';
examples['text_contains_example'].circuit=circuits['Simple'];


examples['charAt_example']={};
examples['charAt_example'].title='Get character from String';
examples['charAt_example'].desc='Character at the indicated position of the text string.';
examples['charAt_example'].circuit=circuits['Simple'];

examples['text_append_example']={};
examples['text_append_example'].title='Append numbers to text';
examples['text_append_example'].desc='This example shows how append number to a text variable. Specifically the numbers from 1 to 10 are added.';
examples['text_append_example'].circuit=circuits['Simple'];

examples['lowpass_filter_example']={};
examples['lowpass_filter_example'].title='Low-pass filter';
examples['lowpass_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a low-pass filter. In this example, the cut-off frequency is set to 10Hz, corresponding to 10% of the half of the sampling frequency (100Hz).';
examples['lowpass_filter_example'].circuit=circuits['Simple'];

examples['highpass_filter_example']={};
examples['highpass_filter_example'].title='High-pass filter';
examples['highpass_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a high-pass filter. In this example, the cut-off frequency is set to 80Hz, corresponding to 80% of the half of the sampling frequency (100Hz).';
examples['highpass_filter_example'].circuit=circuits['Simple'];

examples['bandstop_filter_example']={};
examples['bandstop_filter_example'].title='Band-stop filter';
examples['bandstop_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a band-stop filter. In this example, the cut-off frequencies are set to 35Hz and 45Hz, corresponding to 35% and 45% of the half of the sampling frequency (100Hz).';
examples['bandstop_filter_example'].circuit=circuits['Simple'];

examples['bandpass_filter_example']={};
examples['bandpass_filter_example'].title='Band-pass filter';
examples['bandpass_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a band-pass filter. In this example, the cut-off frequencies are set to 35Hz and 45Hz, corresponding to 35% and 45% of the half of the sampling frequency (100Hz).';
examples['bandpass_filter_example'].circuit=circuits['Simple'];

examples['controls_lcd1_example']={};
examples['controls_lcd1_example'].title='LCD I2C';
examples['controls_lcd1_example'].desc='This example shows an I2C LCD screen. The code in the example shows the phrase \'Hello world!\' on the LCD.';
examples['controls_lcd1_example'].circuit=circuits['lcd_i2c'];

examples['controls_lcd_clear1_example']={};
examples['controls_lcd_clear1_example'].title='LCD I2C Clear and Set Cursor';
examples['controls_lcd_clear1_example'].desc='This example shows a circuit with an LCD connected to I2C. The code in the example shows the phrase "Hello" in the first row and "world!" on the second row of the LCD.';
examples['controls_lcd_clear1_example'].circuit=circuits['lcd_i2c'];

examples['led_strip_demo']={};
examples['led_strip_demo'].title='RGB LED Strip (round with 7 LEDs)';
examples['led_strip_demo'].desc='In this example, we shown activate and deactivate the pixels of a 7-RGB LEDs strip (the pixel in the middle is set fixed to a different colour). The brightness of the pixels varies progresively.';
examples['led_strip_demo'].circuit=circuits['ws2812'];

examples['led_strip2_demo']={};
examples['led_strip2_demo'].title='RGB LED Strip';
examples['led_strip2_demo'].desc='In this example, we shown a coloured sequence of LEDs using a 3 LED RGB strip.';
examples['led_strip2_demo'].circuit=circuits['ws2812_3leds'];
