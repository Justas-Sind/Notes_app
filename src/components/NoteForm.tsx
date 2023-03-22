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
          ref={titleRef}
          required
          defaultValue={title}
          className="w-60 rounded py-1 px-2 shadow focus:outline-none focus:ring focus:ring-purple-300"
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
          styles={{
            option: (baseStyles, state) => ({
              ...baseStyles,
              color: state.isSelected ? "#0f172a" : "#0f172a",
              backgroundColor: state.isSelected ? "#fff" : "#fff",
              ":hover": {
                cursor: "pointer",
                backgroundColor: "#f3e8ff",
              },
            }),

            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#fff",
              padding: "0",
              border: state.isFocused ? "3px solid #d8b4fe" : "3px solid #fff",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              borderRadius: "0.25rem",
              ":hover": {
                cursor: "pointer",
                border: "3px solid #d8b4fe",
              },
            }),
            multiValueLabel: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: "#c084fc",
              color: "#fff",
              padding: "0.2rem 0.5rem",
            }),
          }}
          isMulti
        />
      </div>
      <div>
        <p>Body</p>
        <textarea
          name="body"
          cols={30}
          rows={15}
          required
          ref={markdownRef}
          defaultValue={markdown}
          className="w-full rounded py-1 px-2 shadow focus:outline-none focus:ring focus:ring-purple-300"
        ></textarea>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white transition-all duration-300 hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 active:bg-purple-600"
        >
          Save
        </button>
        <Link to="..">
          <button
            type="button"
            className="rounded-full bg-purple-400 py-2 px-5 text-sm font-semibold leading-none text-white transition-all duration-300 hover:bg-purple-500 focus:outline-none focus:ring focus:ring-purple-300 active:bg-purple-600"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

export default NoteForm;
