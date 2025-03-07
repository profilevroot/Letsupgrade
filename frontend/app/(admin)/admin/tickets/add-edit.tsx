"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput, Input } from "@/components/ui/input";
import { FormSelect } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, Edit, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { get, post, put } from "@/hooks/useClientApi";
import { ScrollArea } from "@/components/ui/scroll-area";

type propsTypes = {
  item?: any;
  action: string;
  label: string;
};

const priorities = [
  { label: "Basic (Low)", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "Advanced (High)", value: "high" },
];
const questionSchema = z.object({
  name: z.string().min(1, "Question is required"),
  answers: z
    .array(z.string().min(1, "Answer is required"))
    .min(1, "At least one answer is required"),
});

const formSchema = z.object({
  name: z.string().min(2),
  subject: z.string().min(2),
  description: z.string().min(2),
  labLink: z.string().min(2),
  guidance: z.string().min(2),
  priority: z.string().min(2),
  category_id: z.string().nonempty("You must select an option."),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});
export default function AddDialog({ item, action, label }: propsTypes) {
  console.log("item", item);
  const router = useRouter();
  const { toast } = useToast();

  const [category, setCategory] = React.useState<
    { label: string; value: string }[]
  >([]);
  const getRole = async () => {
    const response = await get(`/categorys`, {});
    const roleFormatted = response?.data?.data?.map((value) => ({
      label: value?.name,
      value: `${value?.id}`,
    }));
    console.log("response", roleFormatted);
    setCategory([...roleFormatted]);
  };
  React.useEffect(() => {
    getRole();
  }, []);

  const transformData = (data) => {
    return data?.map((item) => ({
      name: item.name,
      answers: item.Answers.map((answer) => answer.name),
    }));
  }; 

  const questions = transformData(item?.Questions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      subject: item?.subject || "",
      description: item?.description || "",
      labLink: item?.labLink || "",
      guidance: item?.guidance || "",
      priority: item?.priority || "",
      category_id: `${item?.category_id}` || "",
      questions: questions?questions:[{ name: "", answers: [""] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const value = {
        name: values?.name,
        subject: values?.subject,
        description: values?.description,
        labLink: values?.labLink,
        guidance: values?.guidance,
        priority: values?.priority,
        category_id: parseInt(values?.category_id),
        questions: values?.questions,
      };
      if (action === "Update") {
        const response = await put(`/ticket/${item.id}`, value);
        if (response.status) {
          toast({
            title: "Success",
            variant: "default",
            description: `${values?.name} updated successfully`,
          });
          router.refresh();
          document.getElementById("closeDialog")?.click();
        }
      } else {
        const response = await post("/ticket", value);
        if (response.status) {
          toast({
            title: "Success",
            variant: "default",
            description: `${values?.name} added successfully`,
          });
          router.refresh();
          document.getElementById("closeDialog")?.click();
        }
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: error.message,
      });
    }
  }

  const {
    control,
    register,
    formState: { errors },
  } = form;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={action === "Update" ? "ghost" : "default"}>
          {action === "Update" ? (
            <Edit className="mr-2 h-4 w-4" />
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>{label} Ticket</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[450px] border">
              <CardContent className="grid gap-1">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput control={form.control} name="name" label="Name" />
                  <FormSelect
                    name="category_id"
                    control={form.control}
                    label="Select an Category"
                    options={category}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    control={form.control}
                    name="subject"
                    label="Subject"
                  />
                  <FormInput
                    control={form.control}
                    name="description"
                    label="Description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    control={form.control}
                    name="labLink"
                    label="LabLink"
                  />
                  <FormInput
                    control={form.control}
                    name="guidance"
                    label="Guidance"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormSelect
                    name="priority"
                    control={form.control}
                    label="Select an priority"
                    options={priorities}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => append({ name: "", answers: [""] })}
                    type="button"
                    className="mr-4"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Question
                  </Button>
                </div>
                <div className="grid  gap-4">
                  {fields.map((question, qIndex) => (
                    <div key={question.id} className="border p-5">
                      <div className="flex items-center mb-2">
                        <Input
                          {...register(`questions.${qIndex}.name`)}
                          placeholder="Enter question"
                          className="mr-4"
                        />
                        <Button onClick={() => remove(qIndex)} type="button">
                        <Trash className="mr-2 h-4 w-4" />Question
                        </Button>
                      </div>
                      {errors?.questions?.[qIndex]?.name && (
                        <p className="text-red-500">
                          {errors.questions[qIndex].name.message}
                        </p>
                      )}

                      <Controller
                        control={control}
                        name={`questions.${qIndex}.answers`}
                        render={({ field }) => (
                          <div className="ml-4">
                            {field.value.map((answer, aIndex) => (
                              <div
                                key={aIndex}
                                className="flex items-center mb-2"
                              >
                                <Input
                                  value={answer}
                                  onChange={(e) => {
                                    const updatedAnswers = [...field.value];
                                    updatedAnswers[aIndex] = e.target.value;
                                    field.onChange(updatedAnswers);
                                  }}
                                  placeholder="Enter answer"
                                  className="mr-4"
                                />
                                <Button
                                  onClick={() => {
                                    const updatedAnswers = field.value.filter(
                                      (_, i) => i !== aIndex
                                    );
                                    field.onChange(updatedAnswers);
                                  }}
                                  type="button"
                                >
                                  <Trash className="mr-2 h-4 w-4" />Answer
                                </Button>
                              </div>
                            ))}
                            {errors?.questions?.[qIndex]?.answers && (
                              <p className="text-red-500">
                                {errors.questions[qIndex].answers.message}
                              </p>
                            )}
                            <Button
                              onClick={() =>
                                field.onChange([...field.value, ""])
                              }
                              type="button"
                            >
                              <Plus className="mr-2 h-4 w-4" /> Answer
                            </Button>
                          </div>
                        )}
                      />
                    </div>
                  ))}

                  {/*  {fields.map((question, qIndex) => (
                    <div key={question.id} className="mb-6 border-b pb-4">
                      <div className="flex items-center mb-2">
                        <Input
                          name={`questions.${qIndex}.answers`}
                          placeholder="Enter question"
                          className="mr-4"
                        />
                        <Button onClick={() => remove(qIndex)} type="button">
                          Remove Question
                        </Button>
                      </div>
                      {form?.formState?.errors?.questions?.[qIndex]?.name && (
                        <p className="text-red-500">
                          {
                            form?.formState?.errors.questions[qIndex].name
                              .message
                          }
                        </p>
                      )}
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </ScrollArea>
            <DialogFooter>
              <Button type="submit">{action}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
