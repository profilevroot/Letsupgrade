"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { get, post } from "@/hooks/useBackendApi";
import { useRouter } from "next/navigation";
import DashboardCard from "./dashboardCard";
import { useEffect, useState } from "react";
import AddCountryDialog from "./addCountry";
import { CirclePlus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { checkActionPermission } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "../ui/use-toast";

export default function Dashboard({ actions }: any) {
  const [radioGroup, setRadioGroup] = useState("");
  const [radioTemp, setRadioTemp] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const radioGroupCheck = async () => {
    const filterData = data?.filter(
      (value: { autotrading: boolean }) => value?.auto_trading === true
    );
    const checked =
      filterData.length === data.length
        ? "all-on"
        : filterData.length === 0 && data.length > 0
        ? "all-off"
        : "partially";
    setRadioGroup(checked);
  };
  async function getCountries() {
    const {data} = await get(`/users`, {});
    setData(data?.data);
  }
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    radioGroupCheck();
  }, [data]);
  const handleChangeRadio = (value: string) => {
    setOpen(true);
    setRadioTemp(value);
  };

  const handleChange = () => {
    setOpen(false);
    setRadioTemp("");
    setRadioGroup(radioTemp);
    if (radioTemp === "all-off") {
      try {
        data?.forEach(async (item: { country: string }) => {
          const values = {
            country: item.country,
            auto_trading: false,
            last_updated: new Date(),
            updated_by: "Kanagaraj R",
          };
          const response = await post("/update_countries", values);
          if (response.status === 200) {
          }
        });
      } catch (error: any) {
      } finally {
        setTimeout(() => {
          getCountries();
          toast({
            title: "Service alert!",
            variant: "default",
            description: `All the countires were Paused successfully`,
          });
        }, 1000);
      }
    } else if (radioTemp === "all-on") {
      try {
        data?.forEach(async (item: { country: string }) => {
          const values = {
            country: item.country,
            auto_trading: true,
            last_updated: new Date(),
            updated_by: "Kanagaraj R",
          };
          const response = await post("/update_countries", values);
          if (response.status === 200) {
            // router.refresh();
          }
        });
      } catch (error: any) {
      } finally {
        setTimeout(() => {
          getCountries();
          toast({
            title: "Service alert!",
            variant: "default",
            description: `All the countires were resumed successfully`,
          });
        }, 1000);
      }
    }
  };

  const handleRadioBtton = () => {
    //router.refresh();
    getCountries();
  };
  const refreshData = () => {
    getCountries();
  };
  return (
    <>
      <div className="flex justify-between mb-4 gap-2">
        <div>
          <RadioGroup
            value={radioGroup}
            onValueChange={handleChangeRadio}
            className="flex"
          >
            <div className="flex items-center space-x-2">
              <Label htmlFor="r1" className=" text-lg bold">
                Master Key:
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="all-off"
                id="r1"
                disabled={!checkActionPermission(actions, "update")}
              />
              <Label htmlFor="r1">Pause all</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partially" id="r2" disabled />
              <Label htmlFor="r2" className=" cursor-not-allowed">
                Intermediate
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="all-on"
                id="r3"
                disabled={!checkActionPermission(actions, "update")}
              />
              <Label htmlFor="r3">Resume all</Label>
            </div>
          </RadioGroup>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action can{" "}
                  {radioGroup === "all-off" ? "resume" : "pause"} all the
                  country services
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleChange()}>
                  Ok
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div>
          {checkActionPermission(actions, "add") && (
            <AddCountryDialog
              refreshData={refreshData}
              icon={
                <CirclePlus className=" hover:text-destructive cursor-pointer" />
              }
            />
          )}
        </div>
      </div>
      <ScrollArea className=" h-[500px] w-full ">
        <div className="flex flex-wrap gap-2 content-start align-top">
          {data?.map((item: any) => (
            <div key={item.country} className="w-[400px] ">
              <DashboardCard
                item={item}
                handleRadioBtton={handleRadioBtton}
                actions={actions}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
