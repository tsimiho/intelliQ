import React from 'react';
import { Redirect } from 'react-router-dom';

function ErrorPageHelp() {
  return (
    <Redirect to='/error/400' />
  )
}

export default ErrorPageHelp