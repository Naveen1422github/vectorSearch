// const cds = require('@sap/cds');
 
// module.exports = cds.service.impl(async function() {
//     const { Embeddings } = this.entities;  // Reference to the Embeddings entity
 
//     // Action to find similar embeddings
//     this.on('findSimilarEmbeddings', async (req) => {
//         const inputEmbedding = req.data.embedding;  // Extract the input embedding
 
//         // Validate input embedding
//         if (!inputEmbedding || inputEmbedding.length !== 384) {
//             return req.error(400, "Embedding must be a 384-dimensional array.");
//         }
 
//         // Convert input embedding to string format for SQL query (required for the query below)
//         const embeddingVector = `[${inputEmbedding.join(', ')}]`;
 
//         // SQL query to calculate cosine similarity
//         const query = `
//             SELECT 
//                 ID, 
//                 text, 
//                 embedding, 
//                 (SUM(A.embedding[i] * B.embedding[i]) / 
//                 (SQRT(SUM(A.embedding[i] * A.embedding[i])) * SQRT(SUM(B.embedding[i] * B.embedding[i])))) 
//                 AS similarity
//             FROM 
//                 Embeddings AS A, 
//                 JSON_TABLE(:embeddingVector, '$[*]' COLUMNS(i FOR ORDINALITY, value DOUBLE PATH '$')) AS B
//             ORDER BY 
//                 similarity DESC
//             LIMIT 5
//         `;
 
//         // Execute the query to calculate cosine similarity with all embeddings in the database
//         const results = await cds.run(SELECT.from(Embeddings).where(query, { embeddingVector }));
 
//         // Return the results with similarity scores
//         return results.map(row => ({
//             ID: row.ID,
//             text: row.text,
//             similarity: row.similarity
//         }));
//     });
// });


// // srv/embedding-service.js
// const cds = require('@sap/cds');

// module.exports = cds.service.impl(async function() {
//     const { Embeddings } = this.entities;

//     // Endpoint to find similar embeddings
//     this.on('findSimilarEmbeddings', async (req) => {
//         const inputEmbedding = req.data.embedding;

//         // Ensure the embedding data is an array
//         if (!Array.isArray(inputEmbedding)) {
//             throw new Error('Embedding data must be an array');
//         }

//         // Convert input embedding into a HANA-compatible format for the query
//         const embeddingVector = `[${inputEmbedding.join(', ')}]`;

//         // Create SQL query to find similar embeddings using cosine similarity
//         const query = `
//             SELECT
//                 ID, text, embedding,
//                 COSINE_SIMILARITY(:embeddingVector, embedding) AS similarity
//             FROM Embeddings
//             ORDER BY similarity DESC
//             LIMIT 10
//         `;

//         // Execute the query using cds.run()
//         try {
//             const results = await cds.run(query, { embeddingVector });

//             // Map the results to return only relevant data
//             return results.map(row => ({
//                 id: row.ID,
//                 text: row.text,
//                 similarity: row.similarity
//             }));
//         } catch (error) {
//             console.error('Error finding similar embeddings:', error);
//             throw new Error('Error executing the query for similar embeddings');
//         }
//     });
// });

