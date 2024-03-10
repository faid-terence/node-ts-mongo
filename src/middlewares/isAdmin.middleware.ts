import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user?: any; // Define the user property
}

export const isAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from bearer header

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
    req.user = decoded; // Store decoded user information in request object
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
};
