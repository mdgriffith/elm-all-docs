# elm-aws-amplify

Task based Elm implementation of [amplify-js](https://github.com/aws-amplify/amplify-js).

Currently partially implements

- Authentication
- Analytics

"AWS Amplify provides a declarative and easy-to-use interface across different categories of cloud operations. AWS Amplify goes well with any JavaScript based frontend workflow and React Native for mobile developers."

## Examples

See `examples/Main.elm` for example application.

### Requirements

- [Amazon Cognito - Identity Pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html)
- [Amazon Pinpoint - Project](https://docs.aws.amazon.com/pinpoint/latest/userguide/gettingstarted.html)

### Setup

```bash
yarn install
AWS_REGION=... PINPOINT_PROJECT_ID=... IDENTITY_POOL_ID=... yarn start
```
