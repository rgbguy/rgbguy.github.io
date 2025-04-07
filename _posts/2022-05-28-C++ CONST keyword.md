---
layout: post
title: "C++: CONST keyword?"
date: 2019-05-28
categories: [general]
tags: [old-medium-posts, C++]
---
---

Const is a promise that the variable declared as const, will not change. It’s a promise, hence it can be broken.

When we deal with const and pointers, it can be used in 2 ways.
1. making the value constant
2. making the memory address that it points to constant.

```cpp
const int a = 2;
a = 5; //throws error. Can’t change it.
//How to read const? : Read it from right to left.
const int *b; //pointer to an int constant
int const *b; //pointer to a constant integer
//above 2 statements mean the same thing.
int * const b;//constant pointer to an integer
const int* const a; //constant pointer to an integer constant
```

**Constant functions: Always make your methods const, if they do not modify members.**

```cpp
void GetA () const { return a; } 
//makes sure that the method doesn't modify a. Good for getters.
```

What if we need to modify some variable, but keep all others constant. How do we make sure?

```cpp
class TestClass
{
  int m_a, m_b;
  mutable int m_c; //can be changed by constant functions too!
  void GetA() const { m_c++; return m_a; } 
  //modifies m_c but can't modify m_a
}
```

Hope you learnt something new today.