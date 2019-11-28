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

//import java.lang.Class;
import java.lang.reflect.*;
import java.util.Set;
/**
 * A push button component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A push button component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/pushbutton_16x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class PushButton  extends FacilinoSensorBase {
  private byte _pin;
  private boolean _valueDigital;
  private boolean _prev_valueDigital;
  private boolean _firstTime;
  
  /**
   * Creates a new Facilino component.
   */
  public PushButton(ComponentContainer container) {
	  super(container,"PushButton",FacilinoBase.TYPE_PUSH_BUTTON);
  }
  
  @SimpleProperty(description = "The push button pin.",
                  category = PropertyCategory.BEHAVIOR)
  public byte Pin() {
    return _pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_INTEGER,
                    defaultValue = "3")
  @SimpleProperty(description = "The push button pin")
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
  
  @SimpleEvent(description = "Push button event.")
    public void Pushed(){
        EventDispatcher.dispatchEvent(this, "Pushed");
    }
	
	@SimpleEvent(description = "Release button event.")
    public void Released(){
        EventDispatcher.dispatchEvent(this, "Released");
    }
	
	@Override
  public void dispatchData(byte cmd, byte[] data) {
	  if (cmd==FacilinoBase.CMD_PUSH_BUTTON){
		  if (data[0]==_pin)
		  {
			  _valueDigital = data[1]==0 ? true : false;
			  if (_firstTime)
				  _firstTime=false;
			  else if (_valueDigital!=_prev_valueDigital)
			  {
					if (_valueDigital)
						Pushed();
					else
						Released();
			  }
			  _prev_valueDigital=_valueDigital;
		  }
	  }
  }

}
