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
import es.roboticafacil.facilino.runtime.FacilinoBase;
import es.roboticafacil.facilino.runtime.Facilino;
import com.google.appinventor.components.runtime.util.YailList;
//import java.lang.Class;
import java.lang.reflect.*;
import java.util.Set;
/**
 * A sonar component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A sonar component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/hc_sr04_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class Sonar extends FacilinoSensorBase {
  private byte _pin_ECHO;
  private byte _pin_TRIGGER;
  private int _distance;
  private boolean _dataDispatched;
  private int _threshold;
  
  /**
   * Creates a new Facilino component.
   */
  public Sonar(ComponentContainer container) {
	  super(container,"Sonar",FacilinoBase.TYPE_SONAR);
	  _dataDispatched=false;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public byte Echo() {
    return _pin_ECHO;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "7")
  @SimpleProperty(description = "The ECHO pin")
  public void Echo(byte pin) {
    _pin_ECHO = pin;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public byte Trigger() {
    return _pin_TRIGGER;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "12")
  @SimpleProperty(description = "The TRIGGER pin")
  public void Trigger(byte pin) {
    _pin_TRIGGER = pin;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public int Threshold() {
    return _threshold;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "20")
  @SimpleProperty(description = "Threshold value to compare, if distance is smaller than threshold then throws collision event")
  public void Threshold(int threshold) {
    _threshold = threshold;
  }
  
  @SimpleProperty(description = "The measured distance (last received).",
                  category = PropertyCategory.BEHAVIOR)
  public int Distance() {
    return _distance;
  }
  
  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_COMPONENT,
                    defaultValue = "")
  @SimpleProperty
  public void FacilinoDevice(FacilinoBase facilinoBase) {
    super.FacilinoDevice(facilinoBase);
  }
  
  private void attach(FacilinoBluetooth facilino) {
	  _facilino=facilino;
	  _attach();
  }
  
  private void detach() {
	  _detach();
  }
  
  @SimpleFunction(description = "Sends a sonar read request to Facilino and waits for response.")
  public void Update() throws InterruptedException {
	  _dataDispatched=false;
	  _facilino.SendBytes(readTelegram());
	  while (!_dataDispatched){Thread.sleep(1);}
  }
  
  @SimpleFunction(description = "Sends a sonar read request to Facilino.")
  public void Request() {
	  _dataDispatched=false;
	  _facilino.SendBytes(readTelegram());
  }
  
  private YailList readTelegram() {
	  byte[] bytes = new byte[6];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_SONAR_READ_REQ;
	  bytes[2]=2;
	  bytes[3]=(byte)_pin_ECHO;
	  bytes[4]=(byte)_pin_TRIGGER;
	  bytes[5]='*';
	  int n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array1);
	  return list;
  }
	
	@SimpleEvent(description = "Sonar distance read (in cm) event.")
    public void Received(int distance){
        EventDispatcher.dispatchEvent(this, "Received",distance);
    }
	
	@SimpleEvent(description = "Sonar collision event when the distance is lower than the threshold.")
    public void Collision(){
        EventDispatcher.dispatchEvent(this, "Collision");
    }
	
	@Override
  public void dispatchData(byte cmd,byte[] data){
	  if ((data[0]==_pin_ECHO)&&(data[1]==_pin_TRIGGER))
	  {
		 _distance = (((int)data[2]<<8)&0xFF00)|(((int)data[3])&0x00FF);
		  Received(_distance);
		  if (_distance<_threshold)
			  Collision();
		  _dataDispatched=true;
	  }
  }
  
  /**
   * BreakLoop Command
   */

}
