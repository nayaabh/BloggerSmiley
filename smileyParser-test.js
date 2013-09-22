function parseSmileys(){
	smileyType="facebook";
	var smileyCodes = getAllSmileyCodes(smileyType);
	console.log(smileyCodes)
	var smileyProperty=getSmileyProperties(smileyType);
	for(smiley in smileyCodes){
		smileyProp=smileyProperty["smilies"][smileyCodes[smiley]];
		var regExp = new RegExp(generateSmileyRegex(smileyCodes[smiley]),'g');
		console.log(regExp);
		var postText=$(".post-body").html().replace(regExp,generateSmileyHolder(smileyProp,smileyCodes[smiley]));
		console.log(postText);
		$(".post-body").html(postText);
	}
	$(".smileyHolder").css("height",smileyProperty["style"]["height"]);
	$(".smileyHolder").css("width",smileyProperty["style"]["width"]);
	$(".smileyHolder").css("background-image","url('"+smileyProperty["style"]["url"]+"')");
	/* var regExp = new RegExp(generateSmileyRegex(smileyCodes),'g');
	console.log(regExp);
	var postText=$(".post-body").html().replace(regExp,"lol");
	console.log(postText);
	$(".post-body").html(postText); */
	
}
function getAllSmileyCodes(smileyType){
	switch (smileyType){
	case "facebook" : 	return getFacebookSmileyCodes();
						
	dafault 		: 	return getFacebookSmileyCodes();
						
	}
}
function getSmileyProperties(smileyType){
	switch (smileyType){
	case "facebook" : 	return getFacebookSmileyProperties();
						
	dafault 		: 	return getFacebookSmileyProperties();
						
	}
}

function getFacebookSmileyCodes(){
	var codeList=[];
	for(code in facebookSmileys){
		if(facebookSmileys.hasOwnProperty(code)){
		codeList.push(code);	
		}
	}
	//console.log(codeList);
	return codeList;
}

function getFacebookSmileyProperties(){
	facebookSmileysObject=[];
	facebookSmileysObject["style"]=facebookSmileyStyleProperties;
	facebookSmileysObject["smilies"]=facebookSmileys;
	return facebookSmileysObject;
}
var facebookSmileyStyleProperties={
	"height"	: "18",
	"width"		: "18",
	"url"		: "Facebook-Smilies.png"
}
var facebookSmileys={
	":)"	:[0,3,"smile"],
	":-)"	:[0,3,"smile"],
	"=)"	:[0,3,"smile"],
	":-*"	:[0,24,"kiss"],
	"^_^"	:[0,67,"kinki"],
	"<3"	:[0,10,"love"],
	"(y)"	:[0,1,"Like"],
	":like:"	:[0,1,'like']
	};
var facebookSmileysRegexSafe={
	":)"	: ":\\)",
	":-)"	: ":-\\)",
	"=)"	: "=\\)",
	":-*"	: ":-\\*",
	"^_^"	: "\\^_\\^",
	"<3"	: "<3",
	"(y)"	: "\\(y\\)",
	":like:"	: ":like:"
	};
var regexExcapes=('\\','^','.','*','?',')','(','|','[',']');
function generateSmileyRegex(smileyCodes){
	//console.log(smileyCodes);
	//console.log(facebookSmileysRegexSafe[":)"]);
	expression="";
	//console.log(smileyCodes.length);
	//for(i=0;i<smileyCodes.length;i++){
		//code = smileyCodes[i];
		code=smileyCodes;
		/* if(i==(smileyCodes.length-1)){
			expression+=facebookSmileysRegexSafe[code];
		}else{
			//console.log(code); */
			//expression+=facebookSmileysRegexSafe[code]+"|";
			expression+=facebookSmileysRegexSafe[code];
		//}
	//}
	return expression;
}
function generateSmileyHolder(smileyProp,smileyCode){
	return '<a class="smileyHolder" style="background-position:'+smileyProp[0]+'px -'+((smileyProp[1]*17)+41)+'px" title="'+smileyProp[2]+' '+smileyCode+'"></a>';
}
function parseSmileys1(){
	//var words = $(".post-body").html().replace("<","&lt;").replace(">","&gt;").split(" ");
	var words = $(".post-body").text().replace(/(\r\n|\n|\r)/gm," ").split(" ");
	//document.write("<pre>");
	//console.log("1. Document Parsed.");
	for(i=0;i<words.length;i++){
		//console.log("2. Generating for "+words[i]);
		var smileyHolderCode= generateSmileyHolderCode(words[i]);
		//console.log("3. Generated for "+words[i]+" that is: "+smileyHolderCode);
		wordAnatomy=words[i].split("");
			regexString="";
			for(j=0;j<wordAnatomy.length;j++){
			regexString=regexString +'\\'+ wordAnatomy[j];
			}
		var regex = new RegExp("/" + regexString + "/g");
		//console.log("3. Regex=" +regex);
		$(".post-body").html($(".post-body").text().replace(words[i],smileyHolderCode));
		//console.log("4. Replaced "+words[i]+" with "+smileyHolderCode);
	}
	//document.write("</pre>");
	$(".post-body").text().replace(":)",":Love:");
}
function generateSmileyHolderCode(word){
	word=word.replace("&lt;","<").replace("&gt;",">")
	//console.log("2.1. New Word "+word);
	position = smileyMap[word];
	//console.log("2.2. Position for "+word+" is "+position);
	if(isNaN(position)){
		return word;
	}
	return '<div class="smileyHolder" style="background-position:0px -'+(position*18)+'px"></div>';
}
var smileyMap={
	":)" : 75,
	"=)" : 75,
	"(y)": 56,
	"<3" : 100,
	"O.o" : 299,
	">_<" : 34,
	};
parseSmileys();
