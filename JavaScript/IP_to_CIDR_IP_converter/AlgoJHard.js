//IP == ip1.ip2.ip3.ip4
class IP{
	constructor(iP){
		this._ip=iP;
	}
	get ip(){
		return this._ip;
	}
	set ip(ip){
		this._ip = ip;
	}
	get val(){
		return this._val;
	}
	set val(val){
		this._val = val;
	}
}

function countZeros(currentIP){
	var zeroBitsCounter = 0;
	var tempIP = currentIP[3];

	while((tempIP & 1) == 0 && (zeroBitsCounter < 8)){
		tempIP >>= 1;
		zeroBitsCounter++;
	}
	if (zeroBitsCounter == 8) {
		tempIP = currentIP[2];
		while((tempIP & 1) == 0 && (zeroBitsCounter < 16)){
			tempIP >>= 1;
			zeroBitsCounter++;
		}
	}
	if (zeroBitsCounter == 16) {
		tempIP = currentIP[1];
		while((tempIP & 1) == 0 && zeroBitsCounter < 24){
			tempIP >>= 1;
			zeroBitsCounter++;
		}
	}
	if (zeroBitsCounter == 24) {
		tempIP = currentIP[0];
		while((tempIP & 1) == 0 && zeroBitsCounter < 32){
			tempIP >>= 1;
			zeroBitsCounter++;
		}
	}
	return zeroBitsCounter;
}

function incrementIP(currentIP){
	if (currentIP[3] == 255) {
		if (currentIP[2] == 255) {
			if(currentIP[1] == 255){
				currentIP[0]++;
				currentIP[1] = 0;
				currentIP[2] = 0;
				currentIP[3] = 0;
			}
			else{
				currentIP[1]++;
				currentIP[2] = 0;
				currentIP[3] = 0;
			}
		}
		else{
			currentIP[2]++;
			currentIP[3] = 0;
		}
	}
	else{
		currentIP[3]++;
	}
	return currentIP;
}

//val is number of ip u wanna generate
function genIP(currentIP, value){
	if (val <= 0) {
		return;
	}

	var zeroBitsCount = countZeros(currentIP);

	var maxValue = Math.pow(2, zeroBitsCount);

	if (value < maxValue) {

		var neededBits = Math.floor(Math.log2(val));
		var maxCIDR_IPValue = Math.pow(2, ipVal);

		console.log(currentIP[0] + '.' + currentIP[1] + '.' + currentIP[2] + '.' + currentIP[3] + '/' + (32 - maxCIDR_IPValue));
		
		while (maxCIDR_IPValue > 0) {
			value--;
			maxCIDR_IPValue--;
			currentIP = incrementIP(currentIP);
		}

		genIP(currentIP, value);
	}
	else{
		console.log(currentIP[0] + '.' + currentIP[1] + '.' + currentIP[2] + '.' + currentIP[3] + '/' + (32 - Math.log2(maxValue)));
		
		while (maxValue > 0) {
			maxValue--;
			value--;
			currentIP = incrementIP(currentIP);
		}

		genIP(currentIP, value);
	}
	return;
}
genIP([0,0,0,0], 101);
