import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { myTheme } from 'theme';
import CustomStudioNavbar from 'components/CustomStudioNavbar';
import {defaultDocumentNode} from './defaultDocumentNode';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath : "/studio",
  name: 'Inflow_Content_Studio',
  title: 'Inflow Content Studio',

  projectId,
  dataset,

  plugins: [deskTool({defaultDocumentNode}), visionTool()],

  schema: {
    types: schemaTypes,
  },
  theme : myTheme,
  studio: {
    components : {
      //logo : CustomStudioLogo,
      navbar : CustomStudioNavbar
    }
  }
})
