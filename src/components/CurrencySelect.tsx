interface CurrencySelectProps {
  setCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currencyList: string[];
  currency: string;
}

const CurrencySelect = ({
  setCurrency,
  currency,
  currencyList,
}: CurrencySelectProps) => {
  return (
    <select value={currency} onChange={setCurrency}>
      {currencyList.map((cur) => (
        <option value={cur} key={cur}>
          {cur}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;
