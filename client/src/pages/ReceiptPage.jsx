import React, { useState } from 'react';
import Button from '../components/Button';
import TransactionCreate from '../components/TransactionCreate';
import Loading from '../components/Loading';
import { Error } from '../components/Error';

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
  const [baseCurrency, setBaseCurrency] = useState('');
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let totalPrice = null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleOCR = async () => {
    console.log(selectedImage);
    if (!selectedImage) {
      setResult([]);
      setErrors('Please select an image first');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('apikey', API_KEY);
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
        setErrors(null);
      } else {
        setResult([]);
        setErrors('Error occurred while processing the receipt.');
      }
    } catch (error) {
      setResult([]);
      setErrors('Error occurred while processing the receipt.');
    } finally {
      setIsLoading(false);
    }
  };
  console.log('result', result);

  const escapeRegExpMatch = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  const keywords = [
    'total',
    'total price',
    'total amount',
    'total:',
    'debit card',
    'credit card',
    'cash',
  ];

  for (const line of result) {
    const lineText = line.join(' ').toLowerCase();
    console.log(lineText);
    for (const keyword of keywords) {
      const keywordIndex = lineText.search(
        new RegExp(`\\b${escapeRegExpMatch(keyword)}\\b`)
      );
      if (keywordIndex !== -1) {
        const numericValues = line
          .slice(keywordIndex + keyword.split(' ').length)
          .filter((text) => !isNaN(Number(text)));

        if (numericValues.length > 0) {
          totalPrice = Number(numericValues[0]);
          break;
        }
      }
    }

    if (totalPrice !== null) {
      break;
    }
  }

  console.log('Total Price:', totalPrice);

  // const handleBaseCurrencyChange = (currency) => {
  //   setBaseCurrency(currency);
  // };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  const handleClick = () => {
    setErrors(null);
  };

  return (
    <>
      <div className="flex flex-col justify-center align-center pt-20 md:pt-10">
        {errors && <Error errors={errors} handleClick={handleClick} />}
        <p className="text-center">*Please put the image under 1024KB</p>
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
        <div className="p-3">
          <div className="sm:mt-10 md:mt-0 md:mb-4">
            <p className="text-3xl font-extrabold tracking-tight text-secondary mt-10 md:mt-0">
              Add To Transaction
            </p>
          </div>
          {/* TransactionCreateForm */}
          <TransactionCreate
            baseCurrency={baseCurrency}
            totalPriceFromOCR={totalPrice}
          />
        </div>
      </div>
    </>
  );
};

export default ReceiptPage;
