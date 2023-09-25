import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react"  

function EyeLogin() {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [password, setPassword] = useState(""); // Ajoutez votre gestionnaire de mot de passe ici

  const toggleEye = () => {
    setEyeOpen(!eyeOpen);
  };

  return (
    <div>
      <input
        type={eyeOpen ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {eyeOpen ? (
        <EyeOff
          icon={EyeOff}
          className="cursor-pointer text-2xl"
          onClick={toggleEye}
        />
      ) : (
        <Eye
          icon={Eye}
          className="cursor-pointer text-2xl"
          onClick={toggleEye}
        />
      )}
    </div>
  );
}

export default EyeLogin;
