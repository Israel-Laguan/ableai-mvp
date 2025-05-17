const unusedVar = 42; // <-- ¡ERROR: unnusedVar está declarado pero nunca se usa!

function greetUser() {
  console.log(unusedVar); // <-- ¡ERROR: undefinedVariable no está declarada!
}

greetUser();

// Otra variante: si intentas usar una función que no existe
// myUndefinedFunction(); // <-- ¡ERROR: myUndefinedFunction no está definida!
