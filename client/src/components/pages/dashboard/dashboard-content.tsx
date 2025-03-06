import { useContext, useState } from 'react';
import { DashboardContext } from '../../../context/dashboard-context';

type DashboardContentProps = {
  deleteMode: boolean;
  setDeleteMode: (mode: boolean) => void;
};

export default function DashboardContent({
  deleteMode,
  setDeleteMode,
}: DashboardContentProps) {
  const dashboardContext = useContext(DashboardContext);
  const [draggedElement, setDraggedElement] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (deleteMode) {
      dashboardContext?.deleteAlbum(index);
      setDeleteMode(false);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedElement(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // Necessary to allow the drop event
  };

  const handleDrop = (index: number) => {
    if (
      draggedElement === null ||
      draggedElement === index ||
      !dashboardContext ||
      deleteMode
    )
      return;

    dashboardContext.swapDisplayedAlbums(index, draggedElement);
    setDraggedElement(null);
  };

  if (!dashboardContext?.displayedAlbums.length) {
    return <h2>No albums yet...</h2>;
  }

  return (
    <ul
      className={`albums-list grid grid-cols-3 gap-1 md:grid-cols-4 2xl:grid-cols-5 ${
        deleteMode && 'delete-mode'
      }`}
    >
      {dashboardContext?.displayedAlbums.map((a, index) => {
        return (
          <li
            key={a.name}
            draggable="true"
            onDrag={() => handleDragStart(index)}
            onDrop={() => handleDrop(index)}
            onClick={() => handleClick(index)}
            onDragOver={handleDragOver}
          >
            <img src={a.images && a.images[1].url} />
          </li>
        );
      })}
    </ul>
  );
}
