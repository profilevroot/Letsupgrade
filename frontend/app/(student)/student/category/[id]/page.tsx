import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, User } from "lucide-react";

export default function Dashboard() {
 
  return ( 
        <>
          {/*  <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Overall Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
             </CardContent>
          </Card> */}

          {/* Subscription Banner */}
          <Card className="col-span-2 bg-blue-100">
            <CardContent className="flex justify-between items-center">
              <p>Unlock Unlimited Access by subscribing to premium plans</p>
              <Button>View Premium Plans →</Button>
            </CardContent>
          </Card>

          
        </> 
  );
}
