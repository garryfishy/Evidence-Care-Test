import { ResponseEntity } from "../ResponseEntity";
describe("ResponseEntity Class", () => {
  it("should correctly initialize properties", () => {
    const data = [1, 2, 3];
    const responseEntity = new ResponseEntity<number>(true, "Success", data);
    expect(responseEntity.toJSON()).toEqual({
      success: true,
      message: "Success",
      data: [1, 2, 3],
    });
  });

  it("should correctly initialize properties for different data type", () => {
    interface TestData {
      id: number;
      name: string;
    }

    const data: TestData[] = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    const responseEntity = new ResponseEntity<TestData>(true, "Success", data);
    expect(responseEntity.toJSON()).toEqual({
      success: true,
      message: "Success",
      data: [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ],
    });
  });

  it("should correctly update properties", () => {
    const data = [4, 5, 6];
    const responseEntity = new ResponseEntity<number>(
      true,
      "Success",
      [1, 2, 3]
    );

    responseEntity.setSuccess(false);
    responseEntity.setMessage("Error");
    responseEntity.setData(data);

    expect(responseEntity.toJSON()).toEqual({
      success: false,
      message: "Error",
      data: [4, 5, 6],
    });
  });

  it("should correctly get properties", () => {
    const data = [4, 5, 6];
    const responseEntity = new ResponseEntity<number>(true, "Success", data);

    responseEntity.getSuccess();
    responseEntity.getMessage();
    responseEntity.getData();

    expect(responseEntity.toJSON()).toEqual({
      success: true,
      message: "Success",
      data: [4, 5, 6],
    });
  });
});
