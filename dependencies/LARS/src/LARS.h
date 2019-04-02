#ifndef LARS_h
#define LARS_h

#if defined(ESP32)
  #include <ESP32_Servo.h>
#else
  #include <Servo.h>
#endif

#include "Octosnake.h"

// servo index to board_pins
#define debug 0

#define FRONT_RIGHT_HIP 0
#define FRONT_LEFT_HIP 1
#define FRONT_RIGHT_LEG 2
#define FRONT_LEFT_LEG 3
#define BACK_RIGHT_HIP 4
#define BACK_LEFT_HIP 5
#define BACK_RIGHT_LEG 6
#define BACK_LEFT_LEG 7

class LARS {

  public:
    LARS();
    void init();
    void init(int FRH = 26, int FLH = 25, int BRH = 17, int BLH = 16, int FRL = 27, int FLL = 5, int BRL = 23, int BLL = 13);
    void walk(int dir = 1, float steps = 1, float T = 800); // T initial 400
    void omniWalk(float steps, float T, bool side, float turn_factor);
    void turnL(float steps, float period);
    void turnR(float steps, float period);
    void moonwalk(float steps, float period);
    void dance(float steps, float period);
    void upDown(float steps, float period);
    void pushUp(float steps, float period);
    void hello();
    void home();
    void wave(int legNumber);

    void setServo(int id, float target);
    void reverseServo(int id);
    float getServo(int id);
    void moveServos(int time, float target[8]);

  private:
    Oscillator oscillator[8];
    Servo servo[8];
    int board_pins[8];
    int trim[8]; //deviation servo offset
    bool reverse[8];
    unsigned long _init_time;
    unsigned long _final_time;
    unsigned long _partial_time;
    float _increment[8];
    float _servo_position[8];

    void execute(float steps, float period[8], int amplitude[8], int offset[8], int phase[8]);
    inline int angToUsec(float value) {
      return value / 180 * (MAX_PULSE_WIDTH - MIN_PULSE_WIDTH) + MIN_PULSE_WIDTH;
    };

};

#endif
