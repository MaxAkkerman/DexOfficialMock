import { SnackbarProvider } from 'notistack';
import React from 'react';

import Alert from '@/components-v2/Alert';

export default {
  component: Alert,
  title: 'Components/Alert',
};

const Template = (args) => (
  <SnackbarProvider>
    <Alert {...args} />
  </SnackbarProvider>
);

export const Info = Template.bind({});
Info.args = {
  id: 0,
  message: 'Info message',
  type: 'info',
};

export const ErrorMsg = Template.bind({});
ErrorMsg.args = {
  id: 1,
  message: 'Error message',
  type: 'error',
};

export const Success = Template.bind({});
Success.args = {
  id: 2,
  message: 'Success message',
  type: 'success',
};
