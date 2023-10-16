# IMMO'PROS

Immo'Pros est une application de gestion de prospection Immobilière.
Elle est vouée à être utilisée en interne.

## Installation

``` bash
npm install
```

## GIT

On pense à tirer une nouvelle branch depuis main :

``` bash
git checkout -b <branchName>
```

## CORS & AXIOS

Les CORS de l'API n'acceptent que des requêtes provenants de : [Immo'pros - App](https://immopros-app.com/).

Il faut donc lancer le back en local *(Cf repo back).* Puis modifier les CORS dans l'index.js pour permettre la provenance depuis : http://localhost:3000/ & http://localhost:3001/

## URL Axios instance

**FilePath :** *"./src/utils/axios.ts"*

``` ts
...
export default axios.create({
  baseURL: 'http://localhost:5000/'
});
...
```

## Lancement

``` bash
npm run dev
```

## Tests unitaires

``` bash
npm run test
h
p
=> <fileName>.test.ts
```