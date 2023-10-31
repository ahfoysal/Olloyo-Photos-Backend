/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import { Console, splash } from 'stack-console';
import app from './app';
import config from './config/index';
import { errorlogger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    server = app.listen(config.port, () => {
      splash.message(config.port as string);
    });

    await mongoose.connect(config.database_url as string);
    Console.log(`🛢   Database is connected successfully`);
  } catch (err) {
    errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
