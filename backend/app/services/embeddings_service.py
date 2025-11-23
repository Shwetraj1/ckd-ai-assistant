from sentence_transformers import SentenceTransformer
import chromadb

client = chromadb.Client()
collection = client.create_collection("ckd_knowledge")

model = SentenceTransformer("all-MiniLM-L6-v2")

def add_faq(text):
    embedding = model.encode(text).tolist()
    collection.add(
        documents=[text],
        metadatas=[{"source": "faq"}],
        ids=[str(hash(text))]
    )

def query_knowledge(question):
    results = collection.query(
        query_texts=[question],
        n_results=1
    )
    return results["documents"][0][0]
