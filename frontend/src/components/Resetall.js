import React from 'react'
import { Redirect } from 'react-router-dom';

function Resetall() {
    return (
        <Redirect to="/admin/resetall/failed" />
  )
}

export default Resetall