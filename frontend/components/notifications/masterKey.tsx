"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Value } from "@radix-ui/react-select";

export default function MasterKeyRadioGroup({ data }) {
  const filterData = data.filter(
    (value: { autotrading: boolean }) => value.auto_trading === true
  );
  const checked =
    filterData.length === data.length
      ? "all-on"
      : filterData.length === 0 && data.length > 0
      ? "all-off"
      : "partially";
  console.log(data, filterData, checked);

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <RadioGroup
      defaultValue={checked}
      onValueChange={handleChange}
      className="flex"
    >
      <div className="flex items-center space-x-2">
        <Label htmlFor="r1" className=" text-lg bold">
          Master Key:
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="all-off" id="r1" />
        <Label htmlFor="r1">Switch-Off all</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="partially" id="r2" />
        <Label htmlFor="r2">Intermediate</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="all-on" id="r3" />
        <Label htmlFor="r3">Switch-On all</Label>
      </div>
    </RadioGroup>
  );
}
