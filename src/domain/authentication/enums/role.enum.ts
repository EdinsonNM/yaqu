export enum RoleName {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  KITCHEN_STAFF = "kitchen_staff",
  WAITER = "waiter",
  CASHIER = "cashier",
  BAR_STAFF = "bar_staff",
  RECEPTIONIST = "receptionist",
  GUEST = "guest",
}
export enum Role {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  KITCHEN_STAFF = 3,
  WAITER = 4,
  CASHIER = 5,
  BAR_STAFF = 6,
  RECEPTIONIST = 7,
  GUEST = 8,
}

export const RoleLabel: Record<RoleName, string> = {
  [RoleName.SUPER_ADMIN]: "Super Admin",
  [RoleName.ADMIN]: "Admin",
  [RoleName.KITCHEN_STAFF]: "Kitchen Staff",
  [RoleName.WAITER]: "Waiter",
  [RoleName.CASHIER]: "Cashier",
  [RoleName.BAR_STAFF]: "Bar Staff",
  [RoleName.RECEPTIONIST]: "Receptionist",
  [RoleName.GUEST]: "Guest",
};
export const getRoleLabel = (role: RoleName) => {
  return RoleLabel[role];
};
