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
 * A MQx Gas sensor component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A MQx gas sensor component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/gas.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class GasMQx  extends AnalogRead {
  private int _gasThreshold;
  private boolean _firstTime;

  /**
   * Creates a new Facilino component.
   */
  public GasMQx(ComponentContainer container) {
	  super(container);
	  this.logTag="GasMQx";
	  this._type=FacilinoBase.TYPE_GASMQX;
	  _dataDispatched=false;
	  _firstTime=true;
	  _pin=0;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "1023")
  @SimpleProperty(description = "Gas is anything above this value [0-1023]")
  public void GasThreshold(int value) {
    _gasThreshold = value;
  }

	@SimpleEvent(description = "Analog read event.")
    public void Received(int value){
        EventDispatcher.dispatchEvent(this, "Received",value);
    }

	@SimpleEvent(description = "Gas event.")
    public void GasDetected(){
        EventDispatcher.dispatchEvent(this, "GasDetected");
    }

	@Override
  public void dispatchData(byte cmd, byte[] data) {
	  if ((data[0]==_pin))
	  {
		  _value = (((int)data[1]<<8)&0xFF00)|(((int)data[2])&0x00FF);
		  if (_value>_gasThreshold)
			  GasDetected();
		  Received(_value);
		  _dataDispatched=true;
	  }
  }

}
