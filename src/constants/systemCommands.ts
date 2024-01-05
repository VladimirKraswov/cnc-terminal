// Команды Grbl '$'
// Команды «$» - это системные команды Grbl, используемые для настройки параметров, просмотра или изменения состояний и режимов работы Grbl, а также запуска цикла возврата в исходное положение.

export const SYSTEM_COMMANDS = {
  GET_SETTINGS: '$$',
  GET_GCODE_PARAMS: '$#',
  GCODE_STATUS_ANALYSIS: '$G', // Эта команда напечатает все активные режимы GCode в Grbl. При отправке этой команды, Grbl выдаст ответ начинающийся с [GС: и чтото типа:
  GET_STARTING_BLOCKS: '$N ',
  KILL_ALARM_BLOCK: '$X',
  HOME: '$H',
  ERASES_AND_RESTORES: '$RST=$',
  ERASES_AND_ZEROS_ALL_COORDINATE: '$RST=#',
  CLEARS_AND_RESTORES_ALL: '$RST=*',
  LASER_ON: 'M3',
  LASER_ON_DYNAMIC_MODE: 'M4'
}
