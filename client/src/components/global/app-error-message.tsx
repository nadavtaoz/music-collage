import { observer } from 'mobx-react-lite';
import { appErrorStore } from '../../stores/app-error-store';

const AppErrorMessage = observer(() => {
  if (!appErrorStore.show) return null;

  return (
    <div className="bg-red-500 text-white text-sm p-2 text-center flex justify-between items-center rounded-md">
      <span>{appErrorStore.message}</span>
      <button
        onClick={() => appErrorStore.hideError()}
        className="ml-4 px-2 py-1 bg-red-700 hover:bg-red-800 rounded"
      >
        ✕
      </button>
    </div>
  );
});

export default AppErrorMessage;
