import { FormEvent, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "./App";

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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              ref={titleRef}
              required
              defaultValue={title}
            />
          </label>
        </div>
        <div>
          <label>
            Tags{" "}
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
              isMulti
            />
          </label>
        </div>
      </div>
      <div>
        <div>
          <label>
            Body{" "}
            <textarea
              name="body"
              cols={30}
              rows={15}
              required
              ref={markdownRef}
              defaultValue={markdown}
            ></textarea>
          </label>
        </div>
      </div>
      <div>
        <button type="submit">Save</button>
        <Link to="..">
          <button type="button">Cancel</button>
        </Link>
      </div>
    </form>
  );
}

export default NoteForm;
