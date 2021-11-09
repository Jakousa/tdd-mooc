import { expect } from "chai";

import {
  findAllXs,
  findAllNeighborsOfAnX,
  findAllLocationsNeighboringAnX,
  findAllNeighboringLocationsOfAnArrayOfLocations,
  makePrettyArrayFromListOfXLocations,
} from "../src/twoDimensionalArrayHelpers.mjs";

describe("Two dimensional array helpers", () => {
  it('findAllX should output list of "x" locations in a two dimensional array', () => {
    const array = [["x", "x", "."]];
    const output = findAllXs(array);
    const expectedOutput = [
      [0, 0],
      [1, 0],
    ];
    const notExpectedOutput = [
      [0, 1],
      [0, 0],
    ];

    expect(output).to.have.deep.members(expectedOutput);
    expect(output).to.not.have.deep.members(notExpectedOutput);
  });

  it("findAllNeighborsOfAnX should output list of surrounding locations in a two dimensional array", () => {
    const array = [0, 0];
    const output = findAllNeighborsOfAnX(array);
    const expectedOutput = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ];

    expect(output).to.have.deep.members(expectedOutput);
  });

  it("findAllLocationsNeighboringAnX should output all locations neighboring an x, grouped by the location of x", () => {
    const array = [["x", "x", "."]];
    const allXs = findAllXs(array);
    const [firstX, secondX] = allXs;
    const first = findAllNeighborsOfAnX(firstX);
    const second = findAllNeighborsOfAnX(secondX);

    const output = findAllLocationsNeighboringAnX(array);
    const expectedOutput = {
      [firstX]: first,
      [secondX]: second,
    };

    expect(Object.entries(output)).to.have.deep.members(
      Object.entries(expectedOutput)
    );
  });

  it("findAllNeighboringLocationsOfAnArrayOfLocations should output all locations neighboring location array given", () => {
    const array = [
      [0, 0],
      [0, 1],
    ];
    const [firstLocation, secondLocation] = array;
    const first = findAllNeighborsOfAnX(firstLocation);
    const second = findAllNeighborsOfAnX(secondLocation);
    const output = findAllNeighboringLocationsOfAnArrayOfLocations(array);

    const expectedOutput = {
      [firstLocation]: first,
      [secondLocation]: second,
    };
    expect(Object.entries(output)).to.have.deep.members(
      Object.entries(expectedOutput)
    );
  });

  it("makePrettyArrayFromListOfXLocations should output human readable array", () => {
    const array = [
      [0, 0],
      [1, 0],
      [1, 1]
    ];
    const output = makePrettyArrayFromListOfXLocations(array);
    const expectedOutput = [["x", "x"], [".", "x"]]

    expect(output).to.have.deep.members(expectedOutput);

  });
});
