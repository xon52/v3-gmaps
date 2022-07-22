import{_ as n,c as a,o as s,a as t}from"./app.187664db.js";const d='{"title":"Using with Other Libraries","description":"","frontmatter":{},"headers":[{"level":3,"title":"@googlemaps/markerclusterer","slug":"googlemaps-markerclusterer"}],"relativePath":"guide/using-with-others.md"}',p={},o=t(`<h1 id="using-with-other-libraries" tabindex="-1">Using with Other Libraries <a class="header-anchor" href="#using-with-other-libraries" aria-hidden="true">#</a></h1><h3 id="googlemaps-markerclusterer" tabindex="-1"><a href="https://www.npmjs.com/package/@googlemaps/markerclusterer" target="_blank" rel="noopener noreferrer">@googlemaps/markerclusterer</a> <a class="header-anchor" href="#googlemaps-markerclusterer" aria-hidden="true">#</a></h3><p>Example by <a href="https://github.com/gerritvanaaken" target="_blank" rel="noopener noreferrer">gerritvanaaken</a>:</p><div class="language-js"><pre><code><span class="token operator">&lt;</span>template<span class="token operator">&gt;</span>
<span class="token operator">...</span>
<span class="token operator">&lt;</span>gmaps<span class="token operator">-</span>map
  <span class="token operator">:</span>options<span class="token operator">=</span><span class="token string">&quot;mapmodel&quot;</span>
  @mounted<span class="token operator">=</span><span class="token string">&quot;initMap&quot;</span><span class="token operator">&gt;</span>

  <span class="token operator">&lt;</span>gmaps<span class="token operator">-</span>marker
    v<span class="token operator">-</span><span class="token keyword">for</span><span class="token operator">=</span><span class="token string">&quot;station in filteredStations&quot;</span> <span class="token comment">// filteredStation is reactive and changes all the time</span>
    <span class="token operator">:</span>key<span class="token operator">=</span><span class="token string">&quot;station.id&quot;</span>
    <span class="token operator">:</span>position<span class="token operator">=</span><span class="token string">&quot;{ lat: station.coordinates[1], lng: station.coordinates[0] }&quot;</span>
    @mounted<span class="token operator">=</span><span class="token string">&quot;addMarker&quot;</span>
    @unmounted<span class="token operator">=</span><span class="token string">&quot;removeMarker&quot;</span>
  <span class="token operator">/</span><span class="token operator">&gt;</span>

<span class="token operator">&lt;</span><span class="token operator">/</span>gmaps<span class="token operator">-</span>map<span class="token operator">&gt;</span>
<span class="token operator">...</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>script setup<span class="token operator">&gt;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>ref<span class="token punctuation">,</span> toRaw<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> inject<span class="token punctuation">,</span> onMounted<span class="token punctuation">,</span> onUpdated<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>gmapsMap<span class="token punctuation">,</span> gmapsMarker<span class="token punctuation">,</span> gmapsPolygon<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;v3-gmaps&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> MarkerClusterer <span class="token keyword">from</span> <span class="token string">&#39;@googlemaps/markerclustererplus&#39;</span><span class="token punctuation">;</span>
<span class="token operator">...</span>

<span class="token keyword">const</span> globalmap <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> markerClusterer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// no reactivity, please!</span>

<span class="token keyword">const</span> <span class="token function-variable function">addMarker</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">marker</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	markerClusterer<span class="token punctuation">.</span><span class="token function">addMarker</span><span class="token punctuation">(</span>marker<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">removeMarker</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">marker</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	markerClusterer<span class="token punctuation">.</span><span class="token function">removeMarker</span><span class="token punctuation">(</span>marker<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">initMap</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">map</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	globalmap<span class="token punctuation">.</span>value <span class="token operator">=</span> map<span class="token punctuation">;</span>

	<span class="token comment">// init clusterer</span>
	markerClusterer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MarkerClusterer</span><span class="token punctuation">(</span><span class="token function">toRaw</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">// kill map reactivity for clusterer, it will crash otherwise</span>
		<span class="token literal-property property">gridSize</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
		<span class="token literal-property property">maxZoom</span><span class="token operator">:</span> <span class="token number">13</span><span class="token punctuation">,</span>
		<span class="token literal-property property">styles</span><span class="token operator">:</span> <span class="token punctuation">[</span>
			MarkerClusterer<span class="token punctuation">.</span><span class="token function">withDefaultStyle</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
				<span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
				<span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
				<span class="token literal-property property">textColor</span><span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>
				<span class="token literal-property property">textSize</span><span class="token operator">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
				<span class="token literal-property property">fontFamily</span><span class="token operator">:</span> <span class="token string">&#39;Castledown&#39;</span><span class="token punctuation">,</span>
				<span class="token literal-property property">fontWeight</span><span class="token operator">:</span> <span class="token number">300</span>
			<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token punctuation">]</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div>`,4),e=[o];function r(c,l,k,u,i,m){return s(),a("div",null,e)}var h=n(p,[["render",r]]);export{d as __pageData,h as default};
