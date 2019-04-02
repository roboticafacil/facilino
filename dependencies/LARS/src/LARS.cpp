#include "LARS.h"
#include <Arduino.h>

/*
   (servo index, pin to attach pwm)
   __________ __________ _________________
  |(3,9)_____)(1,8)      (0,2)(______(2,3)|
  |__|       |left FRONT right|        |__|
             |                |
             |                |
             |                |
   _________ |                | __________
  |(7,7)_____)(5,6)______(4,4)(______(6,5)|
  |__|                                 |__|

*/


LARS::LARS(): reverse{0, 0, 0, 0, 0, 0, 0, 0}, trim{0, 0, 0, 0, 0, 0, 0, 0} {
}

void LARS::init(){
  init(26, 25, 17, 16, 27, 5, 23, 13); // Calling init with default values
}

void LARS::init(int FRH, int FLH, int BRH, int BLH, int FRL, int FLL, int BRL, int BLL) {

  board_pins[FRONT_RIGHT_HIP] = FRH; // front right inner
  board_pins[FRONT_LEFT_HIP] = FLH; // front left inner
  board_pins[BACK_RIGHT_HIP] = BRH; // back right inner
  board_pins[BACK_LEFT_HIP] = BLH; // back left inner
  board_pins[FRONT_RIGHT_LEG] = FRL; // front right outer
  board_pins[FRONT_LEFT_LEG] = FLL; //  front left outer       // POSITIONS LOOKING FROM THE MIDDLE OF THE ROBOT!!!!!
  board_pins[BACK_RIGHT_LEG] = BRL; // back right outer
  board_pins[BACK_LEFT_LEG] = BLL; // back left outer

  for (int i = 0; i < 8; i++) {
    oscillator[i].start();
    servo[i].attach(board_pins[i]);
  }

  home();
}

void LARS::turnR(float steps, float T = 600) {
  //int x_amp = 15;
  //int z_amp = 15;
  int x_amp = 50;
  int z_amp = 50;
  int ap = 15;
  int hi = 23;
  //int hi = 0;
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {x_amp, x_amp, z_amp, z_amp, x_amp, x_amp, z_amp, z_amp};
  int offset[] = {90 + ap, 90 - ap, 90 - hi, 90 + hi, 90 - ap, 90 + ap, 90 + hi, 90 - hi};
  int phase[] = {0, 180, 90, 90, 180, 0, 90, 90};

  execute(steps, period, amplitude, offset, phase);
}

void LARS::turnL(float steps, float T = 600) {
  //int x_amp = 15;
  //int z_amp = 15;
  int x_amp = 50;
  int z_amp = 50;
  int ap = 15;
  int hi = 23;
  //int hi = 0;
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {x_amp, x_amp, z_amp, z_amp, x_amp, x_amp, z_amp, z_amp};
  int offset[] = {90 + ap, 90 - ap, 90 - hi, 90 + hi, 90 - ap, 90 + ap, 90 + hi, 90 - hi};
  int phase[] = {180, 0, 90, 90, 0, 180, 90, 90};

  execute(steps, period, amplitude, offset, phase);
}

void LARS::dance(float steps, float T = 600) {
  int x_amp = 0;
  int z_amp = 40;
  int ap = 30;
  int hi = 0;
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {x_amp, x_amp, z_amp, z_amp, x_amp, x_amp, z_amp, z_amp};
  int offset[] = {90 + ap, 90 - ap, 90 - hi, 90 + hi, 90 - ap, 90 + ap, 90 + hi, 90 - hi};
  int phase[] = {0, 0, 0, 270, 0, 0, 90, 180};

  execute(steps, period, amplitude, offset, phase);
}


void LARS::omniWalk(float steps, float T, bool side, float turn_factor) {
  int x_amp = 15;
  int z_amp = 15;
  int ap = 15;
  int hi = 23;
  int front_x = 6 * (1 - pow(turn_factor, 2));
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {x_amp, x_amp, z_amp, z_amp, x_amp, x_amp, z_amp, z_amp};
  int offset[] = {    90 + ap - front_x,
                      90 - ap + front_x,
                      90 - hi,
                      90 + hi,
                      90 - ap - front_x,
                      90 + ap + front_x,
                      90 + hi,
                      90 - hi
                 };

  int phase[8];
  if (side) {
    int phase1[] =  {0,   0,   90,  90,  180, 180, 90,  90};
    int phase2R[] = {0,   180, 90,  90,  180, 0,   90,  90};
    for (int i = 0; i < 8; i++)
      phase[i] = phase1[i] * (1 - turn_factor) + phase2R[i] * turn_factor;
  }
  else {
    int phase1[] =  {0,   0,   90,  90,  180, 180, 90,  90};
    int phase2L[] = {180, 0,   90,  90,  0,   180, 90,  90};
    for (int i = 0; i < 8; i++)
      phase[i] = phase1[i] * (1 - turn_factor) + phase2L[i] * turn_factor + oscillator[i].getPhaseProgress();
  }

  execute(steps, period, amplitude, offset, phase);
}

void LARS::moonwalk(float steps, float T = 5000) {
  int z_amp = 45;
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {0, 0, z_amp, z_amp, 0, 0, z_amp, z_amp};
  int offset[] = {90, 90, 90, 90, 90, 90, 90, 90};
  int phase[] = {0, 0, 0, 120, 0, 0, 180, 290};

  execute(steps, period, amplitude, offset, phase);
}


void LARS::walk(int dir, float steps, float T) {
  int x_amp = 30;//15;
  int x_amp_test = 50;
  int z_amp = 20;
  int z_amp_test = 50;
  int ap = 20;
  int hi = 0; //23;
  //int hi = -10;
  //int front_x = 12;             // inner back, inner back , outer back, outer back, inner front  , inner  front, outer front , outer front
  int front_x = 0;
  float period[] ={T , T , T /2, T /2 , T , T , T / 2, T / 2}; //{T, T, T / 2, T / 2, T, T, T / 2, T / 2};
  int amplitude[] = {x_amp, x_amp, z_amp_test, z_amp_test, x_amp, x_amp, z_amp_test, z_amp_test};
  int offset[] = {   90 + ap - front_x,
                     90 - ap + front_x,
                     90 - hi +30,
                     90 + hi -30,
                     90 - ap - front_x,
                     90 + ap + front_x,
                     90 + hi -30,
                     90 - hi +30
                    /* 90,
                     90,
                     90,
                     90,
                     90,
                     90,
                     90,
                     90 */
                 };
  //int  phase[] = {90, 90, 270, 90, 270, 270, 90, 270};
  int  phase[] = {270, 270, 270, 90, 90, 90, 90, 270};
  if (dir == 0) { //forward
    phase[0] = phase[1] = 90;
    phase[4] = phase[5] = 270;
  }
  for (int i = 0; i < 8; i++) {
    oscillator[i].reset();
    oscillator[i].setPeriod(period[i]);
    oscillator[i].setAmplitude(amplitude[i]);
    oscillator[i].setPhase(phase[i]);
    oscillator[i].setOffset(offset[i]);
  }

  _final_time = millis() + period[0] * steps;
  _init_time = millis();
  bool side;
  while (millis() < _final_time) {
    side = (int)((millis() - _init_time) / (period[0] / 2)) % 2;
    setServo(0, oscillator[0].refresh());
    setServo(1, oscillator[1].refresh());
    setServo(4, oscillator[4].refresh());
    setServo(5, oscillator[5].refresh());

    if (side == 0) {
      setServo(3, oscillator[3].refresh());
      setServo(6, oscillator[6].refresh());
    }
    else {
      setServo(2, oscillator[2].refresh());
      setServo(7, oscillator[7].refresh());
    }
    delay(1);
  }
}

void LARS::upDown(float steps, float T = 5000) {
  int x_amp = 0;
  int z_amp = 35;
  int ap = 20;
  //int hi = 25;
  int hi = 0;
  int front_x = 0;
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {x_amp, x_amp, z_amp, z_amp, x_amp, x_amp, z_amp, z_amp};
  int offset[] = {    90 + ap - front_x,
                      90 - ap + front_x,
                      90 - hi,
                      90 + hi,
                      90 - ap - front_x,
                      90 + ap + front_x,
                      90 + hi,
                      90 - hi
                 };
  int phase[] = {0, 0, 90, 270, 180, 180, 270, 90};

  execute(steps, period, amplitude, offset, phase);
}


void LARS::pushUp(float steps, float T = 600) {
  int z_amp = 40;
  int x_amp = 65;
  int hi = 0;
  int Position =60;
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {0, 0, z_amp, z_amp, 0, 0, 0, 0};
  int offset[] = {90, 90, 90 - hi, 90 + hi, 90 - x_amp, 90 + x_amp, 90 + hi - Position, 90 - hi + Position};
  int phase[] = {0, 0, 0, 180, 0, 0, 0, 180};

  execute(steps, period, amplitude, offset, phase);
}

void LARS::hello() {
  float seated[] = {90 + 15, 90 - 15, 90 - 65, 90 + 65, 90 + 20, 90 - 20, 90 + 10, 90 - 10};
  moveServos(150, seated);
  delay(200);

  int z_amp = 40;
  int x_amp = 60;
  int T = 350;
  float period[] = {T, T, T, T, T, T, T, T};
  int amplitude[] = {0, 50, 0, 50, 0, 0, 0, 0};
  int offset[] = {
    90 + 15, 40,
    90 - 10, 90 + 10,
    90 + 20, 90 - 20,
    90 + 65, 90
  };

  int phase[] = {0, 0, 0, 90, 0, 0, 0, 0};

  execute(4, period, amplitude, offset, phase);

  float goingUp[] = {160, 20, 90, 90, 90 - 20, 90 + 20, 90 + 10, 90 - 10};
  moveServos(500, goingUp);
  delay(200);

}

void LARS::wave(int legNumber){
	int amplitude[] = { 0,0,0,0,0,0,0,0};
    int offsetLeg[] = { 0,0,0,0,0,0,0,0};

  int T = 350;
  switch ( legNumber) {
	  case 1 : {
		amplitude[1] = 60;
		int offset[] = {
			90-20 , 90-60,
			90 , 90+70 ,
			90 , 90+90 ,
			90+140 , 90
		};
		memcpy ( &offsetLeg, &offset, sizeof(offset) );
		break;
	  }
	  case 2 : {
		amplitude[0] = 60;
		int offset[]  = {
			90-20 , 90+20,
			90-70 , 90 ,
			90-60 , 90+90 ,
			90 , 90 -70
		};
		memcpy ( &offsetLeg, &offset, sizeof(offset) );
		break;
	  }
	  case 3 : {
		amplitude[4] = 60;
		int offset[]  = {
			90+40 , 90-60,
			90 , 90+70 ,
			90 , 90+0 ,
			90+140 , 90
		};
		memcpy ( &offsetLeg, &offset, sizeof(offset) );
		break;
	  }
	  case 4 : {
		amplitude[5]= 90;
		int offset[]  = {
			90-20 , 90-60,
			90-70 , 90 ,
			90+20 , 90+90 ,
			90 , 90-70
		};
		memcpy ( &offsetLeg, &offset, sizeof(offset) );
		break;
	  }
	  default :
	    if (debug) Serial.println("Error, leg does not exist");
		break;
  }

  float period[] = {T, T, T, T, T, T, T, T};
  int phase[] = {0, 0, 0, 90, 0, 0, 0, 0};

  execute(3, period, amplitude, offsetLeg, phase);
  delay (200);
}


void LARS::home() {
  int ap = 20;
  //int hi = 35;
  int hi = 0;
  int position[] = {90 + ap, 90 - ap, 90 - hi, 90 + hi, 90 - ap, 90 + ap, 90 + hi, 90 - hi};
  for (int i = 0; i < 8; i++) {
    if (position[i] + trim[i] <= 180 && position[i] + trim[i] > 0) {
      setServo(i, position[i] + trim[i]);
    }
  }
}



void LARS::reverseServo(int id) {
  if (reverse[id])
    reverse[id] = 0;
  else
    reverse[id] = 1;
}


void LARS::setServo(int id, float target) {
  if (!reverse[id])
    servo[id].writeMicroseconds(angToUsec(target + trim[id]));
  else
    servo[id].writeMicroseconds(angToUsec(180 - (target + trim[id])));
  _servo_position[id] = target + trim[id];
}

float LARS::getServo(int id) {
  return _servo_position[id];
}


void LARS::moveServos(int time, float target[8]) {
  if (time > 10) {
    for (int i = 0; i < 8; i++)	_increment[i] = (target[i] - _servo_position[i]) / (time / 10.0);
    _final_time =  millis() + time;

    while (millis() < _final_time) {
      _partial_time = millis() + 10;
      for (int i = 0; i < 8; i++) setServo(i, _servo_position[i] + _increment[i]);
      while (millis() < _partial_time); //pause
    }
  }
  else {
    for (int i = 0; i < 8; i++) setServo(i, target[i]);
  }
  for (int i = 0; i < 8; i++) _servo_position[i] = target[i];
}

void LARS::execute(float steps, float period[8], int amplitude[8], int offset[8], int phase[8]) {

  for (int i = 0; i < 8; i++) {
    oscillator[i].setPeriod(period[i]);
    oscillator[i].setAmplitude(amplitude[i]);
    oscillator[i].setPhase(phase[i]);
    oscillator[i].setOffset(offset[i]);
  }

  unsigned long global_time = millis();

  for (int i = 0; i < 8; i++) oscillator[i].setTime(global_time);

  _final_time = millis() + period[0] * steps;
  while (millis() < _final_time) {
    for (int i = 0; i < 8; i++) {
      setServo(i, oscillator[i].refresh());
    }
    yield();
  }
}
