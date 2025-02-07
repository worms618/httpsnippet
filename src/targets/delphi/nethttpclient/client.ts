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
  convert: ({ fullUrl }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, join, push } = new CodeBuilder({ indent: opts.indent });

    push('uses', 0);
      push('System.Net.HttpClientComponent;', 1);

    blank();
    push('var Client := TNetHTTPClient.Create(nil);', 1);
    push('try', 1);
      push(`var HTTPResponse := Client.Get('${fullUrl}');`, 2)
    push('finally', 1);
      push('Client.Free;', 2);
    push('end;', 1);

    blank();

    return join();
  }
}
