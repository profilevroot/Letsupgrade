import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, User } from "lucide-react";

export default function Dashboard() {
  const darkMode ='';

  return ( 
        <>
          {/* Readiness Score */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Overall Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {/* <Progress value={0} className="w-1/2" /> */}
            </CardContent>
          </Card>

          {/* Subscription Banner */}
          <Card className="col-span-2 bg-blue-100">
            <CardContent className="flex justify-between items-center">
              <p>Unlock Unlimited Access by subscribing to premium plans</p>
              <Button>View Premium Plans →</Button>
            </CardContent>
          </Card>

          {/* Features */}
          {[
            { name: "Study Questions", icon: "❓", color: "bg-blue-100" },
            { name: "Practice Tests", icon: "📝", color: "bg-yellow-100" },
            { name: "Flashcards", icon: "📱", color: "bg-green-100" },
            { name: "Create Custom Test", icon: "⚙️", color: "bg-red-100" },
          ].map((item, index) => (
            <Card key={index} className={item.color}>
              <CardContent className="flex flex-col items-center py-6">
                <span className="text-4xl">{item.icon}</span>
                <p className="mt-2 font-medium">{item.name}</p>
              </CardContent>
            </Card>
          ))}

          {/* Footer Buttons */}
          <div className="col-span-2 flex justify-between">
            <Button variant="outline">Glossary</Button>
            <Button variant="outline">Acronyms</Button>
          </div>
        </> 
  );
}
