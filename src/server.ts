import { success } from '@utils/logger/logger';
import chalk from 'chalk';
import app from './app';

// checkEnvironmentVariable();

const port = process.env.PORT;

app.listen(port, () => {
  success(`${process.env.APP_NAME} is listening on port: ${chalk.green(port)}`);
});
