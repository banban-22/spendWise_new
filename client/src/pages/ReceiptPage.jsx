import React, { useState } from 'react';
import Button from '../components/Button';

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
      alert('Please select an image first');
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
  console.log(result);

  return (
    <div className="flex flex-col justify-center align-center">
      <div className="flex justify-center align-center">
        <input
          type="file"
          alt="receipt_image"
          className="bg-white p-2 rounded-lg mr-5"
          onChange={handleFileChange}
        />
        <Button
          bgColor="orange"
          hoverBgColor="amber-200"
          customWidth={'auto'}
          onClick={handleOCR}
          roundedSm={true}
          btnPadding={8}
        >
          Submit
        </Button>
      </div>
      <div className="flex flex-col justify-center align-center text-center mt-10">
        <h2 className="text-xl">Result:</h2>
        <div className="mx-auto">
          {result.length > 0 ? (
            <table className="border mt-8">
              <tbody className="border">
                {result.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="capitalize">No data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
