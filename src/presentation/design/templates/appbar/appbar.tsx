import logo from "../../../assets/images/logo-small.png";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function AppbarLeftItems({ children }: Props) {
  return (
    <ul
      className="list-style-none me-auto flex flex-col ps-0 md:flex-row"
      data-twe-navbar-nav-ref
    >
      {children}
    </ul>
  );
}

export function AppbarRightItems({ children }: Props) {
  return <div className="relative flex items-center gap-1">{children}</div>;
}

export function AppbarContainer(props: Props) {
  let menuLeft;
  let menuRight;
  const content: React.ReactElement[] = [];

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === AppbarLeftItems) {
      menuLeft = child;
    } else if (child.type === AppbarRightItems) {
      menuRight = child;
    } else {
      content.push(child);
    }
  });
  return (
    <nav className="relative flex-no-wrap flex w-full items-center justify-between bg-containerComponent-light py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-2 dark:bg-containerComponent-dark">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 md:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="">menu</span>
        </button>

        <div
          className="!visible hidden flex-grow basis-[100%] items-center md:!flex sm:basis-auto "
          id="navbarSupportedContent1"
          data-twe-collapse-item
        >
          <a
            className="mb-4 me-5 ms-2 mt-3 flex items-center text-title-light dark:text-title-dark md:mb-0 md:mt-0"
            href="#"
          >
            <img src={logo} alt="TE Logo" loading="lazy" width={24} />
            &nbsp;Ridivi
          </a>
          {menuLeft}
        </div>

        {menuRight}
      </div>
    </nav>
  );
}

const Appbar = {
  Container: AppbarContainer,
  LeftItems: AppbarLeftItems,
  RightItems: AppbarRightItems,
};

export default Appbar;
