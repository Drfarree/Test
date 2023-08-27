import React from 'react';

function Mdk() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="JupyterLab"
        src="http://localhost:8888/lab?"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
}

export default Mdk;
