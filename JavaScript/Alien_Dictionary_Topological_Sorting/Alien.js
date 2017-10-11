class graph{
	constructor(){
		this._vertices = [];
		this._sequence = [];
		this._isVisited = [];
		for (var i = 0; i < 26; i++){
			this.vertices.push([]);
			this._isVisited[i] = false;
		}
	}

	get vertices(){
		return this._vertices;
	}

	get sequence(){
		return this._sequence;
	}

	get isVisited(){
		return this._isVisited;
	}

	set isVisited(val){
		this._isVisited = val;
	}

	addLink(char1, char2){
		this._vertices[char1 - ('a').charCodeAt(0)].push(char2 - ('a').charCodeAt(0));
		var isChar1 = false, isChar2 = false;

		for(var i = 0; i < this._sequence.length; i++){
			if (this.sequence[i] == (char1 - ('a').charCodeAt(0))) {
				isChar1 = true;
			}
			if (this.sequence[i] == (char2 - ('a').charCodeAt(0))) {
				isChar2 = true;
			}
		}
		if (!isChar1) {
			this._sequence.push(char1 - ('a').charCodeAt(0));
		}
		if (!isChar2) {
			this._sequence.push(char2 - ('a').charCodeAt(0));
		}
	}

	checkReverseLink(char1, char2){
		if (this.vertices[char2 - ('a').charCodeAt(0)]) {
			for(var i = 0; i < this.vertices[char2 - ('a').charCodeAt(0)].length; i++){
				if (this.vertices[char2 - ('a').charCodeAt(0)][i] == (char1 - ('a').charCodeAt(0))) {
					return true;
				}
			}
		}
		return false;
	}
}

function getPath(strGraph){
	var path = [];
	for(var i = 0; i < strGraph.sequence.length; i++){
		var currentChar = strGraph.sequence[i];

		if (!strGraph.isVisited[currentChar]) {
			getPathHelper(strGraph, currentChar, path);
		}
	}
	return path;
}

function getPathHelper(strGraph, currentChar, path){
	var currentVetex = strGraph.vertices[currentChar];
	strGraph.isVisited[currentChar] = true;

	if(currentVetex){
		path.push(String.fromCharCode(currentChar + ('a').charCodeAt(0)));
		for(var i = 0; i < currentVetex.length; i++){
			//ie nodes in current Vertex are unvisited
			if(!strGraph.isVisited[currentVetex[i]]){
				getPathHelper(strGraph, currentVetex[i], path);
			}
		}
	}
	return;
}

function getOrdering(strArr){
	var strGraph = new graph();

	var maxLength = strArr[0].length;
	for(var i = 1; i < strArr.length - 1; i++){
		if(maxLength < strArr[i].length){
			maxLength = strArr[i].length;
		}
	}
	for(var j = 0; j < maxLength; j++){
		for(var i = 0; i < strArr.length - 1; i++){
			var minLen = strArr[i].length;
			if (minLen > strArr[i+1].length) {
				minLen = strArr[i+1].length;
			}
			if(minLen > j){
				if (strArr[i].charAt(j) != strArr[i+1].charAt(j)) {
					console.log(strArr[i].charAt(j));
					//if(!strGraph.checkReverseLink(strArr[i].charCodeAt(j), strArr[i+1].charCodeAt(j))){
						strGraph.addLink(strArr[i].charCodeAt(j), strArr[i+1].charCodeAt(j));
					//}
				}
			}
		}
	}
	return getPath(strGraph);
}

var strArray = [
	"xza", "ayh", "ples", "plares", "bhaaz", "bnc"
];
console.log(getOrdering(strArray));