# elm-dnn-http

Helpers for working with Engage's DNN Web API.

Provides a decoder to extract necessary API details from your flags:

```elm
flagsDecoder : Json.Decode.Decoder { httpConfig : Engage.Http.Config, localization : Engage.Localization.Localization }
flagsDecoder =
    Json.Decode.map2
        (\httpConfig localization -> { httpConfig = httpConfig, localization = localization })
        (Json.Decode.field "httpConfig" Engage.Http.configDecoder)
        (Json.Decode.field "localization" Engage.Localization.decoder)

init : Json.Encode.Value -> ( Model, Cmd Msg )
init flagsJson =
    case Json.Decode.decodeValue flagsDecoder flagsJson of
        Ok { httpConfig, localization } ->
            ( { model | httpConfig = httpConfig, localization = localization }, Cmd.none )

        Err error ->
            ( { model | errorMessage = Just (Json.Decode.errorToString error) }, Cmd.none )
```

Used within DNN, your initializing code may look like this:

```asp
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<%@ Import Namespace="Engage.Dnn.Framework" %>
<%@ Import Namespace="Engage.Util" %>

<dnn:DnnJsInclude runat="server" FilePath="DesktopModules/MyClient/elm.min.js" />

<asp:Panel runat="server" ID="ApplicationPanel" />

<script>
jQuery(function ($) {
    var sf = $.ServicesFramework(<%:this.ModuleId%>);
    Elm.MyClient.ViewMyProject.Main.init({
        node: document.getElementById(<%: ApplicationPanel.ClientID.AsQuotedJavaScriptString() %>),
        flags: {
            httpConfig: {
                baseUrl: sf.getServiceRoot('MyClient') + 'MyProject',
                headers: {
                    TabId: <%:ModuleContext.TabId.ToString(CultureInfo.InvariantCulture).AsQuotedJavaScriptString()%>,
                    ModuleId: <%:ModuleContext.ModuleId.ToString(CultureInfo.InvariantCulture).AsQuotedJavaScriptString()%>,
                    RequestVerificationToken: sf.getAntiForgeryValue()
                }
            },
            localization: <%: LocalizationJson %>
        }
    });
});
</script>

<script runat="server">
/// <summary>Gets a JSON array with localized text for this control's resource file.</summary>
/// <value>An HTML string with a JSON array of objects with <c>key</c> and <c>value</c> properties.</value>
private IHtmlString LocalizationJson => LocalizationUtility.GetResources(this.LocalResourceFile)
                                                                .Where(keyValue => !string.IsNullOrEmpty(keyValue.Value))
                                                                .Select(keyValue => new { key = keyValue.Key, value = keyValue.Value })
                                                                .ToJson()
                                                                .AsRawHtml();
</script>
```

Provides opinionated methods for calling HTTP endpoints:

```elm
updateProfile : Engage.Http.Config -> Json.Encode.Value -> Cmd Msg
updateProfile httpConfig body =
    Engage.Http.post
        httpConfig
        ProfileUpdated
        (decodeUpdateResponse)
        { methodName = "Profile", value = body }
```

Provides opinionated method for retrieving error messages from a response:

```elm
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ProfileUpdated response ->
            case response of
                NotAsked ->
                    ( { model | currentRequest = response }, Cmd.none )
                Loading ->
                    ( { model | currentRequest = response }, Cmd.none )
                Failure error ->
                    ( { model | currentRequest = response, errorMessage = Just (Engage.Http.getErrorMessage model error) }, Cmd.none )
                Success result ->
                    ( { model | currentRequest = response }, Cmd.none )
```
