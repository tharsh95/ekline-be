import { Document } from '../models/Document';

export const createDocument = async (filename: string, content: string) => {
  try {
    const document = new Document({
      filename,
      content
    });
    return await document.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to create document: ' + error.message);
    } else {
      throw new Error('Failed to create document: An unknown error occurred');
    }
  }
};

export const getAllDocuments = async () => {
  try {
    return await Document.find({})
      .select('filename createdAt')
      .sort({ createdAt: -1 });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to fetch documents: ' + error.message);
    } else {
      throw new Error('Failed to fetch documents: An unknown error occurred');
    }
  }
};

export const getDocumentById = async (id: string) => {
  try {
    const document = await Document.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }
    return document;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to fetch document: ' + error.message);
    } else {
      throw new Error('Failed to fetch document: An unknown error occurred');
    }
  }
};

export const deleteDocumentById = async (id: string) => {
  try {
    const document = await Document.findByIdAndDelete(id);
    if (!document) {
      throw new Error('Document not found');
    }
    return document;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to delete document: ' + error.message);
    } else {
      throw new Error('Failed to delete document: An unknown error occurred');
    }
  }
};