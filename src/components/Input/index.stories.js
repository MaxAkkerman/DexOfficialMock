import React from 'react';

import Input from '@/components-v2/Input';
import { tokens } from '@/constants/mocks';

export default {
  component: Input,
  title: 'Components/Input',
};

// eslint-disable-next-line react/prop-types
const Template = (args) => <Input {...args} />;

export const WithoutToken = Template.bind({});
WithoutToken.args = {
  label: 'From',
};

export const WithToken = Template.bind({});
WithToken.args = {
  label: 'From',
  token: tokens.WTON,
};
