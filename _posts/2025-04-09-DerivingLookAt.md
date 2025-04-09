---
layout: post
title: "Deriving gluLookAt()"
date: 2025-04-09
categories: [graphics]
tags: []
---

### Camera doesn't exist in the 3D world. It's just our perception. We fake that perception by creating a matrix.

### What?

In this post, I will derive the gluLookAt function, which is used to create a view matrix that positions and orients a camera in 3D space. This is one of the most important transformations in 3D graphics.

---

### **Understanding the gluLookAt Function**

The gluLookAt function takes three parameters:
1. `eye`: The position of the camera (where we're looking from)
2. `target`: The point we want to look at
3. `up`: The up vector that defines the camera's orientation

Our goal is to create a matrix that transforms world coordinates into camera coordinates, where:
- The camera is at the origin
- The camera is looking down the negative z-axis
- The up direction is along the positive y-axis

---

### **Step 1: Creating the Camera Basis Vectors**

First, we need to create three orthogonal vectors that define our camera's coordinate system:

1. **Forward Vector (z-axis)**: Points from the camera to the target
   $$
   \vec{f} = \text{normalize}(\text{target} - \text{eye})
   $$

2. **Right Vector (x-axis)**: Perpendicular to both forward and up vectors
   $$
   \vec{r} = \text{normalize}(\vec{f} \times \text{up})
   $$

3. **Up Vector (y-axis)**: Perpendicular to both forward and right vectors
   $$
   \vec{u} = \vec{r} \times \vec{f}
   $$

**Why do we need to create a new up vector?**
Even though we're given an up vector as input, we need to create a new one because:
1. The input up vector might not be perfectly perpendicular to the forward vector
2. We need an orthonormal basis (three mutually perpendicular unit vectors) for our camera coordinate system
3. The new up vector ensures our camera's coordinate system is properly oriented and doesn't have any skewing or shearing

**Why don't we recompute the forward vector?**
The forward and up vectors serve different purposes:
- The forward vector is sacred: It defines what the camera is looking at. We compute it directly from `target - eye` because this is the fundamental purpose of the LookAt function.
- The up vector is flexible: It's just a hint for the camera's tilt. We adjust it to be orthogonal to forward because its exact direction isn't as critical as maintaining the correct view direction.

This is why we:
1. Keep the forward vector as is (from target to eye)
2. Use the given up vector only to compute the right vector
3. Recompute the final up vector to ensure orthogonality

---

### **Step 2: Building the View Matrix**

The view matrix needs to:
1. Rotate the world so that the camera's basis vectors align with the world axes
2. Translate the world so that the camera is at the origin

**The Camera Illusion**
In 3D graphics, there is no actual camera moving around the scene. Instead, we create the illusion of a camera by moving the entire world in the opposite direction. This is why:
1. We multiply the view matrix first in the transformation pipeline
2. We move the world by `-eye` instead of moving the camera by `eye`
3. We rotate the world to align with our desired camera orientation

The rotation part of the matrix is constructed using the camera's basis vectors:

$$
R = 
\begin{bmatrix}
r_x & r_y & r_z & 0 \\
u_x & u_y & u_z & 0 \\
-f_x & -f_y & -f_z & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

The translation part moves the camera to the origin:

$$
T = 
\begin{bmatrix}
1 & 0 & 0 & -eye_x \\
0 & 1 & 0 & -eye_y \\
0 & 0 & 1 & -eye_z \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

The final view matrix is the product of these two matrices:

$$
\text{View} = R \times T
$$

---

### **Step 3: Combining Everything**

Putting it all together, the LookAt function creates a matrix that:

1. Translates the world by `-eye` to move the camera to the origin
2. Rotates the world using the camera's basis vectors to align the camera with the world axes

The final matrix looks like this:

$$
\text{View} = 
\begin{bmatrix}
r_x & r_y & r_z & -\vec{r} \cdot \text{eye} \\
u_x & u_y & u_z & -\vec{u} \cdot \text{eye} \\
-f_x & -f_y & -f_z & \vec{f} \cdot \text{eye} \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

---

### **Why This Works**

This matrix transforms any point in world space to camera space by:
1. Moving the camera to the origin
2. Aligning the camera's view direction with the negative z-axis
3. Aligning the camera's up direction with the positive y-axis

When we multiply this matrix with any point in world space, we get its coordinates relative to the camera, which is exactly what we need for rendering.

**The Transformation Pipeline**
The view matrix is typically the first transformation applied in the rendering pipeline:
1. View Matrix: Moves and rotates the entire world to create the camera illusion
2. Projection Matrix: Projects 3D coordinates onto a 2D plane
3. Viewport Transform: Maps the projected coordinates to screen space

This order is crucial because:
- The view matrix affects everything in the scene
- Subsequent transformations build upon this camera-space coordinate system
- It's more efficient to transform the world once than to transform every object individually

---

### **Implementation Notes**

In practice, the LookAt function is often implemented as:

```cpp
mat4 lookAt(vec3 eye, vec3 target, vec3 up) {
    vec3 f = normalize(target - eye);
    vec3 r = normalize(cross(f, up));
    vec3 u = cross(r, f);
    
    mat4 view = {
        r.x, r.y, r.z, -dot(r, eye),
        u.x, u.y, u.z, -dot(u, eye),
        -f.x, -f.y, -f.z, dot(f, eye),
        0, 0, 0, 1
    };
    
    return view;
}
```

This implementation efficiently combines the rotation and translation into a single matrix, which is what makes the LookAt function so powerful and widely used in 3D graphics.

---
