uses
  System.Net.HttpClientComponent;

  var Client := TNetHTTPClient.Create(nil);
  try
    var HTTPResponse := Client.Get('http://mockbin.com/har');
  finally
    Client.Free;
  end;
