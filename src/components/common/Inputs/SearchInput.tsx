// React Hooks
import { FormEvent, useEffect, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import { filterInformations } from '../../../store/reducers/information';

// Assets
import search from '../../../assets/icons/search.svg';

// Shared Component
import Input from '../../Modals/AddInfoModal/Field/Input';

export default function SearchInput() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Local States
  const [searchValue, setSearchValue] = useState<string>('');

  // Redux states
  const filteredInformations = useAppSelector(
    (state) => state.information.filteredInformations
  );

  // Handlers
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue.length) {
      dispatch(filterInformations(searchValue));
    }
  };

  // This useEffect is important to reset filteredInformations and display all infos on the prospection page
  useEffect(() => {
    dispatch(filterInformations(''));
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-0 flex flex-col items-center gap-3 mx-auto my-8 lg:gap-5 lg:flex-row w-fit md:mx-0 md:mb-3 md:mt-10"
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
          type="submit"
          className="absolute right-2 top-1/2 translate-y-[-50%] focus:ring-2 z-20"
        >
          <img src={search} alt="Search icon" />
        </button>
      </Input>

      {searchValue.length > 0 && (
        <p className="text-lg italic">
          Nombre de résultat{filteredInformations.length > 1 ? 's' : ''} :{' '}
          <span className="font-semibold">{filteredInformations.length}</span>
        </p>
      )}
    </form>
  );
}
