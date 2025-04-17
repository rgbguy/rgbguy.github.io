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

## 🧠 So... What Does Indexing Actually Store?

A vector index stores:

- The **vector space structure** (graph, clusters, hash buckets)
- Each vector’s **location in that space**
- Optionally, **metadata** for filtering and retrieval

> It’s not like a table of rows.  
> It’s more like a **map** of where everything is in meaning-space — so you can jump to the right area quickly.

---


## 🧠 What Indexing Really Means

Let’s step away from the technicalities for a moment.

Usually, an **index** is like the first page of a notebook — a **table of contents** that tells you *what lies on what page*. Instead of flipping through every page, you just jump to the exact one you need.

In vector databases, the idea is similar — but instead of storing exact matches or page numbers, we store **vectors that represent meaning**.

> So the "index" is a technique that helps the system **remember where to find similar meanings**, not exact values.

---

### 🧭 What Happens When You Add Something to a Vector DB?

When you insert a new piece of data (like a sentence), it’s first:
1. Converted into an embedding (a vector)
2. Then added to the database using an **indexing method**

But here’s the twist:
- **Where it gets added depends on the indexing strategy.**
- There are no “pages” — just a **spatial structure** that organizes similar meanings together.

---

### ✏️ Easy to remember:

| Indexing Method | Real-World Analogy                                        |
|------------------|-----------------------------------------------------------|
| Flat             | You toss the note at the back of the notebook and read all pages to find anything |
| HNSW             | You place your note in a neighborhood with other similar notes and connect them with arrows |
| IVF              | You file the note under a chapter based on what it’s about |
| LSH              | You stamp it with a keyword and put it in a folder with others with the same stamp |

---

> In short, indexing in vector databases is not about *where* something is stored — it’s about *how it's made findable* based on meaning.

---