/**
 * @description
 * HTTP code snippet generator for Delphi using system.Net.HTTPClient.
 *
 * @author
 * @worms618
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { CodeBuilder } from '../../../helpers/code-builder';
import { Client } from '../../targets';

export const nethttpclient: Client = {
  info: {
    key: 'nethttpclient',
    title: 'TNetHTTPClient',
    link: 'https://docwiki.embarcadero.com/Libraries/Athens/en/System.Net.HttpClientComponent.TNetHTTPClient',
    description: 'A HTTP request with TNetHTTPClient class'
  },
  convert: ({}, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, join, push } = new CodeBuilder({ indent: opts.indent });

    return join();
  }
}
