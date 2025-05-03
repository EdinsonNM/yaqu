export function MenuItem() {
  return (
    <div
      className="relative"
      data-twe-dropdown-ref
      data-twe-dropdown-alignment="end"
    >
      <a
        className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
        href="#"
        id="dropdownMenuButton2"
        role="button"
        data-twe-dropdown-toggle-ref
        aria-expanded="false"
      >
        <img
          src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
          className="rounded-full"
          style={{ height: 25, width: 25 }}
          alt=""
          loading="lazy"
        />
      </a>
      <ul
        className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
        aria-labelledby="dropdownMenuButton2"
        data-twe-dropdown-menu-ref
      >
        <li>
          <a
            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
            href="#"
            data-twe-dropdown-item-ref
          >
            Action
          </a>
        </li>
        <li>
          <a
            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
            href="#"
            data-twe-dropdown-item-ref
          >
            Another action
          </a>
        </li>
        <li>
          <a
            className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
            href="#"
            data-twe-dropdown-item-ref
          >
            Something else here
          </a>
        </li>
      </ul>
    </div>
  );
}
