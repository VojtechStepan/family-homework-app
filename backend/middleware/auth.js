/* Middleware na backendu (např. v Node.js s Expressem) je funkce, která zpracovává požadavky mezi přijetím requestu a jeho finálním vyřízením (např. vrácením odpovědi). Používá se k různým účelům, jako například:

- Autentizace a autorizace – ověřuje, zda má uživatel přístup k určitém endpointu (např. verifyToken).
- Logování – sleduje a zaznamenává požadavky a odpovědi.
- Zpracování dat – např. převod JSON do objektu pomocí express.json().
- CORS (Cross-Origin Resource Sharing) – umožňuje nebo blokuje požadavky z jiných domén.
- Chyby – middleware může zachytávat a zpracovávat chyby (např. errorHandler). */

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Přístup odepřen, chybí token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Pokračuje k dalšímu middleware nebo route handleru
  } catch (error) {
    res.status(403).json({ msg: "Neplatný token" });
  }
};

module.exports = verifyToken;
