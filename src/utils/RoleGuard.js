export function hasRole(requiredRole) {
  const role = localStorage.getItem("role");
  if (!role) return false;
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(role);
  }
  return role === requiredRole;
}
