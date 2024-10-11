import {
  Html,
  Head,
  Link,
  Preview,
  Text,
  Font,
  Section,
  Row,
  Heading,
} from "@react-email/components";

export const MagicLinkEmail = ({
  fullname,
  token,
}: {
  fullname: string;
  token: string;
}) => {
  return (
    <Html>
      <Head>
        <title>Sync: Sign in with magic link</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Sign in with magic link</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {fullname},</Heading>
        </Row>
        <Row>
          <Text>
            Please click the following link to sign in:
            <Link href={`${process.env.DOMAIN}/verify-link?token=${token}`}>
              Sign in
            </Link>
          </Text>
        </Row>
        <Row>
          <Text>
            You can also copy and paste this link in your browser:
            {process.env.DOMAIN}/verify-link?token={token}
          </Text>
        </Row>
        <Row>
          <Text>
            If you did not request this link, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
};
