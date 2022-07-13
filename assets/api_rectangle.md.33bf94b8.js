import{_ as t}from"./chunks/shapes.5771c1f5.js";import{_ as e,c as n,o as a,a as s}from"./app.3c45567a.js";const y='{"title":"Rectangle (gmaps-rectangle)","description":"","frontmatter":{"sidebarDepth":2},"headers":[{"level":3,"title":"Simple Use (demo)","slug":"simple-use-demo"},{"level":3,"title":"Props","slug":"props"},{"level":3,"title":"Events","slug":"events"},{"level":3,"title":"Notes","slug":"notes"}],"relativePath":"api/rectangle.md"}',l={},o=s('<h1 id="rectangle-gmaps-rectangle" tabindex="-1">Rectangle (<code>gmaps-rectangle</code>) <a class="header-anchor" href="#rectangle-gmaps-rectangle" aria-hidden="true">#</a></h1><div class="v3-gmaps-screenshot"><img src="'+t+`"><p>In addition to <a href="./polyline">polylines</a>, <a href="./polygon">polygons</a>, and <a href="./circle">circles</a> you can also create rectangles on a map.</p></div><h3 id="simple-use-demo" tabindex="-1">Simple Use (<a href="https://vue-bujcvu.stackblitz.io/shapes" target="_blank" rel="noopener noreferrer">demo</a>) <a class="header-anchor" href="#simple-use-demo" aria-hidden="true">#</a></h3><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 500px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>gmaps-map</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>gmaps-rectangle</span> <span class="token attr-name">:bounds</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ east: 145, north: -20, west: 132, south: -27 }<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>gmaps-map</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gmapsMap<span class="token punctuation">,</span> gmapsRectangle <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;v3-gmaps&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> gmapsMap<span class="token punctuation">,</span> gmapsRectangle <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h3><table><thead><tr><th style="text-align:left;">Props</th><th style="text-align:center;">Type</th><th style="text-align:center;">Default</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">options*</td><td style="text-align:center;"><code>GmapsRectangleOptions</code></td><td style="text-align:center;">-</td><td style="text-align:left;">Object used to define the properties of a <code>gmaps-rectangle</code>.</td></tr><tr><td style="text-align:left;">bounds</td><td style="text-align:center;"><code>GmapsBounds</code></td><td style="text-align:center;">-</td><td style="text-align:left;">The bounds.</td></tr><tr><td style="text-align:left;">draggable</td><td style="text-align:center;"><code>boolean</code></td><td style="text-align:center;"><code>false</code></td><td style="text-align:left;">Whether this Rectangle can be dragged over the map.</td></tr><tr><td style="text-align:left;">editable</td><td style="text-align:center;"><code>boolean</code></td><td style="text-align:center;"><code>false</code></td><td style="text-align:left;">Whether this Rectangle can be edited by dragging the control points shown at the corners and on each edge.</td></tr><tr><td style="text-align:left;">visible</td><td style="text-align:center;"><code>boolean</code></td><td style="text-align:center;"><code>true</code></td><td style="text-align:left;">Whether this rectangle is visible on the map.</td></tr></tbody></table><p>* To see all of the possible options, have a look at the <a href="https://developers.google.com/maps/documentation/javascript/reference/map#MarkerOptions" target="_blank" rel="noopener noreferrer">Google Maps MarkerOptions interface</a>.</p><h3 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h3><table><thead><tr><th style="text-align:left;">Event</th><th style="text-align:center;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">bounds_changed</td><td style="text-align:center;"><code>GmapsBounds</code></td><td style="text-align:left;">This event is fired when the rectangle&#39;s bounds are changed.</td></tr><tr><td style="text-align:left;">click</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the DOM click event is fired on the rectangle.</td></tr><tr><td style="text-align:left;">contextmenu</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the DOM contextmenu event is fired on the rectangle.</td></tr><tr><td style="text-align:left;">dblclick</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the DOM dblclick event is fired on the rectangle.</td></tr><tr><td style="text-align:left;">drag</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is repeatedly fired while the user drags the Rectangle.</td></tr><tr><td style="text-align:left;">dragend</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the user stops dragging the Rectangle.</td></tr><tr><td style="text-align:left;">dragstart</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the user starts dragging the Rectangle.</td></tr><tr><td style="text-align:left;">mousedown</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired for a mousedown on the Rectangle.</td></tr><tr><td style="text-align:left;">mousemove</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired for a mousemove on the Rectangle.</td></tr><tr><td style="text-align:left;">mouseout</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the mouse leaves the area of the Rectangle.</td></tr><tr><td style="text-align:left;">mouseover</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the mouse enters the area of the Rectangle.</td></tr><tr><td style="text-align:left;">mouseup</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired for a mouseup on the Rectangle.</td></tr><tr><td style="text-align:left;">rightclick</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired for a rightclick on the Rectangle.</td></tr></tbody></table><h3 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-hidden="true">#</a></h3><ul><li><code>gmaps-rectangle</code> has most of the <a href="https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle" target="_blank" rel="noopener noreferrer">properties and events Google Maps&#39; Rectangle</a> has.</li></ul>`,11),p=[o];function c(i,d,r,g,u,h){return a(),n("div",null,p)}var m=e(l,[["render",c]]);export{y as __pageData,m as default};
