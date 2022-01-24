import values from 'lodash/values';
import React from 'react';

import SelectPopup from '@/components-v2/SelectPopup';
import { tokens } from '@/constants/mocks';

export default {
  component: SelectPopup,
  title: 'Popup/Select tokens',
};

// eslint-disable-next-line react/prop-types
const Template = (args) => <SelectPopup {...args} />;

export const Empty = Template.bind({});

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const WithTokens = Template.bind({});
WithTokens.args = {
  loading: false,
  tokens: values(tokens),
};
