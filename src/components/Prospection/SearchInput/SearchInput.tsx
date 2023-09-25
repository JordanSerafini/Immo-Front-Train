// React Hooks
import { FormEvent, useState } from 'react';

// Assets
import search from '../../../assets/icons/search.svg';

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-0 block mx-auto mt-3 mb-6 w-fit md:mx-0 md:mb-3 md:mt-6"
    >
      <input
        className="py-2 pl-10 duration-150 rounded-lg w-72 shadow-custom font-poppins focus:ring-4 ring-accent-300"
        type="text"
        placeholder="Effectuer votre recherche..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        name="search"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 translate-y-[-50%] focus:ring-2"
      >
        <img src={search} alt="Search icon" />
      </button>
    </form>
  );
}
