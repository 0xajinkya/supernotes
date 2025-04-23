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
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useMutation } from "@tanstack/react-query";
import { ICreateNoteArgs, IUpdateNoteArgs } from "@/interfaces/note";
import { createNote, updateNote } from "@/api/note";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addSingleNote, updateSingleNote } from "@/store/slices/notes";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./rte";

export function CreateNoteModal({
  floating,
  button
}: {
  floating?: boolean,
  button?: React.ReactNode
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const currentNote = useAppSelector((st) => st.notes.currentNote);
  const router = useRouter();

  const {
    mutate,
    isPending: isUpdatePending
  } = useMutation({
    mutationFn: ({ data, config }: ICreateNoteArgs) => createNote({ data, config }),
    onSuccess: (data) => {
      dispatch(addSingleNote(data.content.data));
      form.reset({
        title: "",
        content: "",
      });
      closeRef.current?.click();
      router.push(`/list/${data.content.data.slug}`);
    }
  });

  const {
    mutate: updateMutate,
    isPending
  } = useMutation({
    mutationFn: ({ data, config }: IUpdateNoteArgs) => updateNote(currentNote!.slug, {
      title: data.title,
      content: data.content
    }, config),
    onSuccess: (data) => {
      dispatch(updateSingleNote(data.content.data));
      form.reset({
        title: "",
        content: "",
      });
      closeRef.current?.click();
      router.replace(`/list/${data.content.data.slug}`);
    }
  })

  const formSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentNote ? currentNote.title : "",
      content: currentNote ? currentNote.content : "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (currentNote) {
      updateMutate({
        data: {
          title: data.title,
          content: data.content,
        }
      });
    } else {
      mutate({
        data: {
          title: data.title,
          content: data.content,
        }
      });
    };
  };

  React.useEffect(() => {
    if (currentNote) {
      form.reset({
        title: currentNote.title,
        content: currentNote.content,
      });
    }
  }, [currentNote, form]);


  return (
    <Dialog>
      <DialogTrigger asChild>
        {button ??
          <Button
            variant="outline"
            className={floating ? `absolute right-5 bottom-5 cursor-pointer` : `cursor-pointer`}
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
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[80vh]">
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
            </div>
            <DialogFooter>
              <Button type="submit" className="cursor-pointer bg-[#F56565] hover:bg-[#F56565]"
                disabled={isPending || isUpdatePending}
              >
                {currentNote ? "Update Note" : "Create Note"}</Button>
              <DialogClose asChild
                onClick={() => form.reset({
                  title: "",
                  content: ""
                })}
              >
                <Button type="button" variant="secondary" ref={closeRef} className="cursor-pointer border-1 border-[#F56565] text-[#F56565]"
                  disabled={isPending || isUpdatePending}
                >
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
