---
layout: post
title: "MipMaps and why they are useful"
date: 2022-09-18
categories: [general]
tags: [old-medium-posts, Graphics]
---

---
### MIP is short form of latin phrase “Multum in Parvo” which means many things in a small place.

<div style="text-align: center;">
  <img src="https://miro.medium.com/v2/resize:fit:600/format:webp/0*1PDg1SizTFtACIEU.png" alt="Branching" />
  <p><em>So a texture map where multiple smaller versions of it are stored is a MipMap.</em></p>
</div>

### What?
Mipmaps are smaller versions of a texture. When a texture is shrunken down to progressively smaller versions, we get mipmaps. We can generate them on the fly or when loading a texture. For ease of storage and memory management, usually the texture is shrunken down by dividing it’s dimensions by 2.

### Why?
You have finite pixels on screen. When you are viewing a texture on your screen, you color the pixels on screen by sampling color values from the texture. For sampling the textures, based on your application, you will use filtering techniques — nearest neighbour, bilinear, bicubic (will explain all popular ones in another post). When the texture is zoomed in, you will have sufficient samples from the texture to color your pixels.

<div style="text-align: center;">
  <img src="https://miro.medium.com/v2/format:webp/0*wME1v_DZzeHf9MHC" alt="Branching" />
  <p><em>Left: Aliasing artifacts on far points. Right: Reduced aliasing artifacts by using higher mipmap levels.</em></p>
</div>

### Now read carefully
when the texture is zoomed out (rendered far on a triangle), if you look through an on screen pixel, and are using a single texture sample point to color your screen pixel, it might happen that you will skip a lot of texture sample points which will in turn cause aliasing artifacts, as shown in the image. Here, mipmaps help. They create spatial aliasing, by replacing the far texture by an appropriate mipmap version, which leads to better sample points.

To implement mipmaps in OpenGL, you can use the glGenerateMipmap function to generate the mipmap levels for a texture. This function takes a single argument specifying the target texture, and generates the mipmap levels for the texture using the GL_LINEAR filtering mode.

Here is an example of how to generate mipmaps for a texture in OpenGL:
```cpp
// Bind the texture
glBindTexture(GL_TEXTURE_2D, texture);

// Generate the mipmap levels
glGenerateMipmap(GL_TEXTURE_2D);

// Set the texture minification and magnification filters to use mipmaps
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

// Unbind the texture
glBindTexture(GL_TEXTURE_2D, 0);
```
In this example, the glGenerateMipmap function is called to generate the mipmap levels for the texture, and the texture minification and magnification filters are set to use mipmaps. This ensures that the graphics processor will use the appropriate mipmap level for the texture based on its size on screen.

It’s important to note that the glGenerateMipmap function only works for textures with a base level (level 0) that has a power-of-two width and height, and a data type of GL_UNSIGNED_BYTE, GL_UNSIGNED_SHORT, or GL_UNSIGNED_INT. Additionally, the texture must be complete, which means that all required texture images must have been defined.

In addition to improving the performance and visual quality of texture mapping, mipmaps can also be used to improve the quality of other texture-based effects, such as anisotropic filtering and texture filtering. Anisotropic filtering is a technique that improves the quality of texture mapping on surfaces that are viewed at oblique angles, while texture filtering is used to smooth out the transitions between texture texels (pixels) when the texture is magnified or minified.

Bonus:
* They take 1/3rd additional memory space. (1/4 + 1/16 + 1/64 +……)
* They can be generated offline
* They can be easily cached, as higher mipmap levels are smaller in size.
* Since they are easily cached, they can speed up rendering.
* They can be used for LODs.
* When you use different mipmap levels for textures on a mesh, you can use filtering techniques to blend between them.
Hope you learnt something new!