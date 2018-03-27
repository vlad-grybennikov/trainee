import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 import App from './App';


ReactDOM.render(
	<App />,
	document.getElementById('root'))


const testArray = [[10, 1000], [0, 0], [5, 125], [1e150, Infinity],
	[-5, -125], [null, NaN]];

const test = (array, func) => {
	array.map((expects) => {
		if(func(expects[0]) === expects[1] ||
			(isNaN(func(expects[0])) && isNaN(expects[1]))
		){
			console.log(`Test success for:
            ${expects[0]}`);
		} else {
			console.log(`Test failed for:
            ${expects[0]}`);
		}
	})
}

const cube = (a) => {
	if(!a && a !== 0){
		return NaN;
	}
	return a * a * a;
};

//test(testArray, cube);

const squareCircle = (d) => {
	if(d < 0){
		return 0;
	}
	let r = d / 2;
	let sq = Math.PI * (r * r);
	return parseFloat(sq.toFixed(5));
}

const sqTest = [[2, 3.14159], [30, 706.85835], [-5, 0],
	[0, 0], [null, 0], [NaN, NaN]];
//test(sqTest, squareCircle);



const multic = (number) => {

	if(typeof number !== "number" || isNaN(number) ) {

		return false
	}
	return Math.abs(number).toString().split("").filter((element)=>{
		return (element !== ".")
	}).reduce((res, n) => {

		return res * n;
	},1)

}

const mupltuplyTest = [
	[123.3 , 18] , [1595, 225], [222, 8], [0 , 0], [-123, 6],[0xff, 50], [0o54, 16],
	[null, false], [NaN, false], [303, 0],["22",false]

];
test(mupltuplyTest,multic);


