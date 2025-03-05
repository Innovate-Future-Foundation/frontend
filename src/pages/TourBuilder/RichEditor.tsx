import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import clsx from "clsx";
import {
  Bold as BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type
} from "lucide-react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

interface RichEditorProps {
  editorContent?: string;
  setEditorContent: UseFormSetValue<FieldValues>;
}
const RichEditor: React.FC<RichEditorProps> = ({ editorContent, setEditorContent }) => {
  const editor = useEditor({
    extensions: [
      Document,
      BulletList,
      ListItem,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      Strike,
      OrderedList,
      Heading.configure({
        levels: [1, 2, 3]
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })
    ],
    editorProps: {
      attributes: {
        class:
          "prose max-w-none [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-foreground/80 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground/80 [&_h3]:text-medium [&_h3]:font-bold [&_h3]:text-foreground/80 [&_ol]:list-decimal [&_ol]:ml-5 [&_ul]:list-disc [&_ul]:ml-5"
      }
    },
    content: editorContent,
    onUpdate({ editor }) {
      setEditorContent("text", editor.getHTML());
    }
  }) as Editor;

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-primary-foreground30 text-sm font-medium ">Description</div>
      <div className="relative control-group rounded-md">
        <div className="absolute h-10 z-10 rounded-t-sm top-[1px] left-[1px] right-[1px]">
          <div className="absolute h-[36px] bg-card z-10 rounded-t-sm w-full "></div>
        </div>
        <div className="absolute w-full button-group flex gap-4 p-2 border-b z-20">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={clsx(`${editor.isActive("bold") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <BoldIcon size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={clsx(`${editor.isActive("italic") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <ItalicIcon size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={clsx(`${editor.isActive("strike") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <Strikethrough size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={clsx(`${editor.isActive("underline") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <UnderlineIcon size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={clsx(`${editor.isActive("paragraph") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <Type size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={clsx(`${editor.isActive("heading", { level: 1 }) ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <Heading1 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={clsx(`${editor.isActive("heading", { level: 2 }) ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <Heading2 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={clsx(`${editor.isActive("heading", { level: 3 }) ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <Heading3 size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={clsx(`${editor.isActive("bulletList") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <List size={20} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={clsx(`${editor.isActive("orderedList") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
          >
            <ListOrdered size={20} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}>
            <AlignLeft size={20} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}>
            <AlignCenter size={20} />
          </button>
          <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}>
            <AlignRight size={20} />
          </button>
        </div>
        <EditorContent editor={editor} className="cursor-text" />
      </div>
    </div>
  );
};
export default RichEditor;
