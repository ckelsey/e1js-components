!function(){return function e(t,i,o){function s(n,l){if(!i[n]){if(!t[n]){var r="function"==typeof require&&require;if(!l&&r)return r(n,!0);if(a)return a(n,!0);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}var u=i[n]={exports:{}};t[n][0].call(u.exports,function(e){var i=t[n][1][e];return s(i||e)},u,u.exports,e,t,i,o)}return i[n].exports}for(var a="function"==typeof require&&require,n=0;n<o.length;n++)s(o[n]);return s}}()({1:[function(e,t,i){"use strict";window.E1.registerService("demoService",new function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.edit={text:"This is some editable text",save:function(e){console.log(e.textContent)}},this.progress={amount:10,type:"circle",types:["circle","bar"],width:"50px",change:function(e){"circle"===e?E1.setModel(null,"@demoService.progress.width","50px"):E1.setModel(null,"@demoService.progress.width","100%"),E1.setModel(null,"@demoService.progress.type",e)}},this.proximity=[{inProximity:function(){E1.setModel(null,"@demoService.proximity.0.isVisible","true")},outProximity:function(){E1.setModel(null,"@demoService.proximity.0.isVisible","false")},isVisible:"false"},{inProximity:function(){E1.setModel(null,"@demoService.proximity.1.isVisible","true")},outProximity:function(){E1.setModel(null,"@demoService.proximity.1.isVisible","false")},isVisible:"false"},{inProximity:function(){E1.setModel(null,"@demoService.proximity.2.isClose","true")},outProximity:function(){E1.setModel(null,"@demoService.proximity.2.isClose","false")},isClose:"false"}],this.imageData={itemPageUrl:"https://wwwdev.nvidia.com/content/nvidiaGDC/products/?m=V3sibyI6InRyZW5kaW5nU2NvwociLCJpwoMzNDh9",socialPageUrl:"https://wwwdev.nvidia.com/content/nvidiaGDC/products/?m=V3siaSI6MzQ4fQ",categoryPage:"/content/nvidiaGDC/zz/en_ZZ/geforce/shot-with-ansel?m=V3siYyI6IjkifQ",authorUrl:"/content/nvidiaGDC/zz/en_ZZ/geforce/shot-with-ansel/user?m=V3siYSI6IjExNTgwOTIwNcKHMDAyNDY0MCJ9",gameUrl:"/content/nvidiaGDC/zz/en_ZZ/geforce/shot-with-ansel/games?m=V3siZyI6NjB9",thumbnail:"https://s3.amazonaws.com/swgf.nvidia.com/geforceimage/115809205150024640/348/custom_thumbnail_1515171025989_ShooterGame_Screenshot_2017.08.20___14.38.38.68.png",preview:"https://s3.amazonaws.com/swgf.nvidia.com/geforceimage/115809205150024640/348/low_resolution_25_1515171025989_ShooterGame_Screenshot_2017.08.20___14.38.38.68.png",image:"https://s3.amazonaws.com/swgf.nvidia.com/geforceimage/115809205150024640/348/low_resolution_1515171025989_ShooterGame_Screenshot_2017.08.20___14.38.38.68.png",category:"Screenshots",categoryId:"9",shareComponents:"facebook, twitter, weibo",socialText:"Checkout my game photograph at",hashTags:"SHOTWITHGEFORCE",showItemActionText:"",itemActionComponents:["like","bookmark","share","contest","edit","delete"],user:{id:"115809205150024640",name:"Ram Prasad",email:"yprasad@nvidia.com"},game:{id:60,name:"ShooterGame",description:"screenshot"},formattedCreatedDate:"Jan 05, 2018",trendingScore:5,createdDate:1515171025e3,title:"rTest Ram Dev Upload - 5Jan2018",id:348,views:6600,viewText:"66 \n            Views\n        ",viewerId:"174046602571285228",viewerAdmin:!0,viewerName:"ckcreates",isLiked:942,likes:11,liked:!0,likeClass:"active",likeIcon:"heart-filled",bookmarkIcon:"bookmark",bookmarkClass:"",contestClass:"",editClass:"",onlike:function(e){console.log(e)},commentUrl:"https://appdev.nvidia.com/geforce/cevo/comment",commentDelegate:"https://appdev.nvidia.com/geforce/cevo/auth?sessionToken=eyJhbGciOiJIUzI1NiJ9.eyJkZCI6IklETU1pbmlTaXRlRGV2aWNlSWQiLCJzZCI6InBEN3I5UEJsOV8xNjgxNDE4MDAiLCJjZCI6IjE2MzkwMDEwNzgwNzI2MDg4OCIsInNlIjoiYXBpcWpfS1c5b0JTZDFHcExPeS11TGUwTGF3TFhGaVgiLCJpZCI6IjE3NDA0NjYwMjU3MTI4NTIyOCIsImV4cCI6MTUxOTExNjk3OSwicG0iOiJSZWFkV3JpdGVEZWxldGUifQ.-35tO5e_PpR0700vs9bo5Uwp69GD0HTc_AbeWafVw_A"},this.image={type:"",url:"",preview:"",crop:!0,options:[{label:"Super resolution",preview:"https://images.nvidia.com/ansel/images/ansel-images/Y2tsc3l0ZXN0ZXIyMTUwNzEyNjE4OTYzMjMzMTI1ODky_small.jpg",url:"https://images.nvidia.com/ansel/images/ansel-images/Y2tsc3l0ZXN0ZXIyMTUwNzEyNjE4OTYzMjMzMTI1ODky_large.jpg",type:"Super resolution"},{label:"Screenshot",preview:"https://images.nvidia.com/ansel/images/ansel-images/cWFhZG1pbjE1MDc3NTUxNTc3ODc0NjQzMjU1_small.jpg",url:"https://images.nvidia.com/ansel/images/ansel-images/cWFhZG1pbjE1MDc3NTUxNTc3ODc0NjQzMjU1_large.jpg",type:"Screenshot"},{label:"Stereo",preview:"https://images.nvidia.com/ansel/images/ansel-images/Um9oaXRHNzE1MTI0NDkxOTU5MDMyNzA1NTY1_small.jpg",url:"https://images.nvidia.com/ansel/images/ansel-images/Um9oaXRHNzE1MTI0NDkxOTU5MDMyNzA1NTY1_large.jpg",type:"Stereo"},{label:"360mono",preview:"https://images.nvidia.com/ansel/images/ansel-images/YWR1bW15NTMyMTUxMjcxNzIwNzU5MDk0NjUwNjA_small.jpg",url:"https://images.nvidia.com/ansel/images/ansel-images/YWR1bW15NTMyMTUxMjcxNzIwNzU5MDk0NjUwNjA_vr.jpg",type:"360mono"},{label:"360stereo",preview:"https://s3.amazonaws.com/cktestupload/small_360stereo2.jpg",url:"https://s3.amazonaws.com/cktestupload/large_360stereo2.jpg",type:"360stereo"}],onselect:function(e){t.image.type=e.type,t.image.url=e.url,t.image.preview=e.preview,E1.setModel(null,"@demoService.image",t.image)}},this.inputs={onchange:function(e){console.log(e)},searchValue:"",sortValue:{value:1,label:"one"},filterValue:{value:4,label:"four"},sortOptions:[{value:1,label:"one"},{value:2,label:"two"},{value:3,label:"three"}],filterOptions:[{value:4,label:"four"},{value:5,label:"five"},{value:6,label:"six"}]},this.share={components:["facebook","twitter","weibo"],url:"https://www.google.com",text:"Here is some text to pre-populate",hashtags:"e1, socialButtons"},this.message={active:!1,message:'<span style="display:block;font-weight:bold;font-size:21px;line-height:35px;">Error</span><span>Here is an error message</span>',icon:"!",type:"error",buttons:[{text:"close",click:"window.E1.setModel(null, '@demoService.message.active', false)"}]},this.tooltip="Here's a tooltip",this.upload={content:"An upload message. Drag files here or click to browse.",validator:function(e){"image/jpeg"!==e.type&&alert("Only jpegs are valid!")}},this.modal={active:!1,content:"<div><h2>Hi!</h2><p>You can add whatever content you heart desires here</p></div>"},this.alertMessage="alert('This has bound href and onclick attributes')",this.link="https://google.com",this.color="#ca8500",this.color2="#008500",this.styleString="color: blue; text-decoration: underline;",this.styleString2="font-size: 14px;",this.icon={styles:"color: #ca8500;",value:{value:Object.keys(new E1.components["e1-icon"].service(null).templates)[0],label:Object.keys(new E1.components["e1-icon"].service(null).templates)[0]},options:Object.keys(new E1.components["e1-icon"].service(null).templates).map(function(e){return console.log(e),{value:e,label:e}})},this.repeatObject=[{name:"Joe",fruit:"bananas",count:2},{name:"Sally",fruit:"strawberries",count:30},{name:"Billy",fruit:"blueberries",count:50},{name:"Jack",fruit:"blueberries",count:10},{name:"Jill",fruit:"bananas",count:10}],this.dropdown={label:"Hello dropdown",list:['<a style="display: block;" onclick="alert(\'one\')">One</a>','<a style="display: block;" onclick="alert(\'two\')">Two</a>','<a style="display: block;" onclick="alert(\'three\')">Three</a>'],optionClicked:function(e,t){E1.setModel(null,"@demoService.dropdown.selected",t.textContent)}},this.select={label:"Select an option",value:{label:"Option 1",value:1},options:[{label:"All",value:0},{label:"Option 1",value:1},{label:"Option 2",value:2},{label:"Option 3",value:3}],onselect:function(e,t){console.log(e,t)}},this.searchResults=[],this.searchPaths="name, fruit",this.searchLabel="Search",this.searchValue=null,this.onsearch=function(e){console.log("SEARCH VAL",e)},this.e1Value="<span>Hey, bound text <i>and</i>, <b>bound HTML</b></span>",this.e1ClassString="blue",this.e1ClassString2="bold",this.styles=".blue{ color: #1a4977 } .bold{ font-weight: bold }",this.trueFalse=!1,this.trueFalse2=!1,this.trueFalse3=!1,this.trueFalse4=!1,this.trueFalse5=!1,this.trueFalse6=!1,this.ifVal1=2,this.ifVal2=3,this.ifVal3="c",this.ifVal4="b",this.ifVal5=5,this.ifContent="<span e1-test e1-content=\"<span>Outer value is true <span e1-if='@demoService.trueFalse4'>, inner value is true</span></span>\"></span>",this.collapse={target:"#collapse-target",width:600},this.localeValue="en",this.localeChange=function(e){E1.setModel(null,"@TranslationService.locale",e)},this.locales=[{label:"en",value:"en"},{label:"ru",value:"ru"},{label:"de",value:"de"},{label:"zh-CN",value:"zh-CN"}],this.page={},this.utilities=["e1-attribute","e1-class","e1-content","e1-if","e1-repeat","e1-show","e1-style","e1-value"],this.elements=["e1-accordian-toggle","e1-collapse","e1-colorpicker","e1-dropdown","e1-edit","e1-icon","e1-image-viewer","e1-message","e1-modal","e1-progress","e1-proximity","e1-search","e1-social-buttons","e1-select","e1-short-number","e1-tooltip","e1-translate","e1-upload-zone"],this.init=function(){t.page.utilityDirectives=[],t.utilities.forEach(function(e){t.page.utilityDirectives.push('<div e1-accordian-toggle="'+e+'" e1-accordian-toggle-group="main">'+e+"</div>")}),t.page.prebuiltDirectives=[],t.elements.forEach(function(e){t.page.prebuiltDirectives.push('<div e1-accordian-toggle="'+e+'" e1-accordian-toggle-group="main">'+e+"</div>")}),E1.setModel(null,"@demoService.page",t.page);var e=window.document.getElementById("main-content"),i=t.utilities.concat(t.elements),o="";i.push("todo"),i.push("tests"),i.forEach(function(e){o+='<div e1-accordian-content="'+e+'" e1-accordian-toggle-group="main"></div>'}),e.innerHTML=o,window.document.querySelectorAll('[e1-accordian-toggle-group="main"][e1-accordian-content]').forEach(function(e){var t=new XMLHttpRequest;t.open("GET",e.getAttribute("e1-accordian-content")+".html"),t.addEventListener("load",function(){e.innerHTML="<div>"+this.responseText+"</div>";for(var t=e.querySelectorAll("code"),i=e.querySelectorAll("[demo-el]"),o=0;o<i.length;o++)t[o]&&i[o]&&(t[o].innerHTML=Prism.highlight(i[o].innerHTML.split("&amp;&amp;").join("&&").trim(),Prism.languages.html))}),t.send()})},this.initTests=function(){mocha.run()},this.initE2e=function(){var e=window.location.search.split("?")[1].split("file=")[1].split("&")[0]+".html",t=new XMLHttpRequest;t.open("GET",e),t.addEventListener("load",function(){window.document.getElementById("main-content").innerHTML="<div>"+this.responseText+"</div>"}),t.send()}})},{}],2:[function(e,t,i){"use strict";e("./demo-service.js")},{"./demo-service.js":1}]},{},[2]);