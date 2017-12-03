var rect = require('./rectangle-1');

function solveRect(l,b){
  console.log("Solving for rectangle with l = " + l + " and b = " + b);

  if(l <0||b<0){
    console.log("Rectangle dimensions should be greater than zero: 1 = " + 1 +
  " b = "+ b);
}else{
    console.log("Area: "+rect.area(l,b));
    console.log("Perimeter: "+rect.perimeter(l,b));
}
}

solveRect(2,4);
solveRect(3,5);
