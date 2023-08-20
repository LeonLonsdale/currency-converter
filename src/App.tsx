import { useEffect, useState } from 'react';

import ConversionForm from './components/ConversionForm';
import CurrencySelect from './components/CurrencySelect';

function App() {
  const [value, setValue] = useState<number>(0);
  const [primaryCurrency, setPrimaryCurrency] = useState<string>('GBP');
  const [secondaryCurrency, setSecondaryCurrency] = useState<string>('USD');
  const [convertedValue, setConvertedValue] = useState<number>(0);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handlePrimaryCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrimaryCurrency(e.target.value);
  };

  const handleSecondaryCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSecondaryCurrency(e.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchConversion = async () => {
      try {
        if (value === 0 || secondaryCurrency === primaryCurrency) return;

        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${value}&from=${primaryCurrency}&to=${secondaryCurrency}`,
          { signal },
        );
        const data = await response.json();

        setConvertedValue(data.rates[secondaryCurrency]);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }

      return () => {
        controller.abort();
      };
    };
    fetchConversion();
  }, [value, primaryCurrency, secondaryCurrency]);

  return (
    <>
      <div className='App'>
        <ConversionForm value={value} onChangeValue={handleValue}>
          <CurrencySelect
            setCurrency={handlePrimaryCurrency}
            currency={primaryCurrency}
          />
          <CurrencySelect
            setCurrency={handleSecondaryCurrency}
            currency={secondaryCurrency}
          />
        </ConversionForm>
        <p>
          {secondaryCurrency === 'GBP'
            ? '£'
            : secondaryCurrency === 'EUR'
            ? '€'
            : '$'}
          {convertedValue}
        </p>
      </div>
    </>
  );
}

export default App;
