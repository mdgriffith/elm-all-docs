# Elm Jira connector
JIRA API connector package for Elm.

## Example

You can find an exemplary frontend app which uses this package on GitHub:
[vViktorPL/elm-jira-connector-example](https://github.com/vViktorPL/elm-jira-connector-example)

## Troubleshooting
### CORS
Unfortunately JIRA REST API CORS won't let you in from your SPA domain. Although, to solve this problem
you can set up proxy server which will exchange requests with JIRA API and will send proper CORS headers
into frontend app.
In case you are building Electron app, you can consider 
[disabling web security](https://stackoverflow.com/questions/35852684/electron-chromium-disable-web-security) overall.