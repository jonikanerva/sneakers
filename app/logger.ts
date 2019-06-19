import winston from 'winston'
import { config } from '../config/config'

export const logger = winston.createLogger({
  level: config.logLevel,
  transports: [new winston.transports.Console()]
})
