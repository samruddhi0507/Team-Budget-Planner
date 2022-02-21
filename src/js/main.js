var teamsExpList = [];
let id = 0;

const createForm = document.getElementById("createForm");
const teamName = document.getElementById("teamName");
const projID = document.getElementById("projID");
const teamMembers = document.getElementById("team-members");
const mngrID = document.getElementById("mngrID");
const expensesAmount = document.getElementById("expenses-amount");
const expensesDate = document.getElementById("expenses-date");

function createTeamPlan(
  teamName,
  projID,
  teamMembers,
  mngrID,
  expensesAmount,
  expensesDate
) {
  if (
    !teamName.length ||
    !projID.length ||
    !teamMembers.length ||
    !mngrID.length ||
    !expensesAmount.length ||
    !expensesDate.length
  ) {
    Swal.fire("warning", "some feilds are empty", "danger");
  } else {
    const teamDetails = {
      id: id,
      teamName,
      projID,
      teamMembers,
      mngrID,
      expensesAmount,
      expensesDate,
    };
    teamsExpList = JSON.parse(localStorage.getItem("teamsExpList")) || [];

    id++;
    projID.value = "";
    teamMembers.value = "";
    mngrID.value = "";
    expensesAmount.value = "";
    expensesDate.value = "";

    Swal.fire({
      title: "Are you sure?",
      text: "Are you want to add this Team plan? You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        teamsExpList.push(teamDetails);
        const local = localStorage.setItem(
          "teamsExpList",
          JSON.stringify(teamsExpList)
        );
        // console.log(local);

        Swal.fire({
          title: "Added!",
          text: "Team plan Added in the Finance Team page, Want to see it?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.assign("FinanceTeam.html");
          }
        });
      }
    });
  }
}

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createTeamPlan(
    teamName.value,
    projID.value,
    teamMembers.value,
    mngrID.value,
    expensesAmount.value,
    expensesDate.value
  );
});