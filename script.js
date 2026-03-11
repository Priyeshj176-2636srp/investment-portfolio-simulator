let portfolio = JSON.parse(localStorage.getItem("portfolio")) || [];
let chart;
function saveData(){
localStorage.setItem("portfolio", JSON.stringify(portfolio));
}
function addStock(){
let name = document.getElementById("name").value;
let quantity = parseFloat(document.getElementById("quantity").value);
let buy = parseFloat(document.getElementById("buy").value);
let current = parseFloat(document.getElementById("current").value);
if(name=="" || isNaN(quantity) || isNaN(buy) || isNaN(current)){
alert("Enter valid values");
return;
}
portfolio.push({name,quantity,buy,current});
saveData();
display();
}
function deleteStock(index){
portfolio.splice(index,1);
saveData();
display();
}
function calculateRisk(){
if(portfolio.length<=2) return "High Risk";
if(portfolio.length<=5) return "Medium Risk";
return "Low Risk";
}
function display(){
let table = document.getElementById("tableBody");
table.innerHTML="";
let total=0;
let labels=[];
let values=[];
portfolio.forEach((stock,index)=>{
let investment = stock.quantity * stock.buy;
let currentValue = stock.quantity * stock.current;
let profit = currentValue - investment;
total += currentValue;
labels.push(stock.name);
values.push(currentValue);
let row = document.createElement("tr");
row.innerHTML = `
<td>${stock.name}</td>
<td>₹${investment}</td>
<td>₹${currentValue}</td>
<td class="${profit>=0?'profit':'loss'}">₹${profit}</td>
<td><button onclick="deleteStock(${index})">Delete</button></td>
`;
table.appendChild(row);
});
document.getElementById("total").innerText = total;
document.getElementById("risk").innerText = calculateRisk();
drawChart(labels,values);
}
function drawChart(labels,data){
let ctx = document.getElementById("portfolioChart");
if(chart){
chart.destroy();
}
chart = new Chart(ctx,{
type:'pie',
data:{
labels:labels,
datasets:[{
data:data
}]
}
});
}
function toggleDark(){
document.body.classList.toggle("dark");
}
display();
