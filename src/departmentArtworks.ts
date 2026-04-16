const params = new URLSearchParams(window.location.search);
const departmentId = params.get("departmentId");
console.log("Department ID:", departmentId);
