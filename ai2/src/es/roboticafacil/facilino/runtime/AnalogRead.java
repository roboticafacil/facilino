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
 * An analog read component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "An analog read component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/analog_signal_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class AnalogRead  extends FacilinoSensorBase {
  private byte _pin;
  private int _value;
  private boolean _dataDispatched;
  
  /**
   * Creates a new Facilino component.
   */
  public AnalogRead(ComponentContainer container) {
	  super(container,"AnalogRead",FacilinoBase.TYPE_ANALOG_READ);
	  _dataDispatched=false;
	  _pin=0;
  }
  
  @SimpleProperty(description = "The analog read pin.",
                  category = PropertyCategory.BEHAVIOR)
  public byte AnalogPin() {
    return _pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "0")
  @SimpleProperty(description = "The analog pin")
  public void AnalogPin(byte pin) {
    _pin = pin;
  }
  
  @SimpleProperty(description = "The analog input value (last received).",
                  category = PropertyCategory.BEHAVIOR)
  public int Value() {
    return _value;
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
  
  @SimpleFunction(description = "Sends an analog read request to Facilino and waits for response.")
  public void Update() throws InterruptedException{
	  _dataDispatched=false;
	  _facilino.SendBytes(readTelegram());
	  while(!_dataDispatched){ Thread.sleep(1);};
  }
  
  @SimpleFunction(description = "Sends an analog read request to Facilino.")
  public void Request() {
	  _facilino.lock();
	  _dataDispatched=false;
	  _facilino.SendBytes(readTelegram());
	  _facilino.unlock();
  }
  
  private YailList readTelegram() {
	  byte[] bytes = new byte[5];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_ANALOG_READ_REQ;
	  bytes[2]=1;
	  bytes[3]=(byte)(_pin+14);
	  bytes[4]='*';
	  int n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array1);
	  return list;
  }
  
  /*@SimpleEvent(description = "Digital read change event.")
    public void changed(boolean value){
        EventDispatcher.dispatchEvent(this, "changed",value);
    }*/
	
	@SimpleEvent(description = "Analog read event.")
    public void Received(int value){
        EventDispatcher.dispatchEvent(this, "Received",value);
    }
	
	@Override
  public void dispatchData(byte cmd,byte[] data) {
	  if (cmd==FacilinoBase.CMD_ANALOG_READ_RESP){
		  if (data[0]==_pin)
		  {
			  _value = (((int)data[1]<<8)&0xFF00)|(((int)data[2])&0x00FF);
			  Received(_value);
			  _dataDispatched=true;
		  }
	  }
  }
}
