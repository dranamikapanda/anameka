"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading2, Heading3, Italic, List, ListOrdered, Quote, Redo, Undo, Link2 } from "lucide-react";
import { useState } from "react";

export function RichText({ name, initial }: { name: string; initial: string }) {
  const [html, setHtml] = useState(initial);
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3] } })],
    content: initial, immediatelyRender: false,
    editorProps: { attributes: { class: "prose-rich min-h-[320px] px-5 py-4 focus:outline-none" } },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });
  if (!editor) return <div className="field min-h-[360px]" />;
  const B = ({ on, active, label, children }: { on: () => void; active?: boolean; label: string; children: React.ReactNode }) => (
    <button type="button" onClick={on} aria-label={label} aria-pressed={active} className={`rounded-md p-2 ${active ? "bg-plum text-ivory" : "text-plum hover:bg-cream"}`}>{children}</button>
  );
  const link = () => {
    const url = prompt("Link address (https://…)");
    if (!url) return;
    editor.chain().focus().insertContent(`<a href="${url.replace(/"/g, "")}">${editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to) || url}</a>`).run();
  };
  return (
    <div className="overflow-hidden rounded-xl border border-plum/15 bg-white focus-within:border-gold">
      <div className="flex flex-wrap gap-1 border-b border-plum/10 bg-ivory p-1.5">
        <B label="Heading" on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}><Heading2 className="h-4 w-4" /></B>
        <B label="Subheading" on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}><Heading3 className="h-4 w-4" /></B>
        <B label="Bold" on={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><Bold className="h-4 w-4" /></B>
        <B label="Italic" on={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><Italic className="h-4 w-4" /></B>
        <B label="Bulleted list" on={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}><List className="h-4 w-4" /></B>
        <B label="Numbered list" on={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}><ListOrdered className="h-4 w-4" /></B>
        <B label="Quote" on={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}><Quote className="h-4 w-4" /></B>
        <B label="Insert link" on={link}><Link2 className="h-4 w-4" /></B>
        <span className="mx-1 w-px bg-plum/10" />
        <B label="Undo" on={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></B>
        <B label="Redo" on={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></B>
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
