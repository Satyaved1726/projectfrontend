import axios from "axios";
import { useState } from "react";

function Reg() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const changeName = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await axios.post(
        "https://cabsystemsms-1.onrender.com/register",
        data
      );

      alert(res.data);
    } catch (err) {
      alert(err.response?.data || "Error occurred");
    }
  };

  return (
    <>
      <h1>I am App</h1>

      <input
        type="text"
        name="username"
        placeholder="Enter username"
        onChange={changeName}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        onChange={changeName}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={changeName}
      />

      <button onClick={submit}>Register</button>
    </>
  );
}

export default Reg;