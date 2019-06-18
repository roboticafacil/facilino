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
import com.google.appinventor.components.runtime.util.TimerInternal;
import com.google.appinventor.components.runtime.util.YailList;
import es.roboticafacil.facilino.runtime.Facilino;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

//import java.lang.Class;
import java.lang.reflect.*;
import java.util.Set;
/**
 * A continuous servo component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A continuous rotation servo component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/Facilino_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public abstract class FacilinoBase  extends AndroidNonvisibleComponent implements Component {
  protected final String logTag;
  protected byte _type;
 
  
  private List<FacilinoSensor> attachedSensors = new ArrayList<FacilinoSensor>();
  private List<FacilinoActuator> attachedActuators = new ArrayList<FacilinoActuator>();
  
  public static byte CMD_DIGITAL_READ_REQ = 0x00;
  public static byte CMD_DIGITAL_READ_RESP = 0x01;
  public static byte CMD_DIGITAL_WRITE = 0x02;
  public static byte CMD_ANALOG_READ_REQ = 0x03;
  public static byte CMD_ANALOG_READ_RESP = 0x04;
  public static byte CMD_ANALOG_WRITE = 0x05;
  public static byte CMD_PUSH_BUTTON = 0x09;
  public static byte CMD_SERVO = 0x10;
  public static byte CMD_SERVO_CONT = 0x11;
  public static byte CMD_SONAR_READ_REQ = 0x12;
  public static byte CMD_SONAR_READ_RESP = 0x13;
  public static byte CMD_TCRT5000_READ_REQ = 0x14;
  public static byte CMD_TCRT5000_READ_RESP = 0x15;
  public static byte CMD_BUZZER_TONE = 0x20;
  public static byte CMD_BUZZER_MELODY = 0x21;
  //public static byte CMD_BUZZER_PREDEF_MELODY = 0x22;
  public static byte CMD_DHT_READ_REQ = 0x22;
  public static byte CMD_DHT_READ_RESP = 0x23;
  
  public static byte CMD_LED_MATRIX = 0x50;
  public static byte CMD_LED_MATRIX_PREDEF_EXPR = 0x51;
  public static byte CMD_LED_STRIP = 0x60;
  public static byte CMD_LED_STRIP_PREDEF = 0x61;
  
  public static byte TYPE_DIGITAL_READ = 0x00;
  public static byte TYPE_DIGITAL_WRITE = 0x01;
  public static byte TYPE_ANALOG_READ = 0x02;
  public static byte TYPE_ANALOG_WRITE = 0x03;
  public static byte TYPE_PUSH_BUTTON = 0x04;
  public static byte TYPE_LED = 0x05;
  public static byte TYPE_SERVO = 0x06;
  public static byte TYPE_SERVO_CONT = 0x07;
  public static byte TYPE_SONAR = 0x08;
  public static byte TYPE_BUZZER = 0x09;
  public static byte TYPE_INFRARED = 0x10;
  public static byte TYPE_LED_MATRIX = 0x11;
  public static byte TYPE_LED_STRIP = 0x012;
  
  public static byte TYPE_MANAGER_BLUETOOTH = 0x00;
  public static byte TYPE_MANAGER_UDP = 0x01;
  
  private byte[] _telegramData = new byte[255];
  private byte _telegramLength = 0;
  private byte _telegramCmd = 0;
  private byte _telegramPos = 0;
  
  protected final Lock _mutex = new ReentrantLock(true);
  
  protected FacilinoBase(ComponentContainer container, String logTag, byte type) {
    this(container.$form(), logTag, type);
  }
  
  private FacilinoBase(Form form, String logTag, byte type) {
    super(form);
    this.logTag = logTag;
	//_facilino=null;
	_type=type;
  }
  
  
  @SimpleProperty(
      category = PropertyCategory.BEHAVIOR,
      description ="Interval between timer events in ms")
  public int attachedSensors() {
    return attachedSensors.size();
  }
  
  protected void processTelegram(List<Integer> bytes)
  {
	  Iterator<Integer> bytesIterator = bytes.iterator(); 
	  while (bytesIterator.hasNext()) {
		  byte data = (byte)bytesIterator.next().intValue();
		  if ((_telegramPos==0)&&(data=='@'))
			_telegramPos++;
		  else if (_telegramPos==1)
		  {
				_telegramCmd=data;
				_telegramPos++;
		  }
		  else if (_telegramPos==2)
		  {
			  _telegramLength=data;
			  _telegramPos++;
		  }
		  else if ((_telegramPos>=3)&&(_telegramPos<(_telegramLength+3)))
		  {
			  _telegramData[_telegramPos-3]=data;
			  _telegramPos++;
		  }
		  else if ((_telegramPos==(_telegramLength+3))&&(data=='*'))
		  {
			  //Here we have receive a successful telegram
			  for (FacilinoSensor sensor: attachedSensors)
			  {
				  //TODO: Check if the CMD matches with the sensor type, before dispatching the Event
				  sensor.dispatchData(_telegramCmd,_telegramData);
			  }
			  _telegramPos=0;
		  }
		  else
			  _telegramPos=0;
	  }
  }

  public boolean attachSensor(FacilinoSensor sensor) {
    attachedSensors.add(sensor);
    return true;
  }

  public void detachSensor(FacilinoSensor sensor) {
    attachedSensors.remove(sensor);
  }
  
  public boolean attachActuator(FacilinoActuator actuator) {
    attachedActuators.add(actuator);
    return true;
  }

  public void detachActuator(FacilinoActuator actuator) {
    attachedActuators.remove(actuator);
  }
  
  public abstract void SendBytes(YailList list);
  
  public void lock()
  {
	  _mutex.lock();
  }
  
  public void unlock()
  {
	  _mutex.unlock();
  }
}
