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
 * A Facilino bluetooth component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A Facilino bluetooth component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/facilino_logo_ai2_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class FacilinoBluetooth  extends FacilinoBase implements Deleteable, AlarmHandler {
  private BluetoothClient bluetooth;
  private TimerInternal timerInternal;
  
  private static final int DEFAULT_INTERVAL = 100;  // ms
  private static final boolean DEFAULT_ENABLED = true;
  
  /**
   * Creates a new Facilino component.
   */
  public FacilinoBluetooth(ComponentContainer container) {
    super(container.$form(),"FacilinoBluetooth",FacilinoBase.TYPE_MANAGER_BLUETOOTH);
	timerInternal = new TimerInternal(this, DEFAULT_ENABLED, DEFAULT_INTERVAL);
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_BLUETOOTHCLIENT,
                    defaultValue = "")
  @SimpleProperty
  public void BluetoothClient(BluetoothClient bluetoothClient) {
    bluetooth = bluetoothClient;
    if (bluetooth != null) {
        try{
            Class c = this.bluetooth.getClass();
            Class[] args = new Class[1];
            args[0] = this.getClass();
            Method m = c.getDeclaredMethod("detachComponent",args);
            m.setAccessible(true);
            m.invoke(this,this);
        }
        catch(NoSuchMethodException e) {
          System.out.println(e.toString());
        }
       catch(IllegalAccessException e){
      System.out.println(e.toString());                     
        }
       catch(InvocationTargetException e){
      System.out.println(e.toString());
        } 
    } // end of if
    if (bluetoothClient != null) {
      try{
          Class c = this.bluetooth.getClass();
          Class[] args = new Class[2];
       args[0] = this.getClass();
       args[1] = Set.class;
       Method m = c.getDeclaredMethod("attachComponent",args);
       m.setAccessible(true);
       m.invoke(this,this,null);
        }
        catch(NoSuchMethodException e) {
          System.out.println(e.toString());
        }
       catch(IllegalAccessException e){
      System.out.println(e.toString());                     
        }
       catch(InvocationTargetException e){
      System.out.println(e.toString());
        } 
    } // end of if
  }

  // interface Deleteable implementation
  @Override
  public void onDelete() {
    if (bluetooth != null) {
      try { 
       Class c = this.bluetooth.getClass();
       Class[] args = new Class[1];
       args[0] = this.getClass();
       Method m = c.getDeclaredMethod("detachComponent",args);
       m.setAccessible(true);
       m.invoke(this,this);
       }
       catch(NoSuchMethodException e) {
          System.out.println(e.toString());
       }
       catch(IllegalAccessException e){
      System.out.println(e.toString());                     
    }
  catch(InvocationTargetException e){
      System.out.println(e.toString());
    }   
      bluetooth = null;
    }
  }
  
  @SimpleProperty(
      category = PropertyCategory.BEHAVIOR,
      description ="Interval between timer events in ms")
  public int TimerInterval() {
    return timerInternal.Interval();
  }

  /**
   * Interval property setter method: sets the interval between timer events.
   *
   * @param interval timer interval in ms
   */
  @DesignerProperty(
      editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
      defaultValue = DEFAULT_INTERVAL + "")
  @SimpleProperty
  public void TimerInterval(int interval) {
    timerInternal.Interval(interval);
  }
  
  /**
   * Enabled property getter method.
   *
   * @return {@code true} indicates a running timer, {@code false} a stopped
   *         timer
   */
  @SimpleProperty(
      category = PropertyCategory.BEHAVIOR,
      description = "Fires timer if true")
  public boolean Enabled() {
    return timerInternal.Enabled();
  }

  /**
   * Enabled property setter method: starts or stops the timer.
   *
   * @param enabled {@code true} starts the timer, {@code false} stops it
   */
  @DesignerProperty(
      editorType = PropertyTypeConstants.PROPERTY_TYPE_BOOLEAN,
      defaultValue = DEFAULT_ENABLED ? "True" : "False")
  @SimpleProperty
  public void Enabled(boolean enabled) {
    timerInternal.Enabled(enabled);
  }
  
  @Override
  public void alarm() {
	  if (bluetooth.IsConnected())
	  {
		  while(bluetooth.BytesAvailableToReceive()>0)
		  {
			  List<Integer> bytes = bluetooth.ReceiveUnsignedBytes(bluetooth.BytesAvailableToReceive());
			  processTelegram(bytes);
		  }
	  }
  }

  @Override
  public void SendBytes(YailList list)
  {
	  //if (actuator.actuatorType()==(bytes[1]&0xFE))
	  {
		  if (bluetooth.IsConnected()){
			bluetooth.SendBytes(list);
		  }
	  }
  }
}
