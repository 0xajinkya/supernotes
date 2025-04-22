'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { ICreateNoteArgs } from "@/interfaces/note";
import { createNote } from "@/api/note";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSingleNote } from "@/store/slices/notes";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./rte";

export function CreateNoteModal({
  floating,
}: {
  floating?: boolean,
}) {

  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((st) => st.notes.currentNote);
  const router = useRouter();

  console.log(currentNote);

  const {
    mutate
  } = useMutation({
    mutationFn: ({ data, config }: ICreateNoteArgs) => createNote({ data, config }),
    onSuccess: (data) => {
      dispatch(addSingleNote(data.content.data));
      router.push(`/list/${data.content.data.slug}`);
    }
  });

  const formSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10),
    generateAiSummay: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentNote ? currentNote.title : "",
      content: currentNote ? currentNote.content : "",
      generateAiSummay: currentNote ? !!currentNote.aiSummary : false,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate({
      data: {
        title: data.title,
        content: data.content,
        generateAiSummay: data.generateAiSummay
      }
    });
  };

  React.useEffect(() => {
    if (currentNote) {
      form.reset({
        title: currentNote.title,
        content: currentNote.content,
        generateAiSummay: !!currentNote.aiSummary,
      });
    }
  }, [currentNote, form]);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={floating ? `absolute right-5 bottom-5` : ``}
        >
          {!floating ? "Add Note" :
            currentNote ?
              <Edit
                color="#F56565"

              />
              :
              <Plus
                color="#F56565"
              />
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <Form
          {...form}

        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Create note</DialogTitle>
              <DialogDescription>
                Put down your ideas, things to remind yourself of and whatever you could image of...
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem
                      className="w-[100%] col-span-1"
                    >
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Once upon a time..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem
                      className="w-[100%] col-span-1"
                    >
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem
                      className="w-[100%] col-span-1 flex"
                    >
                      <FormControl>
                        <Checkbox
                          {...field}
                          onClick={() => form.setValue("generateAiSummay", !form.getValues("generateAiSummay"))}
                        />
                      </FormControl>
                      <FormLabel>Generate AI Summary?</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Note</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
