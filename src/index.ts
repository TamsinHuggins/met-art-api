console.log("conneced");

import type { Department, DepartmentsResponse } from "./departmentArtworks";

const DEPARTMENTS_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/departments";

const ulRoot = document.getElementById("departments");
if (!ulRoot) throw new Error("Element with id departments not found");

async function fetchDepartments(): Promise<Department[]> {
  const response: Response = await fetch(DEPARTMENTS_URL);
  const data: DepartmentsResponse =
    (await response.json()) as DepartmentsResponse;
  console.log(data.departments);
  return data.departments;
}

function createDeptListItem(deptId: number, deptName: string): HTMLLIElement {
  console.log(deptId, deptName, typeof deptId, typeof deptName);
  const li = document.createElement("li");
  li.dataset.deptId = deptId.toString();
  const linkURL = `departmentArtworks.html?departmentId=${deptId}&departmentName=${encodeURIComponent(deptName)}`;

  const anchor: HTMLAnchorElement = document.createElement("a");
  anchor.href = linkURL;
  anchor.innerText = deptName;
  li.appendChild(anchor);
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
