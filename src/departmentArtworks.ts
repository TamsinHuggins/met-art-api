function getDepartmentIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("departmentId");
}

const departmentId = getDepartmentIdFromUrl();
if (departmentId) {
  console.log("Department ID:", departmentId);
  // ...use departmentId as needed
} else {
  // handle missing departmentId
}
