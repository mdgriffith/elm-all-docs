**Contacts for Support**
- @rupertlssmith on https://elmlang.slack.com
- @rupert on https://discourse.elm-lang.org

# salix-aws-spec

Provides the ability to transform an AWS Service Descriptor into Salix. Salix
is language agnostic data modelling language targeted at code generation. This
transformation makes it possible to generate stubs for AWS services.

All AWS services also have a specification, that describes the data model that
the service accepts or produces, and the endpoint that the service provides. It
is a similar concept to a Swagger or OpenAPI specification; the format is not the
same but the function is. The format is specific to AWS, and is encoded as JSON.
The most relevant place to find these service descriptors is here:

<https://github.com/aws/aws-sdk-js/tree/master/apis>

The Elm data model for the AWS service specification can be found in the
`elm-aws-core` package, in the module `AWS.ServiceSpec`.
