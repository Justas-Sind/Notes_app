import { FormEvent, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "../App";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate("..");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col">
        <p>Title</p>
        <input
          type="text"
          name="title"
          maxLength={20}
          ref={titleRef}
          required
          defaultValue={title}
          className="max-w-xs rounded py-1 px-2 shadow outline-2 outline-purple-300 transition-colors duration-300 focus:outline dark:bg-slate-600"
        />
      </div>
      <div>
        <p>Tags</p>
        <CreatableSelect
          onCreateOption={(label) => {
            const newTag = {
              id: crypto.randomUUID(),
              label,
            };
            onAddTag(newTag);
            setSelectedTags((prev) => [...prev, newTag]);
          }}
          value={selectedTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          options={availableTags.map((tag) => {
            return { label: tag.label, value: tag.id };
          })}
          onChange={(tags) => {
            setSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
          }}
          className="my-react-select-container"
          classNamePrefix="my-react-select"
          isMulti
        />
      </div>
      <div>
        <p>Body</p>
        <textarea
          name="body"
          cols={30}
          rows={15}
          maxLength={2000}
          required
          ref={markdownRef}
          defaultValue={markdown}
          className="w-full rounded py-1 px-2 shadow outline-2 outline-purple-300 transition-colors duration-300 focus:outline dark:bg-slate-600"
        ></textarea>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-purple-500 focus:bg-purple-500 focus:outline active:bg-purple-600 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:bg-purple-600 dark:active:bg-purple-700"
        >
          Save
        </button>
        <Link to="..">
          <button
            type="button"
            className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white outline-2 outline-purple-300 transition-colors duration-300 hover:bg-purple-500 focus:bg-purple-500 focus:outline active:bg-purple-600 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:bg-purple-600 dark:active:bg-purple-700"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

export default NoteForm;
