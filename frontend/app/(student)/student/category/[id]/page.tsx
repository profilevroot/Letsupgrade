import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, User } from "lucide-react";
import { get } from "@/hooks/useBackendApi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";


export default async function Dashboard() {
    const response = await get(`/tickets-by-category/10?limit=10&page=0`, {});
    const queryData = response?.data || [];
  return ( 
        <>
          
          
          <Card className="col-span-2 bg-blue-100">
            <CardContent className="flex justify-between items-center">
              <p>Unlock Unlimited Access by subscribing to premium plans</p>
              <Button>View Premium Plans →</Button>
            </CardContent>
          </Card>

          <div className="flex w-full font-bold capitalize mt-4 mb-4">
            Security Tool
          </div>

            <Accordion type="single" collapsible className="w-full">
            { queryData?.data.map((item, index) => (
                              <AccordionItem value={item.ticketNo} className="font-medium capitalize"> 
                                    <AccordionTrigger>{item.ticketNo} - {item.subject}</AccordionTrigger>
                                      <AccordionContent>
                                      <Table>
                                        <TableBody>   
                                        <TableRow>
                                              <TableCell className="font-medium"> Name</TableCell>
                                              <TableCell>{item.name}</TableCell>                                            
                                            </TableRow>

                                            <TableRow>
                                              <TableCell className="font-medium"> Subject</TableCell>
                                              <TableCell>{item.subject}</TableCell>                                            
                                            </TableRow>

                                            <TableRow>
                                              <TableCell className="font-medium"> Description</TableCell>
                                              <TableCell>{item.description}</TableCell>                                            
                                            </TableRow>

                                           

                                            <TableRow>
                                              <TableCell className="font-medium"> Lab Link</TableCell>
                                              <TableCell>{item.labLink}</TableCell>
                                            </TableRow> 

                                            <TableRow>
                                              <TableCell className="font-medium">Guidance</TableCell>
                                              <TableCell>{item.guidance}</TableCell>
                                            </TableRow>        

                                            <TableRow>
                                              <TableCell>
                                                Question
                                              </TableCell>
                                              <TableCell>
                                                  
                                      <Accordion type="single" collapsible className="w-full">
                                                { item?.Questions.map((question, questionIndex) => (
                                                  <AccordionItem value={question.name} className="font-medium capitalize"> 
                                                        <AccordionTrigger>{question.name}</AccordionTrigger>
                                                          <AccordionContent>

                                                              <div>
                                                              { question?.Answers.map((answer, answerIndex) => (
                                                                  
                                                                   <>{answerIndex + 1}) {answer.name} &nbsp;</>
                                                                  
                                                              ))}
                                                              </div>

                                                  
                                                          </AccordionContent>
                                                  </AccordionItem>
                                                ))}  
                                              </Accordion>
                                              </TableCell>
                                            </TableRow>
                                        </TableBody>      
                                      </Table>

                                      

                                      </AccordionContent>
                              </AccordionItem>
                          ))}  
            </Accordion>

          
        </> 
  );
}
