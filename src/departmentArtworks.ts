"use strict";

interface Department {
  departmentId: number;
  displayName: string;
}

interface DepartmentsResponse {
  departments: Department[];
}

interface ArtPiece {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImage: string;
  department: string;
  objectName: string;
}

export type { Department };
export type { DepartmentsResponse };

function getDepartmentFromUrl(): Department {
  const department: Department = {
    departmentId: 0,
    displayName: "Department Not Found",
  };
  const params = new URLSearchParams(window.location.search);
  try {
    department.departmentId = Number(params.get("departmentId"));

    department.displayName = params.get("displayName") as string;
  } catch {
    console.error("failed to assign department");
  }
  return department;
}

console.log("test");

async function fetchArtworkIds(): Promise<Number[]> {
  const thisDepartment: Department = getDepartmentFromUrl();
  console.log(thisDepartment);

  const linkURL: string = `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${thisDepartment.departmentId}`;
  const response: Response = await fetch(linkURL);
  const data = await response.json();
  const objectIDs = await data.objectIDs;
  return objectIDs;
}

async function fetchOneExpandedArtwork() {
  const artworkIds = await fetchArtworkIds();
  const firstId = artworkIds[0];
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${firstId}`,
  );
  const expandedArtPiece = await response.json();
  return expandedArtPiece;
}

async function defineOneArtwork() {
  const expanded = await fetchOneExpandedArtwork();
  return {
    objectID: expanded.objectID,
    title: expanded.title,
    artistDisplayName: expanded.artistDisplayName,
    primaryImage: expanded.primaryImage,
    department: expanded.department,
    objectName: expanded.objectName,
  };
}

// https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=3

defineOneArtwork().then((artwork) => console.log(artwork));
