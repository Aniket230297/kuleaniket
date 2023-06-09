// using javascript 
import { data } from "./data.js";
const tbody = document.querySelector("tbody");
let students = data;
students = students.map(transformingData);

// add 100 students data to table
students.forEach(addToTable);

const searchInput = document.querySelector("#search");
const form = document.querySelector("form");


searchInput.addEventListener("input", filterBySearch);
form.addEventListener("submit", filterBySearch);

function filterBySearch(event) {
  event.preventDefault();
  let value = searchInput.value.trim().toLowerCase();
  if (value.length) {
 
    let filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(value) ||
        student.email.toLowerCase().includes(value)
    );
    if (filtered.length) {
      filtered.forEach(addToTable);
    } else {
      tbody.innerText = "";
    }
  } else {
    // rendering the complete list
    students.forEach(addToTable);
  }
}

const sortButtons = document.querySelectorAll(".sort-container > *");
for (let button of sortButtons) {
  button.addEventListener("click", sortData);
}
function sortData(event) {
  let previouslyClicked = document.querySelector(".active");
  if (previouslyClicked) {
    previouslyClicked.classList.toggle("active");
  }
  event.target.classList.toggle("active");
  let id = event.target.id;

  if (id == "sort-ascending") {
    students.sort((a, b) => a.name.localeCompare(b.name));
    students.forEach(addToTable);
  } else if (id == "sort-descending") {
    students.sort((a, b) => b.name.localeCompare(a.name));
    students.forEach(addToTable);
  } else if (id == "sort-marks") {
    students.sort((a, b) => a.marks - b.marks);
    students.forEach(addToTable);
  } else if (id == "sort-passing") {
    let passingStudents = students.filter(
      (student) => student.passing == "Passing"
    );
    passingStudents.forEach(addToTable);
  } else if (id == "sort-classNo") {
    students.sort((a,b) => a.classNo - b.classNo);
    students.forEach(addToTable);
 } 
}
function transformingData(student) {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    marks,
    img_src,
    class: classNo,
    passing,
  } = student;

  return {
    id,
    imgSrc: img_src,
    name: first_name + " " + last_name,
    gender,
    classNo,
    marks,
    passing: passing ? "Passing" : "Failed",
    email,
  };
}
function addToTable(student, i) {
  // to avoid duplication, reset the table first.
  if (i == 0) {
    tbody.innerText = "";
  }
  const tr = document.createElement("tr");

  const data = Object.values(student);

  for (let i = 0; i < data.length; i++) {
    if (i == 2) continue;
    if (i == 1) {
      // inserting  the names
      const nameTd = document.createElement("td");
      nameTd.innerHTML = `<img src=${student.imgSrc} alt="photo"/> <span>${student.name}</span>`;
      tr.append(nameTd);
    } else {
      const newTd = document.createElement("td");
      newTd.textContent = data[i];
      tr.append(newTd);
    }
  }

  tbody.append(tr);
}