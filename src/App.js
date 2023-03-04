import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userMessage: "",
  });
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const { userName, userEmail, userMessage } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/user", user)
      .then((res) => {
        setData(res.data.message);
        setError(null);
      })
      .catch((err) => {
        setData("");
        setError(err.response.data.message);
      });
    setUser({
      userName: "",
      userEmail: "",
      userMessage: "",
    });
  };

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h2>Registration</h2>
      <h3 style={{ backgroundColor: error ? "res" : data ? "black" : null }}>
        {error ? error : data}
      </h3>
      <div className="Container">
        <form onSubmit={handleSubmit}>
          <span>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => onChangeHandler(e)}
              name="userName"
              id="userName"
              placeholder="Enter your username"
            />
          </span>
          <span>
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => onChangeHandler(e)}
              name="userEmail"
              id="userEmail"
              placeholder="Enter your email"
            />
          </span>
          <span>
            <label htmlFor="userMessage">Message</label>
            <textarea
              name="userMessage"
              value={userMessage}
              onChange={(e) => onChangeHandler(e)}
              id="userMessage"
              cols="30"
              rows="10"
            >
              Enter your message here
            </textarea>
          </span>
          <button type="submit">Registration</button>
        </form>
      </div>
    </div>
  );
}

export default App;
