const Header = () => {
  return (
    <header className="flex flex-col items-start gap-2">
      <h1 className="text-2xl font-bold">Users &amp; Their Dogs</h1>
      <p className="text-gray-700">
        Fetch random users from RandomUser and pair each one with a random dog
        from Dog API.
      </p>
    </header>
  );
};

export default Header;
