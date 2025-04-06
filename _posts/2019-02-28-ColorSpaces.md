---
layout: post
title: "Color Spaces"
date: 2019-05-03
categories: [general]
tags: [old-medium-posts]
---
Every screen on a modern device is made up of pixels. Each pixel can take up a single color. But how are colors represented? To represent colors in different ways, we have Color Spaces.

# RGB
![Branching](https://miro.medium.com/v2/resize:fit:640/format:webp/1*44S9iK5xMcfRCXvu7cDulg.jpeg)

The most common way of representation of a color is in RGB (Red, Green, Blue) values. Each of these is called a color channel.
Color Cube with 16777216 colors
An 8-bit color channel can have a color value from 0 to 255 (2⁸-1). So, the total number of colors that an 8-bit RGB channel can store is 256x256x256. It can be visually represented as a cube. RGB is an additive color model, where each color is the addition of 3 colors. In RGB black color is the absence of light. RGB is generally used in digital images.

# CMYK
![Branching](https://miro.medium.com/v2/resize:fit:640/format:webp/1*KE0kasMX_nn8BrRAdR0UJg.png)

CMYK is used in color printing. Why? Why not RGB? Because, when we tell a printer to print white, it doesn’t need to use any ink. White is the color of the paper. So, the values of CMYK should be zero each. The letter ‘K’ is used because it’s the last letter of the word “Black” and is not occupied by any other color. If C+M+Y = Black, why do we have another channel for black? ‘just to save colors!!’. When CMY “primaries” are combined at full strength, the resulting “secondary” mixtures are red, green, and blue. CMYK model is a subtractive color model, it is the opposite of RGB: white is the natural color of the paper or other backgrounds, while black results from a full combination of colored inks.

# Adobe RGB vs sRGB
![Branching](https://miro.medium.com/v2/resize:fit:630/format:webp/1*cHq_moN4Z7Xlk5fyiVOy0A.png)

The Adobe RGB color space is an RGB color space developed by AdobeSystems, Inc. in 1998. It was designed to encompass most of the colors achievable on CMYK color printers, but by using RGB primary colors on a device such as a computer display. Adobe RGB can capture a higher spectrum of colors. The number of colors is still the same as RGB (depending upon bits per channel). The spaces between colors are higher, which eventually means that the difference between individual colors is bigger than in sRGB.

# YUV
A system that defines color via one luminance value and two chrominance values is called a luma-chroma system. Older displays that were meant to display black and white pictures, required just a brightness value to display an image. Sending 3 channel color data wouldn't have made sense at that time. Hence, a system where Y = luma value was sent to such systems. Later on, when color TV sets came up, it was easy to add two more channels (UV) and use the existing LUMA channel (Y), making an encoding system compatible with both the types of display devices.

# YCbCr
= Luma + Chrominance blue + Chrominance red. Highly used for videos. In simple words, this can be defined as the Brightness of each pixel + Blueness + Redness. If Y ranges from 0 to 255, Cb and Cr will range from -127 to 182.

# YCoCg
= Luma + Chrominance orange+ Chrominance green. This colorspace was invented to use similar encoding techniques as YCbCr but with frames in RGB colorspace.