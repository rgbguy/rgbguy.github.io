---
layout: post
title: "Deriving Translation and Rotation Matrices"
date: 2025-04-08
categories: [general]
tags: []
---

### Why?

When learning computer graphics, it is extremely essential to understand the underlying maths. The most fundamental of them are the matrices that govern the 3D space.
Every pixel, every vertex that moves in the 3D world is due to these matrices. 

### What?

In this post, I will try to share how I derive the following matrices.
* Translation Matrix
* Rotation Matrix

---

### **Translation Matrix:**

We can move any 3D point (x, y, z) by just adding (tx, ty, tz) into it. So when I write (x + 1, y + 2, z + 3), it means I have moved the point by 1 unit on x axis, by 2 units on y axis and by 3 units on z axis.

So I need to find a way in which converting (x, y, z) to (x + tx, y + ty, z + tz) can be done using a matrix.

The point (x, y, z) can be represented as a 4x1 matrix:

$$
(x, y, z) = 
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
$$

Now, If I represent the translation (tx, ty, tz) as a matrix that looks like this:

$$
(tx, ty, tz) = 
\begin{bmatrix}
1 & 0 & 0 & tx \\
0 & 1 & 0 & ty \\
0 & 0 & 1 & tz \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

If you have forgotten the basic matrix multiplication rule, it is "the number of columns in the first matrix must equal the number of rows in the second matrix"
When we multiply this matrix with our point vector [x, y, z, 1], we get:

$$
\begin{bmatrix}
1 & 0 & 0 & tx \\
0 & 1 & 0 & ty \\
0 & 0 & 1 & tz \\
0 & 0 & 0 & 1
\end{bmatrix}
\times
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
 =
\begin{bmatrix}
x + 0 + 0 + tx \\
0 + y + 0 + ty \\
0 + 0 + z + tz \\
0 + 0 + 0 + 1
\end{bmatrix}
= 
\begin{bmatrix}
x + tx \\
y + ty \\
z + tz \\
1
\end{bmatrix}
$$

This gives us exactly what we want - the translated point (x + tx, y + ty, z + tz)!

---

### **Rotation Matrix:**

We will need these trigonometric identities:

$$
\cos(a + b) = \cos a \cos b - \sin a \sin b
$$

$$
\cos(a - b) = \cos a \cos b + \sin a \sin b
$$

It gets super easy to derive if we use polar coordinates.

We can represent a point P that's at an angle $$φ$$ from x-axis and is at a distance r from it's origin by $$(rcos φ, rsin φ)$$.

Let's derive the rotation matrix for rotating a point around the z-axis.

In 2D, if we have a point 

$$
(x, y) = (rcosφ, rsinφ),
$$

after rotating by θ, it becomes:

$$
(x', y') = (rcos(φ + θ), rsin(φ + θ))
$$

Using the trigonometric identities:

$$
x' = rcos(φ + θ) = r(cosφcosθ - sinφsinθ) = xcosθ - ysinθ
$$

$$
y' = rsin(φ + θ) = r(sinφcosθ + cosφsinθ) = ycosθ + xsinθ
$$

Point P:
$$
(x, y) = (rcosφ, rsinφ),
$$

After rotation along z by θ has become Point P':
$$
(x', y') = (xcosθ - ysinθ,  ycosθ + xsinθ),
$$

Similar to translation matrix, we have found out a matrix form of this too!

$$
R_z(\theta) = 
\begin{bmatrix}
\cos\theta & -\sin\theta & 0 & 0 \\
\sin\theta & \cos\theta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

When we multiply this matrix with our point vector [x, y, z, 1], we get:

$$
\begin{bmatrix}
\cos\theta & -\sin\theta & 0 & 0 \\
\sin\theta & \cos\theta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\times
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
=
\begin{bmatrix}
x\cos\theta - y\sin\theta \\
x\sin\theta + y\cos\theta \\
z \\
1
\end{bmatrix}
$$

Similarly, we can derive rotation matrices for x and y axes:

$$
R_x(\theta) = 
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & \cos\theta & -\sin\theta & 0 \\
0 & \sin\theta & \cos\theta & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

When we multiply this matrix with our point vector [x, y, z, 1], we get:

$$
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & \cos\theta & -\sin\theta & 0 \\
0 & \sin\theta & \cos\theta & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\times
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
=
\begin{bmatrix}
x \\
y\cos\theta - z\sin\theta \\
y\sin\theta + z\cos\theta \\
1
\end{bmatrix}
$$

$$
R_y(\theta) = 
\begin{bmatrix}
\cos\theta & 0 & \sin\theta & 0 \\
0 & 1 & 0 & 0 \\
-\sin\theta & 0 & \cos\theta & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

When we multiply this matrix with our point vector [x, y, z, 1], we get:

$$
\begin{bmatrix}
\cos\theta & 0 & \sin\theta & 0 \\
0 & 1 & 0 & 0 \\
-\sin\theta & 0 & \cos\theta & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\times
\begin{bmatrix}
x \\
y \\
z \\
1
\end{bmatrix}
=
\begin{bmatrix}
x\cos\theta + z\sin\theta \\
y \\
-x\sin\theta + z\cos\theta \\
1
\end{bmatrix}
$$

---






