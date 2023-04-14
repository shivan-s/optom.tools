import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

const NODE_ENV = process.env.NODE_ENV

export default defineConfig({
  name: 'default',
  title: 'optom-resources',

  projectId: 'oqtkv07s',
  dataset: NODE_ENV === 'production' ? 'production' : 'staging',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
