import type { Request, Response, NextFunction } from "express";

// Mock authentication middleware for Jest tests
// This bypasses JWT verification during testing.
export const protect = (req: Request, res: Response, next: NextFunction) => next();