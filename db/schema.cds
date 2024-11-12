namespace my.app;

entity Embeddings {
    key ID : Integer;
    text   : String(500);
    embedding : Array of Double;  // Define vector as an array if supported
}