import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
            title: "Product Name",
            validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
            name: "originalPrice",
            type: "number",
            title: "Original Price",
            validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
            name: "discountedPrice",
            type: "number",
            title: "Discounted Price",
            validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "stock",
            type: "number",
            title: "Stock",
            description: "Number of items available in stock",
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
})