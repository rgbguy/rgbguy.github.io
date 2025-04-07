---
title: "Deriving Matrices: A Journey Through Linear Transformations"
date: 2024-03-19
draft: false
tags: ["mathematics", "linear algebra", "matrices"]
---

# Deriving Matrices: A Journey Through Linear Transformations

Matrices are fundamental tools in linear algebra that represent linear transformations. In this post, we'll explore how to derive various types of transformation matrices, including rotation matrices, by understanding their geometric interpretations.

## Rotation Matrices

Rotation matrices are used to rotate points in a plane or space around the origin. Let's derive the 2D rotation matrix first, then extend it to 3D.

### 2D Rotation Matrix

Consider a point $P(x, y)$ in the plane. We want to rotate it by an angle $\theta$ counterclockwise around the origin. Let's find the new coordinates $(x', y')$ after rotation.

Using polar coordinates, we can express the original point as:
$$
x = r\cos\phi \\
y = r\sin\phi
$$

After rotation by angle $\theta$, the new coordinates become:
$$
x' = r\cos(\phi + \theta) \\
y' = r\sin(\phi + \theta)
$$

Using trigonometric identities:
$$
\cos(\phi + \theta) = \cos\phi\cos\theta - \sin\phi\sin\theta \\
\sin(\phi + \theta) = \sin\phi\cos\theta + \cos\phi\sin\theta
$$

Substituting back:
$$
x' = x\cos\theta - y\sin\theta \\
y' = x\sin\theta + y\cos\theta
$$

This gives us the 2D rotation matrix:
$$
R(\theta) = \begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
$$

### 3D Rotation Matrices

In 3D space, we can rotate around any of the three principal axes. The rotation matrices for each axis are:

1. Rotation around the x-axis:
$$
R_x(\theta) = \begin{bmatrix}
1 & 0 & 0 \\
0 & \cos\theta & -\sin\theta \\
0 & \sin\theta & \cos\theta
\end{bmatrix}
$$

2. Rotation around the y-axis:
$$
R_y(\theta) = \begin{bmatrix}
\cos\theta & 0 & \sin\theta \\
0 & 1 & 0 \\
-\sin\theta & 0 & \cos\theta
\end{bmatrix}
$$

3. Rotation around the z-axis:
$$
R_z(\theta) = \begin{bmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

These matrices can be derived using similar trigonometric principles as the 2D case, but considering the preservation of the axis of rotation.

### Properties of Rotation Matrices

1. **Orthogonality**: Rotation matrices are orthogonal, meaning $R^T R = I$ where $R^T$ is the transpose of $R$.
2. **Determinant**: The determinant of a rotation matrix is always 1.
3. **Composition**: The composition of two rotations is equivalent to multiplying their matrices.
4. **Inverse**: The inverse of a rotation matrix is its transpose.

### Example: Rotating a Point

Let's rotate the point $(1, 0)$ by 90 degrees counterclockwise:
$$
\begin{bmatrix}
\cos(90^\circ) & -\sin(90^\circ) \\
\sin(90^\circ) & \cos(90^\circ)
\end{bmatrix}
\begin{bmatrix}
1 \\
0
\end{bmatrix}
=
\begin{bmatrix}
0 & -1 \\
1 & 0
\end{bmatrix}
\begin{bmatrix}
1 \\
0
\end{bmatrix}
=
\begin{bmatrix}
0 \\
1
\end{bmatrix}
$$

This shows that the point $(1, 0)$ rotates to $(0, 1)$ after a 90-degree rotation, which matches our geometric intuition.

## Conclusion

Rotation matrices provide a powerful way to represent and compute rotations in both 2D and 3D spaces. Understanding their derivation helps build intuition about how they work and why they have certain properties. These matrices are fundamental in computer graphics, robotics, and many other fields where spatial transformations are needed. 