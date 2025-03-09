import { useEffect, useState } from 'react';
import { LinkType } from './header';

type MobileMenuProps = {
  links: LinkType[];
  isOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

export default function MobileMenu({
  links,
  isOpen,
  setMenuOpen,
}: MobileMenuProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(true);
      }, 100);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleCloseClick = () => {
    setMenuOpen(false);
  };

  if (!isOpen) {
    return '';
  }

  return (
    <div
      className={`fixed p-6 top-0 left-0 w-screen h-screen bg-white transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } lg:hidden`}
    >
      <div className="flex justify-between">
        <ul>
          {links.map((gl) => (
            <li key={gl.label}>
              <a
                key={gl.label}
                href={gl.link}
                className="text-2xl font-semibold"
              >
                {gl.label}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handleCloseClick} className="text-2xl font-bold">
            X
          </button>
        </div>
      </div>
    </div>
  );
}
