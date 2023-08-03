import React, { useState } from 'react';

const ENDPOINT = 'https://api.ocr.space/parse/image';
const API_KEY = process.env.REACT_APP_RECEIPT_API_KEY;

const parseReceiptTable = (extractedText) => {
  const lines = extractedText.split('\n');
  const table = lines.map((line) => line.trim().split(/\s+/));
  return table;
};

const ReceiptPage = () => {
  const [result, setResult] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleOCR = async () => {
    if (!selectedImage) {
      setResult([]);
      alert('Please select an image first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('apikey', 'K89100680288957');
      formData.append('isTable', 'true');
      formData.append('image', selectedImage);

      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const ocr_result = await response.json();
        const extracted_text = ocr_result['ParsedResults'][0]['ParsedText'];
        const tableData = parseReceiptTable(extracted_text);
        setResult(tableData);
      } else {
        setResult([]);
        alert('Error occurred while processing the receipt.');
      }
    } catch (error) {
      setResult([]);
      alert('Error occurred while processing the receipt.');
    }
  };

  return (
    <div>
      <input type="file" alt="receipt_image" onChange={handleFileChange} />
      <button onClick={handleOCR}>Submit</button>
      <div>
        <h2>OCR Result:</h2>
        {result.length > 0 ? (
          <table>
            <tbody>
              {result.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No table data found in the OCR result.</p>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage;
