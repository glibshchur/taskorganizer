(this["webpackJsonptask-organizer"]=this["webpackJsonptask-organizer"]||[]).push([[0],{19:function(e,t,a){e.exports=a(37)},24:function(e,t,a){},25:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},26:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),i=a(13),s=a.n(i),o=(a(24),a(14)),l=a(15),c=a(16),u=a(7),m=a(17),h=a(18),p=(a(25),a(26),a(8)),d=a.n(p);d.a.initializeApp({apiKey:"AIzaSyAgh6oJsQpqk_IwUUORcOBgf6JzymNC9I0",authDomain:"organizer-2838a.firebaseapp.com",databaseURL:"https://organizer-2838a.firebaseio.com",projectId:"organizer-2838a",storageBucket:"organizer-2838a.appspot.com",messagingSenderId:"5471664420"});var g=new d.a.auth.GoogleAuthProvider,f=d.a.auth(),v=d.a,b=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={currentItem:"",username:"",items:[],user:null,performer:null,description:""},e.handleChange=e.handleChange.bind(Object(u.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(u.a)(e)),e.login=e.login.bind(Object(u.a)(e)),e.logout=e.logout.bind(Object(u.a)(e)),e}return Object(c.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(o.a)({},e.target.name,e.target.value))}},{key:"logout",value:function(){var e=this;f.signOut().then((function(){e.setState({user:null})}))}},{key:"login",value:function(){var e=this;f.signInWithPopup(g).then((function(t){var a=t.user;e.setState({user:a})}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=v.database().ref("items"),a={title:this.state.currentItem,description:this.state.description,performer:this.state.performer,user:this.state.user.displayName||this.state.user.email};t.push(a),this.setState({currentItem:"",description:"",performer:"",username:""})}},{key:"componentDidMount",value:function(){var e=this;f.onAuthStateChanged((function(t){t&&e.setState({user:t})})),v.database().ref("items").on("value",(function(t){var a=t.val(),n=[];for(var r in a)n.push({id:r,title:a[r].title,description:a[r].description,performer:a[r].performer,user:a[r].user});e.setState({items:n})}))}},{key:"removeItem",value:function(e){v.database().ref("/items/".concat(e)).remove()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"app"},r.a.createElement("header",null,r.a.createElement("div",{className:"wrapper"},r.a.createElement("h1",null,"Task Organizer"),this.state.user?r.a.createElement("button",{onClick:this.logout},"Logout"):r.a.createElement("button",{onClick:this.login},"Log In"))),this.state.user?r.a.createElement("div",null,r.a.createElement("div",{className:"user-profile"},r.a.createElement("img",{src:this.state.user.photoURL})),r.a.createElement("div",{className:"container"},r.a.createElement("section",{className:"add-item"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",name:"currentItem",placeholder:"Task Name",onChange:this.handleChange,value:this.state.currentItem}),r.a.createElement("input",{type:"text",name:"description",placeholder:"Task Description",onChange:this.handleChange,value:this.state.description}),r.a.createElement("input",{type:"text",name:"performer",placeholder:"Performer",onChange:this.handleChange,value:this.state.performer}),r.a.createElement("button",null,"Add Item"))),r.a.createElement("section",{className:"display-item"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("ul",null,this.state.items.map((function(t){return r.a.createElement("li",{key:t.id},r.a.createElement("h3",null,t.title),r.a.createElement("p",null,"Task Description: ",t.description),r.a.createElement("p",null,"Task for: ",t.performer),r.a.createElement("p",null,"Added by: ",t.user,t.user===e.state.user.displayName||t.user===e.state.user.email||t.user===e.state.performer?r.a.createElement("button",{onClick:function(){return e.removeItem(t.id)}},"Remove Item"):null))}))))))):r.a.createElement("div",{className:"wrapper"},r.a.createElement("p",null,"You must be logged in to see the potluck list and submit to it.")))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.4679b45e.chunk.js.map