const expenses = document.getElementById("expenses");
const total = document.getElementById("total");
const tbody = document.getElementById("tbody");

var teamsExpList = JSON.parse(localStorage.getItem("teamsExpList")); // all teams objects
displayExp(teamsExpList);

function displayExp(teamsExpList) {
  tbody.innerHTML = null;
  for (i = 0; i < teamsExpList.length; i++) {
    tbody.innerHTML += `
        <tr>
        <td>${teamsExpList[i].teamName}</td>
        <td>${teamsExpList[i].projID}</td>
        <td>${teamsExpList[i].teamMembers}</td>
        <td>${teamsExpList[i].mngrID}</td>
        <td>$ ${teamsExpList[i].expensesAmount} </td>
        <td>${teamsExpList[i].expensesDate}</td>
        </tr>
    `;
  }

  calcTeamExpenses(); //calcualte each team expenses
  calcAllExpenses(); // calculate all the teams expenses
}

function calcTeamExpenses() {
  let teamName = []; //array of teams names
  let teamList = []; //array of the related team's objects

  //extarct teamNames from each object in the array
  for (const item of teamsExpList) {
    teamName.push(item.teamName);
    // console.log(teamName);
  }

  //array of teams names with no duplication
  var unique = [...new Set(teamName)];
  // console.log(unique);

  //loop through the unique team names and make array of related objects, then calculate the total expences for each team individualy
  for (i = 0; i < unique.length; i++) {
    teamList = teamsExpList.filter((team) => team.teamName === unique[i]);
    // console.log(teamList);
    calcExpensesforEachTeam(teamList);
  }
}

function calcExpensesforEachTeam(teamList) {
  let teamTotalExp = 0;
  for (var a of teamList) {
    // console.log(a);
    teamTotalExp += Number(a.expensesAmount);
    // console.log(teamTotalExp);
  }
  expenses.innerHTML += `<li style="color: #12637c;"> Annual budget for ${a.teamName} Team: <span style="color: #12277c;">$ ${teamTotalExp} </span> </li>`;
}

function calcAllExpenses() {
  let totalExp = 0;
  for (var a of teamsExpList) {
    totalExp += Number(a.expensesAmount);
  }
  total.innerHTML += ` <span style="color: #12277c;"> $ ${totalExp}</span>`;
}