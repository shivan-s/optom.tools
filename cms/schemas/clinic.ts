import slugify from 'slugify'

// TODO: types
async function slugifier(input: string, schemaType: unknown, context: unknown) {
  const randArray = new Uint32Array(4)
  const slug = slugify(input, {lower: true})
  const {getClient} = context
  const client = getClient({apiVersion: '2022-12-07'})
  const params = {slug}
  const query = "count(*[_type == 'clinic' && slug.current == '$slug']{_id})"
  return client.fetch(query, params).then((count) => {
    return `${slug}${count > 0 ? `-${crypto.getRandomValues(randArray)}` : ''}`
  })
}

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
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        slugify: slugifier,
      },
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
          to: [{type: 'practitioner'}],
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
