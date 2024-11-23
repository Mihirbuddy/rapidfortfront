import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('password', password);  // Password is added to the request body

        try {
            const response = await fetch('http://localhost:5001/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Upload error:', errorText);
                setMessage(`Error: ${response.statusText}`);
                return;
            }

            const data = await response.json();
            setMessage('File uploaded successfully!');
            setPdfUrl(data.pdfUrl);
        } catch (error) {
            console.error('Unexpected error:', error);
            setMessage('An error occurred while uploading the file.');
        }
    };

    return (
        <div className="abs" style={{ padding: '20px' }}>
            <h1>DOCX to PDF Converter</h1>
            <input type="file" onChange={handleFileChange} accept=".docx" />
            <br />
            <input
                type="password"
                placeholder="Enter password (optional)"
                value={password}
                onChange={handlePasswordChange}
                style={{ marginTop: '10px', padding: '5px' }}
            />
            <br />
            <button onClick={handleUpload} style={{ marginTop: '10px' }}>
                Upload and Convert
            </button>
            {message && <p>{message}</p>}
            {pdfUrl && (
                <p>
                    Download your PDF: 
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                        download
                    </a>
                </p>
            )}
        </div>
    );
};

export default App;
