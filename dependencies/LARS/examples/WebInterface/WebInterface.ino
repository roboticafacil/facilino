// Example of the LARS Movement library using the ESPUI Webinferface and the SimleExpressions Library by Lukas Bachschwell
#include <SimpleExpressions.h>
#include <WiFi.h>
#include <ESPUI.h>
#include <LARS.h>

#define ledDataPin 2
#define beeperPin 4

#define echoPin 18
#define triggerPin 19

#define checkTime 500
#define warningDistance 20
long oldTime = 0;
bool warning = false;

const char* ssid = "Lars";

LARS robot;

boolean walk_forward = false;
boolean walk_backward = false;
boolean hello = false;
boolean turn_left = false;
boolean turn_right = false;
boolean moonwalk = false;
boolean audience = false;
boolean omni = false;
boolean omni_left = false;
boolean dance = false;
boolean upDown = false;
boolean PushUp = false;

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP);
  WiFi.setHostname(ssid);
  WiFi.softAP(ssid);
  Serial.println("");
  Serial.print("IP address: ");
  Serial.println(WiFi.softAPIP());


  ESPUI.pad("Walking Control", true, &walkingPad, COLOR_CARROT);
  ESPUI.pad("Wave some legs", false, &wavePad, COLOR_CARROT);
  ESPUI.button("Wave  Button", &audienceWaveButton, COLOR_PETERRIVER);
  ESPUI.button("MoonWalk  Button", &moonWalkButton, COLOR_PETERRIVER);
  ESPUI.button("Dance  Button", &danceButton, COLOR_PETERRIVER);
  ESPUI.button("PushUp  Button", &pushUpButton, COLOR_PETERRIVER);
  ESPUI.button("upDown  Button", &upDownButton, COLOR_PETERRIVER);
  ESPUI.button("Slow Turn Right", &slowTurnRight, COLOR_PETERRIVER);
  ESPUI.button("Slow Turn left", &slowTurnLeft, COLOR_PETERRIVER);

  ESPUI.begin("Crabby Control");

  SimpleExpressions.init(ledDataPin, beeperPin);
  SimpleExpressions.clearMouth();

  SimpleExpressions.writeMouth("happySmall", 0, 0, 80);
  SimpleExpressions.playSound(S_SUPER_HAPPY);
  SimpleExpressions.writeMouth("happyFull", 0, 60, 100);



/*
How to wire:

init(FRH, FLH, BRH, BLH, FRL, FLL, BRL, BLL)

  Leg        Hip    Face    Hip         Leg
   __________ __________ _________________
  |(FLL)_____)(FLH)      (FRH)(______(FRL)|
  |__|       |left FRONT right|        |__|
             |                |
             |                |
             |                |
   _________ |                | __________
  |(BLL)_____)(BLH)______(BRH)(______(BRL)|
  |__|                                 |__|

*/

  robot.init(26, 25, 17, 16, 27, 5, 23, 13); // Calling init with default values
  delay(1000);
}

void loop() {
  if (millis() - oldTime > checkTime) {
    checkDistance();
    oldTime = millis();
  }

  if (walk_forward) robot.walk(0);
  else if (walk_backward) robot.walk();
  else if (hello) robot.hello();
  else if (turn_left) robot.turnL(1, 550);
  else if (turn_right) robot.turnR(1, 550);
  else if (moonwalk) robot.moonwalk(1, 5000);
  else if (audience) robot.wave(1);
  else if (dance) robot.dance(1, 600);
  else if (omni) robot.omniWalk(1, 600, true, 1);
  else if (omni_left) robot.omniWalk(1, 600, false, 1);
  else if (PushUp) robot.pushUp(1, 600);
  else if (upDown) robot.upDown(1, 5000);
  else robot.home();

}

// UI Callbacks

void audienceWaveButton(Control c, int type) {
  if (type == B_DOWN) {
    audience = true;
  } else {
    audience = false;
  }
}

void moonWalkButton(Control c, int type) {
  if (type == B_DOWN) {
    moonwalk = true;
  } else {
    moonwalk = false;
  }
}

void danceButton(Control c, int type) {
  if (type == B_DOWN) {
    dance = true;
  } else {
    dance = false;
  }
}

void pushUpButton(Control c, int type) {
  if (type == B_DOWN) {
    PushUp = true;
  } else {
    PushUp = false;
  }
}

void upDownButton(Control c, int type) {
  if (type == B_DOWN) {
    upDown = true;
  } else {
    upDown = false;
  }
}

void slowTurnRight(Control c, int type) {
  if (type == B_DOWN) {
    omni = true;
  } else {
    omni = false;
  }
}

void slowTurnLeft(Control c, int type) {
  if (type == B_DOWN) {
    omni_left = true;
  } else {
    omni_left = false;
  }
}

void walkingPad(Control c, int value) {
  switch (value) {
    case P_LEFT_DOWN:
      turn_left = true;
      break;
    case P_LEFT_UP:
      turn_left = false;
      break;
    case P_RIGHT_DOWN:
      turn_right = true;
      break;
    case P_RIGHT_UP:
      turn_right = false;
      break;
    case P_FOR_DOWN:
      walk_forward = true;
      break;
    case P_FOR_UP:
      walk_forward = false;
      break;
    case P_BACK_DOWN:
      walk_backward = true;
      break;
    case P_BACK_UP:
      walk_backward = false;
      break;
    case P_CENTER_DOWN:
      hello = true;
      break;
    case P_CENTER_UP:
      hello = false;
      break;
  }
}

void wavePad(Control c, int value) {
  switch (value) {
    case P_LEFT_DOWN:
      robot.wave(1);
      break;
    case P_RIGHT_DOWN:
      robot.wave(2);
      break;
    case P_FOR_DOWN:
      robot.wave(3);
      break;
    case P_BACK_DOWN:
      robot.wave(4);
      break;
  }
}

// Ultrasonic Sensor

void checkDistance() {
  int d = distance(triggerPin, echoPin);
  ESPUI.print("Distance", String(d));
  if (d < warningDistance) {
    delay(100);
    d = distance(triggerPin, echoPin);
    if (d < warningDistance) {
      if(!warning) {
        SimpleExpressions.writeMouth("sadFull", 100, 0, 0);
        SimpleExpressions.writeMouth("sadFull", 100, 0, 0); // only twice please
        }
      SimpleExpressions.playSound(S_CONFUSED);
      warning = true;
    }
  } else {
    if (warning) {
      SimpleExpressions.writeMouth("happyFull", 0, 60, 100);
      SimpleExpressions.writeMouth("happyFull", 0, 60, 100); // only twice please
      warning = false;
    }
  }
}



long US_init(int trigger_pin, int echo_pin)
{
  digitalWrite(trigger_pin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigger_pin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigger_pin, LOW);

  return pulseIn(echo_pin, HIGH, 100000);
}

long distance(int trigger_pin, int echo_pin)
{
  long microseconds = US_init(trigger_pin, echo_pin);
  long distance;
  distance = microseconds / 29 / 2;
  if (distance == 0) {
    distance = 999;
  }
  return distance;
}
