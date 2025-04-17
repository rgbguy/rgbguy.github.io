---
layout: post
title: "LLM 101: Understanding Indexing in Vector Databases"
date: 2025-04-19
categories: [ai, vector-db, search]
tags: [indexing, embeddings, similarity-search, vector-databases]
---

> "In traditional databases, indexing helps you find *where* something is. In vector databases, indexing helps you find *what’s similar*."

As I was trying to understand how vector databases work, I had a bunch of questions:  

How does indexing work here? Is it like hashing? What even *is* indexed — and why?

This post is a complete breakdown of those questions.

---

## 🧠 Why Indexing Matters in a Vector DB

Let’s say you’ve stored 1 million sentence embeddings (vectors).  
When a new query comes in — “How do black holes form?” — the database needs to **find the most similar vectors** from the million it has.

Without indexing, it would have to compute similarity with *every single vector*.

That’s fine for 10 vectors. But for millions? That’s way too slow.

**Enter: indexing.**

---

## ✅ What is Indexed?

In vector databases, the index is built **on the embedding vectors themselves**.

Each stored record typically looks like this:

```json
{
  "id": "doc_001",
  "vector": [0.12, -0.45, 0.87, ..., 0.33],
  "metadata": {
    "title": "Black Holes",
    "source": "NASA"
  },
  "text": "How does a black hole form?"
}
```

So what's being indexed?  
🔹 The **vector** — for similarity search  
🔹 (Optionally) **metadata** — for filtering (e.g., topic = "astronomy")

---

## 🔍 What Does Indexing Actually Do?

Indexing builds a structure that allows the DB to **quickly find the most similar vectors** without checking all of them.

This is different from traditional DBs where you search for exact values.

In a vector DB, similarity is usually calculated using:
- **Cosine similarity**
- **Dot product**
- **Euclidean distance**

The index helps **narrow down the candidates**, so the DB can compare only the most relevant ones.

---

## ❓Is Vector Indexing Like Hashing?

> **Short answer:** Sometimes. But not always.

There’s a common assumption that indexing = hashing (like in traditional key-value stores). But in vector databases, **only some algorithms** use actual hash functions.

Let’s explore the common indexing methods to see where hashing fits in — and where it doesn’t.

---

## 🔧 Types of Indexing in Vector DBs

### 1. **Flat Index (Brute-force)**

- Compares your query to *every* stored vector
- ✅ 100% accurate  
- ❌ Very slow for large datasets

Used for:
- Small datasets
- Debugging or testing

---

### 2. **HNSW (Hierarchical Navigable Small World)**

- Builds a **graph** where vectors are connected to their nearest neighbors
- When you search, you start at a node and “walk” closer to the most similar vectors
- Think of it like a network of shortcuts in a city

✅ Fast  
✅ High accuracy  
❌ Slightly more memory usage

Used in: Weaviate, Qdrant, Milvus

---

### 3. **IVF (Inverted File Index)**

- Uses **K-means** clustering to bucket vectors into groups
- When you search, it only checks vectors in the most relevant bucket(s)

✅ Good balance of speed and accuracy  
❌ Less accurate than HNSW

Used in: FAISS, Milvus

---

### 4. **PQ (Product Quantization)**

- Compresses vectors by breaking them into chunks and encoding them with smaller representations
- Very memory-efficient  
- Slower and less accurate than others

Used for: Billion-scale data where memory is limited

---

### 5. **LSH (Locality Sensitive Hashing)** ✅ *This one uses hashing!*

- Hashes similar vectors into the same bucket
- Fast but less precise
- Not used as often now, but useful in some scenarios

Used for: Approximate nearest neighbor search in theory-heavy setups

---

## 📌 Summary Table

| Index Type | Uses Hashing? | Speed     | Accuracy  | Good For                |
|------------|----------------|-----------|-----------|--------------------------|
| Flat       | ❌              | ❌ Slow   | ✅ Exact  | Small datasets           |
| HNSW       | ❌              | ✅ Fast   | ✅ High   | Real-time applications   |
| IVF        | ❌              | ✅ Fast   | ⚖️ Medium | Balanced performance     |
| PQ         | ❌              | ✅ Fast   | ❌ Lower  | Memory-constrained setups|
| LSH        | ✅              | ✅ Fast   | ❌ Lower  | Simple, large-scale use  |

---

## 🧠 So... What Does Indexing Actually Store?

A vector index stores:

- The **vector space structure** (graph, clusters, hash buckets)
- Each vector’s **location in that space**
- Optionally, **metadata** for filtering and retrieval

> It’s not like a table of rows.  
> It’s more like a **map** of where everything is in meaning-space — so you can jump to the right area quickly.

---

## ⚡ TL;DR

- **Indexing is critical** in vector DBs to make similarity search fast
- It’s done directly on the **vectors** (embeddings)
- **Not all indexing is hashing** — most use graphs or clustering
- You choose the indexing method based on your **accuracy/speed/memory** needs

---