const CurrencyInput = ({ 
  label, 
  value, 
  onChange, 
  currencies, 
  currency, 
  onCurrencyChange,
  readOnly = false
}) => {
  return (
    <div className="mb-4">
      <label className="block text-[#4B5B6A] text-sm font-medium mb-2">{label}</label>
      <div className="flex">
        {!readOnly ? (
          <input
            type="number"
            value={value}
            onChange={onChange}
            className="flex-1 rounded-l-md border border-[#71A9CE] p-2 focus:outline-none focus:ring-2 focus:ring-[#00A2C1]"
            placeholder="Amount"
            min="0"
            step="0.01"
          />
        ) : (
          <div className="flex-1 rounded-l-md border border-[#71A9CE] bg-gray-100 p-2">
            {value || '--'}
          </div>
        )}
        <select
          value={currency}
          onChange={onCurrencyChange}
          className="rounded-r-md border border-[#71A9CE] bg-[#EAE3D8] p-2 focus:outline-none focus:ring-2 focus:ring-[#00A2C1]"
          disabled={readOnly}
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyInput;