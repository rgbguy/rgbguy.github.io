---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: RGB Guy's Blog
---

<div class="post-list">
  <h2>Recent Posts</h2>
  {% for post in site.posts %}
    <div class="post-item">
      <p class="post-line">
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        —
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </p>
    </div>
  {% endfor %}
</div>


