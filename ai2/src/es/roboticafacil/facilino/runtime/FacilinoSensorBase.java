// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2009-2011 Google, All Rights reserved
// Copyright 2011-2012 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0

package es.roboticafacil.facilino.runtime;

import com.google.appinventor.components.runtime.*;

import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.DesignerProperty;
import com.google.appinventor.components.common.PropertyTypeConstants;
import com.google.appinventor.components.annotations.SimpleProperty;


public abstract class FacilinoSensorBase extends AndroidNonvisibleComponent
    implements Component, FacilinoSensor, Deleteable {
  protected FacilinoBase _facilino;
  protected final String logTag;
  protected byte _type;
  
  
  protected void FacilinoDevice(FacilinoBase facilinoBase) {
    _facilino = facilinoBase;
	if (_facilino!=null)
	  _facilino.attachSensor(this);
  }
  
  protected FacilinoSensorBase(ComponentContainer container, String logTag, byte type) {
    this(container.$form(), logTag, type);
  }
  
  private FacilinoSensorBase(Form form, String logTag, byte type) {
    super(form);
    this.logTag = logTag;
	_facilino=null;
	_type=type;
  }
  
  protected void _attach() {
	  if (_facilino!=null)
	  {
		  _facilino.detachSensor(this);
		  _facilino.attachSensor(this);
	  }
	  
  }
  
  protected void _detach() {
	  if (_facilino != null) {
		_facilino.detachSensor(this);
		_facilino = null;
	  }
  }
  
  @Override
	public byte sensorType()
	{
		return _type;
	}
	
@Override
  public void onDelete() {
	_detach();
  }
}
