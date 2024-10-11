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

export interface PasswordResetEmailProps {
  token: string;
  fullname: string;
}

export const PasswordResetEmail = ({
  token,
  fullname,
}: PasswordResetEmailProps) => {
  return (
    <Html>
      <Head>
        <title>Sync: Reset your password</title>
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
      <Preview>Reset your password</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {fullname},</Heading>
        </Row>
        <Row>
          <Text>
            Please click the following link to reset your password:
            <Link href={`${process.env.DOMAIN}/reset-password?token=${token}`}>
              Reset your password
            </Link>
          </Text>
        </Row>
        <Row>
          <Text>
            You can also copy and paste this link in your browser:
            {process.env.DOMAIN}/reset-password?token={token}
          </Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
};
