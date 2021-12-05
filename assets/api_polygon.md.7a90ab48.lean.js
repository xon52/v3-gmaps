import{_ as n,c as s,o as l,a as t,b as e}from"./app.d015bdb6.js";var a="/v3-gmaps/assets/polygon.41288197.png";const D='{"title":"Polygon (gmaps-polygon)","description":"","frontmatter":{"sidebarDepth":2},"headers":[{"level":3,"title":"Simple Use (demo)","slug":"simple-use-demo"},{"level":3,"title":"Props","slug":"props"},{"level":3,"title":"Events","slug":"events"},{"level":3,"title":"Notes","slug":"notes"}],"relativePath":"api/polygon.md","lastUpdated":1638742199236}',o={},i=t("h1",{id:"polygon-gmaps-polygon",tabindex:"-1"},[e("Polygon ("),t("code",null,"gmaps-polygon"),e(") "),t("a",{class:"header-anchor",href:"#polygon-gmaps-polygon","aria-hidden":"true"},"#")],-1),c=t("div",{class:"v3-gmaps-screenshot"},[t("img",{src:a}),t("p",null,[e("In addition to "),t("a",{href:"./rectangle"},"rectangles"),e(", "),t("a",{href:"./polyline"},"polylines"),e(", and "),t("a",{href:"./circle"},"circles"),e(" you can also create polygons on a map.")])],-1),p=t("h3",{id:"simple-use-demo",tabindex:"-1"},[e("Simple Use ("),t("a",{href:"https://vue-bujcvu.stackblitz.io/polylines",target:"_blank",rel:"noopener noreferrer"},"demo"),e(") "),t("a",{class:"header-anchor",href:"#simple-use-demo","aria-hidden":"true"},"#")],-1),r=t("div",{class:"language-html"},[t("pre",null,[t("code",null,[t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("template")]),t("span",{class:"token punctuation"},">")]),e(`
  `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("div")]),e(),t("span",{class:"token special-attr"},[t("span",{class:"token attr-name"},"style"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),t("span",{class:"token value css language-css"},[t("span",{class:"token property"},"height"),t("span",{class:"token punctuation"},":"),e(" 500px")]),t("span",{class:"token punctuation"},'"')])]),t("span",{class:"token punctuation"},">")]),e(`
    `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("gmaps-map")]),t("span",{class:"token punctuation"},">")]),e(`
      `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("gmaps-polygon")]),e(),t("span",{class:"token attr-name"},":paths"),t("span",{class:"token attr-value"},[t("span",{class:"token punctuation attr-equals"},"="),t("span",{class:"token punctuation"},'"'),e("[[{ lat: -28, lng: 125 }, { lat: -25, lng: 130 }, { lat: -32, lng: 120 }]]"),t("span",{class:"token punctuation"},'"')]),e(),t("span",{class:"token punctuation"},"/>")]),e(`
    `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),e("gmaps-map")]),t("span",{class:"token punctuation"},">")]),e(`
  `),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),e("div")]),t("span",{class:"token punctuation"},">")]),e(`
`),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),e("template")]),t("span",{class:"token punctuation"},">")]),e(`

`),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"<"),e("script")]),t("span",{class:"token punctuation"},">")]),t("span",{class:"token script"},[t("span",{class:"token language-javascript"},[e(`
`),t("span",{class:"token keyword"},"import"),e(),t("span",{class:"token punctuation"},"{"),e(" defineComponent "),t("span",{class:"token punctuation"},"}"),e(),t("span",{class:"token keyword"},"from"),e(),t("span",{class:"token string"},"'vue'"),t("span",{class:"token punctuation"},";"),e(`
`),t("span",{class:"token keyword"},"import"),e(),t("span",{class:"token punctuation"},"{"),e(" gmapsMap"),t("span",{class:"token punctuation"},","),e(" gmapsPolygon "),t("span",{class:"token punctuation"},"}"),e(),t("span",{class:"token keyword"},"from"),e(),t("span",{class:"token string"},"'v3-gmaps'"),t("span",{class:"token punctuation"},";"),e(`

`),t("span",{class:"token keyword"},"export"),e(),t("span",{class:"token keyword"},"default"),e(),t("span",{class:"token function"},"defineComponent"),t("span",{class:"token punctuation"},"("),t("span",{class:"token punctuation"},"{"),e(`
  components`),t("span",{class:"token operator"},":"),e(),t("span",{class:"token punctuation"},"{"),e(" gmapsMap"),t("span",{class:"token punctuation"},","),e(" gmapsPolygon "),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},","),e(`
`),t("span",{class:"token punctuation"},"}"),t("span",{class:"token punctuation"},")"),t("span",{class:"token punctuation"},";"),e(`
`)])]),t("span",{class:"token tag"},[t("span",{class:"token tag"},[t("span",{class:"token punctuation"},"</"),e("script")]),t("span",{class:"token punctuation"},">")]),e(`
`)])])],-1),d=t("h3",{id:"props",tabindex:"-1"},[e("Props "),t("a",{class:"header-anchor",href:"#props","aria-hidden":"true"},"#")],-1),u=t("table",null,[t("thead",null,[t("tr",null,[t("th",{style:{"text-align":"left"}},"Props"),t("th",{style:{"text-align":"center"}},"Type"),t("th",{style:{"text-align":"center"}},"Default"),t("th",{style:{"text-align":"left"}},"Description")])]),t("tbody",null,[t("tr",null,[t("td",{style:{"text-align":"left"}},"options*"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPolygonOptions")]),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},[e("Object used to define the properties of a "),t("code",null,"gmaps-polygon"),e(".")])]),t("tr",null,[t("td",{style:{"text-align":"left"}},"draggable"),t("td",{style:{"text-align":"center"}},[t("code",null,"boolean")]),t("td",{style:{"text-align":"center"}},[t("code",null,"false")]),t("td",{style:{"text-align":"left"}},"Whether this Circle can be dragged over the map.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"editable"),t("td",{style:{"text-align":"center"}},[t("code",null,"boolean")]),t("td",{style:{"text-align":"center"}},[t("code",null,"false")]),t("td",{style:{"text-align":"left"}},"Whether this Circle can be edited by dragging the control points shown at the center and around the circumference.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"paths"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition[] | GmapsPosition[][]")]),t("td",{style:{"text-align":"center"}},"-"),t("td",{style:{"text-align":"left"}},"The ordered sequence of coordinates that designates a closed loop.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"visible"),t("td",{style:{"text-align":"center"}},[t("code",null,"boolean")]),t("td",{style:{"text-align":"center"}},[t("code",null,"true")]),t("td",{style:{"text-align":"left"}},"Whether this Circle is visible on the map.")])])],-1),g=t("p",null,[e("* To see all of the possible options, have a look at the "),t("a",{href:"https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions",target:"_blank",rel:"noopener noreferrer"},"Google Maps PolygonOptions interface"),e(".")],-1),h=t("h3",{id:"events",tabindex:"-1"},[e("Events "),t("a",{class:"header-anchor",href:"#events","aria-hidden":"true"},"#")],-1),y=t("table",null,[t("thead",null,[t("tr",null,[t("th",{style:{"text-align":"left"}},"Event"),t("th",{style:{"text-align":"center"}},"Type"),t("th",{style:{"text-align":"left"}},"Description")])]),t("tbody",null,[t("tr",null,[t("td",{style:{"text-align":"left"}},"click"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the DOM click event is fired on the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"contextmenu"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the DOM contextmenu event is fired on the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"dblclick"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the DOM dblclick event is fired on the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"drag"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is repeatedly fired while the user drags the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"dragend"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the user stops dragging the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"dragstart"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired when the user starts dragging the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mousedown"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired for a mousedown on the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mousemove"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired for a mousemove on the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mouseout"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired for a mouseout on the Polygone.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mouseover"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired for a mouseover on the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"mouseup"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired for a mouseup on the Polygon.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"path_changed"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition[][]")]),t("td",{style:{"text-align":"left"}},"This event is fired when any of the Polygon's paths are changed.")]),t("tr",null,[t("td",{style:{"text-align":"left"}},"rightclick"),t("td",{style:{"text-align":"center"}},[t("code",null,"GmapsPosition")]),t("td",{style:{"text-align":"left"}},"This event is fired for a rightclick on the Polygon.")])])],-1),f=t("h3",{id:"notes",tabindex:"-1"},[e("Notes "),t("a",{class:"header-anchor",href:"#notes","aria-hidden":"true"},"#")],-1),k=t("ul",null,[t("li",null,[t("code",null,"gmaps-polygon"),e(" has most of the "),t("a",{href:"https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon",target:"_blank",rel:"noopener noreferrer"},"properties and events Google Maps' Polygon"),e(" has.")]),t("li",null,[e("Unlike polylines, a polygon may consist of one or more paths. As a result, the paths property may specify one or more arrays of LatLng ("),t("code",null,"GmapsPosition"),e(") coordinates.")]),t("li",null,[e("If you define the coordinates clockwise, the polygon will be shaded in. If you define the coordinates anti-clockwise, the polygone will remove shading. An example of this can be seen the in the "),t("a",{href:"https://stackblitz.com/edit/vue-bujcvu?file=src%2Fcomponents%2FPolylines2.vue",target:"_blank",rel:"noopener noreferrer"},"Polylines 2 demo"),e(".")])],-1),m=[i,c,p,r,d,u,g,h,y,f,k];function x(v,P,_,b,w,G){return l(),s("div",null,m)}var j=n(o,[["render",x]]);export{D as __pageData,j as default};