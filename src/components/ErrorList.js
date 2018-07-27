import React from 'react';
import '../css/errorList.css';

export default function ErrorList(props) {
  return (
    <ul className="errors">
      { listErrors(props.errors) }
    </ul>
  );
}

function listErrors(errors) {
  if (errors === undefined) return;
  return errors.map((error, i) => <li key={i}>{error}</li>);
}
