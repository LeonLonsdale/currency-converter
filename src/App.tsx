import { useEffect, useState } from 'react';

import ConversionForm from './components/ConversionForm';
import CurrencySelect from './components/CurrencySelect';

function App() {
  const [value, setValue] = useState(0);
  const [primaryCurrency, setPrimaryCurrency] = useState('GBP');
  const [secondaryCurrency, setSecondaryCurrency] = useState('USD');
  const [convertedValue, setConvertedValue] = useState(0);
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(e.target.value));
  };

  const handlePrimaryCurrency = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setPrimaryCurrency(e.target.value);
  };

  const handleSecondaryCurrency = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSecondaryCurrency(e.target.value);
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      const res = await fetch(`https://api.frankfurter.app/currencies`);
      const data = await res.json();
      const curArray = Object.keys(data);
      setCurrencyList(curArray);
    };
    fetchCurrencies();
  }, []);

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
            currencyList={currencyList}
          />
          <CurrencySelect
            setCurrency={handleSecondaryCurrency}
            currency={secondaryCurrency}
            currencyList={currencyList}
          />
        </ConversionForm>
        <p>
          {value > 0 ? convertedValue : 0} {secondaryCurrency}
        </p>
      </div>
    </>
  );
}

export default App;
