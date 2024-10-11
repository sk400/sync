import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "content",
      type: "string",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "user" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    // Likes
    // Comments
  ],
  preview: {
    select: {
      content: "content",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
