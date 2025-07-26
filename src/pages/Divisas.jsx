import { useState, useEffect } from 'react';
import { useCurrencyConverter } from '../shared/hooks/useDivisas';
import CurrencyInput from '../components/Divisas';
import ConversionResult from '../components/ResultConversion';

const CurrencyConverterPage = () => {
  const { result, loading, error, currencies, fetchCurrencies, convert } = useCurrencyConverter();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('GTQ');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleConvert = (e) => {
    e.preventDefault();
    if (amount && fromCurrency && toCurrency && parseFloat(amount) > 0) {
      convert(fromCurrency, toCurrency, parseFloat(amount));
    } else {
      alert('Please enter a valid amount greater than 0');
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result) {
      setAmount(result.conversionAmount.toFixed(2));
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="bg-[#00A2C1] text-white p-4 rounded-t-lg -mt-8 -mx-8 mb-6">
            <h2 className="text-xl font-bold">Currency Converter</h2>
            <p className="text-sm opacity-90">Convert between different currencies</p>
          </div>
          
          <form onSubmit={handleConvert}>
            <CurrencyInput
              label="Amount to convert"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              currencies={currencies}
              currency={fromCurrency}
              onCurrencyChange={(e) => setFromCurrency(e.target.value)}
            />
            
            <div className="flex justify-center my-2">
              <button
                type="button"
                onClick={swapCurrencies}
                className="p-2 rounded-full bg-[#2FB9C7] text-white hover:bg-[#00A2C1] transition duration-300"
                aria-label="Swap currencies"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <CurrencyInput
              label="Convert to"
              value={result?.conversionAmount || ''}
              currencies={currencies}
              currency={toCurrency}
              onCurrencyChange={(e) => setToCurrency(e.target.value)}
              readOnly
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1CAE88] hover:bg-[#2FB9C7] text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 mt-4"
            >
              {loading ? 'Converting...' : 'Convert'}
            </button>
          </form>
          
          <ConversionResult result={result} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;