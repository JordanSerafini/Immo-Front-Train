// === REACT === //
import { FormEvent, useEffect, useState } from 'react';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import { filterInformations } from '../../../store/reducers/information';

// === COMPONENTS === //
import Input from './Input';
import InfoBubble from '../Buttons/InfoBubble';

// === ASSETS === //
import { searchIcon } from '../../../assets';

export default function SearchInput() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const filteredInformations = useAppSelector(
    (state) => state.information.filteredInformations
  );

  // === LOCAL STATES === //
  const [searchValue, setSearchValue] = useState<string>('');

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchValue.length) {
      dispatch(filterInformations(searchValue));
    }
  };

  // === EFFECTS === //
  // This useEffect is important to reset filteredInformations and display all infos on the prospection page
  useEffect(() => {
    dispatch(filterInformations(''));
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-0 flex flex-col items-center gap-3 mx-auto my-8 lg:gap-3 lg:flex-row w-fit md:mx-0 md:mb-3 md:mt-10"
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
          className="absolute right-2 top-1/2 translate-y-[-50%] z-20"
        >
          <img src={searchIcon} alt="Search icon" />
        </button>
      </Input>

      <InfoBubble position='top-right' content="La recherche fonctionne selon l'adresse ou le nom des propriétaires." containerClassname='relative' />

      {searchValue.length > 0 && (
        <p className="text-lg italic">
          Nombre de résultat{filteredInformations.length > 1 ? 's' : ''} :{' '}
          <strong className="font-semibold">
            {filteredInformations.length}
          </strong>
        </p>
      )}
    </form>
  );
}
