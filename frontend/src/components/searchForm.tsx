import { NATIONALITIES } from "../constants/consts";
import Button from "./button";

interface SearchFormProps {
  onSubmit: () => void;
  nationality: string;
  count: number;
  setNationality: (nat: string) => void;
  setCount: (count: number) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  nationality,
  count,
  setNationality,
  setCount,
  loading,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="filters" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="nationality">Nationality</label>
        <select
          id="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          {NATIONALITIES.map((nat) => (
            <option key={nat.value} value={nat.value}>
              {nat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="count">Number of users</label>
        <input
          id="count"
          type="number"
          min={1}
          max={50}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>

      <Button loading={loading} label="Fetch Users" />
    </form>
  );
};

export default SearchForm;
