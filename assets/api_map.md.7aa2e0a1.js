import{_ as t,c as e,o as n,a}from"./app.3c45567a.js";var s="/v3-gmaps/assets/map.fc529182.png";const y='{"title":"Map (gmaps-map)","description":"","frontmatter":{"sidebarDepth":2},"headers":[{"level":3,"title":"Simple Use (demo)","slug":"simple-use-demo"},{"level":3,"title":"Props","slug":"props"},{"level":3,"title":"Events","slug":"events"},{"level":3,"title":"Notes","slug":"notes"}],"relativePath":"api/map.md"}',l={},d=a('<h1 id="map-gmaps-map" tabindex="-1">Map (<code>gmaps-map</code>) <a class="header-anchor" href="#map-gmaps-map" aria-hidden="true">#</a></h1><div class="v3-gmaps-screenshot"><img src="'+s+`"><p>The Map is the core component of the library (and Google Maps). All the other components are created by placing them inside the Map component.</p></div><h3 id="simple-use-demo" tabindex="-1">Simple Use (<a href="https://vue-bujcvu.stackblitz.io/map" target="_blank" rel="noopener noreferrer">demo</a>) <a class="header-anchor" href="#simple-use-demo" aria-hidden="true">#</a></h3><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">height</span><span class="token punctuation">:</span> 500px</span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>gmaps-map</span> <span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> gmapsMap <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;v3-gmaps&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span> gmapsMap <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-hidden="true">#</a></h3><table><thead><tr><th style="text-align:left;">Props</th><th style="text-align:center;">Type</th><th style="text-align:center;">Default</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">options*</td><td style="text-align:center;"><code>GmapsMapOptions</code></td><td style="text-align:center;">-</td><td style="text-align:left;">Object used to define the properties of a <code>gmaps-map</code>.</td></tr><tr><td style="text-align:left;">center</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:center;">-</td><td style="text-align:left;">The initial Map center.</td></tr><tr><td style="text-align:left;">clickableIcons</td><td style="text-align:center;"><code>boolean</code></td><td style="text-align:center;"><code>true</code></td><td style="text-align:left;">Whether map points of interest are clickable.</td></tr><tr><td style="text-align:left;">heading</td><td style="text-align:center;"><code>number</code></td><td style="text-align:center;">-</td><td style="text-align:left;">The heading for aerial imagery in degrees measured clockwise from cardinal direction North.</td></tr><tr><td style="text-align:left;">mapTypeId</td><td style="text-align:center;"><code>GmapsMapTypeId</code></td><td style="text-align:center;"><code>ROADMAP</code></td><td style="text-align:left;">The initial Map mapTypeId.</td></tr><tr><td style="text-align:left;">tilt</td><td style="text-align:center;"><code>number</code></td><td style="text-align:center;">-</td><td style="text-align:left;">Sets the angle of incidence of the map.</td></tr><tr><td style="text-align:left;">zoom</td><td style="text-align:center;"><code>number</code></td><td style="text-align:center;">-</td><td style="text-align:left;">The initial Map zoom level.</td></tr><tr><td style="text-align:left;">throttle</td><td style="text-align:center;"><code>number</code></td><td style="text-align:center;"><code>100</code></td><td style="text-align:left;">The event throttle value in milliseconds.</td></tr></tbody></table><p>* To see all of the possible options, have a look at the <a href="https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions" target="_blank" rel="noopener noreferrer">Google Maps MapOptions interface</a>.</p><h3 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h3><table><thead><tr><th style="text-align:left;">Event</th><th style="text-align:center;">Type</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;">bounds_changed</td><td style="text-align:center;"><code>GmapsBounds</code></td><td style="text-align:left;">This event is fired when the viewport bounds have changed.</td></tr><tr><td style="text-align:left;">center_changed</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the map center property changes.</td></tr><tr><td style="text-align:left;">click</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the user clicks on the map.</td></tr><tr><td style="text-align:left;">contextmenu</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the DOM contextmenu event is fired on the map container.</td></tr><tr><td style="text-align:left;">dblclick</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the user double-clicks on the map.</td></tr><tr><td style="text-align:left;">drag</td><td style="text-align:center;">-</td><td style="text-align:left;">This event is repeatedly fired while the user drags the map.</td></tr><tr><td style="text-align:left;">dragend</td><td style="text-align:center;">-</td><td style="text-align:left;">This event is fired when the user stops dragging the map.</td></tr><tr><td style="text-align:left;">dragstart</td><td style="text-align:center;">-</td><td style="text-align:left;">This event is fired when the user starts dragging the map.</td></tr><tr><td style="text-align:left;">heading_changed</td><td style="text-align:center;"><code>number</code></td><td style="text-align:left;">This event is fired when the map heading property changes.</td></tr><tr><td style="text-align:left;">idle</td><td style="text-align:center;">-</td><td style="text-align:left;">This event is fired when the map becomes idle after panning or zooming.</td></tr><tr><td style="text-align:left;">isfractionalzoomenabled_changed</td><td style="text-align:center;"><code>number</code></td><td style="text-align:left;">This event is fired when the isFractionalZoomEnabled property has changed.</td></tr><tr><td style="text-align:left;">maptypeid_changed</td><td style="text-align:center;"><code>GmapsMapTypeId</code></td><td style="text-align:left;">This event is fired when the mapTypeId property changes.</td></tr><tr><td style="text-align:left;">mousemove</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired whenever the user&#39;s mouse moves over the map container.</td></tr><tr><td style="text-align:left;">mouseout</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the user&#39;s mouse exits the map container.</td></tr><tr><td style="text-align:left;">mouseover</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the user&#39;s mouse enters the map container.</td></tr><tr><td style="text-align:left;">projection_changed</td><td style="text-align:center;">-</td><td style="text-align:left;">This event is fired when the projection has changed.</td></tr><tr><td style="text-align:left;">renderingtype_changed</td><td style="text-align:center;">-</td><td style="text-align:left;">This event is fired when the renderingType has changed.</td></tr><tr><td style="text-align:left;">rightclick</td><td style="text-align:center;"><code>GmapsPosition</code></td><td style="text-align:left;">This event is fired when the user right-clicks on the map.</td></tr><tr><td style="text-align:left;">tilesloaded</td><td style="text-align:center;">-</td><td style="text-align:left;">This event is fired when the visible tiles have finished loading.</td></tr><tr><td style="text-align:left;">tilt_changed</td><td style="text-align:center;"><code>number</code></td><td style="text-align:left;">This event is fired when the map tilt property changes.</td></tr><tr><td style="text-align:left;">zoom_changed</td><td style="text-align:center;"><code>number</code></td><td style="text-align:left;">This event is fired when the map zoom property changes.</td></tr><tr><td style="text-align:left;">mounted*</td><td style="text-align:center;"><code>GmapsMap</code></td><td style="text-align:left;">Special event after Vue has mounted the map. It returned the created GmapsMap object.</td></tr></tbody></table><h3 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-hidden="true">#</a></h3><ul><li><code>gmaps-map</code> has most of the <a href="https://developers.google.com/maps/documentation/javascript/reference/map" target="_blank" rel="noopener noreferrer">properties and events Google Maps&#39; Map</a> has.</li><li>The element that contains <code>&lt;gmaps-map /&gt;</code> should have a <code>height</code> and <code>width</code> style defined so that it can grow into it. <em>If you can&#39;t see the map, that may be your problem</em>.</li><li>Double clicking will result in both <code>click</code> and <code>dblclick</code> events firing (in that order).</li><li>The <code>contextmenu</code> even should be used instead of <code>rightclick</code> as it will accommodate Mac and mobile devices&#39; methods of right clicking too.</li><li>To make demo&#39;s and tests simpler, a default object <code>zoom</code> is defaulted to <code>2</code> and <code>center</code> is defaulted to <code>{ lat: 0, lng: 0 }</code> to simplify demo&#39;s and tests.</li></ul>`,11),o=[d];function i(p,c,r,g,h,m){return n(),e("div",null,o)}var f=t(l,[["render",i]]);export{y as __pageData,f as default};
