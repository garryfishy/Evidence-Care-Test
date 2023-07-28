const correctExample = [
  {
    id: 1,
    name: "raelynn",
    managerId: null,
  },
  {
    id: 2,
    name: "darin",
    managerId: 1,
  },
  {
    id: 3,
    name: "kacie",
    managerId: 1,
  },
  {
    id: 4,
    name: "jordana",
    managerId: 2,
  },
  {
    id: 5,
    name: "everett",
    managerId: 2,
  },
  {
    id: 6,
    name: "bertha",
    managerId: 2,
  },
  {
    id: 7,
    name: "peg",
    managerId: 3,
  },
  {
    id: 8,
    name: "hugh",
    managerId: 3,
  },
  {
    id: 9,
    name: "eveleen",
    managerId: 3,
  },
  {
    id: 10,
    name: "evelina",
    managerId: 9,
  },
];

const faultyExample = [
  {
    id: 1,
    name: "maurice",
    managerId: null,
  },
  {
    id: 2,
    name: "hayleigh",
    managerId: 1,
  },
  {
    id: 3,
    name: "edwyn",
    managerId: 1,
  },
  {
    id: 4,
    name: "keane",
    managerId: null,
  },
  {
    id: 5,
    name: "kylee",
    managerId: null,
  },
];

const anotherFaultyExamples = [
  {
    id: 1,
    name: "lori",
    managerId: null,
  },
  {
    id: 2,
    name: "fletcher",
    managerId: 1,
  },
  {
    id: 3,
    name: "tabitha",
    managerId: 1,
  },
  {
    id: 4,
    name: "linton",
    managerId: 2,
  },
  {
    id: 5,
    name: "tressa",
    managerId: 3,
  },
  {
    id: 4,
    name: "linton",
    managerId: 3,
  },
];

export { correctExample, faultyExample, anotherFaultyExamples };
