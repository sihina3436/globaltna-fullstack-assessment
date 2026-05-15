import { Request, Response, NextFunction } from "express";

interface MongooseError extends Error {
  code?: number;
  kind?: string;
  errors?: Record<string, { message: string }>;
}

// 404 handler
export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

// Global error handler
export const errorHandler = (
  err: MongooseError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError" && err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message);
    res.status(400).json({ success: false, message: messages.join(". ") });
    return;
  }

  // Mongoose bad ObjectId
  if (err.name === "CastError" || err.kind === "ObjectId") {
    res.status(400).json({ success: false, message: "Invalid job ID format" });
    return;
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    res.status(409).json({ success: false, message: "Duplicate field value" });
    return;
  }

  // Default
  res.status(500).json({ success: false, message: "Internal server error" });
};