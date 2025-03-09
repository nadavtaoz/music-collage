type ExpendMenuProps = {
  setMenuOpen: (isOpen: boolean) => void;
};

export default function ExpendMenu({ setMenuOpen }: ExpendMenuProps) {
  const handlieClick = () => {
    setMenuOpen(true);
  };

  return (
    <div className="flex lg:hidden">
      <button
        onClick={handlieClick}
        type="button"
        title="Open main menu"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            className="text-sgreen"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}
