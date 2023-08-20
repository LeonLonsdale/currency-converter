type ConversionFormProps = {
  value: number;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

const ConversionForm = ({
  value,
  onChangeValue,
  children,
}: ConversionFormProps) => {
  return (
    <form>
      <input type='number' value={value} onChange={onChangeValue} />
      {children}
    </form>
  );
};

export default ConversionForm;
