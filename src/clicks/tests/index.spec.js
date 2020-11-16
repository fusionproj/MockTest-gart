const clicks = require("../index");
const fs = require("fs");
describe("Click count test cases: ", () => {
  beforeEach(() => {
    fs.writeFileSync = jest.fn();
    jest.spyOn(fs, "writeFileSync").mockReturnValue(false);
  });
  it("When json has no data then file will not get generated", () => {
    clicks([]);
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
  it("File genrated: Check if writeFileSync is getting called or not", () => {
    clicks([
      { ip: "22.22.22.22", timestamp: "3/11/2016 02:02:58", amount: 7.0 }
    ]);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
  it("Check when ip count exceeds more than 10", () => {
    clicks([
      { ip: "22.22.22.22", timestamp: "3/11/2016 00:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 01:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 02:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 03:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 04:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 05:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 06:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 07:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 08:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 09:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 10:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 11:02:58", amount: 7.0 },
      { ip: "22.22.22.22", timestamp: "3/11/2016 12:02:58", amount: 7.0 }
    ]);
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});
