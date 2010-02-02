var Sphere = function (radius,sides, numOfItems){

	for (var j = sides ; j >= 0; j--){
		
	
		for (var i = numOfItems / sides; i >= 0; i--)
		{
		    var angle = i * Math.PI * 2 / (numOfItems/sides);
		    var angleB = j * Math.PI * 2 / sides;
			
	        var x =   Math.sin(angle) * Math.sin(angleB)*radius;
			var y =  Math.cos(angle) * Math.sin(angleB)*radius;
			var z =  Math.cos(angleB)* radius;
		   				        
	        this.pointsArray.push(this.make3DPoint(x,y,z));
		}
	
	};
};

Sphere.prototype = new DisplayObject3D();
