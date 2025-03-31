const verifyToken = (req, res, next) => {
  console.log("Token ověření přeskočeno");
  next(); // Povolit všechny požadavky bez ověření
};

module.exports = verifyToken;
