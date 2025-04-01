import axios from "axios";
import React, { FC, useState } from "react";

interface CreateUserProps {
  onUserAdded: () => void;
}

export const CreateUser: FC<CreateUserProps> = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      // Reset formu
      setName("");
      setEmail("");
      setPassword("");

      setMessage("Uživatel byl úspěšně vytvořen!");
      onUserAdded();
    } catch (error) {
      console.error("Chyba při vytváření uživatele:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Vytvořit nového uživatele</h2>
      <label>
        Jméno:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Vytvořit uživatele</button>
      {message && <p>{message}</p>}
    </form>
  );
};
