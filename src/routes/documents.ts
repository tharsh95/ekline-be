import { createDocument, getAllDocuments, getDocumentById, deleteDocumentById } from "../controllers/documentController";
import { uploadMiddleware } from "../middleware/upload";
import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.post(
    "/",
    uploadMiddleware,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({ error: "No file provided" });
                return; // Ensure the function exits if no file is provided
            }

            const { originalname, buffer } = req.file;
            const content: string = buffer.toString("utf-8");

            const document = await createDocument(originalname, content);

            // Respond with the created document
            res.status(201).json(document);
        } catch (error) {
            next(error);
        }
    }
);

router.get("/", async (req, res, next) => {
    try {
        const documents = await getAllDocuments();
        res.json(documents);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const document = await getDocumentById(req.params.id);
        res.json(document);
    } catch (error) {
        const err = error as Error; // Type assertion
        if (err.message.includes("Document not found")) {
            res.status(404).json({ error: err.message });
        } else {
            next(err);
        }
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await deleteDocumentById(req.params.id);
        res.status(204).send();
    } catch (error) {
        const err = error as Error; // Type assertion
        if (err.message.includes("Document not found")) {
            res.status(404).json({ error: err.message });
        } else {
            next(err);
        }
    }
});

export default router;