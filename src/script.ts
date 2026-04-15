console.log("connected");

interface Department {
  // fill in the property names and types based on your example object
  departmentId: number;
  displayName: string;
}

interface DepartmentsResponse {
  departments: Department[];
}

const DEPARTMENTS_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/departments";

const ulRoot = document.getElementById("departments");
if (!ulRoot) throw new Error("Element with id departments not found");

async function fetchDepartments(): Promise<Department[]> {
  const response: Response = await fetch(DEPARTMENTS_URL);
  const data: DepartmentsResponse =
    (await response.json()) as DepartmentsResponse;
  return data.departments;
}

function createDeptListItem(deptId: number, deptName: string): HTMLLIElement {
  const li = document.createElement("li");
  li.dataset.deptId = deptId.toString();
  li.innerText = deptName;

  return li;
}

fetchDepartments()
  .then((departments) => {
    departments.forEach((department) =>
      ulRoot.appendChild(
        createDeptListItem(department.departmentId, department.displayName),
      ),
    );
  })
  .catch((e) => console.log("failed to fetch departments", e));
