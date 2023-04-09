export default {
  name: 'clinic',
  type: 'document',
  title: 'Clinic',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      type: 'url',
      title: 'Link',
    },
    {
      name: 'practitioners',
      type: 'array',
      title: 'Practitioners',
      of: [
        {
          type: 'reference',
          to: [{type: 'ophthalmologist'}, {type: 'optometrist'}],
        },
      ],
      weak: true,
    },
    {
      name: 'addresses',
      type: 'array',
      title: 'Addresses',
      validation: (Rule) => Rule.required(),
      of: [
        {
          name: 'address',
          type: 'object',
          fields: [
            {
              name: 'street',
              type: 'string',
              title: 'Street name',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'city',
              type: 'string',
              title: 'City',
              validation: (Rule) => Rule.required(),
            },
            {name: 'postcode', type: 'string', title: 'Post code'},
            {
              name: 'country',
              type: 'array',
              title: 'Country',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'New Zealand', value: 'nz'},
                  {title: 'Australia', value: 'aus'},
                ],
              },
              validation: (Rule) => Rule.required().max(1),
            },
          ],
        },
      ],
    },
  ],
}
