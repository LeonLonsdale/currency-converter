type CurrencySelectProps = {
  setCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currency: string;
};

const CurrencySelect = ({ setCurrency, currency }: CurrencySelectProps) => {
  return (
    <select value={currency} onChange={setCurrency}>
      <option value='USD'>USD</option>
      <option value='CAD'>CAD</option>
      <option value='GBP'>GBP</option>
      <option value='EUR'>EUR</option>
    </select>
  );
};

export default CurrencySelect;
