(this.webpackJsonphome=this.webpackJsonphome||[]).push([[0],{16:function(e,t,a){e.exports={canvas:"Landing_canvas__vK29-",info:"Landing_info__3uqv9",name:"Landing_name__B9tob",title:"Landing_title__1RvcV",disclaimer:"Landing_disclaimer__vO9cd"}},33:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a(1),i=a.n(s),o=a(25),r=a.n(o),c=(a(33),a(8)),l=a(2),d=a(19),h=a(12),m=a(13),u=a(10),p=a(15),b=a(14),j=a(16),g=a.n(j),v=50,f=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(){var e;return Object(h.a)(this,a),(e=t.call(this)).mouse={},e.canvas_objects=[],e.obj_size=1,e.obj_color=null,e.obj_size_timer=null,e.stop_loop=!1,e.loop=null,e.canvasRef=i.a.createRef(),e.onResize=e.onResize.bind(Object(u.a)(e)),e.onCanvasMouseMove=e.onCanvasMouseMove.bind(Object(u.a)(e)),e.onCanvasMouseDown=e.onCanvasMouseDown.bind(Object(u.a)(e)),e.onCanvasMouseUp=e.onCanvasMouseUp.bind(Object(u.a)(e)),e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.onResize),this.onResize(),this.generateCanvasObjects(),this.canvasLoop()}},{key:"componentWillUnmount",value:function(){this.stop_loop=!0,window.clearInterval(this.obj_size_timer),this.obj_size_timer=null,window.cancelAnimationFrame(this.loop),window.removeEventListener("resize",this.onResize)}},{key:"getRandomColor",value:function(){var e=["b5c2c7","e7cac2","7aa39a","5e7783","4d1635","d8b26e","decec8","d5e9dd","94a8b3","d4e8dc","d8b26e","cebeb9"];return"#"+e[Math.floor(Math.random()*e.length)]}},{key:"generateCanvasObject",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this.canvasRef.current,a=t.width,n=t.height,s=e.r||Math.random()*v+10;return Object(d.a)({x:v+(Math.random()*a-100),y:v+(Math.random()*n-100),r:s,m:s*s/10,vx:2*Math.random()-1,vy:2*Math.random()-1,range:5*s,color:this.getRandomColor()},e)}},{key:"generateCanvasObjects",value:function(){for(var e=0;e<100;++e)this.canvas_objects.push(this.generateCanvasObject())}},{key:"canvasLoop",value:function(){var e=this;this.canvasRef.current&&(this.stop_loop||(this.loop=window.requestAnimationFrame((function(){e.canvasLoop()})),this.canvasUpdate()))}},{key:"canvasUpdate",value:function(){var e=this.canvasRef.current,t=e.width,a=e.height,n=e.getContext("2d");n.clearRect(0,0,t,a);for(var s=this.canvas_objects.length,i=0;i<s;++i){for(var o=this.canvas_objects[i],r=0;r<s;++r)if(i!==r){var c=this.canvas_objects[r],l=c.x-o.x,d=c.y-o.y,h=Math.sqrt(l*l+d*d);if(!(h<o.r+c.r||h>c.range)){var m=.005*o.m*c.m/(h*h);o.vx+=l/h*m,o.vy+=d/h*m}}o.x+=o.vx,o.y+=o.vy,(o.x-o.r<0||o.x+o.r>t)&&(o.vx*=-1),(o.y-o.r<0||o.y+o.r>a)&&(o.vy*=-1),n.globalAlpha=.2,n.beginPath(),n.arc(o.x,o.y,o.r,0,2*Math.PI),n.fillStyle=o.color,n.fill()}this.mouse.down&&(n.beginPath(),n.arc(this.mouse.down_x,this.mouse.down_y,this.obj_size,0,2*Math.PI),n.fillStyle=this.obj_color,n.fill())}},{key:"onResize",value:function(){var e=this.canvasRef.current;e.width=e.clientWidth,e.height=e.clientHeight}},{key:"getMousePos",value:function(e){var t=this.canvasRef.current.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}},{key:"onCanvasMouseMove",value:function(e){var t=this.getMousePos(e);this.mouse=Object(d.a)(Object(d.a)({},this.mouse),t)}},{key:"onCanvasMouseDown",value:function(e){var t=this;this.mouse.down=!0,this.mouse.down_x=this.mouse.x,this.mouse.down_y=this.mouse.y,this.obj_color=this.getRandomColor(),this.obj_size_timer=window.setInterval((function(){t.obj_size+=1}),10)}},{key:"onCanvasMouseUp",value:function(e){this.mouse.down=!1,window.clearInterval(this.obj_size_timer),this.obj_size_timer=null,console.log(this.mouse),this.canvas_objects.push(this.generateCanvasObject({x:this.mouse.down_x,y:this.mouse.down_y,r:this.obj_size,color:this.obj_color})),this.mouse.down_x=null,this.mouse.down_y=null,this.obj_size=1}},{key:"render",value:function(){return Object(n.jsxs)(s.Fragment,{children:[Object(n.jsx)(c.b,{to:"/about",children:Object(n.jsxs)("div",{className:g.a.info,children:[Object(n.jsx)("div",{className:g.a.name,children:"Ray Davidson"}),Object(n.jsx)("div",{className:g.a.title,children:"Software Developer"}),Object(n.jsx)("div",{className:g.a.disclaimer,children:"...and his obligatory canvas landing page"})]})}),Object(n.jsx)("canvas",{ref:this.canvasRef,className:g.a.canvas,onMouseDown:this.onCanvasMouseDown,onMouseUp:this.onCanvasMouseUp,onMouseMove:this.onCanvasMouseMove})]})}}]),a}(s.Component),y=a(18),w=a(27),_=a.n(w),O=a(7),x=a.n(O);var k=function(){var e=Object(l.f)().pathname,t={About:"/about","GM Kit":"/gmkit",Projects:"/projects"};return Object(n.jsxs)("div",{className:x.a.header,children:[Object(n.jsx)("div",{className:x.a.navigation,children:Object.keys(t).map((function(a){var s=t[a],i=_()(x.a.navigation_link,Object(y.a)({},x.a.navigation_link_selected,e===s));return Object(n.jsx)(c.b,{to:s,className:i,children:a},"path_".concat(s))}))}),Object(n.jsxs)("div",{className:x.a.about,children:[Object(n.jsx)("div",{className:x.a.name,children:"Raymond Davidson"}),Object(n.jsx)("div",{className:x.a.title,children:"Software Developer"}),Object(n.jsxs)("div",{className:x.a.links,children:[Object(n.jsx)("a",{className:x.a.link,rel:"noreferrer",href:"https://docs.google.com/document/d/1aTujwNc_y6BLQmkewbEnFPGCXxLqKoo3BUKjNjLdmNo/edit?usp=sharing",target:"_blank",children:"R\xe9sum\xe9"}),Object(n.jsx)("a",{className:x.a.link,rel:"noreferrer",href:"https://www.linkedin.com/in/raymond-davidson-05808b28",target:"_blank",children:"LinkedIn"})]})]})]})};var M=function(){return Object(n.jsx)("div",{style:{height:"1rem"}})},C=a(9),I=a.n(C),N=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"populateImages",value:function(){var e=this.props.images,t=void 0===e?[]:e;return t&&t.length?Object(n.jsx)("div",{className:I.a.images,children:t.map((function(e){return Object(n.jsx)("div",{className:I.a.image,style:{backgroundImage:'url("'.concat(e,'")')}},"section_image_".concat(e))}))}):null}},{key:"render",value:function(){var e=this.props,t=e.header,a=e.children;return Object(n.jsxs)("div",{className:I.a.section,children:[t&&Object(n.jsx)("div",{className:I.a.header,children:Object(n.jsx)("div",{className:I.a.header_text,children:t})}),Object(n.jsxs)("div",{className:I.a.body,children:[Object(n.jsx)("div",{className:I.a.description,children:a}),this.populateImages()]})]})}}]),a}(s.Component);var S=function(){return Object(n.jsxs)(s.Fragment,{children:[Object(n.jsx)(k,{}),Object(n.jsxs)(N,{children:["I'm a Full Stack-ish developer with a preference and passion for Front-End. I especially enjoy canvas related things and tinkering with Electron for desktop apps.",Object(n.jsx)(M,{}),"A good example being my ",Object(n.jsx)(c.b,{to:"/gmkit",children:"GM Kit"})," project which I like to work on sometimes in my spare time. It doesn't use any real frameworks or libraries aside from Electron itself. I did it mostly as a challenge just to see what it's like, and as you would rightly assume, I now mostly regret it...",Object(n.jsx)(M,{}),"That's uhhh... about it for this page at the moment..."]})]})};var T=function(e){var t=e.link,a=e.children;return Object(n.jsx)("a",{href:t,rel:"noreferrer",target:"_blank",children:a})};var R=function(e){var t=e.items;return Object(n.jsx)("ul",{children:t.map((function(e){return Object(n.jsx)("li",{children:e},"item_".concat(e))}))})},z={MAP:["https://i.lensdump.com/i/isRecv.md.png","https://i.lensdump.com/i/isRvgC.md.png","https://i.lensdump.com/i/isto45.md.png","https://i.lensdump.com/i/istYtC.md.png","https://i.lensdump.com/i/is1px3.md.png","https://i.lensdump.com/i/is1KSF.md.png","https://i.lensdump.com/i/istzMi.md.png","https://i.lensdump.com/i/istn69.md.png"],AUDIO:["https://i.lensdump.com/i/isHtHx.md.png","https://i.lensdump.com/i/istvz2.md.png"],INFO:["https://i.lensdump.com/i/istSao.md.png"]},P={"Battlesmaps subreddit":"https://www.reddit.com/r/battlemaps/","2 Minute Tabletop":"https://2minutetabletop.com/","Mike Schley":"https://mikeschley.com/","Jared Blando":"https://jaredblando.com/cartography/","Caeora (Blue Sword Games) Patreon":"https://www.patreon.com/caeora","Venatus Maps Patreon":"https://www.patreon.com/venatusmaps","Neutral Party Patreon":"https://www.patreon.com/neutralparty"},L=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return Object(n.jsxs)(s.Fragment,{children:[Object(n.jsx)(k,{}),Object(n.jsxs)(N,{children:["GM Kit is an application designed to help GMs who run games in-person with second screen digital enhancement (TV in table, projector, etc...). This app lets GMs add dynamic lighting to their maps, and manage local audio tracks.",Object(n.jsx)(M,{}),Object(n.jsx)("a",{href:"https://github.com/Salachar/gm-kit",rel:"noreferrer",target:"_blank",children:"GM Kit code repository"}),Object(n.jsx)(M,{}),"Some pros of GM Kit:",Object(n.jsx)(R,{items:["There are no accounts or sign-ins required.","No information is stored or tracked anywhere aside from a small local config.json on the user's computer.","Any image can be turned into a map with dynamic lighting by adding walls.","Local audio track management and integration (I wouldn't say it replaces things like Spotify, but it helps supplement it).","Can be used entirely offline.","Grid and Spell Marker support lets guesswork be taken out of what squares/cells are affected.","Simple (hopefully) to use, get up an running configuring maps within minutes."]}),Object(n.jsx)(M,{}),"...and some cons:",Object(n.jsx)(R,{items:["There are no enemy or player character tokens or trackers at the moment. The app is currently best suited for those who have non-digital minis and tokens for use on top of the virtual maps.","No files are included with the software. All maps and audio must be supplied by the user."]}),Object(n.jsx)(M,{}),"...and some stuff I want to add:",Object(n.jsx)(R,{items:["Better audio management (playlists and whatnot).","Continually improve the random info/name generators.","Simple map maker, nothing fancy, but enough to create a simple map with recognizable terrain and auto populated walls and doors."]})]}),Object(n.jsxs)(N,{header:"Maps: Walls and Dynamic Lighting",images:z.MAP,children:["The app works by asking for a folder of maps when you first go to load one. This will populate a modal allowing you to see which maps have walls added to them (complete) and which ones don't (image only). Walls can easily be added to the map by drawing them on wherever you want, which are then used for the dynamic lighting on the map.",Object(n.jsx)(R,{items:["Walls can be added anywhere for custom dynamic lighting.",'Doors can be added, which can be instantly opened or "dragged" open for full or partial light.',"One Way Walls can be created that allow all light through in one direction and completely block it in another. This helps with terrain that has height variances. Block light/visibility to the top of a cliff, but allow the top of the cliff to look down over everything.","GM and Player screens can be zoomed independently.","A custom Overlay Grid can be added for maps that don't have one or for maps where Spell/Shape markers are wanted, this grid should represent a 5' grid system, and will be saved when the map is saved.","Spell/Shape Markers can be placed (line/square/circle/cone) to mark spells and see what grid squares are affected. Spell Markers are not saved to the map and will go away between closing and opening the app. This currently requires the use of the overlay grid, as the spells use the grid to determine a 5' square for sizing."]}),Object(n.jsx)(M,{}),"Good sources for maps:",Object(n.jsx)("ul",{children:Object.keys(P).map((function(e){var t=P[e];return Object(n.jsx)("li",{children:Object(n.jsx)(T,{link:t,children:e})},"link_".concat(t))}))})]}),Object(n.jsxs)(N,{header:"Audio: Local Track Management and Player",images:z.AUDIO,children:["By pointing the app to a local folder of audio tracks, they will all become available to play and manage. Tracks can be searched by name or folder, and can be tagged for easier searching. Tracks can hold any number of tags, though the UI may not like it at the moment. Tracks simply loop when ended (unless looping has been turned off). Previously played tracks are saved to help when switching between tracks",Object(n.jsx)(R,{items:["Easily view and manage a tree of local audio tracks.","Collapsed sections are saved and will remain collapsed upon app relaunch.","List of previously played tracks is kept to keep audio switching easier during play.","Previously played tracks are saved and loaded on app launch.","Tracks can be tagged for easier searching.","Tracks can be searched for by using the name, tag, or folder name."]})]}),Object(n.jsxs)(N,{header:"Info: Random Name and Quest Generators",images:z.INFO,children:["Several small generators to help come up with names and places on the spot. Names are split between races and gender and any number can be generated at a time. Clicking on a result will mark it to remain in the list during the current app session.",Object(n.jsx)(M,{}),"The names mainly came from:",Object(n.jsx)(R,{items:["Player Handbook 5e",'<a href="http://brandondraga.tumblr.com/post/66804468075/chris-perkins-npc-name-list" rel="noreferrer" target="_blank">Chris Perkins Name List</a>']})]})]})}}]),a}(s.Component);var G=function(){return Object(n.jsxs)(s.Fragment,{children:[Object(n.jsx)(k,{}),Object(n.jsxs)(N,{header:"GM Kit",children:["As an avid D&D player and GM, I like to bring the tech I use into the games I run. This has absolutely nothing to do with maps being a gigantic pain to print out and assemble. No influenced by printer ink being stupid expensive, or full page map sections taking forver to print... I might be getting off-topic here.",Object(n.jsx)(M,{}),"The apps main purpose is for digitally displaying maps (with dynamic lighting) for in-person games. I use a projector as a second screen and project the maps down onto the table. It also works really well with the TV placed flat on the table method.",Object(n.jsx)(M,{}),"Any image can be used and allows the user to add/draw walls onto it for dynamic lighting. Over time other small useful features have been added, like local audio track management and random name/info generators. It doesn't handle character or monster tokens. The assumption being there will still be physical minis of some sort used with the app.",Object(n.jsx)(M,{}),"More info here: ",Object(n.jsx)(c.b,{to:"/gmkit",children:"GM Kit"})]}),Object(n.jsxs)(N,{header:"Gravity Well Demo",children:["Interesting little gravity well demo I made a long time ago when first tinkering with the HTML Canvas.",Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:"Gravity Wells can be placed and set to push or pull asteroids."}),Object(n.jsx)("li",{children:"Gravity Wells can be configured by right clicking on the center of the well."}),Object(n.jsx)("li",{children:"Planets can be placed and can be destroyed by asteroids, creating asteroid like chunks as it gets destroyed."}),Object(n.jsx)("li",{children:"Asteroids are created at the mouse position with an initial direction/velocity matching the movement of the mouse."})]}),Object(n.jsx)(M,{}),"View it here: ",Object(n.jsx)(T,{link:"https://salachar.github.io/gravity-well/",children:"Gravity Well"})]}),Object(n.jsxs)(N,{header:"Minesweeper",children:["A simple minesweeper game made from scratch as part of a quick challenge with friends. Currently it's just set to super easy because watching the spaces clear is satifying. I'm sure something is missing that prevents it from being a real \"minesweeper\" game, but it's close enough.",Object(n.jsx)(M,{}),"View it here: ",Object(n.jsx)(T,{link:"https://salachar.github.io/minesweeper/",children:"Minesweeper"})]})]})};var D=function(){return Object(n.jsx)(c.a,{basename:"/",children:Object(n.jsxs)(l.c,{children:[Object(n.jsx)(l.a,{exact:!0,path:"/",children:Object(n.jsx)(f,{})}),Object(n.jsx)(l.a,{path:"/about",children:Object(n.jsx)(S,{})}),Object(n.jsx)(l.a,{path:"/projects",children:Object(n.jsx)(G,{})}),Object(n.jsx)(l.a,{path:"/gmkit",children:Object(n.jsx)(L,{})})]})})},A=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,40)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,i=t.getLCP,o=t.getTTFB;a(e),n(e),s(e),i(e),o(e)}))};r.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(D,{})}),document.getElementById("root")),A()},7:function(e,t,a){e.exports={header:"Header_header__2bWrW",subheader:"Header_subheader__mBgfR",superscript:"Header_superscript__dsVTZ",navigation:"Header_navigation__3h1jd",navigation_link:"Header_navigation_link__2c3hE",navigation_link_selected:"Header_navigation_link_selected__1X_2O",about:"Header_about__3fP45",name:"Header_name__2NUCH",title:"Header_title__1m8WT",links:"Header_links__wOlW5",link:"Header_link__1DLr0"}},9:function(e,t,a){e.exports={section:"Section_section__3cTM2",header:"Section_header__1aIfp",header_text:"Section_header_text__3XyY6",body:"Section_body__1F-O3",description:"Section_description__3q8i6",images:"Section_images__CV2qx",image:"Section_image__3kgIJ"}}},[[39,1,2]]]);
//# sourceMappingURL=main.2b07d34a.chunk.js.map