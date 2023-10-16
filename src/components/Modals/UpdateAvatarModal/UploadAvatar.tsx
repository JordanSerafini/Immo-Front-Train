// === REACT === //
import { useState } from 'react';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../hooks/redux';

// === REDUCERS === //
import { uploadAvatar } from '../../../store/reducers/avatar';

// === COMPONENTS === //
import ValidButton from '../../common/Buttons/ValidButton';

// === ASSETS === //
import { plusIcon } from '../../../assets';

export default function UploadAvatar() {
  // === Hook Execution Order === //
  const dispatch = useAppDispatch();

  // === Local State === //
  const [file, setFile] = useState<File>();

  const handleUploadSubmit = () => {
    const formData = new FormData();
    formData.append('file', file as unknown as string);

    dispatch(uploadAvatar(formData));
  };

  return (
    <fieldset className="flex items-center justify-center gap-5 my-2">
      <label
        htmlFor="file"
        className="w-[150px] aspect-square rounded-full bg-primary-300 flex flex-col items-center justify-center text-secondary-50 font-semibold font-poppins italic p-2 text-center shadow-custom hover:scale-105 duration-150"
      >
        {file ? (
          'Image prise en compte.'
        ) : (
          <>
            <img src={plusIcon} alt="Icon" className="min-w-[30px]" />
            Ajoutez un avatar
          </>
        )}
      </label>
      <input
        id="file"
        className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden aboslute -z-10"
        type="file"
        name="file"
        onChange={(event) => {
          if (event.target.files) setFile(event.target.files[0]);
        }}
      />
      {file && (
        <ValidButton content="Importer" onClickMethod={handleUploadSubmit} />
      )}
    </fieldset>
  );
}