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

//declare the value of currency
let currency;

//declare the elements that will show the mean result
let textOfFive = document.getElementById("resultOfFive");
let textOfThirty = document.getElementById("resultOfThirty");
let textOfSixty = document.getElementById("resultOfSixty");

//event listener get result
let submitBut = document.getElementById("submit");
submitBut.addEventListener("click", getResult);


 const fetchData = async () => {
//fetch the data with the type of currency that was selected
    let response = await fetch(`https://api.coinbase.com/v2/prices/spot?currency=${currency}`);
    let data = await (response).json();
 
    
//display of each price
    document.getElementById("textField").value = `${data.data.amount} ${currency}`;

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
    textOfFive.innerHTML = meanOfFive;
    };
if(fiveMinData.length>5) {
    sumOfFive = sumOfFive - fiveMinData[0];
    meanOfFive = Math.round(sumOfFive/5);
    textOfFive.innerHTML = meanOfFive;
    fiveMinData.shift();
    };
  
//mean value of 30 minutes      
if(thirtyMinData.length === 30) {
    meanOfThirty = Math.round(sumOfThirty/30);
    textOfThirty.innerHTML = meanOfThirty;
    };
if(thirtyMinData.length>30) {
    sumOfThirty = sumOfThirty - thirtyMinData[0];
    meanOfThirty = Math.round(sumOfThirty/30);
    textOfThirty.innerHTML = meanOfThirty;
    thirtyMinData.shift();
    };

//mean value of 60 minutes 
if(sixtyMinData.length === 60){
meanOfSixty = Math.round(sumOfSixty/60);
textOfSixty.innerHTML = meanOfSixty;
};
if(sixtyMinData.length>60) {
    sumOfSixty = sumOfSixty - sixtyMinData[0];
    meanOfSixty = Math.round(sumOfSixty/60);
    textOfSixty.innerHTML = meanOfSixty;
    sixtyMinData.shift();
};

//plot the results on a chart
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
  };
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render(); 
};


function getResult (event) {
    try {
        event.preventDefault();
        fiveMinData = [];
        thirtyMinData = [];
        sixtyMinData = [];
        sumOfFive = 0;
        sumOfThirty = 0;
        sumOfSixty = 0;
        textOfFive.innerHTML = ""
        textOfThirty.innerHTML = ""
        textOfSixty.innerHTML = ""
        currency = document.getElementById("coinType").value;
        fetchData();
//fetch the data every single minute
        setInterval (fetchData,60000);   
    } catch (error) {
    console.log(error) 
    }
};



 
