import React from 'react';

import SlippagePopup from '@/components-v2/SlippagePopup';

export default {
  component: SlippagePopup,
  title: 'Popup/Slippage',
};

const Template = (args) => <SlippagePopup {...args} />;

export const Opened = Template.bind({});
Opened.args = {
  open: true,
};

export const Closed = Template.bind({});
Closed.args = {
  open: false,
};
