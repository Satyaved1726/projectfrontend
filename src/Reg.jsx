import { useState } from "react";

function Reg() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://project1-xpif.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });

      const data = await response.json();
      console.log(data);

      alert("User registered successfully");
    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };

  return (
    <div>
      <h1>I am App</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Reg;