import{_ as n,c as a,o as s,a as t}from"./app.187664db.js";var p="/v3-gmaps/assets/getting-started.641214a9.png";const h='{"title":"Getting Started","description":"","frontmatter":{"sidebarDepth":3},"headers":[{"level":2,"title":"Installation","slug":"installation"},{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"Plugin installation (main.js / main.ts)","slug":"plugin-installation-main-js-main-ts"},{"level":3,"title":"Component use","slug":"component-use"}],"relativePath":"guide/getting-started.md"}',e={},o=t(`<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h2><div class="language-bash"><pre><code><span class="token comment"># npm</span>
<span class="token function">npm</span> <span class="token function">install</span> v3-gmaps
</code></pre></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><h3 id="plugin-installation-main-js-main-ts" tabindex="-1">Plugin installation (main.js / main.ts) <a class="header-anchor" href="#plugin-installation-main-js-main-ts" aria-hidden="true">#</a></h3><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> v3gmaps <span class="token keyword">from</span> <span class="token string">&#39;v3-gmaps&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token comment">// Optional stylesheet needed for showing errors and the Popup component</span>
<span class="token keyword">import</span> <span class="token string">&#39;v3-gmaps/dist/style.css&#39;</span>

<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>gmaps<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;GOOGLE_API_KEY&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>

</code></pre></div><h3 id="component-use" tabindex="-1">Component use <a class="header-anchor" href="#component-use" aria-hidden="true">#</a></h3><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- gmaps-map requires a height to fill --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 500px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>gmaps-map</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>gmaps-marker</span> <span class="token attr-name">:position</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ lat: -27, lng: 153 }<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>gmaps-map</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gmapsMap<span class="token punctuation">,</span> gmapsMarker <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;v3-gmaps&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> gmapsMap<span class="token punctuation">,</span> gmapsMarker <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="v3-gmaps-screenshot"><img src="`+p+'"><p>Single marker at latitude 0 and longitude 0</p></div>',9),c=[o];function l(i,u,r,k,g,d){return s(),a("div",null,c)}var v=n(e,[["render",l]]);export{h as __pageData,v as default};