import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#001D3D',
          active: '#E85389',
          inactive: '#B4B4B4'
        }
      },
      dark: {
        colors: {

        }
      }
    }
  },
})
