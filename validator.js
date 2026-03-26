let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log("PASSED:", name);
    passed++;
  } catch (e) {
    console.log("FAILED:", name);
    console.log("   →", e.message);
    failed++;
  }
}

function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected) {
        throw new Error(`ожидал "${expected}", получил "${value}"`);
      }
    },
    toContain(str) {
      if (!value.includes(str)) {
        throw new Error(`ожидал что "${value}" содержит "${str}"`);
      }
    }
  };
}

function validateEmail(email) {
  return email.includes("@");
}

function validatePassword(pass) {
  return pass.length >= 6;
}

function validatePasswordsMatch(pass, pass2) {
  return pass === pass2;
}

function getInitials(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getGreeting(hour) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
// тесты
test("нормальный email должен пройти", () => {
  expect(validateEmail("user@mail.com")).toBe(true);
});

test("email без @ не должен пройти", () => {
  expect(validateEmail("usermail.com")).toBe(false);
});

test("пустой email не должен пройти", () => {
  expect(validateEmail("")).toBe(false);
});


// пароль
test("пароль 6 символов — ок", () => {
  expect(validatePassword("abc123")).toBe(true);
});

test("пароль 10 символов — ок", () => {
  expect(validatePassword("supersecret")).toBe(true);
});

test("пароль 3 символа — слишком короткий", () => {
  expect(validatePassword("abc")).toBe(false);
});

test("пустой пароль — не ок", () => {
  expect(validatePassword("")).toBe(false);
});


// совпадение паролей
test("одинаковые пароли совпадают", () => {
  expect(validatePasswordsMatch("pass123", "pass123")).toBe(true);
});

test("разные пароли не совпадают", () => {
  expect(validatePasswordsMatch("pass123", "pass999")).toBe(false);
});

test("пустые пароли совпадают между собой", () => {
  expect(validatePasswordsMatch("", "")).toBe(true);
});


// инициалы
test("одно слово — одна буква", () => {
  expect(getInitials("Alice")).toBe("A");
});

test("два слова — две буквы", () => {
  expect(getInitials("John Doe")).toBe("JD");
});

test("три слова — берёт только первые два", () => {
  expect(getInitials("Anna Maria Lopez")).toBe("AM");
});


// приветствие по времени
test("утро — Good morning", () => {
  expect(getGreeting(9)).toBe("Good morning");
});

test("день — Good afternoon", () => {
  expect(getGreeting(14)).toBe("Good afternoon");
});

test("вечер — Good evening", () => {
  expect(getGreeting(21)).toBe("Good evening");
});

test("полночь — Good morning", () => {
  expect(getGreeting(0)).toBe("Good morning");
});


console.log("─────────────────────────────");
console.log(`итого: ${passed + failed} тестов`);
console.log(` прошло: ${passed}`);
console.log(` упало: ${failed}`);