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
  convert: ({ allHeaders, fullUrl, method, postData }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, join, push } = new CodeBuilder({ indent: opts.indent });

    const dependencies: string[] = ['System.Net.HttpClientComponent'];

    const requiresSourceStream = method === 'POST';
    let requiresHeader = false;

    let clientMethodName = 'Get';
    const clientMethodArguments: string[] = [`'${fullUrl}'`];

    const headers: {variableName: string, variableDeclaration: string}[] = [];

    if (requiresSourceStream) {
      dependencies.push('System.Classes');

      clientMethodName = 'Post';
      clientMethodArguments.push('SourceStream', 'nil');
    };

    Object.keys(allHeaders).forEach(name => {
      const value = allHeaders[name];

      let nextIsUpperCase = true;
      let encodedName: string = '';

      for (let index = 0; index < name.length; index++) {
        const char = name[index];
        let encodedChar = char;

        const isSeparatorChar = ['-'].indexOf(char) >= 0;

        if (isSeparatorChar) {
          nextIsUpperCase = true
        }
        else {
          if (nextIsUpperCase) {
            encodedChar = char.toUpperCase();
            nextIsUpperCase = false;
          }

          encodedName = encodedName + encodedChar;
        }
      }

      const variableName = `Header${encodedName}`;
      headers.push({
        variableName,
        variableDeclaration: `var ${variableName} := TNetHeader.Create('${name}', '${value}');`
      });
    });

    requiresHeader = (headers.length > 0);

    if (requiresHeader) {
      dependencies.push('System.Net.URLClient');

      const shouldSetDefaultarguments = !requiresSourceStream;

      if (shouldSetDefaultarguments) {
        clientMethodArguments.push('nil', 'nil');
      };

      const headerVariables = headers
                              .map(header => header.variableName)
                              .join(', ');

      const headerArgument = `[${headerVariables}]`;
      clientMethodArguments.push(headerArgument);
    }

    // Process collections
    const uses = dependencies
                  .sort()
                  .map((use, index, alldependencies) => {
                    const isLast = index === (alldependencies.length - 1);

                    return `${use}${isLast ? ';' : ','}`;
                  });

                  push('uses', 0);
      uses.forEach(use => push(use, 1));

    blank();

    push('var Client := TNetHTTPClient.Create(nil);', 1);

    if (requiresSourceStream)
      push('var SourceStream: TStringStream := nil;', 1);

    push('try', 1);
      if (requiresHeader) {
        headers.forEach(header => push(header.variableDeclaration, 2));

        blank();
      }

      if (requiresSourceStream) {
        push(`var BodyContent := '${postData.text}';`, 2);
        push('SourceStream := TStringStream.Create(BodyContent);', 2);

        blank();
      }

      push(`var HTTPResponse := Client.${clientMethodName}(${clientMethodArguments.join(', ')});`, 2)
    push('finally', 1);
      if (requiresSourceStream)
        push('SourceStream.Free;', 2);

      push('Client.Free;', 2);
    push('end;', 1);

    blank();

    return join();
  }
}
