import { NavLink } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  to: string;
};
export function ButtonItem({ children, to }: Props) {
  const defaultClass = [
    "flex",
    "rounded-[8px]",
    "items-center",
    "h-[44px]",
    "lg:px-2",
  ];
  const inactiveClass = [
    ...defaultClass,
    "bg-button-light-bg",
    "text-button-light-text",
    "dark:text-button-dark-text",
  ].join(" ");
  const activeClass = [
    ...defaultClass,
    "bg-button-light-bgActive",
    "text-dvnBlue-300",
    "text-dvnBlue-primary",
    "dark:bg-button-dark-bgActive",
    "dark:text-button-dark-textActive",
  ].join(" ");
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
      >
        {children}
      </NavLink>
    </li>
  );
}
