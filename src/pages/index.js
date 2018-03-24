import React from 'react';
import Loadable from 'react-loadable';

const Loader = opts =>
  Loadable({
    loading: () => <div>Loading</div>,
    delay: 200,
    timeout: 10,
    ...opts,
  });

export const Issues = Loader({
  loader: () => import('./Issues'),
});
