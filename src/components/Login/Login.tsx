import React, { useState } from 'react';
import { Eye, EyeOff, Mail } from "lucide-react";
import LoginImg from "../../assets/images/illustration.png";

//La fonction Login est un composant React qui gère l'état de l'affichage du mot de passe
function Login() {
//useState est un hook React qui permet de définir une variable d'état et une fonction pour la mettre à jour
//Dans ce cas, il y a deux variables d'état : showPassword et password. showPassword est un booléen qui indique si le mot de passe doit être affiché ou non, et password est une chaîne de caractères qui stocke le mot de passe.
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={LoginImg} alt="" />
      </div>

      <div className="bg-secondary-100 flex flex-col justify-center">
        <h2 className="text-4xl font-bold uppercase text-center pb-20 bg-gradient-to-tr from-blue-800 via-violet-500 to-violet-300 text-transparent bg-clip-text">Connexion</h2>
        <form className="max-w-[400px] w-full mx-auto mt-20 text-center flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email"> </label>
            <div className="relative">
              <input className="w-full rounded-lg p-2 pl-10 valid:border-primary-300 invalid:border-red-300 shadow-md" type="text" id="email" placeholder="Email de connexion" />
              <Mail className="absolute top-1/2 -translate-y-1/2 left-2 text-slate-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password"> </label>
            <div className="relative">
              <input
                className="w-full rounded-lg p-2 pl-10 valid:border-primary-300 invalid:border-red-300 shadow-md"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <Eye
                  className="absolute top-1/2 -translate-y-1/2 left-2 text-slate-400 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeOff
                  className="absolute top-1/2 -translate-y-1/2 left-2 text-slate-400 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <button className="bg-primary-300 w-full rounded-lg text-white px-20 py-1 mt-5 shadow-md shadow-primary-300" type="submit">Se connecter</button>
          <p className="mt-5 underline">Mot de passe oublié ?</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
