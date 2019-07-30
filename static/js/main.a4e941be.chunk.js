(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,t,n){e.exports={MemeCreator:"MemeCreator__MemeCreator__KMn3A",Inner:"MemeCreator__Inner__3XUOU"}},120:function(e,t,n){e.exports={MemeList:"MemeList__MemeList__1WG56",Img:"MemeList__Img__1gxBS"}},162:function(e,t,n){e.exports={Header:"Header__Header__qj6EO"}},166:function(e,t,n){e.exports={MemeLists:"MemeLists__MemeLists__4Xivv"}},171:function(e,t,n){e.exports={Layout:"Layout__Layout__1SGjM"}},177:function(e,t,n){e.exports=n(234)},182:function(e,t,n){},192:function(e,t){},194:function(e,t){},214:function(e,t){},217:function(e,t){},234:function(e,t,n){"use strict";n.r(t);var a=n(15),r=n.n(a),o=n(161),s=n.n(o),m=(n(182),n(162)),i=n.n(m),l=function(){return r.a.createElement("div",{className:i.a.Header},r.a.createElement("h1",{style:{color:"white"}},"Meme Voting"))},c=n(7),u=n(20),d=n(1),p=n.n(d),g=n(3),h=n(163),f=n(164),M=n(173),v=n(165),w=n(174),C=n(119),_=n.n(C),b=function(e){return r.a.createElement("div",{className:_.a.MemeCreator},r.a.createElement("form",null,r.a.createElement("div",{className:_.a.Inner},r.a.createElement("input",{type:"text",name:"meme-url",onChange:e.urlChanged,value:e.value.imageUrl,placeholder:"Input Meme Url"}),r.a.createElement("input",{type:"text",name:"username",onChange:e.nameChanged,value:e.value.name,placeholder:"Username"}))),r.a.createElement("button",{onClick:e.createMemeClicked},"Create Meme"))},x=n(166),y=n.n(x),E=n(120),O=n.n(E),k=function(e){return r.a.createElement("div",{className:O.a.MemeList},r.a.createElement("p",{style:{fontWeight:"bold",fontSize:"15px"}},e.name),r.a.createElement("img",{className:O.a.Img,src:e.image,alt:e.name}),r.a.createElement("p",null,e.aettosAmount,"  Aettos"),r.a.createElement("input",{type:"number",name:"vote-amount",placeholder:"Amount of aeons",onChange:e.changed,value:e.value}),r.a.createElement("button",{onClick:e.clicked},"Vote"))},I=function(e){return r.a.createElement("div",{className:y.a.MemeLists},e.listOfMemes.sort(function(e,t){return t.aettosAmount-e.aettosAmount}).map(function(t){return r.a.createElement(k,{key:t.id,name:t.name,image:t.image,aettosAmount:t.aettosAmount,value:t.value,changed:e.inputChanged.bind(void 0,t.id),clicked:e.voteClicked.bind(void 0,t.id)})}))},L=n(172),j=function(e){function t(){var e,n;Object(h.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(M.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={listOfMemes:[{id:"gj7",name:"James",image:"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",aettosAmount:0,value:""},{id:"vjj8",name:"Gift",image:"https://picsum.photos/id/237/200",aettosAmount:2,value:""}],newMemeInputs:{name:"",imageUrl:""}},n.interactWithBlockchain=Object(g.a)(p.a.mark(function e(){var t,n,a,r,o;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t='\n    contract MemeVote = \n\n    record meme = {\n    creatorAddress: address,\n    voteCount: int,\n    name: string,\n    url: string\n    }\n    \n    record state = { \n    memes: map(int, meme),\n    memesLength: int\n    }\n\n    entrypoint init() = { \n    memes = {},\n    memesLength = 0\n    }\n\n    entrypoint getMeme(index: int): meme = \n    switch(Map.lookup(index, state.memes))\n        None => abort("Index not found")\n        Some(y) => y\n    \n    stateful entrypoint setMeme(memeUrl: string, uname: string) =\n    let meme = { creatorAddress = Call.caller, name = uname, url = memeUrl, voteCount = 0}\n    let id = getMemesLength() + 1\n    put(state { memes[id] = meme, memesLength = id} )\n    \n\n    entrypoint getMemesLength(): int =\n    state.memesLength\n    \n    stateful entrypoint voteMeme(index: int) = \n    let meme = getMeme(index)\n    Chain.spend(meme.creatorAddress, Call.value)\n    let updatedVoteCount = meme.voteCount + Call.value\n    let updatedMemes = state.memes{ [index].voteCount = updatedVoteCount }\n    put(state { memes = updatedMemes })\n    ',n=null,e.next=4,Object(L.a)({url:"https://sdk-testnet.aepps.com",internalUrl:"https://sdk-testnet.aepps.com",keypair:{secretKey:"ak_2bKhoFWgQ9os4x8CaeDTHZRGzUcSwcXYUrM12gZHKTdyreGRgG",publicKey:"ak_2bKhoFWgQ9os4x8CaeDTHZRGzUcSwcXYUrM12gZHKTdyreGRgG"},networkId:"ae_uat"});case 4:return n=e.sent,"ct_2bNtx4F9CbxEH2LFnWqR7ggTwKTrdTGKLBmVhrh6H6jKKw9T6z",e.next=8,n.getContractInstance(t,{contractAddress:"ct_2bNtx4F9CbxEH2LFnWqR7ggTwKTrdTGKLBmVhrh6H6jKKw9T6z"});case 8:return a=e.sent,e.next=11,a.call("getMemesLength",[],{callStatic:!0}).catch(function(e){return console.log(e)});case 11:return r=e.sent,console.log("calledGet",r),e.next=15,r.decode().catch(function(e){return console.log(e)});case 15:o=e.sent,console.log("decodeGet",o),console.log(n);case 18:case"end":return e.stop()}},e)})),n.voteHandler=function(e){n.setState(function(t,n){var a=Object(u.a)(t.listOfMemes),r=a.findIndex(function(t){return t.id===e}),o=Object(c.a)({},a[r]);return o.aettosAmount=t.listOfMemes[r].aettosAmount+t.listOfMemes[r].value,a[r]=o,{listOfMemes:a}})},n.onChangeHandler=function(e,t){var a=Object(u.a)(n.state.listOfMemes),r=a.findIndex(function(t){return t.id===e}),o=Object(c.a)({},a[r]);o.value=+t.target.value,a[r]=o,n.setState({listOfMemes:a})},n.newNameHandler=function(e){var t=Object(c.a)({},n.state.newMemeInputs);t.name=e.target.value,n.setState({newMemeInputs:t})},n.newUrlHandler=function(e){var t=Object(c.a)({},n.state.newMemeInputs);t.imageUrl=e.target.value,n.setState({newMemeInputs:t})},n.createMemeHandler=function(){if(n.state.newMemeInputs.imageUrl||n.state.newMemeInputs.name){var e=Object(u.a)(n.state.listOfMemes),t={id:n.state.newMemeInputs.name+(100*Math.random()+1),name:n.state.newMemeInputs.name,image:n.state.newMemeInputs.imageUrl,aettosAmount:0,value:""};e.push(t),n.setState({listOfMemes:e})}},n}return Object(w.a)(t,e),Object(f.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(b,{value:this.state.newMemeInputs,createMemeClicked:this.createMemeHandler,urlChanged:this.newUrlHandler,nameChanged:this.newNameHandler}),r.a.createElement(I,{listOfMemes:this.state.listOfMemes,inputChanged:this.onChangeHandler,voteClicked:this.voteHandler}))}}]),t}(a.Component),H=n(171),A=n.n(H),U=function(){return r.a.createElement("div",{className:A.a.Layout},r.a.createElement(l,null),r.a.createElement(j,null))};var K=function(){return r.a.createElement(U,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(K,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[177,1,2]]]);
//# sourceMappingURL=main.a4e941be.chunk.js.map