// EMAIL
export function validateEmail(email) {
  return email.includes("@");
}

// PASSWORD LENGTH
export function validatePassword(pass) {
  return pass.length >= 6;
}

// PASSWORD MATCH
export function validatePasswordsMatch(pass, pass2) {
  return pass === pass2;
}

// INITIALS
export function getInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// GREETING
export function getGreeting(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}