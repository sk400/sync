import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.min(5).max(50).required(),
    }),
    defineField({
      name: "bio",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
      validation: (Rule) =>
        Rule.min(2)
          .max(50)
          .required()
          .regex(/^[a-zA-Z0-9]+$/),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.email().required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "password",
      type: "string",
    }),

    defineField({
      name: "verified",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verifyCode",
      type: "string",
    }),
    defineField({
      name: "verifyCodeExpiry",
      type: "number",
    }),
    defineField({
      name: "magicLink",
      type: "string",
    }),
    defineField({
      name: "magicLinkExpiry",
      type: "number",
    }),
    defineField({
      name: "resetPasswordToken",
      type: "string",
    }),
    defineField({
      name: "resetPasswordTokenExpiry",
      type: "number",
    }),
    // defineField({
    //   name: "posts",
    //   type: "array",
    //   of: [{ type: "reference", to: [{ type: "post" }] }],
    // }),
  ],
});

// name
// email
// username
// password
//
