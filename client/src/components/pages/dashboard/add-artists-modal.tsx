import { useState, type ChangeEvent } from 'react';
import Modal from '../../global/modal';
import { debounce } from '../../../util/debounce';
import apiService, { APIErrorCodes } from '../../../services/api-service';
import { userStore } from '../../../stores/user-store';
import { useNavigate } from 'react-router-dom';

export default function AddArtistsModal() {
  const [searchVal, setSearchVal] = useState<string>('');

  const navigate = useNavigate();

  const errorHandlers: Record<APIErrorCodes, () => void> = {
    [APIErrorCodes.TOKEN]: () => {
      alert('Token Error');
      userStore.deleteSpotifyToken();
      navigate('/');
    },
    [APIErrorCodes.GENERAL]: () => console.log('A general error occurred'),
    [APIErrorCodes.JWT]: () => {
      userStore.logout();
      navigate('/login');
    },
  };

  const callAPI = async (val: string) => {
    const result = await apiService.searchArtist(val);

    if (Object.values(APIErrorCodes).includes(result as APIErrorCodes)) {
      const cb = errorHandlers[result as APIErrorCodes];
      cb();
      return;
    }

    console.log(result);
  };

  const debounceCallAPI = debounce(callAPI, 1000);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);

    if (e.target.value.length > 2) {
      debounceCallAPI(e.target.value);
    }
  };

  return (
    <Modal isOpen={true}>
      <div className="h-full">
        <form className="flex flex-col h-full justify-between">
          <div>
            <h2 className="text-center">Add album</h2>
            <label>Search for an artist</label>
            <input
              type="text"
              value={searchVal}
              onChange={handleChange}
              className="text-field w-full md:w-auto"
            />
          </div>

          <button className="button inverted" type="button">
            Add Selected
          </button>
        </form>
      </div>
    </Modal>
  );
}
