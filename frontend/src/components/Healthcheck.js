import React from 'react'
import { Redirect } from 'react-router-dom';

function Healthcheck() {
    return (
        <Redirect to="/admin/healthcheck/succeded" />
  )
}

export default Healthcheck