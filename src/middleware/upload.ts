import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';

// Define storage to keep the file in memory
const storage: StorageEngine = multer.memoryStorage();

// Set up the multer instance with additional TypeScript types
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    if (!file.originalname.endsWith('.txt')) {
      cb(new Error('Only .txt files are allowed'));
      return;
    }
    cb(null, true);
  },
});

// Export the middleware for single file upload
export const uploadMiddleware = upload.single('document');
