

import { render } from '../temir/src';
import { createStdout } from './create-stdout';
import type { Component } from '@vue/runtime-core'

export const renderToString: (
  node: Component,
  options?: { columns: number }
) => string = (node, options = { columns: 100 }) => {
  const stdout = createStdout(options.columns);

  render(node, {
    // @ts-ignore
    stdout,
    debug: true
  });


  return stdout.get();
};
