//declare the variables
let fiveMinData = [];
let thirtyMinData = [];
let sixtyMinData = [];

let sumOfFive = null;
let sumOfThirty = null;
let sumOfSixty = null;

let meanOfFive ;
let meanOfThirty ;
let meanOfSixty ;

let textOfFive = document.getElementById("resultOfFive");
let textOfThirty = document.getElementById("resultOfThirty");
let textOfSixty = document.getElementById("resultOfSixty");

 //event listener get result
 let submitBut = document.getElementById("submit");
 submitBut.addEventListener("click", getResult);

 //fetch the API every single minute
 setInterval(async () => {
	let response = await fetch(`https://api.coinbase.com/v2/prices/spot?currency=EUR`);
    let data = await (response).json();
//add the values in the arrays and add them to the sum__ variable
    fiveMinData.push(Number(data.data.amount));
    sumOfFive += Number(data.data.amount);

    thirtyMinData.push(Number(data.data.amount));
    sumOfThirty += Number(data.data.amount);
    
    sixtyMinData.push(Number(data.data.amount));
    sumOfSixty += Number(data.data.amount);

//mean value of 5 minutes
      
if(fiveMinData.length === 5) {
    meanOfFive = Math.round(sumOfFive/5);
    console.log ("5",meanOfFive);
    textOfFive.innerHTML = meanOfFive;
    }

if(fiveMinData.length>5) {
    sumOfFive = sumOfFive - fiveMinData[0];
    meanOfFive = Math.round(sumOfFive/5);
    textOfFive.innerHTML = meanOfFive;
    fiveMinData.shift()
    fiveMinData.push(Number(data.data.amount))
    }
  
//mean value of 30 minutes      
if(thirtyMinData.length === 30) {
    meanOfThirty = Math.round(sumOfThirty/30);
    console.log ("30",meanOfThirty , thirtyMinData);
    textOfThirty.innerHTML = meanOfThirty;
    }

if(thirtyMinData.length>30) {
    sumOfThirty = sumOfThirty - thirtyMinData[0];
    meanOfThirty = Math.round(sumOfThirty/30);
    textOfThirty.innerHTML = meanOfThirty;
    thirtyMinData.shift()
    thirtyMinData.push(Number(data.data.amount))
    }

if(sixtyMinData.length === 60){
meanOfSixty = Math.round(sumOfSixty/60);
console.log ("60",meanOfSixty);
textOfSixty.innerHTML = meanOfSixty;
}
if(sixtyMinData.length>60) {
    sumOfSixty = sumOfSixty - sixtyMinData[0];
    meanOfSixty = Math.round(sumOfSixty/60);
    textOfSixty.innerHTML = meanOfSixty;
    sixtyMinData.shift();
    sixtyMinData.push(Number(data.data.amount))
}

document.getElementById('chart').innerHTML = '';
var options = {
    chart: {
      type: 'line',
      width: "100%",
      offsetX: 0,

    },
    colors: ["#008000"],
    series: [{
      name: 'bitcoin',
      data: sixtyMinData
    }],
    xaxis:{
        type: 'category',
        labels: {
            show:false
        }
    },
    yaxis: {
      showAlways: false,
      decimalsInFloat: false,
    },
    title: {
text: "Bitcoin values",
    align: 'center',
    margin: 10,
    offsetX: 0,
    offsetY: 30,
    floating: false,
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render(); 
 
}, 2000);



    async function getResult (event) {
    try {
        let currency = document.getElementById("coinType").value;
        event.preventDefault()
        let response = await fetch(
            `https://api.coinbase.com/v2/prices/spot?currency=${currency}`
        );
        let data = await (response).json();
        document.getElementById("textField").value = `${data.data.amount} ${currency}`;
        
    } catch (error) {
    console.log(error) 
    }
}



 