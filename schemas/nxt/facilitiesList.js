import React from "react";

// Important items to allow form fields to work properly and patch the dataset.
import { PatchEvent, set } from "part:@sanity/form-builder/patch-event";
import FormField from "part:@sanity/components/formfields/default";

// Import the TextArea from UI
import { TextArea } from "@sanity/ui";

const inputWithHeight = React.forwardRef((props, ref) => {
  const { type, onChange } = props;
  return (
    <FormField label={type.title} description={type.description}>
      <TextArea
        ref={ref}
        placeholder={type.placeholder}
        value={props.value}
        onChange={(event) => {
          onChange(PatchEvent.from(set(event.target.value)));
        }}
        style={{ height: "120px" }}
      />
    </FormField>
  );
});

export default {
  name: "facilitiesList",
  title: "NXT - Our Features",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Feature Title",
      type: "string",
      description: "Will also be used on Browser Tab Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Slug is generated from Title, Lower Characters (a-z), Numericals (0-9), dash (-) and must not start with a /, Minimum 3 Characters, eg: 'project-title'",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.custom((slug) => {
          const regex = /^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){2,}$/i;
          if (slug) {
            if (slug.current.match(regex) !== null) {
              return true;
            } else {
              return "Not a valid slug";
            }
          } else {
            return "Required";
          }
        }),
    },
    {
      title: "SEO",
      description:
        "Search Engine Optimization allows to improve the ranking in search results.",
      name: "seo",
      type: "object",
      options: {
        collapsible: true,
      },
      fields: [
        {
          name: "seo_description",
          description:
            "Enter up to 400 characters to describe the page. This description is what will be displayed on search engines or when this page is being shared (e.g. Google or WhatsApp).",
          type: "string",
          title: "Description",
        },
        {
          name: "seo_keywords",
          description:
            "Enter some keywords to describe the page (separated by commas)",
          type: "string",
          title: "Keywords",
        },
        {
          name: "seo_image",
          title: "Image",
          description:
            "800 x 600 | PNG / JPEG / WEBP | max 100kb. This image is what will be displayed on search engines or when this page is being shared (e.g. Google or WhatsApp)",
          type: "image",
          fields: [
            {
              title: "Edit Alt Text",
              name: "alt",
              type: "string",
              initialValue: "Locavore NXT",
            },
          ],
        },
      ],
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "object",
      fields: [
        {
          name: "size",
          title: "Size",
          type: "string",
          options: {
            list: [
              { title: "Small", value: "normal" },
              { title: "Medium", value: "120" },
              { title: "Large", value: "150" },
            ],
            layout: "radio",
          },
          initialValue: "normal",
        },
        {
          title: "Image Small",
          name: "imageSmall",
          type: "object",
          hidden: ({ parent }) => !(parent.size === "normal"),
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document.thumbnail.size === "normal") {
                if(field?.imageColor?.asset && field?.imageBnw?.asset) {
                  return true
                } else {
                  return "Required Image Small"
                }
              } else {
                return true
              }
            }),
          fields: [
            {
              name: "imageColor",
              title: "Image Color",
              type: "image",
              description: "Image Size: 250 x 250 px",
              validation: (Rule) =>
                Rule.custom((field, _) => {
                  return field?.asset ? true : "Required";
                }),
              fields: [
                {
                  title: "Edit Alt Text",
                  name: "alt",
                  type: "string",
                  initialValue: "Locavore NXT",
                },
              ],
            },
            {
              name: "imageBnw",
              title: "Image Black & White",
              type: "image",
              description: "Image Size: 250 x 250 px",
              validation: (Rule) =>
                Rule.custom((field, _) => {
                  return field?.asset ? true : "Required";
                }),
              fields: [
                {
                  title: "Edit Alt Text",
                  name: "alt",
                  type: "string",
                  initialValue: "Locavore NXT",
                },
              ],
            },
            {
              name: "imageFit",
              title: "Image Fit",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Contain", value: "contain" },
                  { title: "Cover", value: "cover" },
                ],
                layout: "radio",
              },
              initialValue: "contain",
            },
          ],
        },
        {
          title: "Image Medium",
          name: "imageMedium",
          type: "object",
          hidden: ({ parent }) => !(parent.size === "120"),
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document.thumbnail.size === "120") {
                if(field?.imageColor?.asset && field?.imageBnw?.asset) {
                  return true
                } else {
                  return "Required Image Medium"
                }
              } else {
                return true
              }
            }),
          fields: [
            {
              name: "imageColor",
              title: "Image Color",
              type: "image",
              description: "Image Size: 250 x 375 px",
              validation: (Rule) =>
                Rule.custom((field, _) => {
                  return field?.asset ? true : "Required";
                }),
              fields: [
                {
                  title: "Edit Alt Text",
                  name: "alt",
                  type: "string",
                  initialValue: "Locavore NXT",
                },
              ],
            },
            {
              name: "imageBnw",
              title: "Image Black & White",
              type: "image",
              description: "Image Size: 250 x 375 px",
              validation: (Rule) =>
                Rule.custom((field, _) => {
                  return field?.asset ? true : "Required";
                }),
              fields: [
                {
                  title: "Edit Alt Text",
                  name: "alt",
                  type: "string",
                  initialValue: "Locavore NXT",
                },
              ],
            },
            {
              name: "position",
              title: "Position",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Top", value: "top" },
                  { title: "Center", value: "center" },
                  { title: "Bottom", value: "bottom" },
                ],
                layout: "radio",
              },
              initialValue: "top",
            },
          ],
        },
        {
          title: "Image Large",
          name: "imageLarge",
          type: "object",
          hidden: ({ parent }) => !(parent.size === "150"),
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document.thumbnail.size === "150") {
                if(field?.imageColor?.asset && field?.imageBnw?.asset) {
                  return true
                } else {
                  return "Required Image Large"
                }
              } else {
                return true
              }
            }),
          fields: [
            {
              name: "imageColor",
              title: "Image Color",
              type: "image",
              description: "Image Size: 350 x 525 px",
              validation: (Rule) =>
                Rule.custom((field, _) => {
                  return field?.asset ? true : "Required";
                }),
              fields: [
                {
                  title: "Edit Alt Text",
                  name: "alt",
                  type: "string",
                  initialValue: "Locavore NXT",
                },
              ],
            },
            {
              name: "imageBnw",
              title: "Image Black & White",
              type: "image",
              description: "Image Size: 350 x 525 px",
              validation: (Rule) =>
                Rule.custom((field, _) => {
                  return field?.asset ? true : "Required";
                }),
              fields: [
                {
                  title: "Edit Alt Text",
                  name: "alt",
                  type: "string",
                  initialValue: "Locavore NXT",
                },
              ],
            },
            {
              name: "position",
              title: "Position",
              type: "string",
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  { title: "Top", value: "top" },
                  { title: "Center", value: "center" },
                  { title: "Bottom", value: "bottom" },
                ],
                layout: "radio",
              },
              initialValue: "top",
            },
          ],
        },
      ],
    },
    {
      title: "Image Icon",
      name: "imageIcon",
      type: "image",
      description: "Input Doodle asset in PNG: 220 x 220 px",
      fields: [
        {
          title: "Edit Alt Text",
          name: "name",
          type: "string",
          initialValue: "Locavore NXT",
        },
      ]
    },
    {
      title: "Content",
      name: "content",
      type: "blockCenter",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Images",
      name: "images",
      type: "array",
      description: "Image Size: 720 x 1080 px",
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: "image",
          title: "Image",
          type: "image",
          validation: (Rule) =>
            Rule.custom((field, _) => {
              return field?.asset ? true : "Image Required";
            }),
          fields: [
            {
              title: "Edit Alt Text",
              name: "alt",
              type: "string",
              initialValue: "Locavore NXT",
            },
          ],
        },
      ],
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
