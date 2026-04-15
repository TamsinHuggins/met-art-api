"use strict";
console.log("connected");
const DEPARTMENTS_URL = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const ulRoot = document.getElementById("departments");
if (!ulRoot)
    throw new Error("Element with id departments not found");
async function fetchDepartments() {
    const response = await fetch(DEPARTMENTS_URL);
    const data = (await response.json());
    return data.departments;
}
function createDeptListItem(deptId, deptName) {
    const li = document.createElement("li");
    li.dataset.deptId = deptId.toString();
    li.innerText = deptName;
    return li;
}
fetchDepartments()
    .then((departments) => {
    departments.forEach((department) => ulRoot.appendChild(createDeptListItem(department.departmentId, department.displayName)));
})
    .catch((e) => console.log("failed to fetch departments", e));
