// // const fastnoise = require('fastnoisejs');
// // let gameInfo = require('../config/gameInfo')


// gameInfo.noise1 = fastnoise.Create();
// gameInfo.noise2 = fastnoise.Create();
// gameInfo.noise1.SetNoiseType(fastnoise.Perlin);
// gameInfo.noise1.SetSeed(Math.random() * 1000);
// gameInfo.noise1.SetFrequency(0.2);

// gameInfo.noise2.SetNoiseType(fastnoise.Perlin);
// gameInfo.noise2.SetSeed(Math.random() * 1000);
// gameInfo.noise2.SetFrequency(0.2);
gameInfo = {
    mapSize : {
        x: 20,
        z: 10
    },
    map : {},
    unitAnimations : {

	}
}


createMap();



function createMap(){
let offSetMap = [];
for(var x = 0; x<gameInfo.mapSize.x; x++){
    for(var z = 0 - Math.floor(x/2); z<gameInfo.mapSize.z - Math.floor(x/2); z++){
        createHex(x, z, "default")
        
    }
}
for(var x = 0; x < gameInfo.mapSize.x; x++){
	offSetMap.push([]);
	for(var y = 0; y < gameInfo.mapSize.z; y++){
		offSetMap[x].push({});
		if(y%2===1){
			offSetMap[x][y] = {
				////////////FOR CAZALSKI///////////////////
				type : "plains",
				////////////FOR CAZALSKI///////////////////
			};
		} else {
			offSetMap[x][y] = {
				////////////FOR CAZALSKI///////////////////
				type : "junglePlains",
				////////////FOR CAZALSKI///////////////////
			};
		}
		// var noiseValueT = gameInfo.noise1.GetNoise(x, y)
		// var noiseValueR = gameInfo.noise2.GetNoise(x, y)
		//Replaced By Zach
		// var noiseValueT = Math.random()*2 -1
		// var noiseValueR = Math.random()*2 -1



		// var randomNum = Math.random()
		// if(noiseValueT > 0.3 && noiseValueR < -0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "desert",
		// 	};
		// }

		// if(noiseValueT > 0.3 && noiseValueR > -0.3 && noiseValueR < 0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "savana",
		// 	};
		// }

		// if(noiseValueT > 0.3 && noiseValueR > 0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "jungle"
		// 	}
		// }

		// if(noiseValueT < 0.3 && noiseValueT > -0.3 && noiseValueR < -0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "plain"
		// 	}
		// }

		// if(noiseValueT < 0.3 && noiseValueT > -0.3 && noiseValueR > -0.3 && noiseValueR < 0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "forest"
		// 	}
		// }

		// if(noiseValueT < 0.3 && noiseValueT > -0.3 && noiseValueR > 0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "marsh"
		// 	}
		// }

		// if(noiseValueT < -0.3 && noiseValueR < -0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "frost"
		// 	}
		// }

		// if(noiseValueT < -0.3 && noiseValueR > -0.3 && noiseValueR < 0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "snow"
		// 	}
		// }

		// if(noiseValueT < -0.3 && noiseValueR > 0.3){	
		// 	offSetMap[x][y] = {
		// 		type : "frozen"
		// 	}
		// }

				
		var newCords = oddq_to_cube(x, y)

		createHex(newCords.x, newCords.z, offSetMap[x][y].type)

	}

    
}};

function createHex(x, z, type){
	var hexY = -x-z
	gameInfo.map[x + ',' + z + ',' + hexY] = {
		x : x,
		z : z,
		y : hexY,
		type : type,
		seenBy : [],
		unitHere : undefined,
		currentlySeenBy : [],
	}
	switch (type) {
		case 'desert': 
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 2;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 0;
			break;
		case 'savana':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 1;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 1;
			break;
		case 'jungle':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 0;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 2;
			break;
		case 'plain':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 1;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 1;
			break;
		case 'forest':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 1;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 1;
			break;
		case 'marsh':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 1;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 1;
			break;
		case 'frost':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 1;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 0;
			break;
		case 'snow':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 1;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 0;
			break;
		case 'frozen':
			gameInfo.map[x + ',' + z + ',' + hexY].hammers = 1;
			gameInfo.map[x + ',' + z + ',' + hexY].food = 0;
			break;
	}
	// console.log(gameInfo.map)
}

//https://www.redblobgames.com/grids/hexagons/#conversions
function oddq_to_cube(hexC, hexR){
	var convertedHex = {}
    convertedHex.x = hexC
    convertedHex.z = hexR - (hexC - (hexC&1)) / 2
    convertedHex.y = -convertedHex.x-convertedHex.z
    return convertedHex
}
