uses
  System.Classes,
  System.Net.HttpClientComponent,
  System.Net.URLClient;

  var Client := TNetHTTPClient.Create(nil);
  var SourceStream: TStringStream := nil;
  try
    var HeaderContentType := TNetHeader.Create('content-type', 'application/json');

    var BodyContent := '{"number":1,"string":"f\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}';
    SourceStream := TStringStream.Create(BodyContent);

    var HTTPResponse := Client.Post('http://mockbin.com/har', SourceStream, nil, [HeaderContentType]);
  finally
    SourceStream.Free;
    Client.Free;
  end;
