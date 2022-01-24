import React from 'react';

import SelectItem from '@/components-v2/SelectItem';

export default {
  component: SelectItem,
  title: 'Components/Select',
};

const Template = (args) => <SelectItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  token: {
    balance: 18.371355611,
    symbol: 'EVER',
    tokenName: 'Everscale',
  },
};
