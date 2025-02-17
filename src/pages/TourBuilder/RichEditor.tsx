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
  AlignRight
} from "lucide-react";

const RichEditor = () => {
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
    content: `
        <h1>This is a 1st level heading</h1>
        <h2>This is a 2nd level heading</h2>
        <h3>This is a 3rd level heading</h3>
        <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
      `
  }) as Editor;

  if (!editor) {
    return null;
  }

  return (
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
          <BoldIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={clsx(`${editor.isActive("italic") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
        >
          <ItalicIcon size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={clsx(`${editor.isActive("strike") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
        >
          <Strikethrough size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={clsx(`${editor.isActive("underline") ? "is-active text-secondary-foreground" : ""} hover:text-secondary-foreground `)}
        >
          <UnderlineIcon size={20} />
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
      <div className="absolute h-16 z-20 bottom-[1px] left-[1px] rounded-b-sm right-[1px]">
        <div className="absolute bottom-[16px] w-full h-[40px] bg-gradient-to-t from-card to-transparent z-20"></div>
        <div className="absolute bottom-0 h-[16px] bg-card z-20 rounded-b-sm w-full"></div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
export default RichEditor;
