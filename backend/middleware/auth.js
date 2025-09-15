import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role, tenantId }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token invalid or expired" });
  }
}

export function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
}
