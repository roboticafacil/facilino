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
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.SimpleProperty;
import com.google.appinventor.components.annotations.DesignerProperty;
import com.google.appinventor.components.annotations.UsesPermissions;
import com.google.appinventor.components.common.ComponentCategory;
import com.google.appinventor.components.common.YaVersion;
import com.google.appinventor.components.runtime.util.ErrorMessages;
import com.google.appinventor.components.runtime.util.Ev3BinaryParser;
import com.google.appinventor.components.runtime.util.Ev3Constants;
import com.google.appinventor.components.runtime.util.SdkLevel;

import com.google.appinventor.components.runtime.util.YailList;
import es.roboticafacil.facilino.runtime.Facilino;
import es.roboticafacil.facilino.runtime.FacilinoBase;

//import java.lang.Class;
import java.lang.reflect.*;
import java.util.Set;
/**
 * An analog output (analog write) component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "An analog output (analog write) component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/pwm_signal_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class AnalogWrite  extends FacilinoActuatorBase {
  private byte _pin;
  private byte _value;
  
  /**
   * Creates a new Facilino component.
   */
  public AnalogWrite(ComponentContainer container) {
    super(container,"AnalogWrite",FacilinoBase.TYPE_ANALOG_WRITE);
	_pin=2;
  }
  
  @SimpleProperty(category = PropertyCategory.BEHAVIOR)
  public byte Pin() {
    return _pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "3")
  @SimpleProperty(description = "The analog output pin (PWM).")
  public void Pin(byte pin) {
    _pin = pin;
  }
  
  @SimpleProperty(description = "The analog output value.",
                  category = PropertyCategory.BEHAVIOR)
  public byte Value() {
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
  
  @SimpleFunction(description = "Sets an analog output.")
  public void Set(byte value) {
	  _value=value;
	  _facilino.SendBytes(setTelegram(value));
  }
  
  private YailList setTelegram(byte value)
  {
	  byte[] bytes = new byte[6];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_ANALOG_WRITE;
	  bytes[2]=2;
	  bytes[3]=(byte)_pin;
	  bytes[4]=value;
	  bytes[5]='*';
	  int n=bytes.length;
	  Object[] array = new Object[n];
	  for (int i=0;i<n;i++)
		array[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array);
	  return list;
  }
}
