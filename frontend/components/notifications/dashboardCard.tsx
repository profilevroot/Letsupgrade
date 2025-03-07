"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import DeleteAlertDialog from "./delete";
import { Switch } from "../ui/switch";
import { post } from "@/hooks/useBackendApi";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
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

export default function DashboardCard({
  item,
  handleRadioBtton,
  actions,
}: any) {
  const { toast } = useToast();
  const handleCheck = async (value: boolean) => {
    const values = {
      country: item.country,
      auto_trading: value,
      last_updated: new Date(),
      updated_by: "Kanagaraj R",
    };
    try {
      const response = await post("/update_countries", values);
      if (response.status === 200) {
        handleRadioBtton();
        toast({
          title: "Service alert!",
          variant: "default",
          description: `Country ${item.country} ${
            value ? "Resumed" : "Paused"
          } successfully`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Service alert!",
        variant: "destructive",
        description: error.message,
      });
    }
  };
  return (
    <Card
      className={`bg-gradient-to-r ${
        item.auto_trading
          ? "from-green-500 to-green-400"
          : " from-blue-300 to-blue-400"
      } p-1 m-1  `}
      key={item.country}
    >
      {/*  <Card
      className={`bg-gradient-to-r ${
        item.auto_trading ? "bg-primary" : "bg-secondary"
      } p-1 m-1 text-primary-foreground`}
      key={item.country}
      > */}

      <CardHeader className="p-1 m-1">
        <div className="flex justify-between">
          <div>
            <Label className="mr-1 font-bold f-15 uppercase">
              {item.country}
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Label>{item.auto_trading ? "Resumed" : "Paused"}</Label>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span>
                  <Switch
                    className="mt-1"
                    value={item.auto_trading}
                    checked={item.auto_trading}
                    disabled={!checkActionPermission(actions, "update")}
                  />
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action can {!item.auto_trading ? "resume" : "pause"}{" "}
                    the service for {item.country}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleCheck(!item.auto_trading);
                    }}
                  >
                    Ok
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 m-1">
        <div className="flex justify-stretch pt-2 ">
          <div className="w-[110px]">
            <Label className="mr-1">Updated by</Label>
          </div>
          <div>
            <Label className="mr-1 text-left">{item.updated_by}</Label>{" "}
          </div>
        </div>
        <div className="flex justify-stretch pt-2 ">
          <div className="w-[110px]">
            <Label className="mr-1">Last updated</Label>
          </div>
          <div>
            <Label className="mr-1">{item.last_updated}</Label>{" "}
          </div>
        </div>
        <div className="flex justify-stretch pt-2 ">
          <div className="w-[110px]">
            <Label className="mr-1">Status</Label>
          </div>
          <div>
            <Label className="mr-1 ">
              {item.auto_trading ? "Resumed" : "Paused"}
            </Label>
          </div>
        </div>
        <div className="flex  justify-between  pt-2 pb-2">
          <div>
            {/* <Label className="mr-t text-blue-600">
              <a href={item?.endpoint} target="_blank">
                Click to open URL
              </a>
            </Label> */}
          </div>
          <div>
            {checkActionPermission(actions, "delete") && (
              <DeleteAlertDialog
                refreshData={handleRadioBtton}
                country={item.country}
                icon={<Trash2 className="text-destructive cursor-pointer " />}
              />
            )}
          </div>
        </div>
      </CardContent>
      {/* {checkActionPermission(actions, "delete") && (
        <CardFooter className=" justify-end p-1 m-1">
          <DeleteAlertDialog
            refreshData={handleRadioBtton}
            country={item.country}
            icon={<Trash2 className="text-destructive cursor-pointer " />}
          />
        </CardFooter>
      )} */}
    </Card>
  );

  return (
    <Card key={item.country} className="p-1 m-1">
      <CardHeader className="p-1 m-1">
        <CardTitle>{item.country}</CardTitle>
      </CardHeader>
      <CardContent className="grid p-1 m-1">
        <div>
          <svg viewBox="0 0 100 50">
            <path
              d="M6 50a44 44 0 1 1 88 0"
              stroke="rgb(3 184 171)"
              stroke-width="12"
              fill="none"
            />
            <path
              d="M6 50a44 44 0 1 1 88 0"
              stroke="rgb(233 234 235)"
              stroke-width="12"
              fill="none"
              style={{
                strokeDasharray: "138, 138",
                strokeDashoffset: item.auto_trading ? 138 : 0,
              }}
            />
            <text x="42" y="44" font-size="10" className=" bg-foreground">
              {item.auto_trading ? "1.00" : "0.00"}
            </text>
          </svg>
          <div className="flex justify-between">
            <div>0.00</div>
            <div>1.00</div>
          </div>
        </div>
        {/* <div className="flex items-center justify-between">
          <div>
            {checkActionPermission(actions, "delete") && (
              <DeleteAlertDialog
                country={item.country}
                refreshData={handleRadioBtton}
                icon={<Trash2 className="text-destructive cursor-pointer " />}
              />
            )}
          </div>
          <div>
            <span className="p-2">
              {item.auto_trading ? "Pause" : "Resume"}
            </span>
            {checkActionPermission(actions, "update") && (
              <Switch
                onCheckedChange={handleCheck}
                value={item.auto_trading}
                checked={item.auto_trading}
              />
            )}
          </div>
        </div> */}
        <CardDescription className={`border-t `}>
          <div className="flex items-center justify-between pt-2 ">
            <div>Updated by</div>
            <div>{item.updated_by}</div>
          </div>
          <div className="flex items-center justify-between  pt-2 pb-2">
            <div>Last updated</div>
            <div>{item.last_updated}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {checkActionPermission(actions, "delete") && (
                <DeleteAlertDialog
                  country={item.country}
                  refreshData={handleRadioBtton}
                  icon={<Trash2 className="text-destructive cursor-pointer " />}
                />
              )}
            </div>
            <div>
              <span className="p-2">
                {item.auto_trading ? "Pause" : "Resume"}
              </span>
              {checkActionPermission(actions, "update") && (
                <Switch
                  onCheckedChange={handleCheck}
                  value={item.auto_trading}
                  checked={item.auto_trading}
                />
              )}
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
