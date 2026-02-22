import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Header from "./components/header";
import SearchForm from "./components/searchForm";
import Card from "./components/card/card";
import CardHeader from "./components/card/cardHeader";
import type { UserWithPet } from "./types/type";
import CardMedia from "./components/card/cardMedia";

function App() {
  const [nationality, setNationality] = useState<string>("ALL");
  const [count, setCount] = useState<number>(5);
  const [users, setUsers] = useState<UserWithPet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const apiBaseUrl =
    apiBase !== undefined ? apiBase.trim() : "http://localhost:8080";

  const fetchUsers = useCallback(async () => {
    if (count < 1 || count > 50) {
      setError("Number of users must be between 1 and 50.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set("count", String(count));
      if (nationality !== "ALL") {
        params.set("nat", nationality);
      }

      const response = await fetch(
        `${apiBaseUrl}/api/users-with-pet?${params.toString()}`,
      );
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: UserWithPet[] = await response.json();
      setUsers(data ?? []);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error while fetching users.";
      setError(message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [count, nationality, apiBaseUrl]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="app bg-gray-100 min-h-screen mx-auto max-w-5xl p-6 flex flex-col gap-6">
      <Header />

      <main className="flex flex-col gap-6">
        <SearchForm
          onSubmit={fetchUsers}
          nationality={nationality}
          count={count}
          setNationality={setNationality}
          setCount={setCount}
          loading={loading}
        />

        {error && <div className="alert alert-error text-black">{error}</div>}

        {!loading && users.length === 0 && !error && (
          <div className="empty-state">
            No users loaded yet. Try fetching some users.
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner" />
            <span>Loading users and dogs…</span>
          </div>
        )}

        {!loading && users.length > 0 && (
          <section className="grid" aria-label="Users with their dogs">
            {users.map((user) => (
              <Card key={user.id ?? user.email}>
                <CardHeader user={user} />
                <CardMedia
                  imgSrc={user.petImage}
                  altText={`${user.name}'s dog`}
                />
              </Card>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
