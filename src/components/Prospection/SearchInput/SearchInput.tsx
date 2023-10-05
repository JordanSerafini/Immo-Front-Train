// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import { filterInformations } from '../../../store/reducers/information';

// Assets
import search from '../../../assets/icons/search.svg';

// Shared Component
import Input from '../../Modals/AddInfoModal/Field/Input';

export default function SearchInput() {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(filterInformations(searchValue));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-0 block mx-auto my-6 w-fit md:mx-0 md:mb-3 md:mt-6"
    >
      <Input
        type="search"
        label="Recherche"
        inputName="search"
        placeholder="Effectuez votre recherche..."
        value={searchValue}
        onChange={setSearchValue}
        className="pl-10 appearance-none shadow-custom font-poppins w-72"
      >
        <button
          type="button"
          className="absolute right-2 top-1/2 translate-y-[-50%] focus:ring-2 z-20"
        >
          <img src={search} alt="Search icon" />
        </button>
      </Input>
    </form>
  );
}
