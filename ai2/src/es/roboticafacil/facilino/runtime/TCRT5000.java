// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2016 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

package es.roboticafacil.facilino.runtime;

import java.util.*;
import com.google.appinventor.components.runtime.*;
import com.google.appinventor.components.annotations.DesignerComponent;
import com.google.appinventor.components.annotations.PropertyCategory;
import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.annotations.SimpleEvent;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.SimpleProperty;
import com.google.appinventor.components.annotations.DesignerProperty;
import com.google.appinventor.components.annotations.UsesPermissions;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.common.YaVersion;
import com.google.appinventor.components.runtime.util.SdkLevel;
import es.roboticafacil.facilino.runtime.Facilino;
import es.roboticafacil.facilino.runtime.FacilinoBase;
import com.google.appinventor.components.runtime.util.YailList;

//import java.lang.Class;
import java.lang.reflect.*;
import java.util.Set;
/**
 * A TCRT5000 component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A TCRT5000 component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/TCRT5000_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class TCRT5000  extends FacilinoSensorBase {
  private byte _pinAnalog;
  private byte _pinDigital;
  private int _valueAnalog;
  private boolean _valueDigital;
  private boolean _prev_valueDigital;
  private boolean _dataDispatched;
  private int _black;
  private int _white;
  private boolean _firstTime;
  
  /**
   * Creates a new Facilino component.
   */
  public TCRT5000(ComponentContainer container) {
	  super(container,"TCRT5000",FacilinoBase.TYPE_INFRARED);
	  _dataDispatched=false;
	  _firstTime=true;
	  _pinAnalog=0;
	  _pinDigital=2;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public byte AnalogPin() {
    return _pinAnalog;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "0")
  @SimpleProperty(description = "The analog pin")
  public void AnalogPin(byte pin) {
    _pinAnalog = pin;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public byte DigitalPin() {
    return _pinDigital;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "2")
  @SimpleProperty(description = "The digital pin")
  public void DigitalPin(byte pin) {
    _pinDigital = pin;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public int Black() {
    return _black;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "1023")
  @SimpleProperty(description = "Black is anything above this value [0-1023]")
  public void Black(int value) {
    _black = value;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public int White() {
    return _white;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "0")
  @SimpleProperty(description = "White is anything below this value [0-1023]")
  public void White(int value) {
    _white = value;
  }
  
  @SimpleProperty(description = "The analog value (last received).",
                  category = PropertyCategory.BEHAVIOR)
  public int AnalogValue() {
    return _valueAnalog;
  }
  
  @SimpleProperty(description = "The digital value (last received).",
                  category = PropertyCategory.BEHAVIOR)
  public boolean DigitalValue() {
    return _valueDigital;
  }
  
  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_COMPONENT,
                    defaultValue = "")
  @SimpleProperty
  public void FacilinoDevice(FacilinoBase facilinoBase) {
    super.FacilinoDevice(facilinoBase);
  }
  
  private void attach(FacilinoBase facilino) {
	  _facilino=facilino;
	  _attach();
  }
  
  private void detach() {
	  _detach();
  }
  
  @SimpleFunction(description = "Sends an analog/digital read request to Facilino and waits for response.")
  public void Update() throws InterruptedException{
	  _dataDispatched=false;
	  _facilino.SendBytes(readTelegram());
	  while(!_dataDispatched){ Thread.sleep(1);};
  }
  
  @SimpleFunction(description = "Sends an analog/digital read request to Facilino.")
  public void Request() {
	  _facilino.lock();
	  _dataDispatched=false;
	  _facilino.SendBytes(readTelegram());
	  _facilino.unlock();
  }
  
  private YailList readTelegram() {
	  byte[] bytes = new byte[6];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_TCRT5000_READ_REQ;
	  bytes[2]=1;
	  bytes[3]=(byte)(_pinAnalog+14);
	  bytes[4]=(byte)_pinDigital;
	  bytes[5]='*';
	  int n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array1);
	  return list;
  }
	
	@SimpleEvent(description = "Analog/Digital read event.")
    public void Received(int analogValue, boolean digitalValue){
        EventDispatcher.dispatchEvent(this, "Received",analogValue,digitalValue);
    }
	
	@SimpleEvent(description = "Black event.")
    public void BlackDetected(){
        EventDispatcher.dispatchEvent(this, "BlackDetected");
    }
	
	@SimpleEvent(description = "White event.")
    public void WhiteDetected(){
        EventDispatcher.dispatchEvent(this, "WhiteDetected");
    }
	
	@SimpleEvent(description = "Digital read change event.")
    public void Changed(boolean value){
        EventDispatcher.dispatchEvent(this, "changed",value);
    }
	
	@Override
  public void dispatchData(byte cmd, byte[] data) {
	  if ((data[0]==_pinAnalog)||(data[1]==_pinDigital))
	  {
		  _valueAnalog = (((int)data[2]<<8)&0xFF00)|(((int)data[3])&0x00FF);
		  if (_valueAnalog<_white)
			  WhiteDetected();
		  else if (_valueAnalog>_black)
			  BlackDetected();
		  _valueDigital = data[4]==1 ? true : false;
		  if (_firstTime)
			  _firstTime=false;
		  else if (_valueDigital!=_prev_valueDigital)
			Changed(_valueDigital);
		  _prev_valueDigital=_valueDigital;
		  Received(_valueAnalog,_valueDigital);
		  _dataDispatched=true;
	  }
  }

}
