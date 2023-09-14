const DashboradPage = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
          <iframe
            title="JupyterLab"
            src="http://localhost:8080/lab?"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      );
}

export default DashboradPage;