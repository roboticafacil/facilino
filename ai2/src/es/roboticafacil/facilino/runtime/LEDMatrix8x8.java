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
 * A LED Matrix 8x8 component that provides a low-level interface to Facilino
 * with functions to send direct commands/telegrams to Facilino.
 *
 * @author Leopoldo Armesto soporte@roboticafacil.es
 */
@DesignerComponent(version = Facilino.VERSION,
                   description = "A LED Matrix 8x8 component that provides a low-level interface to Facilino " +
                                 "with functions to send direct commands/telegrams to Facilino.",
                   category = ComponentCategory.EXTENSION,
                   nonVisible = true,
                   iconName = "https://roboticafacil.es/facilino/blockly/img/ai2/LED_matrix_24x16.png")
@SimpleObject (external=true)
@UsesPermissions(permissionNames = "android.permission.INTERNET," +
                                   "android.permission.WRITE_EXTERNAL_STORAGE," +
                                   "android.permission.READ_EXTERNAL_STORAGE")
public class LEDMatrix8x8  extends FacilinoActuatorBase {
  
  private byte _CS_pin;
  private byte _DIN_pin;
  private byte _CLK_pin;
  /**
   * Creates a new Facilino component.
   */
  public LEDMatrix8x8(ComponentContainer container) {
    super(container,"LEDMatrix8x8",FacilinoBase.TYPE_LED_MATRIX); 
	_CS_pin=10;
	_DIN_pin=12;
	_CLK_pin=11;
  }
  
  @SimpleProperty(description = "CS pin of LED Matrix.",
                  category = PropertyCategory.BEHAVIOR)
  public byte CS() {
    return _CS_pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "10")
  @SimpleProperty(description = "CS pin of LED Matrix")
  public void CS(byte pin) {
    _CS_pin = pin;
  }
  
  @SimpleProperty(description = "DIN pin of LED Matrix.",
                  category = PropertyCategory.BEHAVIOR)
  public byte DIN() {
    return _DIN_pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "12")
  @SimpleProperty(description = "DIN pin of LED Matrix")
  public void DIN(byte pin) {
    _DIN_pin = pin;
  }
  
  @SimpleProperty(description = "CLK pin of LED Matrix.",
                  category = PropertyCategory.BEHAVIOR)
  public byte CLK() {
    return _CLK_pin;
  }

  @DesignerProperty(editorType = PropertyTypeConstants.PROPERTY_TYPE_NON_NEGATIVE_INTEGER,
                    defaultValue = "11")
  @SimpleProperty(description = "CLK pin of LED Matrix")
  public void CLK(byte pin) {
    _CLK_pin = pin;
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
  
  @SimpleFunction(description = "Sends a telegram with a expression for a LED Matrix 8x8 to Facilino.")
  public void Show(long expression) {
	  _facilino.SendBytes(showTelegram(expression));
  }
  
  @SimpleFunction(description = "Sends a number with the predefined expression for LED Matrix 8x8 telegram to Facilino.")
  public void ShowPredefExpression(byte number) {
	  _facilino.SendBytes(showPredefExpressionTelegram(number));
  }
  
  @SimpleFunction(description = "Converts rows into an expression")
  public long ToExpression(byte col1, byte col2, byte col3, byte col4, byte col5, byte col6, byte col7, byte col8) {
	  long _col1=col1;
	  long _col2=col2;
	  long _col3=col3;
	  long _col4=col4;
	  long _col5=col5;
	  long _col6=col6;
	  long _col7=col7;
	  long _col8=col8;
	  long expression=((_col1<<52)&0x00000000000000FF)|((_col2<<48)&0x00000000000000FF)|((_col3<<40)&0x00000000000000FF)|((_col4<<32)&0x00000000000000FF)|((_col5<<24)&0x00000000000000FF)|((_col6<<16)&0x00000000000000FF)|((_col7<<8)&0x00000000000000FF)|(_col8&0x00000000000000FF);
	  return expression;
  }
  
  private YailList showTelegram(long expression) {
	  byte[] bytes = new byte[15];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_LED_MATRIX;
	  bytes[2]=11;
	  bytes[3]=(byte)_CLK_pin;
	  bytes[4]=(byte)_DIN_pin;
	  bytes[5]=(byte)_CLK_pin;
	  bytes[6]=(byte)((expression>>52)&0xFF);
	  bytes[7]=(byte)((expression>>48)&0xFF);
	  bytes[8]=(byte)((expression>>40)&0xFF);
	  bytes[9]=(byte)((expression>>32)&0xFF);
	  bytes[10]=(byte)((expression>>24)&0xFF);
	  bytes[11]=(byte)((expression>>16)&0xFF);
	  bytes[12]=(byte)((expression>>8)&0xFF);
	  bytes[13]=(byte)(expression&0xFF);
	  bytes[14]='*';
	  int n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array1);
	  return list;
  }
  
  private YailList showPredefExpressionTelegram(byte number) {
	  byte[] bytes = new byte[8];
	  bytes[0]='@';
	  bytes[1]=FacilinoBase.CMD_LED_MATRIX_PREDEF_EXPR;
	  bytes[2]=4;
	  bytes[3]=(byte)_CLK_pin;
	  bytes[4]=(byte)_DIN_pin;
	  bytes[5]=(byte)_CLK_pin;
	  bytes[6]=number;
	  bytes[7]='*';
	  int n=bytes.length;
	  Object[] array1 = new Object[n];
	  for (int i=0;i<n;i++)
		array1[i]=(Object)bytes[i];
	  YailList list = YailList.makeList(array1);
	  return list;
  }

}
