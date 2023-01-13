import React from 'react'
import Admin from '../Admin';

function AdminPage(props) {
    const { params } = props.match;
    let c = params.check;
    let r = params.result;

    return (
        <Admin check={c} result={r} upd={false} />
    );
}

export default AdminPage