'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export function RichTextEditor({ value, onChange }: { value: string, onChange: (html: string) => void }) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                // class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl  pr-[12px] break-words focus:outline-none'
                class: "prose prose-sm h-[200px] min-h-[200px] max-h-[200px] overflow-y-scroll outline-none focus:outline-none"
            }
        }
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="border rounded-md p-2">
            <EditorContent
                editor={editor}
                style={{
                    flexGrow: 1,
                    height: "200px",
                    minHeight: "200px",
                    maxHeight: "200px",
                    border: 1,
                    borderColor: "red",
                }}
            />
        </div>
    );
}
