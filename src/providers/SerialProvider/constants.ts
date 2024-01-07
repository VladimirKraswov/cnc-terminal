export const RESERVE = 7
export const GRBL_BUFFER_SIZE = 127 - RESERVE
export const REFRESH_PORTS_INTERVAL = 5000

export enum MachineStates {
  What = '???',
  Idle = 'Idle',
  Alarm = 'Alarm',
  Run = 'Run',
  Home = 'Home',
  Hold0 = 'Hold:0',
  Hold1 = 'Hold:1',
  Check = 'Check',
  Door = 'Door',
  Jog = 'Jog'
}

export enum JobStates {
  Run = 'Run',
  Pause = 'Pause',
  Stop = 'Stop',
  Alarm = 'Alarm',
  Error = 'Error',
  Check = 'Check',
  Hold = 'Hold',
  Done = 'Done',
}

export enum SerialBaud {
  B_9600 = '9600',
  B_14400 = '14400',
  B_19200 = '19200',
  B_38400 = '38400',
  B_57600 = '57600',
  Default = '115200',
}

export const enum ListenerEvents {
  UpdateSerial = 'updateSerial',
}

export const GRBL_ERROR_CODES = {
  Error_0: {
    error: 'error 0',
    name: 'STATUS_OK',
    description: 'All Good, This is an error code suggesting that there is NO error'
  },
  Error_1: {
    error: 'error 1',
    name: 'STATUS_EXPECTED_COMMAND_LETTER',
    description: 'Gcodes should start with a Letter, whatever was just sent to GRBL did not'
  },
  Error_2: {
    error: 'error 2',
    name: 'STATUS_BAD_NUMBER_FORMAT',
    description: 'The number part of the Gcode was invalid'
  },
  Error_3: {
    error: 'error 3',
    name: 'STATUS_INVALID_STATEMENT',
    description: 'Usually a bad GRBL Specific $ instruction'
  },
  Error_4: {
    error: 'error 4',
    name: 'STATUS_NEGATIVE_VALUE',
    description: 'Negative value received for an expected positive value.'
  },
  Error_5: {
    error: 'error 5',
    name: 'STATUS_SETTING_DISABLED',
    description: 'A call to a disabled function was issued: EG you issued $H for homing but your $20 (homing enable) parameter is set to 0 (off)'
  },
  Error_6: {
    error: 'error 6',
    name: 'STATUS_SETTING_STEP_PULSE_MIN',
    description: 'Your $0 (step pulse time) is too short, set it back to its default value, $0=10'
  },
  Error_7: {
    error: 'error 7',
    name: 'STATUS_SETTING_READ_FAIL',
    description: 'Corrupt EEPROM values, you will need to reconfigure all your $ values as they have been reset to default: this time once you have worked them all out, make a copy! This is a rare error.'
  },
  Error_8: {
    error: 'error 8',
    name: 'STATUS_IDLE_ERROR',
    description: 'You have issued a command only allowed when the machine active state is Idle. Example you sent $$ while the Active state was run (job was in progress)'
  },
  Error_9: {
    error: 'error 9',
    name: 'STATUS_SYSTEM_GC_LOCK',
    description: 'Machine is locked in error of some sort, and you tried to issue a movement command. Did you forget to $X the machine? Or is it sitting on a Limit Switch?'
  },
  Error_10: {
    error: 'error 10',
    name: 'STATUS_SOFT_LIMIT_ERROR',
    description: 'You will see this if you try to enable soft limits without also enabling homing cycle. Soft limits cannot work unless you first home the machine so it knows where it is!'
  },
  Error_11: {
    error: 'error 11',
    name: 'STATUS_OVERFLOW',
    description: 'GRBL has a max number of characters it will accept in one command, it received one that was too long: often happens when CAM software puts long comments in the file'
  },
  Error_12: {
    error: 'error 12',
    name: 'STATUS_MAX_STEP_RATE_EXCEEDED',
    description: 'You tried to set a Step rate that was too high, look at your $110, $111,$112 values!'
  },
  Error_13: {
    error: 'error 13',
    name: 'STATUS_CHECK_DOOR',
    description: 'You have the safety door function turned on and it is showing not closed… close it'
  },
  Error_14: {
    error: 'error 14',
    name: 'STATUS_LINE_LENGTH_EXCEEDED',
    description: 'You should not see this error and if you do you should know what it means!'
  },
  Error_15: {
    error: 'error 15',
    name: 'STATUS_TRAVEL_EXCEEDED',
    description: 'You have got soft limits turned on and configured, and the job you\'re trying to run is larger than you have told GRBL that your machine actually is. Either fix your soft limit values and if they are correct, look at why your CAM setup is trying to use more space than you actually have.'
  },
  Error_16: {
    error: 'error 16',
    name: 'STATUS_INVALID_JOG_COMMAND',
    description: 'Jogging command issued was not valid, possibly forgot the =… part'
  },
  Error_17: {
    error: 'error 17',
    name: 'STATUS_SETTING_DISABLED_LASER',
    description: 'Probably happened when you turned on $32 without enabling PWM: We don’t know a lot about this error: email us if you work it out and we can add it to this list'
  },
  Error_20: {
    error: 'error 20',
    name: 'STATUS_GCODE_UNSUPPORTED_COMMAND',
    description: 'Unsupported or invalid g-code command found in block.'
  },
  Error_21: {
    error: 'error 21',
    name: 'STATUS_GCODE_MODAL_GROUP_VIOLATION',
    description: 'Read: http://linuxcnc.org/docs/html/gcode/overview.html#_modal_groups'
  },
  Error_22: {
    error: 'error 22',
    name: 'STATUS_GCODE_UNDEFINED_FEED_RATE',
    description: 'You cannot issue a movement if no feed rate has been set: so issue something like F1000 (feed at 1000mm/min) before sending a movement command. You will likely only see this error when bashing stuff into the command prompt and not when using a GUI'
  },
  Error_23: {
    error: 'error 23',
    name: 'STATUS_GCODE_COMMAND_VALUE_NOT_INTEGER',
    description: 'Look into the command you sent, did it include a non-integer value?'
  },
  Error_24: {
    error: 'error 24',
    name: 'STATUS_GCODE_AXIS_COMMAND_CONFLICT',
    description: 'Two G-code commands that both require the use of the XYZ axis words were detected in the block.'
  },
  Error_25: {
    error: 'error 25',
    name: 'STATUS_GCODE_WORD_REPEATED',
    description: 'A G-code word was repeated in the block.'
  },
  Error_26: {
    error: 'error 26',
    name: 'STATUS_GCODE_NO_AXIS_WORDS',
    description: 'A G-code command implicitly or explicitly requires XYZ axis words in the block, but none were detected.'
  },
  Error_27: {
    error: 'error 27',
    name: 'STATUS_GCODE_INVALID_LINE_NUMBER',
    description: 'N line number value is not within the valid range of 1 – 9,999,999 – why not turn off line numbers in your CAM software'
  },
  Error_28: {
    error: 'error 28',
    name: 'STATUS_GCODE_VALUE_WORD_MISSING',
    description: 'A G-code command was sent, but is missing some required P or L value words in the line.'
  },
  Error_29: {
    error: 'error 29',
    name: 'STATUS_GCODE_UNSUPPORTED_COORD_SYS',
    description: 'Grbl supports six work coordinate systems G54-G59. G59.1, G59.2, and G59.3 are not supported.'
  },
  Error_30: {
    error: 'error 30',
    name: 'STATUS_GCODE_G53_INVALID_MOTION_MODE',
    description: 'The G53 G-code command requires either a G0 seek or G1 feed motion mode to be active. A different motion was active.'
  },
  Error_31: {
    error: 'error 31',
    name: 'STATUS_GCODE_AXIS_WORDS_EXIST',
    description: 'There are unused axis words in the block and G80 motion mode cancel is active.'
  },
  Error_32: {
    error: 'error 32',
    name: 'STATUS_GCODE_NO_AXIS_WORDS_IN_PLANE',
    description: 'A G2 or G3 arc was commanded but there are no XYZ axis words in the selected plane to trace the arc.'
  },
  Error_33: {
    error: 'error 33',
    name: 'STATUS_GCODE_INVALID_TARGET',
    description: 'The motion command has an invalid target. G2, G3, and G38.2 generates this error if the arc is impossible to generate or if the probe target is the current position.'
  },
  Error_34: {
    error: 'error 34',
    name: 'STATUS_GCODE_ARC_RADIUS_ERROR',
    description: 'A G2 or G3 arc, traced with the radius definition, had a mathematical error when computing the arc geometry. Try either breaking up the arc into semi-circles or quadrants, or redefine them with the arc offset definition.'
  },
  Error_35: {
    error: 'error 35',
    name: 'STATUS_GCODE_NO_OFFSETS_IN_PLANE',
    description: 'A G2 or G3 arc, traced with the offset definition, is missing the IJK offset word in the selected plane to trace the arc.'
  },
  Error_36: {
    error: 'error 36',
    name: 'STATUS_GCODE_UNUSED_WORDS',
    description: 'There are unused, leftover G-code words that aren’t used by any command in the block.'
  },
  Error_37: {
    error: 'error 37',
    name: 'STATUS_GCODE_G43_DYNAMIC_AXIS_ERROR',
    description: 'The G43.1 dynamic tool length offset command cannot apply an offset to an axis other than its configured axis. The Grbl default axis is the Z-axis.'
  },
  Error_38: {
    error: 'error 38',
    name: 'STATUS_GCODE_MAX_VALUE_EXCEEDED',
    description: 'You sent a number higher than expected, maybe for a tool change you tried to select tool 50000 or something?'
  }
}

export const GRBL_ALARM_CODES = {
  ALARM_1: {
    alarm: 'alarm 1',
    name: 'EXEC_ALARM_HARD_LIMIT',
    description: 'Hard Limit Error. A limit switch was triggered, this always results in the end of your job. The only time a limit switch should be hit is during a homing cycle, at any other time it will stop the system. Either your machine went too far in one direction and hit a switch or you have electrical noise getting into your limit switch wiring. Do not restart your job without rehoming or resetting / confirming the machine\'s position; it will unlikely be correct still!'
  },
  ALARM_2: {
    alarm: 'alarm 2',
    name: 'EXEC_ALARM_SOFT_LIMIT',
    description: 'Soft Limit Error. Either you or a Gcode file tried to send some axis past further than you have suggested it can in your $130, $131 ,$132 parameters'
  },
  ALARM_3: {
    alarm: 'alarm 3',
    name: 'EXEC_ALARM_ABORT_CYCLE',
    description: 'The Estop was hit! Same as a hard limit, just a different button: look at details above for Alarm 1'
  },
  ALARM_4: {
    alarm: 'alarm 4',
    name: 'EXEC_ALARM_PROBE_FAIL_INITIAL',
    description: 'Grbl was expecting your probe to be in a state other than that it is before starting a probing cycle: i.e., your tool is already touching the probe or similar'
  },
  ALARM_5: {
    alarm: 'alarm 5',
    name: 'EXEC_ALARM_PROBE_FAIL_CONTACT',
    description: 'Z axis was sent down as far as it dared (instructed) and did not hit a switch. Instead of digging to China it assumes you forgot to put an alligator clip on or that something else is wrong and so stops.'
  },
  ALARM_6: {
    alarm: 'alarm 6',
    name: 'EXEC_ALARM_HOMING_FAIL_RESET',
    description: 'Reset was issued during a homing cycle, or maybe falsely triggered by electrical noise in your system/environment if your estop button is connected to the Abort pin and not to the reset pin that is'
  },
  ALARM_7: {
    alarm: 'alarm 7',
    name: 'EXEC_ALARM_HOMING_FAIL_DOOR',
    description: 'Safety door was opened during a homing cycle, or maybe falsely triggered by electrical noise in your system/environment'
  },
  ALARM_8: {
    alarm: 'alarm 8',
    name: 'EXEC_ALARM_HOMING_FAIL_PULLOFF',
    description: 'Grbl tries to pull back off a switch and hit it a second time (slowly) during a homing cycle. Your Homing Pulloff value was not sufficient to enable the axis to move far enough away from the switch. Increase $27 to maybe 3 or 5mm: $27=5.000'
  },
  ALARM_9: {
    alarm: 'alarm 9',
    name: 'EXEC_ALARM_HOMING_FAIL_APPROACH',
    description: 'When homing, grbl will not travel further than the values in parameters $130, $131 ,$132 while trying to locate a limit switch. So even if your soft limits are off, make sure these values are correct or larger than your machine. Homing fail. Could not find limit switch within search distance. Defined as 1.5 * max_travel on search and 5 * pulloff on locate phases.'
  }
}

export const GRBL_HOLD_CODES = {
  Hold_0: {
    hold: 'hold 0',
    description: 'Hold complete. Ready to resume'
  },
  Hold_1: {
    hold: 'hold 1',
    description: 'Hold in-progress. Reset will throw an alarm'
  }
}

export const GRBL_DOOR_CODES = {
  Door_0: {
    door: 'Door 0',
    description: 'Door closed. Ready to resume.'
  },
  Door_1: {
    door: 'Door 1',
    description: 'Machine stopped. Door still ajar. Can’t resume until closed.'
  },
  Door_2: {
    door: 'Door 2',
    description: 'Door opened. Hold (or parking retract) in-progress. Reset will throw an alarm.'
  },
  Door_3: {
    door: 'Door 3',
    description: 'Door closed and resuming. Restoring from park, if applicable. Reset will throw an alarm.'
  }
}
