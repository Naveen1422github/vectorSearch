using { my.app as db } from '../db/schema';
 
namespace my.app;
 
service EmbeddingService {
 
    // Expose the Embeddings entity as a projection on db.Embeddings
    entity Embeddings as projection on db.Embeddings;
 
    // Define a custom structure for the action result
    type SimilarEmbeddingResult {
        ID        : Integer;
        text      : String(500);
        similarity: Double;
    }
 
    // Action to find similar embeddings
    action findSimilarEmbeddings(embedding: Array of Double) returns array of SimilarEmbeddingResult;
 
}