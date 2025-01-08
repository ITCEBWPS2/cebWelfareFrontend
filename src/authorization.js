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
export const isSecretary= (user) => {
  return user?.role === "secretary" ? true : false;
};
export const isPresidentAndVicePresident= (user) => {
  return user?.role === "president" ? true : false ||
  user?.role === "vice_president" ? true : false;
};
export const isAssistantSecretaryandSecetary= (user) => {
  return user?.role === "assistant_secretary" ||
  user?.role === "secretary" ? true : false;
};
export const isTreasurerAndAssistantTreasurer= (user) => {
  return user?.role === "assistant_treasurer" ||
  user?.role === "treasurer" ? true : false;
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
