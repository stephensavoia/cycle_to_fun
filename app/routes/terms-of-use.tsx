import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches.flatMap((match) => match.meta ?? []);
  return [
    ...parentMeta,
    { title: "Terms of Use | Cycle TO Fun" },
    {
      name: "description",
      content:
        "By accessing or using Cycle TO Fun, you agree to comply with and be bound by these Terms of Use. If you do not agree to these Terms, please do not use the Site.",
    },
    { name: "og:url", content: "https://www.cycletofun.com/terms-of-use" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: "Terms of Use | Cycle TO Fun" },
    {
      name: "og:description",
      content:
        "By accessing or using Cycle TO Fun, you agree to comply with and be bound by these Terms of Use. If you do not agree to these Terms, please do not use the Site.",
    },
    {
      name: "og:image",
      content: "https://www.cycletofun.com/img/og-image.jpg",
    },
  ];
};

export default function TermsOfUse() {
  return (
    <div className="main-container max-w-[480px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Cycle TO Fun ("the Site"), you agree to comply
          with and be bound by these Terms of Use ("Terms"). If you do not agree
          to these Terms, please do not use the Site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          2. Description of Services
        </h2>
        <p>
          Cycle TO Fun provides users with access to a collection of bike route
          maps and related information ("Services"). The Services are provided
          "as is" and "as available."
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          3. User Responsibilities
        </h2>
        <p>
          Users are responsible for ensuring their own safety and the safety of
          others when following any bike routes or using any information
          provided on the Site. Users must obey all traffic laws and regulations
          and exercise caution at all times.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">4. Use of the Site</h2>
        <p>
          You agree not to use the Site for any unlawful purpose or in any way
          that might harm, damage, or disparage any other party. You are
          prohibited from using the Site to distribute or post spam, harmful
          content, or malware.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          5. Intellectual Property
        </h2>
        <p>
          All content on the Site, including maps, graphics, text, and logos, is
          the property of Cycle TO Fun or its content suppliers and is protected
          by intellectual property laws. You may not reproduce, distribute, or
          create derivative works from any content without explicit permission
          from Cycle TO Fun.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          6. User-Generated Content
        </h2>
        <p>
          If you submit any content to the Site, you grant Cycle TO Fun a
          non-exclusive, royalty-free, perpetual, and worldwide license to use,
          reproduce, modify, adapt, publish, and display such content. You
          represent and warrant that you have the right to grant this license.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          7. Disclaimers and Limitation of Liability
        </h2>
        <p>
          The information provided on the Site is for general informational
          purposes only. Cycle TO Fun does not warrant the accuracy,
          completeness, or usefulness of any information on the Site. Use of the
          Site is at your own risk. Cycle TO Fun will not be liable for any
          damages resulting from the use or inability to use the Site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">8. Changes to the Terms</h2>
        <p>
          Cycle TO Fun reserves the right to modify these Terms at any time. Any
          changes will be effective immediately upon posting. Your continued use
          of the Site after changes have been posted constitutes your acceptance
          of the new Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
        <p>
          Cycle TO Fun reserves the right to terminate or suspend your access to
          the Site, without notice, for conduct that Cycle TO Fun believes
          violates these Terms or is harmful to other users of the Site, Cycle
          TO Fun, or third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of Canada, without regard to its conflict of law principles.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a className="link" href="mailto:cycletofun@gmail.com">
            cycletofun@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
