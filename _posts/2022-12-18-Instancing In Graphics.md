---
layout: post
title: "Instancing In Graphics"
date: 2022-12-18
categories: [general]
tags: [old-medium-posts, Graphics]
---

---

### Instancing in computer graphics refers to the technique of using a single set of geometry, shader, and textures to draw multiple copies of an object in a scene. 
It is used to reduce the number of draw calls needed to render a scene, which can significantly improve the performance of the rendering pipeline.

One of the key benefits of instancing is that it allows the graphics processor to batch together multiple draw calls into a single call, reducing the overhead of issuing multiple draw commands. This is especially useful when rendering a large number of similar objects, such as grass, trees, or particles, which can quickly add up and strain the graphics processor.

To implement instancing in OpenGL, you can use the glDrawArraysInstanced or glDrawElementsInstanced function, which takes an additional parameter specifying the number of instances to draw. For example, the following code demonstrates how to use glDrawArraysInstanced to draw 100 copies of a triangle:

```cpp
// Bind the vertex array object and the vertex buffer object
glBindVertexArray(vao);
glBindBuffer(GL_ARRAY_BUFFER, vbo);

// Set up the vertex attribute pointers
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

// Draw 100 instances of the triangle
glDrawArraysInstanced(GL_TRIANGLES, 0, 3, 100);

// Unbind the vertex array object and the vertex buffer object
glBindVertexArray(0);
glBindBuffer(GL_ARRAY_BUFFER, 0);
```

Instancing can also be used to vary the attributes of each instance, such as its position, rotation, or color. This can be achieved by using instanced vertex attributes, which are defined using the glVertexAttribDivisor function. For example, the following code demonstrates how to use instanced vertex attributes to vary the position of each triangle instance:

```cpp
// Bind the vertex array object and the vertex buffer object
glBindVertexArray(vao);
glBindBuffer(GL_ARRAY_BUFFER, vbo);

// Set up the vertex attribute pointers
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);

// Set up the instanced vertex attribute pointers
glBindBuffer(GL_ARRAY_BUFFER, instance_vbo);
glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glVertexAttribDivisor(1, 1);
glEnableVertexAttribArray(1);

// Draw 100 instances of the triangle
glDrawArraysInstanced(GL_TRIANGLES, 0, 3, 100);

// Unbind the vertex array object and the vertex buffer object
glBindVertexArray(0);
glBindBuffer(GL_ARRAY_BUFFER, 0);
```

Instancing can be used in a wide range of applications, such as video games, simulations, and visualization tools. It is particularly useful for rendering large numbers of objects with minimal overhead, making it an important technique for optimizing the performance of graphics applications.

You can also use the instance ID to vary the position of each triangle instance in the vertex shader. To do this, you can use the gl_InstanceID built-in variable, which is a 32-bit integer value that represents the current instance ID.

Here is an example of how you can use the gl_InstanceID variable to vary the position of each triangle instance in the vertex shader:
```cpp
#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aOffset;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    // Use the instance ID to offset the position of the triangle
    vec3 offset = aOffset * gl_InstanceID;
    vec4 pos = model * vec4(aPos + offset, 1.0);
    gl_Position = projection * view * pos;
}
```
In this example, the **aPos** attribute represents the base position of the triangle, and the **aOffset** attribute represents the offset to apply to each instance. The **gl_InstanceID** variable is used to multiply the **aOffset** attribute, so that each triangle instance is positioned at a different location. Finally, the pos variable is transformed by the model, view, and projection matrices, and the resulting **gl_Position** value is passed to the fragment shader for rendering.

Hope you learnt something new today! :)