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
  const [open, setOpen] = React.useState(false);

  const isEditMode = React.useMemo(() => currentNote && floating && open, [currentNote, floating, open]);

  const formSchema = z.object({
    title: z.string().min(5),
    content: z.string().min(10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const {
    mutate,
    isPending: isCreatePending
  } = useMutation({
    mutationFn: ({ data, config }: ICreateNoteArgs) => createNote({ data, config }),
    onSuccess: (data) => {
      resetAndCloseModal();
      dispatch(addSingleNote(data.content.data));
      router.push(`/list/${data.content.data.slug}`);
    }
  });

  const {
    mutate: updateMutate,
    isPending: isUpdatePending
  } = useMutation({
    mutationFn: ({ data, config }: IUpdateNoteArgs) => updateNote(currentNote!.slug, {
      title: data.title,
      content: data.content
    }, config),
    onSuccess: (data) => {
      resetAndCloseModal();
      dispatch(updateSingleNote(data.content.data));
      router.replace(`/list/${data.content.data.slug}`);
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditMode) {
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
    }
  }

  const resetAndCloseModal = () => {
    form.setValue("title", "");
    form.setValue("content", "");
    setOpen(false);
  }

  const isUnchanged =
    isEditMode &&
    currentNote?.title === form.watch("title") &&
    currentNote?.content === form.watch("content");

  React.useEffect(() => {
    if (isEditMode) {
      form.reset({
        title: currentNote?.title ?? "",
        content: currentNote?.content ?? "",
      });
    }
  }, [isEditMode, currentNote, form]);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild onClick={() => setOpen(op => !op)}>
        {button ??
          <Button
            variant="outline"
            className={floating ? "absolute right-5 bottom-5 cursor-pointer" : "cursor-pointer"}
          >
            {!floating ? "Add Note" :
              currentNote ?
                <Edit color="#F56565" /> :
                <Plus color="#F56565" />
            }
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[80vh]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{isEditMode ? "Edit note" : "Create note"}</DialogTitle>
              <DialogDescription>
                Put down your ideas, things to remind yourself of and whatever you could imagine...
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-1">
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
                    <FormItem className="col-span-1 h-[250px] flex flex-col">
                      <FormLabel>Content</FormLabel>
                      <FormControl className="w-full">
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
              <Button
                type="submit"
                className="cursor-pointer bg-[#F56565] hover:bg-[#F56565]"
                disabled={(isCreatePending || isUpdatePending || isUnchanged) ?? false}
              >
                {isEditMode ? "Update Note" : "Create Note"}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  ref={closeRef}
                  className="cursor-pointer border-1 border-[#F56565] text-[#F56565]"
                  onClick={resetAndCloseModal}
                  disabled={isCreatePending || isUpdatePending}
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
