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
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl w-[100%] md:w-[100%] break-words focus:outline-none min-h-[250px] max-h-[250px] overflow-scroll overflow-x-hidden'
            }
        }
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="border rounded-md p-2 flex">
            <EditorContent
                editor={editor}
            />
        </div>
    );
}
