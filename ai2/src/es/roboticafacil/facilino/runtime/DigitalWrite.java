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
 * A buzzer component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A digital output (write) component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/digital_signal_out_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class DigitalWrite  extends FacilinoActuatorBase {
  private byte _pin;
  private boolean _value;
  
  /**
   * Creates a new Facilino component.
   */
  public DigitalWrite(ComponentContainer container) {
    super(container,"DigitalWrite",FacilinoBase.TYPE_DIGITAL_WRITE);
	_pin=2;
  }
  
  @SimpleProperty(description = "The digital output pin.",
                  category = PropertyCategory.BEHAVIOR)
  public byte Pin() {
    return _pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "2")
  @SimpleProperty(description = "The digital output pin.")
  public void Pin(byte pin) {
    _pin = pin;
  }
  
  @SimpleProperty(description = "The digital output value.",
                  category = PropertyCategory.BEHAVIOR)
  public boolean Value() {
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
  
  @SimpleFunction(description = "Sets a digital output.")
  public void Set(boolean value) {
	  _value=value;
	  _facilino.SendBytes(setTelegram(value));
  }
  
  @SimpleFunction(description = "Toggles a digital output by sending a telegram to Facilino.")
  public void Toggle() {
	  _value=!_value;
	  _facilino.SendBytes(setTelegram(_value));
	  
  }
  
  //@SimpleFunction(description = "Returns the tone telegram to send")
  private YailList setTelegram(boolean value)
  {
	  byte[] bytes = new byte[6];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_DIGITAL_WRITE;
	  bytes[2]=2;
	  bytes[3]=(byte)_pin;
	  bytes[4]=(value) ? (byte)1 : (byte)0;
	  bytes[5]='*';
	  int n=bytes.length;
	  Object[] array = new Object[n];
	  for (int i=0;i<n;i++)
		array[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array);
	  return list;
  }
}
