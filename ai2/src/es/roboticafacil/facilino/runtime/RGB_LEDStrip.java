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
import com.google.appinventor.components.runtime.util.SdkLevel;

import com.google.appinventor.components.runtime.util.YailList;
import es.roboticafacil.facilino.runtime.Facilino;
import es.roboticafacil.facilino.runtime.FacilinoBase;

//import java.lang.Class;
import java.lang.reflect.*;
import java.util.Set;
/**
 * A RGB LED Strip component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A RGB LED Strip component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/led_strip_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class RGB_LEDStrip  extends FacilinoActuatorBase {

  private byte _pin;
 
  /**
   * Creates a new Facilino component.
   */
  public RGB_LEDStrip(ComponentContainer container) {
    super(container.$form(),"RGB_LEDStrip",FacilinoBase.TYPE_LED_STRIP);
	_pin=3;
  }
  
  @SimpleProperty(description = "The RGB LED Strip pin.",
                  category = PropertyCategory.BEHAVIOR)
  public byte Pin() {
    return _pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "2")
  @SimpleProperty (description = "Pin of the IN input of the LED strip")
  public void Pin(byte pin) {
    _pin = pin;
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
  
  @SimpleFunction(description = "Sends a RGB_LEDs strip telegram to Facilino.")
  public void SetLEDs(YailList colors) {
	  _facilino.SendBytes(setLEDsTelegram(colors));
  }
  
  @SimpleFunction(description = "Sends a number with the predefined RGB LED strip telegram to Facilino.")
  public void ShowPredefLEDs(byte number) {
	  _facilino.SendBytes(showPredefLEDsTelegram(number));
  }
  
  //@SimpleFunction(description = "Returns the telegram to set RGB LEDs to Facilino")
  private YailList setLEDsTelegram(YailList colors)
  {
	  Object[] array = colors.toArray();
	  byte[] bytes = new byte[3*array.length+5];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_LED_STRIP;
	  int total_length=3*array.length+1;
	  bytes[2]=(byte)(total_length & 0xFF);
	  bytes[3]=_pin;
	  int n;
	  int j=4;
	  for (int i = 0; i < array.length; i++)
	  {
		  Object el = array[i];
		  String s = el.toString();
		  try {
			n = Integer.decode(s);
			} catch (NumberFormatException e) {
				System.out.println(e.toString());
			return new YailList();
			}
		  bytes[j++]=(byte) ((n>>16) & 0xFF);
		  bytes[j++]=(byte) ((n>>8) & 0xFF);
		  bytes[j++]=(byte) (n & 0xFF);
	  }
	  bytes[total_length+4]='*';
	  n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array1);
	  return list;
  }
  
  private YailList showPredefLEDsTelegram(byte number)
  {
	  byte[] bytes = new byte[6];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_LED_STRIP_PREDEF;
	  bytes[2]=2;
	  bytes[3]=(byte)_pin;
	  bytes[4]=number;
	  bytes[5]='*';
	  int n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array1);
	  return list;
  }

}
