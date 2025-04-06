---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: RGB Guy's Blog
---

<div class="home">
  <div class="home-content">
    <h1 class="page-heading">Welcome to my blog!</h1>
    <p>Here I write about programming, technology, and other interesting topics.</p>
  </div>

  <div class="post-list">
    <h2>Recent Posts</h2>
    {% for post in site.posts %}
      <div class="post-item">
        <h3>
          <a class="post-link" href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </h3>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <div class="post-excerpt">
          {{ post.excerpt | strip_html | truncatewords: 50 }}
          <a href="{{ post.url | relative_url }}">Read more...</a>
        </div>
      </div>
    {% endfor %}
  </div>

  <div class="home-footer">
    <p>Browse by <a href="/categories">categories</a> or <a href="/tags">tags</a>.</p>
  </div>
</div>
