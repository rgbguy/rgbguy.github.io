---
layout: post
title: "Accidentally Derived the Orthographic Projection Matrix (A Bit Differently)"
date: 2025-04-17
categories: [graphics]
tags: [3d-graphics, linear-algebra, projection, matrices, math]
---

> "I wasn't trying to reinvent the wheel. I was just trying to roll it my way."

So I was sitting with my notebook, trying to understand how the **orthographic projection matrix** works. I knew that it was just a mapping to NDC

I had seen the matrix in OpenGL docs a multiple dozen times:

```
| 2/(R-L)      0           0          -(R+L)/(R-L) |
| 0           2/(T-B)      0          -(T+B)/(T-B) |
| 0            0         -2/(F-N)     -(F+N)/(F-N) |
| 0            0           0               1       |
```

But instead of just copying it blindly, I wanted to *feel* where it comes from. So I thought:

---

### "Let me just map near and far (N and F) to -1 and 1… that should work."

So here's what I tried:

1. I wanted the near plane `N` to go to `-1`, and the far plane `F` to go to `+1`.
2. To do that, I:
   - Added half the range: `(F - N)/2`
   - Subtracted `F`
   - Divided by `(F - N)/2`

Let's verify with our example values:
- For `z = 2` (near):
  - Add half range: `2 + 2 = 4`
  - Subtract F: `4 - 6 = -2`
  - Divide: `-2 / 2 = -1` ✅
- For `z = 6` (far):
  - Add half range: `6 + 2 = 8`
  - Subtract F: `8 - 6 = 2`
  - Divide: `2 / 2 = 1` ✅

### On paper it looked like this:

For mapping a value `z` from `[N, F]` to `[-1, 1]`:

$$
z_{ndc} = \frac{2z - (F + N)}{F - N}
$$

if you expand this even further:


$$
z_{ndc} = \frac{2}{F - N} * z - \frac{(F + N)}{(F - N)}
$$


Then I realized...

> Wait — this is **exactly** what that orthographic matrix is doing, just written in matrix form so the GPU can crunch it in real-time.

---

### Here's How You *Actually* Derive the Z-Mapping Row

Let's say you want `f(z)` to map:

- `N → -1`
- `F → +1`

So:

$$
f(z) = Az + B
$$

Solve two equations:

- `-1 = A*N + B`
- `1  = A*F + B`

Subtract to eliminate B:

$$
2 = A*(F - N) \Rightarrow A = \frac{2}{F - N}
$$

Plug back in to find B:

$$
B = -1 - A*N = -\frac{F + N}{F - N}
$$

Boom:

$$
z_{ndc} = \frac{2}{F - N} * z - \frac{F + N}{F - N}
$$

Which matches the orthographic matrix's Z-row.

---

### Final Thoughts

Sometimes, detours make the best lessons.  
I just wanted to understand what the heck it was doing.

Stay curious. Keep breaking things.  
Even projection matrices. 😄 