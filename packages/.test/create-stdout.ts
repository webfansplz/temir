import EventEmitter from 'events';
import { spy } from 'sinon';

// Fake process.stdout
interface Stream extends EventEmitter {
  output: string;
  columns: number;
  write(str: string): void;
  get(): string;
}

interface StdoutInstance {
  columns: number
  write: typeof spy
  get: () => string
}

let activeStdout: StdoutInstance

export function getActiveStdout() {
  return activeStdout
}

export const createStdout = (columns?: number): Stream => {
  const stdout = new EventEmitter() as StdoutInstance;
  stdout.columns = columns ?? 100;
  stdout.write = spy();
  stdout.get = () => (stdout.write.lastCall?.args?.[0])

  activeStdout = stdout
  return stdout;
};
