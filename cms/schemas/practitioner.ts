import slugify from 'slugify'

async function slugifier(input: string, schemaType: unknown, context: unknown) {
  const randArray = new Uint16Array(1)
  const slug = slugify(input, {lower: true})
  const {getClient} = context
  const client = getClient({apiVersion: '2022-12-07'})
  const params = {slug}
  const query = "count(*[_type == 'practitioner' && slug.current == $slug]{_id})"
  return client.fetch(query, params).then((count) => {
    return `${slug}${count > 0 ? `-${crypto.getRandomValues(randArray)}` : ''}`
  })
}

export default {
  name: 'practitioner',
  type: 'document',
  title: 'Practitioner',
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
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        slugify: slugifier,
      },
    },
    {
      name: 'clinics',
      type: 'array',
      title: 'Clinics',
      of: [{type: 'reference', to: [{type: 'clinic'}]}],
      weak: true,
    },
    {
      name: 'locum',
      type: 'boolean',
      title: 'Locum',
      initialValue: false,
    },
    {
      name: 'profession',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Optometrist', value: 'optometrist'},
          {title: 'Ophthalmologist', value: 'ophthalmologist'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      // Ophthalmologist specific
      name: 'subSpecialties',
      type: 'array',
      title: 'Sub Specialities related to Ophthalmology',
      of: [{type: 'string'}],
      hidden: ({document}) => !document?.profession?.includes('ophthalmologist'),
      options: {
        list: [
          {title: 'Medical retina', value: 'medicalRetina'},
          {title: 'Cataract', value: 'cataract'},
          {title: 'Vitreoretinal', value: 'vitreoretinal'},
          {title: 'Neuro', value: 'neuro'},
          {title: 'Paedatrics', value: 'paedatrics'},
          {title: 'Glaucoma', value: 'glaucoma'},
        ],
      },
    },
    {
      // Optometry specific
      name: 'specialties',
      type: 'array',
      title: 'Specialities related to Optometry',
      of: [{type: 'string'}],
      hidden: ({document}) => !document?.profession?.includes('optometrist'),
      options: {
        list: [
          {title: 'Glaucoma', value: 'glaucoma'},
          {title: 'Low Vision', value: 'lowVision'},
          {title: 'Contact Lenses', value: 'contactLenses'},
          {title: 'Paedatrics', value: 'paedatrics'},
          {title: 'Binocular Vision', value: 'binocularVision'},
          {title: 'Vision Therapy', value: 'visionTherapy'},
        ],
      },
    },
  ],
}
