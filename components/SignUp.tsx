import React, { useState } from "react";

export const SignUp = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        username: username,
        password: password,
        expiresInMins: 30, 
      }),
      credentials: 'include' 
    })
      .then(res => res.json())
      .then(console.log);
      setUsername("");
      setPassword("");
  };

  return (
    <div style={{display:"flex" , flexDirection:"column"}}>
      <input 
        type="text"
        placeholder="Enter the username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter the password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};