import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import WaitingPopup from '@/components-v2/WaitingPopup';
import rootReducer from '@/store/reducers';

export default {
  component: WaitingPopup,
  title: 'Popup/Waiting (redux)',
};

// eslint-disable-next-line react/prop-types
const Template = (store, args) => (
  <Provider store={store}>
    <WaitingPopup {...args} />
  </Provider>
);

export const WithoutValues = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: {
      waitingPopup: {},
    },
  }),
);

export const WithValues = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: {
      waitingPopup: {
        hidable: true,
        text: 'Random text',
        title: 'Random title',
      },
    },
  }),
);
