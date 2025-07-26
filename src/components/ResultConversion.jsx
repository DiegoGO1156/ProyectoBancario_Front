const ConversionResult = ({ result, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00A2C1]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F29B00] bg-opacity-20 border-l-4 border-[#F29B00] p-4 mb-4 rounded">
        <p className="text-[#4B5B6A]">{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="mt-6 p-4 bg-[#EAE3D8] rounded-md">
      <h3 className="text-lg font-medium text-[#4B5B6A] mb-2">Conversion Result</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-[#4B5B6A]">From:</p>
          <p className="font-medium text-[#00A2C1]">{result.base}</p>
        </div>
        <div>
          <p className="text-sm text-[#4B5B6A]">To:</p>
          <p className="font-medium text-[#00A2C1]">{result.target}</p>
        </div>
        <div>
          <p className="text-sm text-[#4B5B6A]">Rate:</p>
          <p className="font-medium text-[#1CAE88]">{result.conversionRate}</p>
        </div>
        <div>
          <p className="text-sm text-[#4B5B6A]">Amount:</p>
          <p className="font-medium text-[#1CAE88]">{result.conversionAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversionResult;