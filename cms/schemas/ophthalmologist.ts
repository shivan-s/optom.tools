export default {
  name: 'ophthalmologist',
  type: 'document',
  title: 'Ophthalmologist',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'clinics',
      type: 'array',
      title: 'Clinics',
      of: [{type: 'reference', to: [{type: 'clinic'}]}],
      weak: true,
    },
    {
      name: 'subSpecialties',
      type: 'array',
      title: 'Sub Specialities',
      of: [{type: 'string'}],
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
  ],
}
