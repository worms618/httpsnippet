import { Target } from '../targets';
import { nethttpclient } from './nethttpclient/client'

export const delphi: Target = {
  info: {
    key: 'delphi',
    title: 'Delphi',
    extname: '.pas',
    default: 'nethttpclient'
  },

  clientsById: {
    nethttpclient,
  },
};
