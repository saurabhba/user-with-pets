interface ButtonProps {
  loading: boolean;
  label: string;
}

const Button = ({ loading, label }: ButtonProps) => {
  return (
    <button
      className="rounded-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 disabled:opacity-50"
      type="submit"
      disabled={loading}
    >
      {loading ? "Loading…" : label}
    </button>
  );
};

export default Button;
