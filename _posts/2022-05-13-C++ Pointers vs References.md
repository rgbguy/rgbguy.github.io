---
layout: post
title: "C++: Pointers vs References?"
date: 2019-05-13
categories: [general]
tags: [old-medium-posts, C++]
---
---

I know this comes under **THE BASICS**, but it's been misunderstood by programmers around the world for decades. This is my attempt to clarify it.


### 🧠 What's a Reference?

References are **nicknames** for an existing variable. When we compile the code, we don’t get two variables — the reference exists only in our source code.

A reference is exactly what it sounds like — a way to **refer** to an existing variable.  
Unlike pointers, references:
- **Cannot be null**
- **Must always refer to something**
- **Do not need validation**

```cpp
char& ref; //error - references must be initialized
char* p0;  //allowed in pointers. No errors.
```

- **References do not need storage (since they are just a nickname). They are NOT like your typical variable.**

```cpp
int a = 5
int *b = &a;
//creating a pointer. 
//Using & to look at the memory address.
int& ref = a; 
//this and previous lines are actually different. 
//& is used in both cases, however their usage is different.
//int& is a type.
Once you declare a reference, you cannot change what it references.
int c = 2;
ref = c;
//this will actually set the value of a to 2, and WON'T create a reference to c, as ref already refers a.
```

### When to use reference?
Use a reference: when you know that there will always be an object to refer to and you will never want to refer to anything else. Suitable to function parameters and return types (makes things look cleaner).

```cpp
void increment(int* a){ if(a){ (*a)++; } }
//pointers need validation.
//Hence the 'if' statement.
void increment(int& a){ a++; }
//no need to validate references.
//They will always refer to something.
//both the above functions do the same thing.
//They increment a. 2nd one looks a lot cleaner.
Hope that makes things clearer!
```