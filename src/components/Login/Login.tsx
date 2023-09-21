import LoginImg from "../../assets/images/illustration.png"

function Login() {
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
    <input className="rounded-lg p-2 valid:border-primary-300 invalid:border-red-300 shadow-md" type="text" id="email" placeholder="Email de connexion">
    {/*
      Mettre mon icon ici en position absolute
      */}
  </input>
    {/*
      Mettre mon email valid et error
      */}
  </div>

  <div className="flex flex-col gap-2">
    <label htmlFor="password"> </label>
    <input className="rounded-lg p-2 valid:border-primary-300 invalid:border-red-300 shadow-md" type="password" id="password" placeholder="Mot de passe">
      {/*
      Mettre icon ici en position absolute
      */}
    </input>
    {/*
      Mettre password valid et error
      */}
  </div>
  <button className="bg-primary-300 w-full rounded-lg text-white px-20 py-1 mt-5 shadow-md shadow-primary-300" type="submit">Se connecter</button>
  <p className="mt-5 underline">Mot de passe oublié ?</p>
</form>
      </div>
    </div>
  )
}

export default Login;