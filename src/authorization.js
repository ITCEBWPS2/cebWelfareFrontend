export const allowedRoles = [
  "admin",
  "super_admin",
  "president",
  "vice_president",
  "secretary",
  "assistant_secretary",
  "treasurer",
  "assistant_treasurer",
];

export const isSuperAdmin = (user) => {
  return user?.role === "super_admin" ? true : false;
};

export const isSecretaryOrAssistantSecretary = (user) => {
  return user?.role === "super_admin" ||
    user?.role === "secretary" ||
    user?.role === "assistant_secretary"
    ? true
    : false;
};

export const isTreasurerOrAssistantTreasurer = (user) => {
  return user?.role === "super_admin" ||
    user?.role === "treasurer" ||
    user?.role === "assistant_treasurer"
    ? true
    : false;
};
