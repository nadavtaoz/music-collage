import { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../../../context/dashboard-context';
import { Album } from '../../../interfaces/music';

export default function DashboardContent() {
  const dashboardContext = useContext(DashboardContext);
  const [displayedAlbums, setDisplayedAlbums] = useState<Album[]>(
    dashboardContext?.albums ?? []
  );
  const [draggedElement, setDraggedElement] = useState<number | null>(null);

  useEffect(() => {
    if (dashboardContext?.albums && dashboardContext.albums.length) {
      setDisplayedAlbums(dashboardContext.albums);
    }
  }, [dashboardContext]);

  const handleDragStart = (index: number) => {
    setDraggedElement(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // Necessary to allow the drop event
  };

  const handleDrop = (index: number) => {
    if (draggedElement === null || draggedElement === index) return;

    // Swap images
    const newDisplayedAlbums = [...displayedAlbums];
    [newDisplayedAlbums[draggedElement], newDisplayedAlbums[index]] = [
      newDisplayedAlbums[index],
      newDisplayedAlbums[draggedElement],
    ];

    setDisplayedAlbums(newDisplayedAlbums);
    setDraggedElement(null);
  };

  if (!displayedAlbums.length) {
    return <h2>No albums yet...</h2>;
  }

  return (
    <ul className="albums-list grid grid-cols-3 gap-1 md:grid-cols-4">
      {displayedAlbums.map((a, index) => {
        return (
          <li
            key={a.name}
            draggable="true"
            onDrag={() => handleDragStart(index)}
            onDrop={() => handleDrop(index)}
            onDragOver={handleDragOver}
          >
            <img src={a.images && a.images[1].url} />
          </li>
        );
      })}
    </ul>
  );
}
