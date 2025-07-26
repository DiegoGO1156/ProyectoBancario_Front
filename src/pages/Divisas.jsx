import { useState, useEffect } from 'react';
import { useCurrencyConverter } from '../shared/hooks/useDivisas';
import CurrencyInput from '../components/Divisas';
import ConversionResult from '../components/ResultConversion';

const CurrencyConverterPage = () => {
  const { result, loading, error, currencies, fetchCurrencies, convert } = useCurrencyConverter();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleConvert = (e) => {
    e.preventDefault();
    if (amount && fromCurrency && toCurrency) {
      convert(fromCurrency, toCurrency, amount);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="bg-[#00A2C1] text-white p-4 rounded-t-lg -mt-8 -mx-8 mb-6">
            <h2 className="text-xl font-bold">Currency Converter</h2>
          </div>
          
          <form onSubmit={handleConvert}>
            <CurrencyInput
              label="From"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              currencies={currencies}
              currency={fromCurrency}
              onCurrencyChange={(e) => setFromCurrency(e.target.value)}
            />
            
            <CurrencyInput
              label="To"
              value=""
              onChange={() => {}}
              currencies={currencies}
              currency={toCurrency}
              onCurrencyChange={(e) => setToCurrency(e.target.value)}
              readOnly
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1CAE88] hover:bg-[#2FB9C7] text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
            >
              Convert
            </button>
          </form>
          
          <ConversionResult result={result} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;