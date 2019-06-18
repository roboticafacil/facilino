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
                   description = "A buzzer component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/buzzer_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class Buzzer  extends FacilinoActuatorBase {
  private byte _pin;
  
  /**
   * Creates a new Facilino component.
   */
  public Buzzer(ComponentContainer container) {
    super(container,"Buzzer",FacilinoBase.TYPE_BUZZER);
	_pin=3;
  }
  
  @SimpleProperty(description = "The buzzer pin.",
                  category = PropertyCategory.BEHAVIOR)
  public byte Pin() {
    return _pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "3")
  @SimpleProperty(description = "The buzzer pin.")
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
  
  @SimpleFunction(description = "Sends a tone telegram to Facilino.")
  public void Tone(int frequency, int duration) {
	  _facilino.SendBytes(toneTelegram(frequency,duration));
  }
  
  /*@SimpleFunction(description = "Sends a number with the predefined melody telegram to Facilino.")
  public void PredefMelody(byte number) {
	  _facilino.SendBytes(predefMelodyTelegram(number));
  }*/
  
  @SimpleFunction(description = "Sends a melody telegram to Facilino.")
  public void Melody(YailList melody) {
	  _facilino.SendBytes(melodyTelegram(melody));
  }
  
  private YailList toneTelegram(int frequency, int duration)
  {
	  byte[] bytes = new byte[9];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_BUZZER_TONE;
	  bytes[2]=5;
	  bytes[3]=(byte)_pin;
	  bytes[4]=(byte)((frequency>>8)&0xFF);
	  bytes[5]=(byte)(frequency&0xFF);
	  bytes[6]=(byte)((duration>>8)&0xFF);
	  bytes[7]=(byte)(duration&0xFF);
	  bytes[8]='*';
	  int n=bytes.length;
	  Object[] array = new Object[n];
	  for (int i=0;i<n;i++)
		array[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array);
	  return list;
  }
  
  /*private YailList predefMelodyTelegram(byte number)
  {
	  byte[] bytes = new byte[6];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_BUZZER_PREDEF_MELODY;
	  bytes[2]=2;
	  bytes[3]=(byte)_pin;
	  bytes[4]=number;
	  bytes[5]='*';
	  int n=bytes.length;
	  Object[] array = new Object[n];
	  for (int i=0;i<n;i++)
		array[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array);
	  return list;
  }*/
  
  private YailList melodyTelegram(YailList melody)
  {
	  Object[] array = melody.toArray();
	  byte[] bytes = new byte[4*array.length+5];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_BUZZER_MELODY;
	  int total_length=4*array.length+1;
	  bytes[2]=(byte)(total_length & 0xFF);
	  bytes[3]=(byte)_pin;
	  int n;
	  int j=4;
	  YailList list;
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
		  bytes[j++]=(byte) ((n>>24) & 0xFF);
		  bytes[j++]=(byte) ((n>>16) & 0xFF);
		  bytes[j++]=(byte) ((n>>8) & 0xFF);
		  bytes[j++]=(byte) (n & 0xFF);
	  }
	  bytes[total_length+4]='*';
	  n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  list = YailList.makeList(array1);
	  return list;
  }

}
