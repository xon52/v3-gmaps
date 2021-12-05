import{_ as n,c as l,o as s,a as t,b as e}from"./app.d015bdb6.js";var a="/v3-gmaps/assets/map.fc529182.png";const P='{"title":"Map (gmaps-map)","description":"","frontmatter":{"sidebarDepth":2},"headers":[{"level":3,"title":"Simple Use (demo)","slug":"simple-use-demo"},{"level":3,"title":"Props","slug":"props"},{"level":3,"title":"Events","slug":"events"},{"level":3,"title":"Notes","slug":"notes"}],"relativePath":"api/map.md","lastUpdated":1638742199236}',i={},o=t("h1",{id:"map-gmaps-map",tabindex:"-1"},[e("Map ("),t("code",null,"gmaps-map"),e(") "),t("a",{class:"header-anchor",href:"#map-gmaps-map","aria-hidden":"true"},"#")],-1),c=t("div",{class:"v3-gmaps-screenshot"},[t("img",{src:a}),t("p",null,"The Map is the core component of the library (and Google Maps). All the other components are created by placing them inside the Map component.")],-1),d=t("h3",{id:"simple-use-demo",tabindex:"-1"},[e("Simple Use ("),t("a",{href:"https://vue-bujcvu.stackblitz.io/map",target:"_blank",rel:"noopener noreferrer"},"demo"),e(") "),t("a",{class:"header-anchor",href:"#simple-use-demo","aria-hidden":"true"},"#")],-1),r=t("div",{class:"language-html"},[t("pre",null,[t("code",null,[t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("template")]),t("span",{class:"token punctuation"},">")]),e(`
  `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("div")]),e(),t("span",{class:"token special-attr"},[t("span",{class:"token attr-name"},"style"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),t("span",{class:"token value css language-css"},[t("span",{class:"token property"},"height"),t("span",{class:"token punctuation"},":"),e(" 500px")]),t("span",{class:"token punctuation"},'"')])]),t("span",{class:"token punctuation"},">")]),e(`
    `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("gmaps-map")]),e(),t("span",{class:"token punctuation"},"/>")]),e(`
  `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),e("div")]),t("span",{class:"token punctuation"},">")]),e(`
`),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),e("template")]),t("span",{class:"token punctuation"},">")]),e(`

`),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("script")]),t("span",{class:"token punctuation"},">")]),t("span",{class:"token script"},[t("span",{class:"token language-javascript"},[e(`
`),t("span",{class:"token keyword"},"import"),e(),t("span",{class:"token punctuation"},"{"),e(" defineComponent "),t("span",{class:"token punctuation"},"}"),e(),t("span",{class:"token keyword"},"from"),e(),t("span",{class:"token string"},"'vue'"),t("span",{class:"token punctuation"},";"),e(`
`),t("span",{class:"token keyword"},"import"),e(),t("span",{class:"token punctuation"},"{"),e(" gmapsMap "),t("span",{class:"token punctuation"},"}"),e(),t("span",{class:"token keyword"},"from"),e(),t("span",{class:"token string"},"'v3-gmaps'"),t("span",{class:"token punctuation"},";"),e(`

`),t("span",{class:"token keyword"},"export"),e(),t("span",{class:"token keyword"},"default"),e(),t("span",{class:"token function"},"defineComponent"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},"{"),e(`
  components`),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"{"),e(" gmapsMap "),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},","),e(`
`),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),e(`
`)])]),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),e("script")]),t("span",{class:"token punctuation"},">")]),e(`
`)])])],-1),p=t("h3",{id:"props",tabindex:"-1"},[e("Props "),t("a",{class:"header-anchor",href:"#props","aria-hidden":"true"},"#")],-1),u=t("table",null,[t("thead",null,[t("tr",null,[t("th",{style:{"text-align":"left"}},"Props"),t("th",{style:{"text-align":"center"}},"Type"),t("th",{style:{"text-align":"center"}},"Default"),t("th",{style:{"text-align":"left"}},"Description")])]),t("tbody",null,[t("tr",null,[t("td",{style:{"text-align":"left"}},"options*"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsMapOptions")]),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},[e("Object used to define the properties of a "),t("code",null,"gmaps-map"),e(".")])]),t("tr",null,[t("td",{style:{"text-align":"left"}},"center"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"The initial Map center.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"clickableIcons"),t("td",{style:{"text-align":"center"}},[t("code",null,"boolean")]),t("td",{style:{"text-align":"center"}},[t("code",null,"true")]),t("td",{style:{"text-align":"left"}},"Whether map points of interest are clickable.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"heading"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"The heading for aerial imagery in degrees measured clockwise from cardinal direction North.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mapTypeId"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsMapTypeId")]),t("td",{style:{"text-align":"center"}},[t("code",null,"ROADMAP")]),t("td",{style:{"text-align":"left"}},"The initial Map mapTypeId.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"tilt"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"Sets the angle of incidence of the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"zoom"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"The initial Map zoom level.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"throttle"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"center"}},[t("code",null,"100")]),t("td",{style:{"text-align":"left"}},"The event throttle value in milliseconds.")])])],-1),g=t("p",null,[e("* To see all of the possible options, have a look at the "),t("a",{href:"https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions",target:"_blank",rel:"noopener noreferrer"},"Google Maps MapOptions interface"),e(".")],-1),h=t("h3",{id:"events",tabindex:"-1"},[e("Events "),t("a",{class:"header-anchor",href:"#events","aria-hidden":"true"},"#")],-1),m=t("table",null,[t("thead",null,[t("tr",null,[t("th",{style:{"text-align":"left"}},"Event"),t("th",{style:{"text-align":"center"}},"Type"),t("th",{style:{"text-align":"left"}},"Description")])]),t("tbody",null,[t("tr",null,[t("td",{style:{"text-align":"left"}},"bounds_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsBounds")]),t("td",{style:{"text-align":"left"}},"This event is fired when the viewport bounds have changed.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"center_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the map center property changes.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"click"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the user clicks on the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"contextmenu"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the DOM contextmenu event is fired on the map container.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"dblclick"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the user double-clicks on the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"drag"),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"This event is repeatedly fired while the user drags the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"dragend"),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"This event is fired when the user stops dragging the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"dragstart"),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"This event is fired when the user starts dragging the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"heading_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"left"}},"This event is fired when the map heading property changes.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"idle"),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"This event is fired when the map becomes idle after panning or zooming.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"isfractionalzoomenabled_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"left"}},"This event is fired when the isFractionalZoomEnabled property has changed.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"maptypeid_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsMapTypeId")]),t("td",{style:{"text-align":"left"}},"This event is fired when the mapTypeId property changes.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mousemove"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired whenever the user's mouse moves over the map container.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mouseout"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the user's mouse exits the map container.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mouseover"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the user's mouse enters the map container.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"projection_changed"),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"This event is fired when the projection has changed.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"renderingtype_changed"),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"This event is fired when the renderingType has changed.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"rightclick"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the user right-clicks on the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"tilesloaded"),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"This event is fired when the visible tiles have finished loading.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"tilt_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"left"}},"This event is fired when the map tilt property changes.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"zoom_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"number")]),t("td",{style:{"text-align":"left"}},"This event is fired when the map zoom property changes.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mounted*"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsMap")]),t("td",{style:{"text-align":"left"}},"Special event after Vue has mounted the map. It returned the created GmapsMap object.")])])],-1),y=t("h3",{id:"notes",tabindex:"-1"},[e("Notes "),t("a",{class:"header-anchor",href:"#notes","aria-hidden":"true"},"#")],-1),f=t("ul",null,[t("li",null,[t("code",null,"gmaps-map"),e(" has most of the "),t("a",{href:"https://developers.google.com/maps/documentation/javascript/reference/map",target:"_blank",rel:"noopener noreferrer"},"properties and events Google Maps' Map"),e(" has.")]),t("li",null,[e("The element that contains "),t("code",null,"<gmaps-map />"),e(" should have a "),t("code",null,"height"),e(" and "),t("code",null,"width"),e(" style defined so that it can grow into it. "),t("em",null,"If you can't see the map, that may be your problem"),e(".")]),t("li",null,[e("Double clicking will result in both "),t("code",null,"click"),e(" and "),t("code",null,"dblclick"),e(" events firing (in that order).")]),t("li",null,[e("The "),t("code",null,"contextmenu"),e(" even should be used instead of "),t("code",null,"rightclick"),e(" as it will accommodate Mac and mobile devices' methods of right clicking too.")]),t("li",null,[e("To make demo's and tests simpler, a default object "),t("code",null,"zoom"),e(" is defaulted to "),t("code",null,"2"),e(" and "),t("code",null,"center"),e(" is defaulted to "),t("code",null,"{ lat: 0, lng: 0 }"),e(" to simplify demo's and tests.")])],-1),x=[o,c,d,r,p,u,g,h,m,y,f];function k(v,b,_,T,w,M){return s(),l("div",null,x)}var j=n(i,[["render",k]]);export{P as __pageData,j as default};