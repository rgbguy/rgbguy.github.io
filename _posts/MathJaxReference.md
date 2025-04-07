---
layout: post
title: "MathJax Reference Guide"
date: 2025-04-08
categories: [general]
tags: [math, latex, reference]
---

# MathJax Reference Guide

This post serves as a reference for using MathJax in blog posts. MathJax is a JavaScript display engine for mathematics that works in all browsers.

## Basic Syntax

### Inline Math
For inline math expressions, use single dollar signs: `$...$` or `\(...\)`

Example: The equation $E = mc^2$ is famous.

### Display Math
For displayed equations, use double dollar signs: `$$...$$` or `\[...\]`

Example:
$$
E = mc^2
$$

## Matrices

### Basic Matrix
$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

### 3D Transformation Matrix
$$
\begin{bmatrix}
1 & 0 & 0 & t_x \\
0 & 1 & 0 & t_y \\
0 & 0 & 1 & t_z \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

### Matrix Multiplication
$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix} =
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$

## Common Mathematical Symbols

### Greek Letters
$\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \lambda, \mu, \pi, \rho, \sigma, \tau, \phi, \omega$

### Operators
$\times, \div, \pm, \mp, \cdot, \leq, \geq, \neq, \approx, \equiv$

### Set Theory
$\in, \notin, \subset, \supset, \cup, \cap, \emptyset$

### Calculus
$\frac{dy}{dx}, \int_{a}^{b} f(x) dx, \sum_{i=1}^{n} i, \prod_{i=1}^{n} i$

## Fractions and Roots

### Fractions
$\frac{a}{b}, \dfrac{a}{b}$

### Nested Fractions
$\frac{\frac{a}{b}}{\frac{c}{d}}$

### Roots
$\sqrt{x}, \sqrt[n]{x}$

## Subscripts and Superscripts

### Basic
$x^2, x_n, x_i^j$

### Multiple
$x^{a+b}, x_{i,j}$

## Special Functions

### Trigonometric
$\sin(x), \cos(x), \tan(x), \arcsin(x), \arccos(x), \arctan(x)$

### Logarithms
$\log(x), \ln(x), \log_2(x)$

## Aligned Equations

$$
\begin{align}
f(x) &= x^2 + 2x + 1 \\
&= (x + 1)^2
\end{align}
$$

## Cases and Piecewise Functions

$$
f(x) = 
\begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

## Vectors and Matrices

### Vectors
$\vec{v}, \mathbf{v}, \hat{v}$

### Dot Product
$\vec{a} \cdot \vec{b}$

### Cross Product
$\vec{a} \times \vec{b}$

## Common Computer Graphics Equations

### Perspective Projection
$$
\begin{bmatrix}
x' \\
y' \\
z' \\
w'
\end{bmatrix} =
\begin{bmatrix}
\frac{2n}{r-l} & 0 & \frac{r+l}{r-l} & 0 \\
0 & \frac{2n}{t-b} & \frac{t+b}{t-b} & 0 \\
0 & 0 & -\frac{f+n}{f-n} & -\frac{2fn}{f-n} \\
0 & 0 & -1 & 0
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
$$

### Quaternion Rotation
$$
q = \cos(\theta/2) + \sin(\theta/2)(xi + yj + zk)
$$

## Tips and Tricks

1. Use `\text{}` for text within math mode
2. Use `\quad` or `\qquad` for spacing
3. Use `\left(`, `\right)` for automatically sized parentheses
4. Use `\begin{cases}` for piecewise functions
5. Use `\begin{align}` for aligned equations

## Common Issues and Solutions

1. If math isn't rendering, check for:
   - Proper dollar sign usage
   - Unmatched brackets
   - Missing backslashes
2. For complex expressions, break them into smaller parts
3. Use `\displaystyle` for larger inline math
4. Use `\text{}` for text within math mode

## Resources

- [MathJax Documentation](https://docs.mathjax.org/en/latest/)
- [LaTeX Math Symbols](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols)
- [Detexify](http://detexify.kirelabs.org/classify.html) - Draw a symbol to find its LaTeX command 